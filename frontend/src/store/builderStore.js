import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// ─── Backend API helpers ─────────────────────────────────────────────────────
// Uses Vite proxy — works on both desktop (localhost:5173) and LAN (192.168.x.x:5173)
const USER_ID = 'guest';

async function api(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': USER_ID,
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
  // Skip sites that already exist on backend (by _id)
  const existingIds = new Set(existingBackendSites.map(s => s._id));
  const toMigrate = legacy.filter(s => s._id && !existingIds.has(s._id));
  const migrated = [];
  for (const site of toMigrate) {
    try {
      const { site: saved } = await api('/sites', {
        method: 'POST',
        body: JSON.stringify({ ...site, userId: USER_ID })
      });
      migrated.push(saved);
    } catch (e) {
      console.warn('Migration failed for site', site._id, e.message);
    }
  }
  localStorage.setItem(MIGRATION_FLAG, '1');
  return migrated;
}

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
        _id: uuidv4(),
        userId: USER_ID,
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
      set({ site, loading: false, selectedBlockId: null });
    } catch (e) {
      set({ error: e.message, loading: false, site: null });
    }
  },

  saveSite: async () => {
    const { site } = get();
    if (!site) return;
    set({ saving: true, error: null });
    try {
      const { site: saved } = await api(`/sites/${site._id}`, {
        method: 'PUT',
        body: JSON.stringify(site)
      });
      set(state => ({
        saving: false,
        site: saved,
        sites: state.sites.map(s => s._id === saved._id ? saved : s)
      }));
    } catch (e) {
      set({ error: e.message, saving: false });
    }
  },

  deleteSite: async (siteId) => {
    try {
      await api(`/sites/${siteId}`, { method: 'DELETE' });
      set(state => ({ sites: state.sites.filter(s => s._id !== siteId) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  duplicateSite: async (siteId) => {
    const original = get().sites.find(s => s._id === siteId);
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
        _id: uuidv4(),
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
    const target = site?._id === siteId ? site : sites.find(s => s._id === siteId);
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
        sites: state.sites.map(s => s._id === siteId ? saved : s),
        site: state.site?._id === siteId ? saved : state.site
      }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  // Local site updates (before save)
  updateSiteLocal: (updates) => {
    set(state => ({
      site: state.site ? { ...state.site, ...updates } : null
    }));
  },

  updateTheme: (themeUpdates) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        theme: { ...state.site.theme, ...themeUpdates }
      } : null
    }));
  },

  updateSettings: (settingsUpdates) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        settings: { ...state.site.settings, ...settingsUpdates }
      } : null
    }));
  },

  // Block operations
  selectBlock: (blockId) => set({ selectedBlockId: blockId }),

  addBlock: (type, data = {}) => {
    const { site } = get();
    if (!site) return;

    const newBlock = {
      id: uuidv4(),
      type,
      order: site.blocks.length,
      visible: true,
      data
    };

    set(state => ({
      site: {
        ...state.site,
        blocks: [...state.site.blocks, newBlock]
      },
      selectedBlockId: newBlock.id
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
      } : null
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
      } : null
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
      selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId
    }));
  },

  toggleBlockVisibility: (blockId) => {
    set(state => ({
      site: state.site ? {
        ...state.site,
        blocks: state.site.blocks.map(b =>
          b.id === blockId ? { ...b, visible: !b.visible } : b
        )
      } : null
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
      site: { ...state.site, blocks }
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
      site: { ...state.site, blocks }
    }));
  },

  getSelectedBlock: () => {
    const { site, selectedBlockId } = get();
    if (!site || !selectedBlockId) return null;
    return site.blocks.find(b => b.id === selectedBlockId) || null;
  }
}));
