import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// ─── Backend API helpers ─────────────────────────────────────────────────────
// Uses Vite proxy — works on both desktop (localhost:5173) and LAN (192.168.x.x:5173)

function getAuthToken() {
  return localStorage.getItem('miniweb_token') || '';
}

async function api(path, options = {}) {
  const token = getAuthToken();
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Istek basarisiz' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

function generateSlug(title) {
  const base = title
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return base + '-' + Date.now().toString(36);
}

// ─── One-time migration: localStorage → backend ─────────────────────────────
const LEGACY_KEY = 'miniweb_sites';
const MIGRATION_FLAG = 'miniweb_sites_migrated';

async function migrateLocalStorageToBackend(existingBackendSites) {
  if (localStorage.getItem(MIGRATION_FLAG) === '1') return [];
  let legacy = [];
  try { legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || '[]'); } catch { legacy = []; }
  if (!Array.isArray(legacy) || legacy.length === 0) {
    localStorage.setItem(MIGRATION_FLAG, '1');
    return [];
  }
  // Skip sites that already exist on backend (by id)
  const existingIds = new Set(existingBackendSites.map(s => s.id));
  const toMigrate = legacy.filter(s => s.id && !existingIds.has(s.id));
  const migrated = [];
  for (const site of toMigrate) {
    try {
      const { site: saved } = await api('/sites', {
        method: 'POST',
        body: JSON.stringify(site)
      });
      migrated.push(saved);
    } catch (e) {
      console.warn('Migration failed for site', site.id, e.message);
    }
  }
  localStorage.setItem(MIGRATION_FLAG, '1');
  return migrated;
}

