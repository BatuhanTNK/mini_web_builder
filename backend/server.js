require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Database
const { testConnection, syncDatabase } = require('./config/database');
// Models (ilişkileri yükle)
require('./models/index');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Serve uploaded files as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend build (production)
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}

// Multer config — save to uploads/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Default to 'images' if no folder is provided
    const targetFolder = req.body.folder || 'images';
    // Validate folder path to prevent path traversal
    const safeFolder = path.normalize(targetFolder).replace(/^(\.\.[\/\\])+/, '');
    const dynamicDir = path.join(__dirname, 'uploads', safeFolder);
    
    // Ensure directory exists
    if (!fs.existsSync(dynamicDir)) {
      fs.mkdirSync(dynamicDir, { recursive: true });
    }
    
    cb(null, dynamicDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e6);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueName + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm', '.ogg', '.mov'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Sadece jpg, png, gif, webp, svg dosyaları yüklenebilir'));
    }
  }
});

// ─── Upload API (dosya sistemi tabanlı, DB'ye bağımlı değil) ─────────────────

// POST /api/upload — single image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Dosya yüklenemedi' });
  }
  const targetFolder = req.body.folder || 'images';
  const safeFolder = path.normalize(targetFolder).replace(/^(\.\.[\/\\])+/, '');
  const url = `/uploads/${safeFolder.replace(/\\/g, '/')}/${req.file.filename}`;
  res.json({
    success: true,
    url,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

// POST /api/upload/multiple — multiple image upload
app.post('/api/upload/multiple', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Dosya yüklenemedi' });
  }
  const files = req.files.map(f => ({
    url: `/uploads/images/${f.filename}`,
    filename: f.filename,
    originalName: f.originalname,
    size: f.size
  }));
  res.json({ success: true, files });
});

// DELETE /api/upload/:filename — delete image
app.delete('/api/upload/:filename', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'Dosya silindi' });
  } else {
    res.status(404).json({ message: 'Dosya bulunamadı' });
  }
});

// GET /api/upload/list — list all uploaded images
app.get('/api/upload/list', (req, res) => {
  const files = fs.readdirSync(uploadsDir)
    .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
    .map(f => ({
      filename: f,
      url: `/uploads/images/${f}`,
      size: fs.statSync(path.join(uploadsDir, f)).size
    }))
    .sort((a, b) => b.filename.localeCompare(a.filename));
  res.json({ files });
});

// ─── Route'ları bağla ────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sites', require('./routes/sites'));
app.use('/api/sites', require('./routes/blocks'));
app.use('/api/public', require('./routes/public'));
app.use('/api/media', require('./routes/media'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'mysql', timestamp: new Date().toISOString() });
});

// SPA fallback — any non-API route returns index.html so React Router works
app.get(/^\/(?!api|uploads).*/, (req, res, next) => {
  const indexFile = path.join(frontendDist, 'index.html');
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }
  next();
});

// Error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Dosya boyutu 10MB\'dan büyük olamaz' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

// ─── Sunucuyu başlat ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // MySQL bağlantısını test et
    await testConnection();
    // Tabloları oluştur / senkronize et
    await syncDatabase();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on 0.0.0.0:${PORT}`);
      console.log(`📁 Images directory: ${uploadsDir}`);
      console.log(`🗄️  Database: mini_web_db (MySQL)`);
    });
  } catch (error) {
    console.error('❌ Sunucu başlatılamadı:', error.message);
    process.exit(1);
  }
};

startServer();
