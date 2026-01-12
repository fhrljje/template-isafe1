import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.CMS_PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'isafe-cms-secret-key-2024';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'data', 'uploads');

// Admin credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'isafe2024', 10);

// Ensure directories exist
await fs.mkdir(DATA_DIR, { recursive: true });
await fs.mkdir(path.join(UPLOAD_DIR, 'logo'), { recursive: true });
await fs.mkdir(path.join(UPLOAD_DIR, 'carousel'), { recursive: true });

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'), false);
  }
};

// Multer for logo uploads
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(UPLOAD_DIR, 'logo'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  }
});

// Multer for carousel uploads
const carouselStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(UPLOAD_DIR, 'carousel'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  }
});

const uploadLogo = multer({
  storage: logoStorage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

const uploadCarousel = multer({
  storage: carouselStorage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/data', express.static(DATA_DIR));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, message: 'Login successful' });
});

// Verify token endpoint
app.get('/api/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Get content
app.get('/api/content', async (req, res) => {
  try {
    const contentPath = path.join(DATA_DIR, 'content.json');
    const data = await fs.readFile(contentPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ ID: {}, EN: {} });
    } else {
      res.status(500).json({ error: 'Failed to read content' });
    }
  }
});

// Update content
app.put('/api/content', authenticateToken, async (req, res) => {
  try {
    const contentPath = path.join(DATA_DIR, 'content.json');
    await fs.writeFile(contentPath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Get site settings
app.get('/api/settings', async (req, res) => {
  try {
    const settingsPath = path.join(DATA_DIR, 'settings.json');
    const data = await fs.readFile(settingsPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json(getDefaultSettings());
    } else {
      res.status(500).json({ error: 'Failed to read settings' });
    }
  }
});

// Update settings
app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    const settingsPath = path.join(DATA_DIR, 'settings.json');
    await fs.writeFile(settingsPath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Get media
app.get('/api/media', async (req, res) => {
  try {
    const mediaPath = path.join(DATA_DIR, 'media.json');
    const data = await fs.readFile(mediaPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ logo: null, carousel: [] });
    } else {
      res.status(500).json({ error: 'Failed to read media' });
    }
  }
});

// Update media metadata
app.put('/api/media', authenticateToken, async (req, res) => {
  try {
    const mediaPath = path.join(DATA_DIR, 'media.json');
    await fs.writeFile(mediaPath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Media updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update media' });
  }
});

// Upload logo
app.post('/api/upload/logo', authenticateToken, uploadLogo.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const mediaPath = path.join(DATA_DIR, 'media.json');
    let media = { logo: null, carousel: [] };

    try {
      const data = await fs.readFile(mediaPath, 'utf-8');
      media = JSON.parse(data);
    } catch (e) {}

    // Delete old logo if exists
    if (media.logo?.url) {
      const oldFile = path.join(UPLOAD_DIR, 'logo', path.basename(media.logo.url));
      try {
        await fs.unlink(oldFile);
      } catch (e) {}
    }

    media.logo = {
      url: `/uploads/logo/${req.file.filename}`,
      alt: req.body.alt || 'ISAFE Logo',
      uploadedAt: new Date().toISOString()
    };

    await fs.writeFile(mediaPath, JSON.stringify(media, null, 2));
    res.json({ message: 'Logo uploaded successfully', logo: media.logo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload logo' });
  }
});

// Delete logo
app.delete('/api/upload/logo', authenticateToken, async (req, res) => {
  try {
    const mediaPath = path.join(DATA_DIR, 'media.json');
    let media = { logo: null, carousel: [] };

    try {
      const data = await fs.readFile(mediaPath, 'utf-8');
      media = JSON.parse(data);
    } catch (e) {}

    if (media.logo?.url) {
      const oldFile = path.join(UPLOAD_DIR, 'logo', path.basename(media.logo.url));
      try {
        await fs.unlink(oldFile);
      } catch (e) {}
    }

    media.logo = null;
    await fs.writeFile(mediaPath, JSON.stringify(media, null, 2));
    res.json({ message: 'Logo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete logo' });
  }
});

// Upload carousel images
app.post('/api/upload/carousel', authenticateToken, uploadCarousel.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const mediaPath = path.join(DATA_DIR, 'media.json');
    let media = { logo: null, carousel: [] };

    try {
      const data = await fs.readFile(mediaPath, 'utf-8');
      media = JSON.parse(data);
    } catch (e) {}

    const newSlides = req.files.map((file, idx) => ({
      id: Date.now() + idx,
      url: `/uploads/carousel/${file.filename}`,
      title: '',
      description: '',
      order: media.carousel.length + idx,
      uploadedAt: new Date().toISOString()
    }));

    media.carousel = [...media.carousel, ...newSlides];
    await fs.writeFile(mediaPath, JSON.stringify(media, null, 2));
    res.json({ message: 'Images uploaded successfully', slides: newSlides });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Update carousel slide
app.put('/api/upload/carousel/:id', authenticateToken, async (req, res) => {
  try {
    const slideId = parseInt(req.params.id);
    const mediaPath = path.join(DATA_DIR, 'media.json');
    const data = await fs.readFile(mediaPath, 'utf-8');
    const media = JSON.parse(data);

    const slideIndex = media.carousel.findIndex(s => s.id === slideId);
    if (slideIndex === -1) {
      return res.status(404).json({ error: 'Slide not found' });
    }

    media.carousel[slideIndex] = {
      ...media.carousel[slideIndex],
      title: req.body.title ?? media.carousel[slideIndex].title,
      description: req.body.description ?? media.carousel[slideIndex].description
    };

    await fs.writeFile(mediaPath, JSON.stringify(media, null, 2));
    res.json({ message: 'Slide updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update slide' });
  }
});

// Delete carousel slide
app.delete('/api/upload/carousel/:id', authenticateToken, async (req, res) => {
  try {
    const slideId = parseInt(req.params.id);
    const mediaPath = path.join(DATA_DIR, 'media.json');
    const data = await fs.readFile(mediaPath, 'utf-8');
    const media = JSON.parse(data);

    const slide = media.carousel.find(s => s.id === slideId);
    if (slide) {
      // Delete file
      const filePath = path.join(UPLOAD_DIR, 'carousel', path.basename(slide.url));
      try {
        await fs.unlink(filePath);
      } catch (e) {}

      media.carousel = media.carousel.filter(s => s.id !== slideId);
      await fs.writeFile(mediaPath, JSON.stringify(media, null, 2));
    }

    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete slide' });
  }
});

// Reorder carousel
app.put('/api/upload/carousel-order', authenticateToken, async (req, res) => {
  try {
    const { order } = req.body; // Array of slide IDs in new order
    const mediaPath = path.join(DATA_DIR, 'media.json');
    const data = await fs.readFile(mediaPath, 'utf-8');
    const media = JSON.parse(data);

    const reordered = order.map((id, idx) => {
      const slide = media.carousel.find(s => s.id === id);
      if (slide) {
        return { ...slide, order: idx };
      }
      return null;
    }).filter(Boolean);

    media.carousel = reordered;
    await fs.writeFile(mediaPath, JSON.stringify(media, null, 2));
    res.json({ message: 'Carousel reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder carousel' });
  }
});

// Contact form endpoints
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const contactsPath = path.join(DATA_DIR, 'contacts.json');
    const data = await fs.readFile(contactsPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json([]);
    } else {
      res.status(500).json({ error: 'Failed to read contacts' });
    }
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contactsPath = path.join(DATA_DIR, 'contacts.json');
    let contacts = [];
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      contacts = JSON.parse(data);
    } catch (e) {}

    const newContact = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      read: false
    };

    contacts.unshift(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.json({ message: 'Contact form submitted successfully', id: newContact.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const contactsPath = path.join(DATA_DIR, 'contacts.json');
    const data = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);
    contacts = contacts.filter(c => c.id !== parseInt(req.params.id));
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

app.patch('/api/contacts/:id/read', authenticateToken, async (req, res) => {
  try {
    const contactsPath = path.join(DATA_DIR, 'contacts.json');
    const data = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);
    const contact = contacts.find(c => c.id === parseInt(req.params.id));
    if (contact) {
      contact.read = true;
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    }
    res.json({ message: 'Contact marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

function getDefaultSettings() {
  return {
    siteName: 'ISAFE',
    siteDescription: 'Indonesia Security and Forensics Evidence Lab',
    contactEmail: 'info@isafe.co.id',
    contactPhone: '+62 21 1234 5678',
    address: 'PT Hastama Technologies Indonesia\nJakarta, Indonesia',
    socialMedia: {
      linkedin: '',
      twitter: '',
      instagram: ''
    }
  };
}

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ISAFE CMS running on port ${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