// ─── Default English Values for New Blocks ───────────────────────────────────
const DEFAULT_BLOCK_DATA = {
  hero: {
    title: 'Welcome to My Site', subtitle: 'This is a beautifully designed hero section. Add your subtitle here.',
    accentWord: 'Beautiful', accentColor: '#6366f1', bgColor: '#0f0f13', textColor: '#ffffff', alignment: 'center'
  },
  text: {
    content: 'This is a text block. You can write your own content here. It supports multiple lines and paragraphs.',
    alignment: 'left', fontSize: 'md'
  },
  image: {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    alt: 'Default image placeholder', borderRadius: 12
  },
  button: {
    label: 'Click Here', url: '#', style: 'filled', color: '#6366f1', textColor: '#ffffff'
  },
  link_list: {
    links: [
      { label: 'My Portfolio', url: '#', icon: '💼', color: '#6366f1' },
      { label: 'Latest Project', url: '#', icon: '🚀', color: '#10b981' }
    ]
  },
  social_icons: {
    socials: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'youtube', url: 'https://youtube.com' }
    ]
  },
  numbered_list: {
    items: [
      { number: '01', title: 'First Step', description: 'Describe your first step or point here.' },
      { number: '02', title: 'Second Step', description: 'Describe your second step or point here.' },
      { number: '03', title: 'Third Step', description: 'Describe your third step or point here.' }
    ],
    accentColor: '#6366f1'
  },
  profile: {
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    name: 'John Doe', title: 'Professional Title',
    bio: 'This is a brief biography. Tell your audience who you are and what you do.', shape: 'circle'
  },
  countdown: {
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    label: 'Time Remaining', showDays: true
  },
  coupon: {
    code: 'WELCOME50', discount: '50% OFF', description: 'Valid for all products',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), copyable: true
  },
  product_card: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
    name: 'Premium Headphones', description: 'High-quality wireless headphones with noise cancellation.',
    price: '299', originalPrice: '399', currency: '$', showButton: true, buttonText: 'Buy Now'
  },
  video: {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', aspectRatio: '16/9', autoPlay: false
  },
  map: {
    locationType: 'address', address: 'New York, USA', lat: 40.7128, lng: -74.0060, zoom: 13, height: 300
  },
  image_gallery: {
    images: [
      { src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500', alt: 'Gallery 1' },
      { src: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500', alt: 'Gallery 2' }
    ],
    columns: 2, gap: 8, borderRadius: 12
  },
  faq: {
    items: [
      { question: 'What is your return policy?', answer: 'You can return any item within 30 days of purchase.' },
      { question: 'How long does shipping take?', answer: 'Standard shipping usually takes 3-5 business days.' }
    ]
  },
  menu: {
    title: 'Our Menu', accentColor: '#f59e0b', currency: '$',
    categories: [
      {
        name: 'Starters', icon: '🥗', image: '',
        subcategories: [
          {
            name: 'Salads', icon: '🥬', image: '',
            items: [
              { name: 'Caesar Salad', price: '12', description: 'Fresh lettuce with Caesar dressing.', image: '' }
            ]
          }
        ]
      }
    ]
  },
  vcard: {
    name: 'John Doe', jobTitle: 'Software Engineer', company: 'Tech Corp',
    phone: '+1 234 567 8900', email: 'john@example.com', website: 'https://example.com', downloadable: true
  },
  spotify_embed: {
    spotifyUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT', compact: false
  },
  divider: {
    style: 'line', color: '#e5e7eb', height: 24
  },
  contact_form: {
    title: 'Contact Us', subtitle: 'Send us a message and we will get back to you.',
    buttonText: 'Submit', buttonColor: '#6366f1'
  },
  cover: {
    title: 'Amazing Cover Title', subtitle: 'This is a beautiful cover section.',
    badgeText: 'Featured', bgImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920',
    ctaText: 'Learn More', ctaLink: '#', textColor: '#ffffff', overlayOpacity: 0.5, overlayColor: '#000000', alignment: 'center'
  },
  timeline: {
    title: 'Project Timeline',
    cards: [
      { time: 'Week 1', title: 'Planning Phase', description: 'Define the scope and requirements.', bgColor: '#6366f1', textColor: '#ffffff' },
      { time: 'Week 2', title: 'Execution', description: 'Start the development process.', bgColor: '#10b981', textColor: '#ffffff' }
    ]
  },
  checklist: {
    title: 'Requirements Checklist', checkColor: '#6366f1',
    items: [
      { text: 'Finalize design mockups' },
      { text: 'Set up database schema' },
      { text: 'Configure API endpoints' }
    ]
  }
};

// ─── Template Definitions ────────────────────────────────────────────────────
const makeBlock = (type, data, order) => ({
  id: uuidv4(), type, order, visible: true, data
});

const templateDefinitions = {
  blank: [],

  linktree: () => [
    makeBlock('profile', {
      avatar: '',
      name: 'Adınız',
      title: 'Unvanınız',
      bio: 'Kısa biyografinizi buraya yazın.',
      shape: 'circle'
    }, 0),
    makeBlock('link_list', {
      links: [
        { label: 'Web Sitem', url: 'https://example.com', icon: '🌐', color: '#6366f1' },
        { label: 'Instagram', url: 'https://instagram.com', icon: '📸', color: '#E1306C' },
        { label: 'Twitter', url: 'https://twitter.com', icon: '🐦', color: '#1DA1F2' },
        { label: 'YouTube', url: 'https://youtube.com', icon: '🎬', color: '#FF0000' }
      ]
    }, 1),
    makeBlock('social_icons', {
      socials: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    }, 2)
  ],

  digital_card: () => [
    makeBlock('profile', {
      avatar: '', name: 'Ad Soyad', title: 'Pozisyon — Şirket',
      bio: 'Profesyonel özet', shape: 'circle'
    }, 0),
    makeBlock('vcard', {
      name: 'Ad Soyad', phone: '+90 555 123 4567', email: 'mail@example.com',
      company: 'Şirket Adı', website: 'https://example.com', downloadable: true
    }, 1),
    makeBlock('link_list', {
      links: [
        { label: 'Portfolyo', url: '#', icon: '💼', color: '#6366f1' },
        { label: 'LinkedIn', url: '#', icon: '💼', color: '#0077B5' }
      ]
    }, 2),
    makeBlock('map', {
      address: 'İstanbul, Türkiye', lat: 41.0082, lng: 28.9784, zoom: 13, height: 200
    }, 3)
  ],

  restaurant: () => [
    makeBlock('hero', {
      title: 'Restoran Adı', subtitle: 'Lezzet dolu bir deneyim',
      accentWord: 'Lezzet', accentColor: '#f59e0b',
      bgColor: '#1a1a2e', textColor: '#ffffff', alignment: 'center'
    }, 0),
    makeBlock('image', {
      src: '', alt: 'Restoran kapak fotoğrafı', borderRadius: '16px', aspectRatio: '16/9', link: ''
    }, 1),
    makeBlock('menu', {
      title: 'Menümüz',
      accentColor: '#f59e0b',
      currency: '₺',
      categories: [
        {
          name: 'Kahvaltılıklar', icon: '🍳', image: '',
          subcategories: [
            {
              name: 'Serpme Kahvaltı', icon: '🥐', image: '',
              items: [
                { name: 'Köy Kahvaltısı', price: '250', description: 'Peynir, zeytin, reçel, bal, yumurta', image: '' },
                { name: 'Serpme Kahvaltı (2 Kişilik)', price: '450', description: '20+ çeşit', image: '' }
              ]
            },
            {
              name: 'Omletler', icon: '🍳', image: '',
              items: [
                { name: 'Sade Omlet', price: '80', description: '3 yumurta', image: '' },
                { name: 'Peynirli Omlet', price: '100', description: 'Kaşar peynirli', image: '' },
                { name: 'Sucuklu Omlet', price: '120', description: 'Sucuk ve kaşar', image: '' }
              ]
            }
          ]
        },
        {
          name: 'Ana Yemekler', icon: '🍖', image: '',
          subcategories: [
            {
              name: 'Izgaralar', icon: '🥩', image: '',
              items: [
                { name: 'Izgara Köfte', price: '180', description: 'El yapımı özel köfte', image: '' },
                { name: 'Kuzu Şiş', price: '280', description: 'Marine kuzu eti', image: '' },
                { name: 'Tavuk Şiş', price: '160', description: 'Marine tavuk göğsü', image: '' }
              ]
            },
            {
              name: 'Fırın Yemekleri', icon: '🔥', image: '',
              items: [
                { name: 'Kuzu Tandır', price: '320', description: 'Fırında 6 saat pişirilen', image: '' },
                { name: 'Güveç', price: '220', description: 'Sebzeli et güveci', image: '' }
              ]
            }
          ]
        },
        {
          name: 'İçecekler', icon: '🥤', image: '',
          subcategories: [
            {
              name: 'Soğuk İçecekler', icon: '🧊', image: '',
              items: [
                { name: 'Kola', price: '40', description: '330ml', image: '' },
                { name: 'Fanta', price: '40', description: '330ml', image: '' },
                { name: 'Su', price: '10', description: '500ml', image: '' },
                { name: 'Ayran', price: '25', description: 'Ev yapımı', image: '' },
                { name: 'Taze Limonata', price: '45', description: 'Ev yapımı', image: '' }
              ]
            },
            {
              name: 'Sıcak İçecekler', icon: '☕', image: '',
              items: [
                { name: 'Türk Kahvesi', price: '35', description: 'Geleneksel', image: '' },
                { name: 'Çay', price: '15', description: 'Demleme', image: '' },
                { name: 'Filtre Kahve', price: '45', description: '', image: '' },
                { name: 'Salep', price: '40', description: 'Kış içeceği', image: '' }
              ]
            }
          ]
        },
        {
          name: 'Tatlılar', icon: '🍰', image: '',
          subcategories: [
            {
              name: 'Sıcak Tatlılar', icon: '🍮', image: '',
              items: [
                { name: 'Künefe', price: '120', description: 'Antep fıstıklı', image: '' },
                { name: 'Sıcak Sufle', price: '95', description: 'Çikolatalı', image: '' }
              ]
            },
            {
              name: 'Soğuk Tatlılar', icon: '🍨', image: '',
              items: [
                { name: 'Baklava', price: '110', description: '5 dilim fıstıklı', image: '' },
                { name: 'Dondurma', price: '60', description: '3 top', image: '' }
              ]
            }
          ]
        }
      ]
    }, 2),
    makeBlock('button', {
      label: 'Rezervasyon Yap', url: 'tel:+905551234567', style: 'filled',
      color: '#f59e0b', textColor: '#ffffff', icon: '📞', target: '_self'
    }, 3),
    makeBlock('map', {
      address: 'İstanbul, Türkiye', lat: 41.0082, lng: 28.9784, zoom: 15, height: 200
    }, 4)
  ],

  event: () => [
    makeBlock('hero', {
      title: 'Etkinlik Adı', subtitle: '15 Mayıs 2025 — İstanbul',
      accentWord: 'Etkinlik', accentColor: '#ec4899',
      bgColor: '#0f0f13', textColor: '#ffffff', alignment: 'center'
    }, 0),
    makeBlock('image', {
      src: '', alt: 'Etkinlik görseli', borderRadius: '16px', aspectRatio: '16/9', link: ''
    }, 1),
    makeBlock('text', {
      content: '<p>Etkinlik hakkında detaylı bilgiyi buraya yazın. Konuşmacılar, program, mekan bilgileri ve daha fazlası.</p>',
      alignment: 'left', fontSize: '16px'
    }, 2),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Etkinliğe Kalan Süre', style: 'card', showDays: true
    }, 3),
    makeBlock('button', {
      label: 'Kayıt Ol', url: '#', style: 'filled',
      color: '#ec4899', textColor: '#ffffff', icon: '🎫', target: '_blank'
    }, 4)
  ],

  portfolio: () => [
    makeBlock('profile', {
      avatar: '', name: 'Ad Soyad', title: 'UI/UX Designer & Developer',
      bio: 'Dijital deneyimler tasarlıyorum ve kodluyorum.', shape: 'circle'
    }, 0),
    makeBlock('image_gallery', {
      images: [
        { src: '', alt: 'Proje 1' }, { src: '', alt: 'Proje 2' },
        { src: '', alt: 'Proje 3' }, { src: '', alt: 'Proje 4' }
      ],
      columns: 2, gap: '8px', borderRadius: '12px'
    }, 1),
    makeBlock('text', {
      content: '<h3>Hakkımda</h3><p>Deneyimlerinizi ve yeteneklerinizi buraya yazın.</p>',
      alignment: 'left', fontSize: '16px'
    }, 2),
    makeBlock('link_list', {
      links: [
        { label: 'GitHub', url: '#', icon: '💻', color: '#333' },
        { label: 'Dribbble', url: '#', icon: '🎨', color: '#ea4c89' },
        { label: 'Behance', url: '#', icon: '🅱️', color: '#1769ff' }
      ]
    }, 3)
  ],

  e_commerce: () => [
    makeBlock('hero', {
      title: 'Yeni Koleksiyon', subtitle: 'En trend ürünleri keşfedin',
      accentWord: 'Koleksiyon', accentColor: '#6366f1',
      bgColor: '#0f0f13', textColor: '#ffffff', alignment: 'center'
    }, 0),
    makeBlock('product_card', {
      image: '', name: 'Ürün Adı', price: '299₺',
      originalPrice: '499₺', buyUrl: '#', currency: '₺'
    }, 1),
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'Hızlı Kargo', description: 'Aynı gün kargo imkanı' },
        { number: '02', title: 'Ücretsiz İade', description: '14 gün içinde koşulsuz iade' },
        { number: '03', title: 'Güvenli Ödeme', description: 'SSL ile korunan alışveriş' }
      ],
      accentColor: '#6366f1'
    }, 2),
    makeBlock('button', {
      label: 'Hemen Satın Al', url: '#', style: 'filled',
      color: '#6366f1', textColor: '#ffffff', icon: '🛒', target: '_blank'
    }, 3)
  ],

  pdf_lead: () => [
    makeBlock('hero', {
      title: 'Ücretsiz E-Kitap', subtitle: 'Dijital pazarlama rehberinizi indirin',
      accentWord: 'Ücretsiz', accentColor: '#10b981',
      bgColor: '#0f0f13', textColor: '#ffffff', alignment: 'center'
    }, 0),
    makeBlock('text', {
      content: '<p>Bu e-kitapta neler öğreneceksiniz? Dijital pazarlamanın temellerinden ileri strateji tekniklerine kadar her şeyi kapsayan kapsamlı rehber.</p>',
      alignment: 'center', fontSize: '16px'
    }, 1),
    makeBlock('numbered_list', {
      items: [
        { number: '01', title: 'SEO Temelleri', description: 'Arama motorlarında üst sıralara çıkın' },
        { number: '02', title: 'Sosyal Medya', description: 'Organik büyüme stratejileri' },
        { number: '03', title: 'E-posta Pazarlama', description: 'Dönüşüm oranınızı artırın' }
      ],
      accentColor: '#10b981'
    }, 2),
    makeBlock('button', {
      label: 'Ücretsiz İndir', url: '#', style: 'filled',
      color: '#10b981', textColor: '#ffffff', icon: '📥', target: '_blank'
    }, 3)
  ],

  coupon_page: () => [
    makeBlock('hero', {
      title: '%50 İndirim!', subtitle: 'Sınırlı süreli özel kampanya',
      accentWord: '%50', accentColor: '#ef4444',
      bgColor: '#0f0f13', textColor: '#ffffff', alignment: 'center'
    }, 0),
    makeBlock('coupon', {
      code: 'SUPER50', discount: '%50',
      description: 'Tüm ürünlerde geçerli indirim kuponu',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      copyable: true
    }, 1),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Kampanya Bitimine Kalan Süre', style: 'card', showDays: true
    }, 2),
    makeBlock('button', {
      label: 'Alışverişe Başla', url: '#', style: 'filled',
      color: '#ef4444', textColor: '#ffffff', icon: '🛍️', target: '_blank'
    }, 3)
  ],

  travel_itinerary: () => [
    makeBlock('cover', {
      title: '48 HOURS IN CHICAGO', subtitle: 'Food, Architecture & Lakefront Fun',
      badgeText: 'Weekend Guide',
      bgImage: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Get Itinerary', ctaLink: '#',
      textColor: '#ffffff', overlayOpacity: 0.4, overlayColor: '#000000',
      alignment: 'center', buttonColor: '#f2f2f2', buttonTextColor: '#1a1a1a'
    }, 0),
    makeBlock('timeline', {
      title: 'Day 1',
      cards: [
        { time: '10:00 AM', title: 'Architecture River Tour', description: 'See the city from the water.', bgColor: '#8b5cf6', textColor: '#ffffff' },
        { time: '01:00 PM', title: 'Deep Dish Pizza', description: 'Lou Malnati\'s or Giordano\'s.', bgColor: '#ea580c', textColor: '#ffffff' },
        { time: '04:30 PM', title: '360 Chicago', description: 'Incredible views from the 94th floor.', bgColor: '#f472b6', textColor: '#ffffff' }
      ]
    }, 1),
    makeBlock('image', {
      src: 'https://images.unsplash.com/photo-1542459438-e6dcf3519fbb?w=500&auto=format&fit=crop&q=60',
      alt: 'Chicago Theater Sign', borderRadius: 12, link: ''
    }, 2),
    makeBlock('timeline', {
      title: 'Day 2',
      cards: [
        { time: '09:00 AM', title: 'Lakefront Jog', description: 'Run along Lake Michigan.', bgColor: '#8b5cf6', textColor: '#ffffff' },
        { time: '11:00 AM', title: 'Millennium Park', description: 'Cloud Gate & Crown Fountain.', bgColor: '#0ea5e9', textColor: '#ffffff' },
        { time: '02:00 PM', title: 'Art Institute', description: 'World-class art museum.', bgColor: '#2563eb', textColor: '#ffffff' },
        { time: '07:00 PM', title: 'Rooftop Cocktails', description: 'Drinks with a view.', bgColor: '#f59e0b', textColor: '#ffffff' }
      ]
    }, 3),
    makeBlock('checklist', {
      title: 'Packing Checklist',
      checkColor: '#9ca3af',
      items: [
        { text: 'Comfortable walking shoes' },
        { text: 'Light jacket or layers' },
        { text: 'Portable phone charger' },
        { text: 'Reusable water bottle' }
      ]
    }, 4)
  ],

  simple_download: () => [
    makeBlock('cover', {
      title: 'KONTROL LİSTESİ', subtitle: 'Hemen indirin ve incelemeye başlayın.',
      badgeText: 'Ücretsiz PDF',
      bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      ctaText: 'Get Checklist', ctaLink: 'https://cdn3.me-qr.com/constructor/user/55/1750976312.pdf',
      textColor: '#ffffff', overlayOpacity: 0.7, overlayColor: '#000000',
      alignment: 'center', buttonColor: '#3b82f6', buttonTextColor: '#ffffff', minHeight: '100vh'
    }, 0)
  ],

  podcast_launch: () => [
    makeBlock('cover', {
      title: 'YENİ BÖLÜM YAYINDA',
      subtitle: 'Bölüm 42: Geleceğin Teknolojileri',
      badgeText: 'Podcast',
      bgImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Hemen Dinle', ctaLink: '#',
      textColor: '#ffffff', overlayOpacity: 0.6, overlayColor: '#000000',
      alignment: 'center', buttonColor: '#1db954', buttonTextColor: '#ffffff', minHeight: '60vh'
    }, 0),
    makeBlock('spotify', {
      spotifyUrl: 'https://open.spotify.com/episode/7makk4oTQel546B0PZlVR5',
      compact: false
    }, 1),
    makeBlock('text', {
      content: '<h3>Bu Bölümde Neler Konuştuk?</h3><p>Bu haftaki bölümümüzde yapay zeka, uzay araştırmaları ve geleceğin teknolojilerini derinlemesine inceliyoruz. Sürpriz konuğumuzla kaçırmamanız gereken harika bir sohbet oldu!</p>',
      alignment: 'left', fontSize: '16px'
    }, 2),
    makeBlock('link_list', {
      links: [
        { label: 'Spotify\'da Dinle', url: '#', icon: '🎧', color: '#1DB954' },
        { label: 'Apple Podcasts', url: '#', icon: '🎙️', color: '#872ec4' },
        { label: 'YouTube İzle', url: '#', icon: '📺', color: '#FF0000' }
      ]
    }, 3),
    makeBlock('social_icons', {
      socials: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'youtube', url: 'https://youtube.com' }
      ]
    }, 4)
  ],

  digital_rsvp: () => [
    makeBlock('cover', {
      title: 'Ayşe & Ali', subtitle: 'Evleniyoruz! / 25 Ağustos 2026',
      badgeText: 'Sonsuzluğa İlk Adım',
      bgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'LCV Bildir', ctaLink: '#',
      textColor: '#ffffff', overlayOpacity: 0.5, overlayColor: '#000000',
      alignment: 'center', buttonColor: '#ffffff', buttonTextColor: '#1a1a1a', minHeight: '100vh'
    }, 0),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Büyük Güne Kalan Süre', style: 'card', showDays: true
    }, 1),
    makeBlock('text', {
      content: '<p style="text-align: center;">Hayatımızı birleştireceğimiz bu en mutlu günümüzde siz değerli dostlarımızı da aramızda görmekten onur duyarız.</p>',
      alignment: 'center', fontSize: '18px'
    }, 2),
    makeBlock('timeline', {
      title: 'Etkinlik Akışı',
      cards: [
        { time: '19:00', title: 'Karşılama ve Kokteyl', description: 'Hoşgeldiniz içecekleri eşliğinde', bgColor: '#f472b6', textColor: '#ffffff' },
        { time: '20:00', title: 'Nikah Töreni', description: 'Evet dediğimiz an', bgColor: '#ec4899', textColor: '#ffffff' },
        { time: '20:30', title: 'İlk Dans', description: 'Gecenin en romantik anı', bgColor: '#db2777', textColor: '#ffffff' },
        { time: '21:00', title: 'Akşam Yemeği ve Eğlence', description: 'Sabaha kadar dans', bgColor: '#be185d', textColor: '#ffffff' }
      ]
    }, 3),
    makeBlock('map', {
      address: 'Kır Bahçesi, İstanbul', lat: 41.0082, lng: 28.9784, zoom: 15, height: 250
    }, 4),
    makeBlock('button', {
      label: 'Katılım Durumunu Bildir (LCV)', url: 'https://wa.me/?text=Düğüne+katılıyorum', style: 'filled',
      color: '#db2777', textColor: '#ffffff', icon: '💌', target: '_blank'
    }, 5)
  ],

  real_estate: () => [
    makeBlock('cover', {
      title: 'Bodrum Yalıkavak\'ta Lüks Villa', subtitle: 'Panoramik Deniz Manzaralı, Özel Havuzlu',
      badgeText: 'Satılık • 25.000.000 ₺',
      bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
      ctaText: 'İncele', ctaLink: '#',
      textColor: '#ffffff', overlayOpacity: 0.4, overlayColor: '#000000',
      alignment: 'center', buttonColor: '#f59e0b', buttonTextColor: '#ffffff', minHeight: '80vh'
    }, 0),
    makeBlock('image_gallery', {
      images: [
        { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', alt: 'Salon' },
        { src: 'https://images.unsplash.com/photo-1600566753086-00f18efc2294?q=80&w=2070&auto=format&fit=crop', alt: 'Mutfak' },
        { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop', alt: 'Banyo' },
        { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', alt: 'Dış Cephe' }
      ],
      columns: 2, gap: '12px', borderRadius: '12px'
    }, 1),
    makeBlock('checklist', {
      title: 'Öne Çıkan Özellikler',
      checkColor: '#f59e0b',
      items: [
        { text: '4+2, 350m² Net Kullanım Alanı' },
        { text: 'Yerden Isıtma ve Akıllı Ev Sistemi' },
        { text: '2 Araçlık Kapalı Otopark' },
        { text: '7/24 Güvenlikli Site İçi' }
      ]
    }, 2),
    makeBlock('map', {
      address: 'Yalıkavak, Bodrum, Muğla', lat: 37.1044, lng: 27.2913, zoom: 14, height: 250
    }, 3),
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop', 
      name: 'Burak Yılmaz', title: 'Lüks Konut Uzmanı',
      bio: 'Bu özel mülkü yerinde görmek ve detaylı bilgi almak için bana ulaşabilirsiniz.', shape: 'circle'
    }, 4),
    makeBlock('button', {
      label: 'WhatsApp\'tan Bilgi Al', url: 'https://wa.me/905551234567', style: 'filled',
      color: '#25D366', textColor: '#ffffff', icon: '💬', target: '_blank'
    }, 5)
  ],

  course_registration: () => [
    makeBlock('hero', {
      title: '6 Haftada Kendi Web Uygulamanızı Geliştirin', subtitle: 'Sıfırdan İleri Seviyeye, Gerçek Projelerle Web Geliştirme',
      accentWord: 'Geliştirin', accentColor: '#8b5cf6',
      bgColor: '#1e1b4b', textColor: '#ffffff', alignment: 'center'
    }, 0),
    makeBlock('video', {
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      autoplay: false, controls: true
    }, 1),
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop', 
      name: 'Ayşe Yılmaz', title: 'Kıdemli Yazılım Eğitmeni',
      bio: 'Sektörde 10+ yıl deneyim. Bugüne kadar 50.000\'den fazla öğrenciye sıfırdan kodlamayı öğrettim.', shape: 'circle'
    }, 2),
    makeBlock('checklist', {
      title: 'Bu Eğitimde Neler Öğreneceksiniz?',
      checkColor: '#8b5cf6',
      items: [
        { text: 'Modern JavaScript (ES6+) ve React Temelleri' },
        { text: 'Responsive (Mobil Uyumlu) Tasarım Geliştirme' },
        { text: 'Gerçek Zamanlı Veritabanı ve API Entegrasyonu' },
        { text: 'Projeleri Canlıya Alma (Deployment) Stratejileri' }
      ]
    }, 3),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Erken Kayıt İndiriminin Bitmesine Kalan Süre', style: 'card', showDays: true
    }, 4),
    makeBlock('button', {
      label: 'Hemen Kaydol - %50 İndirimli', url: '#', style: 'filled',
      color: '#8b5cf6', textColor: '#ffffff', icon: '🚀', target: '_blank'
    }, 5)
  ],

  faq_support: () => [
    makeBlock('hero', {
      title: 'Size Nasıl Yardımcı Olabiliriz?', subtitle: 'Sıkça sorulan soruların cevaplarını aşağıda bulabilir veya destek ekibimizle iletişime geçebilirsiniz.',
      accentWord: 'Yardımcı', accentColor: '#3b82f6',
      bgColor: '#f8fafc', textColor: '#0f172a', alignment: 'center'
    }, 0),
    makeBlock('faq', {
      title: 'Sıkça Sorulan Sorular',
      accentColor: '#3b82f6',
      faqs: [
        { question: 'Siparişim kaç günde kargoya verilir?', answer: 'Siparişleriniz onaylandıktan sonra en geç 24 saat içerisinde (iş günlerinde) kargoya teslim edilmektedir.' },
        { question: 'İade ve değişim şartlarınız nelerdir?', answer: 'Kullanılmamış ve ambalajı bozulmamış ürünleri teslim aldığınız tarihten itibaren 14 gün içerisinde koşulsuz iade edebilirsiniz.' },
        { question: 'Hangi kargo şirketleri ile çalışıyorsunuz?', answer: 'Yurtiçi Kargo ve Aras Kargo ile anlaşmamız bulunmaktadır. Sipariş ekranında kargo şirketinizi seçebilirsiniz.' },
        { question: 'Taksit seçeneği var mı?', answer: 'Evet, tüm kredi kartlarına vade farksız 3 taksit, dilerseniz 12 aya varan taksit seçeneklerimiz mevcuttur.' }
      ]
    }, 1),
    makeBlock('text', {
      content: '<p style="text-align: center;"><strong>Çalışma Saatlerimiz:</strong><br>Hafta içi: 09:00 - 18:00<br>Müşteri temsilcilerimiz mesai saatleri içinde mesajlarınıza en geç 2 saat içerisinde dönüş yapmaktadır.</p>',
      alignment: 'center', fontSize: '15px'
    }, 2),
    makeBlock('link_list', {
      links: [
        { label: 'WhatsApp Canlı Destek', url: 'https://wa.me/905551234567', icon: '💬', color: '#25D366' },
        { label: 'Bize E-Posta Gönderin', url: 'mailto:destek@firma.com', icon: '📧', color: '#3b82f6' },
        { label: 'Kargomu Takip Et', url: '#', icon: '📦', color: '#64748b' }
      ]
    }, 3),
    makeBlock('social_icons', {
      socials: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'facebook', url: 'https://facebook.com' }
      ]
    }, 4)
  ],

  personal_trainer: () => [
    makeBlock('cover', {
      title: 'DAHA GÜÇLÜ BİR SEN', subtitle: 'Kişiye özel antrenman ve beslenme programlarıyla hedeflerine ulaş.',
      badgeText: 'ONLINE KOÇLUK',
      bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      ctaText: 'Değişime Başla', ctaLink: '#paketler',
      textColor: '#ffffff', overlayOpacity: 0.7, overlayColor: '#000000',
      alignment: 'center', buttonColor: '#ef4444', buttonTextColor: '#ffffff', minHeight: '80vh'
    }, 0),
    makeBlock('profile', {
      avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop', 
      name: 'Caner Şahin', title: 'Milli Sporcu & Fitness Koçu',
      bio: 'Sertifikalı Personal Trainer. Vücut geliştirme ve fonksiyonel antrenman uzmanı. Bugüne kadar 500+ öğrencinin değişimine rehberlik ettim.', shape: 'circle'
    }, 1),
    makeBlock('video', {
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      autoplay: false, controls: true
    }, 2),
    makeBlock('text', {
      content: '<h2 style="text-align: center; margin: 0; padding-top: 10px;">Hizmet Paketleri</h2>',
      alignment: 'center', fontSize: '16px'
    }, 3),
    makeBlock('product_card', {
      name: '1 Aylık Online Koçluk',
      description: 'Kişiye özel antrenman planı, kalori takibi ve haftalık form kontrolü.',
      price: '1.500', currency: '₺', originalPrice: '2.000',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop',
      buttonText: 'Hemen Başla', buttonColor: '#ef4444', priceColor: '#ef4444',
      buyUrl: 'https://wa.me/905551234567'
    }, 4),
    makeBlock('product_card', {
      name: '10 Derslik Stüdyo Paketi',
      description: 'Birebir özel stüdyo dersi. Postür analizi, esneklik ve ağırlık idmanları.',
      price: '8.000', currency: '₺',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
      buttonText: 'Randevu Al', buttonColor: '#ef4444', priceColor: '#ef4444',
      buyUrl: 'https://wa.me/905551234567'
    }, 5),
    makeBlock('button', {
      label: 'WhatsApp\'tan Bilgi Al', url: 'https://wa.me/905551234567', style: 'filled',
      color: '#25D366', textColor: '#ffffff', icon: '💬', target: '_blank'
    }, 6)
  ]
};

