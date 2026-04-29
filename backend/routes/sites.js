const express = require('express');
const MiniSite = require('../models/MiniSite');
const auth = require('../middleware/auth');
const { generateUniqueSlug } = require('../utils/slugify');
const { getTemplateBlocks } = require('../utils/templates');

const router = express.Router();

// GET /api/sites — kullanıcının siteleri
router.get('/', auth, async (req, res) => {
  try {
    const sites = await MiniSite.findAll({
      where: { userId: req.userId },
      order: [['updatedAt', 'DESC']]
    });
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

    const site = await MiniSite.create({
      userId: req.userId,
      title: title || 'Yeni Site',
      slug,
      templateId,
      theme: theme || undefined,
      blocks
    });

    res.status(201).json({ site });
  } catch (error) {
    res.status(500).json({ message: 'Site oluşturulurken hata oluştu', error: error.message });
  }
});

// GET /api/sites/:id — site detayı
router.get('/:id', auth, async (req, res) => {
  try {
    const site = await MiniSite.findOne({
      where: { id: req.params.id, userId: req.userId }
    });
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

    const site = await MiniSite.findOne({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    if (title !== undefined) site.title = title;
    if (theme !== undefined) site.theme = { ...site.theme, ...theme };
    if (blocks !== undefined) site.blocks = blocks;
    if (settings !== undefined) site.settings = { ...site.settings, ...settings };
    if (qrCode !== undefined) site.qrCode = { ...site.qrCode, ...qrCode };

    await site.save();
    res.json({ site });
  } catch (error) {
    res.status(500).json({ message: 'Site güncellenirken hata oluştu', error: error.message });
  }
});

// DELETE /api/sites/:id — siteyi sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const site = await MiniSite.findOne({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }
    await site.destroy();
    res.json({ message: 'Site silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Site silinirken hata oluştu', error: error.message });
  }
});

// POST /api/sites/:id/publish — yayınla / yayından kaldır
router.post('/:id/publish', auth, async (req, res) => {
  try {
    const site = await MiniSite.findOne({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    const settings = { ...site.settings };
    settings.isPublished = !settings.isPublished;
    site.settings = settings;

    await site.save();

    res.json({ site, published: site.settings.isPublished });
  } catch (error) {
    res.status(500).json({ message: 'Yayın durumu değiştirilirken hata oluştu', error: error.message });
  }
});

// POST /api/sites/:id/duplicate — kopyala
router.post('/:id/duplicate', auth, async (req, res) => {
  try {
    const original = await MiniSite.findOne({
      where: { id: req.params.id, userId: req.userId }
    });
    if (!original) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    const slug = await generateUniqueSlug(original.title + '-kopya');

    const duplicate = await MiniSite.create({
      userId: req.userId,
      title: original.title + ' (Kopya)',
      slug,
      templateId: original.templateId,
      theme: original.theme,
      blocks: original.blocks,
      settings: {
        ...original.settings,
        isPublished: false,
        analytics: { views: 0, uniqueViews: 0 }
      }
    });

    res.status(201).json({ site: duplicate });
  } catch (error) {
    res.status(500).json({ message: 'Site kopyalanırken hata oluştu', error: error.message });
  }
});

module.exports = router;
