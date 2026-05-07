const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const auth = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// General image storage (for block images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Background image storage (for hero backgrounds)
const backgroundStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'backgrounds');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Sadece görsel dosyaları yüklenebilir'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const backgroundUpload = multer({
  storage: backgroundStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB for backgrounds
});

// Video storage
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'video');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const videoFilter = (req, file, cb) => {
  const allowedTypes = /mp4|webm|ogg|mov/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Sadece video dosyaları (mp4, webm, ogg, mov) yüklenebilir'));
  }
};

const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/media/upload - General image upload
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya yüklenmedi' });
    }

    let imageUrl = '';

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name') {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'miniweb-builder',
        transformation: [
          { width: 1200, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    } else {
      imageUrl = `/uploads/images/${req.file.filename}`;
    }

    res.json({ url: imageUrl, filename: req.file.originalname });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Dosya yüklenirken hata oluştu', error: error.message });
  }
});

// POST /api/media/upload-background - Background image upload (always local, no Cloudinary)
router.post('/upload-background', auth, backgroundUpload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya yüklenmedi' });
    }

    // Always save locally for backgrounds (CDN will be added later)
    const imageUrl = `/uploads/backgrounds/${req.file.filename}`;

    res.json({ 
      url: imageUrl, 
      filename: req.file.originalname,
      size: req.file.size,
      path: imageUrl // This will be used for CDN migration later
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Dosya yüklenirken hata oluştu', error: error.message });
  }
});

// POST /api/media/upload-video - Local video upload
router.post('/upload-video', auth, videoUpload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Dosya yüklenmedi' });
    }

    const videoUrl = `/uploads/video/${req.file.filename}`;

    res.json({ 
      url: videoUrl, 
      filename: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Video yüklenirken hata oluştu', error: error.message });
  }
});

module.exports = router;
