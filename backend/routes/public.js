const express = require('express');
const bcrypt = require('bcryptjs');
const MiniSite = require('../models/MiniSite');

const router = express.Router();

// GET /api/public/:slug — public mini site verisi al
router.get('/:slug', async (req, res) => {
  try {
    const site = await MiniSite.findOne({ slug: req.params.slug })
      .populate('userId', 'name email');

    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    if (!site.settings.isPublished) {
      return res.status(404).json({ message: 'Bu site yayında değil' });
    }

    const siteData = site.toObject();

    if (site.settings.passwordProtected) {
      const providedPassword = req.headers['x-site-password'];
      if (!providedPassword) {
        return res.json({
          passwordRequired: true,
          title: site.title,
          slug: site.slug
        });
      }
      const isValid = providedPassword === site.settings.password;
      if (!isValid) {
        return res.status(401).json({ message: 'Hatalı şifre' });
      }
    }

    delete siteData.settings.password;
    siteData.blocks = siteData.blocks.filter(b => b.visible);

    res.json({ site: siteData });
  } catch (error) {
    res.status(500).json({ message: 'Site alınırken hata oluştu', error: error.message });
  }
});

// POST /api/public/:slug/unlock — şifre korumalı siteyi aç
router.post('/:slug/unlock', async (req, res) => {
  try {
    const site = await MiniSite.findOne({ slug: req.params.slug });

    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    if (!site.settings.passwordProtected) {
      return res.json({ success: true });
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Şifre gerekli' });
    }

    // Support both hashed and plain passwords for backwards compat
    let isValid = false;
    if (site.settings.password && site.settings.password.startsWith('$2')) {
      isValid = await bcrypt.compare(password, site.settings.password);
    } else {
      isValid = password === site.settings.password;
    }

    if (!isValid) {
      return res.status(401).json({ message: 'Hatalı şifre' });
    }

    // Return the full site data
    const siteData = site.toObject();
    delete siteData.settings.password;
    siteData.blocks = siteData.blocks.filter(b => b.visible);

    res.json({ success: true, site: siteData });
  } catch (error) {
    res.status(500).json({ message: 'Şifre doğrulaması sırasında hata oluştu', error: error.message });
  }
});

// POST /api/public/:slug/view — görüntülenme sayısını artır
router.post('/:slug/view', async (req, res) => {
  try {
    const site = await MiniSite.findOne({ slug: req.params.slug });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    site.settings.analytics.views += 1;
    await site.save();

    res.json({ views: site.settings.analytics.views });
  } catch (error) {
    res.status(500).json({ message: 'Görüntülenme kaydedilemedi', error: error.message });
  }
});

module.exports = router;
