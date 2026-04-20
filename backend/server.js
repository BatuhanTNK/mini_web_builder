const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ─── JSON file-based sites database ──────────────────────────────────────────
const SITES_FILE = path.join(__dirname, 'data', 'sites.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(SITES_FILE)) fs.writeFileSync(SITES_FILE, '[]');
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]');

function readSites() {
  try { return JSON.parse(fs.readFileSync(SITES_FILE, 'utf8')); } catch { return []; }
}
function writeSites(sites) {
  fs.writeFileSync(SITES_FILE, JSON.stringify(sites, null, 2));
}
function readUsers() {
  try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')); } catch { return []; }
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Serve uploaded files as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config — save to uploads/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
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
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Sadece jpg, png, gif, webp, svg dosyaları yüklenebilir'));
    }
  }
});

// POST /api/upload — single image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Dosya yüklenemedi' });
  }
  const url = `/uploads/images/${req.file.filename}`;
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

// ─── Auth API ────────────────────────────────────────────────────────────────
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Tüm alanlar gerekli' });
  const users = readUsers();
  if (users.find(u => u.email === email)) return res.status(400).json({ success: false, message: 'Bu email zaten kayıtlı' });
  const user = { _id: Date.now().toString(36) + Math.random().toString(36).slice(2), name, email, password, createdAt: new Date().toISOString() };
  users.push(user);
  writeUsers(users);
  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser, token: user._id });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: 'Email veya şifre hatalı' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser, token: user._id });
});

// ─── Sites API ───────────────────────────────────────────────────────────────
// GET all sites for a user
app.get('/api/sites', (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const sites = readSites().filter(s => s.userId === userId);
  res.json({ sites });
});

// POST create site
app.post('/api/sites', (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const site = { ...req.body, userId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  const sites = readSites();
  sites.push(site);
  writeSites(sites);
  res.json({ success: true, site });
});

// GET single site by id
app.get('/api/sites/:id', (req, res) => {
  const site = readSites().find(s => s._id === req.params.id);
  if (!site) return res.status(404).json({ message: 'Site bulunamadı' });
  res.json({ site });
});

// PUT update site
app.put('/api/sites/:id', (req, res) => {
  const sites = readSites();
  const idx = sites.findIndex(s => s._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Site bulunamadı' });
  sites[idx] = { ...sites[idx], ...req.body, updatedAt: new Date().toISOString() };
  writeSites(sites);
  res.json({ success: true, site: sites[idx] });
});

// DELETE site
app.delete('/api/sites/:id', (req, res) => {
  let sites = readSites();
  sites = sites.filter(s => s._id !== req.params.id);
  writeSites(sites);
  res.json({ success: true });
});

// GET public site by slug — no auth needed
app.get('/api/public/:slug', (req, res) => {
  const site = readSites().find(s => s.slug === req.params.slug);
  if (!site) return res.status(404).json({ message: 'Sayfa bulunamadı' });
  // Increment views
  const sites = readSites();
  const idx = sites.findIndex(s => s._id === site._id);
  if (idx !== -1) {
    if (!sites[idx].settings) sites[idx].settings = {};
    if (!sites[idx].settings.analytics) sites[idx].settings.analytics = {};
    sites[idx].settings.analytics.views = (sites[idx].settings.analytics.views || 0) + 1;
    writeSites(sites);
  }
  res.json({ site });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Upload server running on 0.0.0.0:${PORT}`);
  console.log(`Images directory: ${uploadsDir}`);
});
