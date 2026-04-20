const express = require('express');
const MiniSite = require('../models/MiniSite');
const auth = require('../middleware/auth');
const { generateUniqueSlug } = require('../utils/slugify');
const { getTemplateBlocks } = require('../utils/templates');

const router = express.Router();

// GET /api/sites — kullanıcının siteleri
router.get('/', auth, async (req, res) => {
  try {
    const sites = await MiniSite.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json({ sites });
  } catch (error) {
    res.status(500).json({ message: 'Siteler alınırken hata oluştu', error: error.message });
  }
});

// POST /api/sites — yeni site oluştur
router.post('/', auth, async (req, res) => {
  try {
    const { title, templateId = 'blank', theme } = req.body;

    const slug = await generateUniqueSlug(title || 'site');
    const blocks = getTemplateBlocks(templateId);

    const site = new MiniSite({
      userId: req.userId,
      title: title || 'Yeni Site',
      slug,
      templateId,
      theme: theme || undefined,
      blocks
    });

    await site.save();
    res.status(201).json({ site });
  } catch (error) {
    res.status(500).json({ message: 'Site oluşturulurken hata oluştu', error: error.message });
  }
});

// GET /api/sites/:id — site detayı
router.get('/:id', auth, async (req, res) => {
  try {
    const site = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }
    res.json({ site });
  } catch (error) {
    res.status(500).json({ message: 'Site alınırken hata oluştu', error: error.message });
  }
});

// PUT /api/sites/:id — siteyi güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, theme, blocks, settings, qrCode } = req.body;

    const site = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    if (title !== undefined) site.title = title;
    if (theme !== undefined) site.theme = { ...site.theme.toObject?.() || site.theme, ...theme };
    if (blocks !== undefined) site.blocks = blocks;
    if (settings !== undefined) site.settings = { ...site.settings.toObject?.() || site.settings, ...settings };
    if (qrCode !== undefined) site.qrCode = { ...site.qrCode.toObject?.() || site.qrCode, ...qrCode };

    await site.save();
    res.json({ site });
  } catch (error) {
    res.status(500).json({ message: 'Site güncellenirken hata oluştu', error: error.message });
  }
});

// DELETE /api/sites/:id — siteyi sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const site = await MiniSite.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }
    res.json({ message: 'Site silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Site silinirken hata oluştu', error: error.message });
  }
});

// POST /api/sites/:id/publish — yayınla / yayından kaldır
router.post('/:id/publish', auth, async (req, res) => {
  try {
    const site = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    site.settings.isPublished = !site.settings.isPublished;
    await site.save();

    res.json({ site, published: site.settings.isPublished });
  } catch (error) {
    res.status(500).json({ message: 'Yayın durumu değiştirilirken hata oluştu', error: error.message });
  }
});

// POST /api/sites/:id/duplicate — kopyala
router.post('/:id/duplicate', auth, async (req, res) => {
  try {
    const original = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!original) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    const slug = await generateUniqueSlug(original.title + '-kopya');

    const duplicate = new MiniSite({
      userId: req.userId,
      title: original.title + ' (Kopya)',
      slug,
      templateId: original.templateId,
      theme: original.theme,
      blocks: original.blocks,
      settings: {
        ...original.settings.toObject?.() || original.settings,
        isPublished: false,
        analytics: { views: 0, uniqueViews: 0 }
      }
    });

    await duplicate.save();
    res.status(201).json({ site: duplicate });
  } catch (error) {
    res.status(500).json({ message: 'Site kopyalanırken hata oluştu', error: error.message });
  }
});

module.exports = router;