function getTemplateBlocks(templateId) {
  const factory = templateDefinitions[templateId];
  if (!factory) return [];
  if (typeof factory === 'function') return factory();
  return [];
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const useBuilderStore = create((set, get) => ({
  site: null,
  sites: [],
  selectedBlockId: null,
  loading: false,
  saving: false,
  error: null,
  hasUnsavedChanges: false,
  lastSavedState: null,

  // Sites CRUD (backend-backed)
  fetchSites: async () => {
    set({ loading: true, error: null });
    try {
      const { sites } = await api('/sites');
      // One-time migration from localStorage (only runs once)
      const migrated = await migrateLocalStorageToBackend(sites);
      const all = [...sites, ...migrated].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      set({ sites: all, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false, sites: [] });
    }
  },

  createSite: async (title, templateId = 'blank') => {
    set({ loading: true, error: null });
    try {
      const blocks = getTemplateBlocks(templateId);
      const payload = {
        title: title || 'Yeni Site',
        slug: generateSlug(title || 'site'),
        templateId,
        theme: {
          primaryColor: '#6366f1',
          backgroundColor: '#ffffff',
          textColor: '#1a1a1a',
          fontFamily: 'Inter',
          backgroundType: 'solid'
        },
        blocks,
        settings: {
          metaTitle: '', metaDescription: '',
          isPublished: false, passwordProtected: false, password: '',
          analytics: { views: 0, uniqueViews: 0 }
        },
        qrCode: { generated: false }
      };
      const { site } = await api('/sites', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      set(state => ({ sites: [site, ...state.sites], loading: false }));
      return site;
    } catch (e) {
      set({ error: e.message, loading: false });
      return null;
    }
  },

  fetchSite: async (siteId) => {
    set({ loading: true, error: null });
    try {
      const { site } = await api(`/sites/${siteId}`);
      set({ 
        site, 
        loading: false, 
        selectedBlockId: null,
        hasUnsavedChanges: false,
        lastSavedState: JSON.stringify(site)
      });
    } catch (e) {
      set({ error: e.message, loading: false, site: null });
    }
  },

  saveSite: async () => {
    const { site } = get();
    if (!site) return;
    set({ saving: true, error: null });
    try {
      const { site: saved } = await api(`/sites/${site.id}`, {
        method: 'PUT',
        body: JSON.stringify(site)
      });
      set(state => ({
        saving: false,
        site: saved,
        sites: state.sites.map(s => s.id === saved.id ? saved : s),
        hasUnsavedChanges: false,
        lastSavedState: JSON.stringify(saved)
      }));
    } catch (e) {
      set({ error: e.message, saving: false });
    }
  },

  deleteSite: async (siteId) => {
    try {
      await api(`/sites/${siteId}`, { method: 'DELETE' });
      set(state => ({ sites: state.sites.filter(s => String(s.id) !== String(siteId)) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  duplicateSite: async (siteId) => {
    const original = get().sites.find(s => String(s.id) === String(siteId));
    if (!original) {
      try {
        const { site } = await api(`/sites/${siteId}`);
        if (!site) return null;
        return duplicateImpl(site);
      } catch { return null; }
    }
    return duplicateImpl(original);

    async function duplicateImpl(src) {
      const duplicate = {
        ...JSON.parse(JSON.stringify(src)),
        title: src.title + ' (Kopya)',
        slug: generateSlug(src.title + '-kopya'),
        settings: {
          ...src.settings,
          isPublished: false,
          analytics: { views: 0, uniqueViews: 0 }
        }
      };
      try {
        const { site } = await api('/sites', {
          method: 'POST',
          body: JSON.stringify(duplicate)
        });
        set(state => ({ sites: [site, ...state.sites] }));
        return site;
      } catch (e) {
        set({ error: e.message });
        return null;
      }
    }
  },

  togglePublish: async (siteId) => {
    const { site, sites } = get();
    const target = String(site?.id) === String(siteId) ? site : sites.find(s => String(s.id) === String(siteId));
    if (!target) return;
    const newSettings = {
      ...target.settings,
      isPublished: !target.settings?.isPublished
    };
    const updatedSite = { ...target, settings: newSettings };
    try {
      const { site: saved } = await api(`/sites/${siteId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedSite)
      });
      set(state => ({
        sites: state.sites.map(s => String(s.id) === String(siteId) ? saved : s),
        site: String(state.site?.id) === String(siteId) ? saved : state.site
      }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  // Local site updates (before save)
  updateSiteLocal: (updates) => {
    set(state => ({
      site: state.site ? { ...state.site, ...updates } : null,
      hasUnsavedChanges: true
    }));
  },

  updateTheme: (themeUpdates) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        theme: { ...state.site.theme, ...themeUpdates }
      } : null,
      hasUnsavedChanges: true
    }));
  },

  updateSettings: (settingsUpdates) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        settings: { ...state.site.settings, ...settingsUpdates }
      } : null,
      hasUnsavedChanges: true
    }));
  },

  // Block operations
  selectBlock: (blockId) => set({ selectedBlockId: blockId }),

  addBlock: (type, data = {}) => {
    const { site } = get();
    if (!site) return;

    // Merge provided data with defaults if provided data is empty
    const blockData = Object.keys(data).length > 0 ? data : (DEFAULT_BLOCK_DATA[type] || {});

    const newBlock = {
      id: uuidv4(),
      type,
      order: site.blocks.length,
      visible: true,
      data: JSON.parse(JSON.stringify(blockData)) // deep copy to avoid mutations
    };

    set(state => ({
      site: {
        ...state.site,
        blocks: [...state.site.blocks, newBlock]
      },
      selectedBlockId: newBlock.id,
      hasUnsavedChanges: true
    }));

    return newBlock.id;
  },

  updateBlock: (blockId, dataUpdates) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        blocks: state.site.blocks.map(b =>
          b.id === blockId ? { ...b, data: { ...b.data, ...dataUpdates } } : b
        )
      } : null,
      hasUnsavedChanges: true
    }));
  },

  // Update block-level props (marginTop, marginBottom, paddingTop, paddingBottom)
  updateBlockProps: (blockId, propUpdates) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        blocks: state.site.blocks.map(b =>
          b.id === blockId ? { ...b, ...propUpdates } : b
        )
      } : null,
      hasUnsavedChanges: true
    }));
  },

  removeBlock: (blockId) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        blocks: state.site.blocks
          .filter(b => b.id !== blockId)
          .map((b, i) => ({ ...b, order: i }))
      } : null,
      selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
      hasUnsavedChanges: true
    }));
  },

  toggleBlockVisibility: (blockId) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        blocks: state.site.blocks.map(b =>
          b.id === blockId ? { ...b, visible: !b.visible } : b
        )
      } : null,
      hasUnsavedChanges: true
    }));
  },

  moveBlock: (blockId, direction) => {
    const { site } = get();
    if (!site) return;

    const blocks = [...site.blocks];
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
    blocks.forEach((b, i) => { b.order = i; });

    set(state => ({
      site: { ...state.site, blocks },
      hasUnsavedChanges: true
    }));
  },

  reorderBlocks: (activeId, overId) => {
    const { site } = get();
    if (!site) return;

    const blocks = [...site.blocks];
    const oldIndex = blocks.findIndex(b => b.id === activeId);
    const newIndex = blocks.findIndex(b => b.id === overId);
    if (oldIndex === -1 || newIndex === -1) return;

    const [removed] = blocks.splice(oldIndex, 1);
    blocks.splice(newIndex, 0, removed);
    blocks.forEach((b, i) => { b.order = i; });

    set(state => ({
      site: { ...state.site, blocks },
      hasUnsavedChanges: true
    }));
  },

  getSelectedBlock: () => {
    const { site, selectedBlockId } = get();
    if (!site || !selectedBlockId) return null;
    return site.blocks.find(b => b.id === selectedBlockId) || null;
  }
}));
