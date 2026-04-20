const express = require('express');
const { v4: uuidv4 } = require('uuid');
const MiniSite = require('../models/MiniSite');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/sites/:id/blocks — yeni blok ekle
router.post('/:id/blocks', auth, async (req, res) => {
  try {
    const { type, data, order } = req.body;

    const site = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    const newBlock = {
      id: uuidv4(),
      type,
      order: order !== undefined ? order : site.blocks.length,
      visible: true,
      data: data || {}
    };

    site.blocks.push(newBlock);
    site.blocks.sort((a, b) => a.order - b.order);
    await site.save();

    res.status(201).json({ block: newBlock, site });
  } catch (error) {
    res.status(500).json({ message: 'Blok eklenirken hata oluştu', error: error.message });
  }
});

// PUT /api/sites/:id/blocks/:blockId — blok güncelle
router.put('/:id/blocks/:blockId', auth, async (req, res) => {
  try {
    const { data, visible } = req.body;

    const site = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    const block = site.blocks.find(b => b.id === req.params.blockId);
    if (!block) {
      return res.status(404).json({ message: 'Blok bulunamadı' });
    }

    if (data !== undefined) block.data = { ...block.data, ...data };
    if (visible !== undefined) block.visible = visible;

    await site.save();
    res.json({ block, site });
  } catch (error) {
    res.status(500).json({ message: 'Blok güncellenirken hata oluştu', error: error.message });
  }
});

// DELETE /api/sites/:id/blocks/:blockId — blok sil
router.delete('/:id/blocks/:blockId', auth, async (req, res) => {
  try {
    const site = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    site.blocks = site.blocks.filter(b => b.id !== req.params.blockId);
    site.blocks.forEach((b, i) => { b.order = i; });
    await site.save();

    res.json({ site });
  } catch (error) {
    res.status(500).json({ message: 'Blok silinirken hata oluştu', error: error.message });
  }
});

// PUT /api/sites/:id/blocks/reorder — sıralamayı güncelle
router.put('/:id/blocks/reorder', auth, async (req, res) => {
  try {
    const { blockIds } = req.body;

    const site = await MiniSite.findOne({ _id: req.params.id, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site bulunamadı' });
    }

    const blockMap = new Map(site.blocks.map(b => [b.id, b]));
    site.blocks = blockIds
      .map((id, index) => {
        const block = blockMap.get(id);
        if (block) {
          block.order = index;
          return block;
        }
        return null;
      })
      .filter(Boolean);

    await site.save();
    res.json({ site });
  } catch (error) {
    res.status(500).json({ message: 'Sıralama güncellenirken hata oluştu', error: error.message });
  }
});

module.exports = router;
