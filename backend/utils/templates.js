const { v4: uuidv4 } = require('uuid');

const makeBlock = (type, data, order) => ({
  id: uuidv4(),
  type,
  order,
  visible: true,
  data
});

const templateDefinitions = {
  blank: [],

  linktree: [
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

  digital_card: [
    makeBlock('profile', {
      avatar: '',
      name: 'Ad Soyad',
      title: 'Pozisyon — Şirket',
      bio: 'Profesyonel özet',
      shape: 'circle'
    }, 0),
    makeBlock('vcard', {
      name: 'Ad Soyad',
      phone: '+90 555 123 4567',
      email: 'mail@example.com',
      company: 'Şirket Adı',
      website: 'https://example.com',
      downloadable: true
    }, 1),
    makeBlock('link_list', {
      links: [
        { label: 'Portfolyo', url: '#', icon: '💼', color: '#6366f1' },
        { label: 'LinkedIn', url: '#', icon: '💼', color: '#0077B5' }
      ]
    }, 2),
    makeBlock('map', {
      address: 'İstanbul, Türkiye',
      lat: 41.0082,
      lng: 28.9784,
      zoom: 13,
      height: 200
    }, 3)
  ],

  restaurant: [
    makeBlock('hero', {
      title: 'Restoran Adı',
      subtitle: 'Lezzet dolu bir deneyim',
      accentWord: 'Lezzet',
      accentColor: '#f59e0b',
      bgColor: '#1a1a2e',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),
    makeBlock('image', {
      src: '',
      alt: 'Restoran kapak fotoğrafı',
      borderRadius: '16px',
      aspectRatio: '16/9',
      link: ''
    }, 1),
    makeBlock('menu', {
      categories: [
        {
          name: 'Ana Yemekler',
          items: [
            { name: 'Izgara Köfte', price: '120₺', description: 'El yapımı özel köfte', image: '' },
            { name: 'Kuzu Tandır', price: '180₺', description: 'Fırında 6 saat pişirilen kuzu', image: '' }
          ]
        },
        {
          name: 'İçecekler',
          items: [
            { name: 'Taze Limonata', price: '40₺', description: 'Ev yapımı', image: '' },
            { name: 'Türk Kahvesi', price: '30₺', description: 'Geleneksel', image: '' }
          ]
        }
      ]
    }, 2),
    makeBlock('button', {
      label: 'Rezervasyon Yap',
      url: 'tel:+905551234567',
      style: 'filled',
      color: '#f59e0b',
      textColor: '#ffffff',
      icon: '📞',
      target: '_self'
    }, 3),
    makeBlock('map', {
      address: 'İstanbul, Türkiye',
      lat: 41.0082,
      lng: 28.9784,
      zoom: 15,
      height: 200
    }, 4)
  ],

  event: [
    makeBlock('hero', {
      title: 'Etkinlik Adı',
      subtitle: '15 Mayıs 2025 — İstanbul',
      accentWord: 'Etkinlik',
      accentColor: '#ec4899',
      bgColor: '#0f0f13',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),
    makeBlock('image', {
      src: '',
      alt: 'Etkinlik görseli',
      borderRadius: '16px',
      aspectRatio: '16/9',
      link: ''
    }, 1),
    makeBlock('text', {
      content: '<p>Etkinlik hakkında detaylı bilgiyi buraya yazın. Konuşmacılar, program, mekan bilgileri ve daha fazlası.</p>',
      alignment: 'left',
      fontSize: '16px'
    }, 2),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Etkinliğe Kalan Süre',
      style: 'card',
      showDays: true
    }, 3),
    makeBlock('button', {
      label: 'Kayıt Ol',
      url: '#',
      style: 'filled',
      color: '#ec4899',
      textColor: '#ffffff',
      icon: '🎫',
      target: '_blank'
    }, 4)
  ],

  portfolio: [
    makeBlock('profile', {
      avatar: '',
      name: 'Ad Soyad',
      title: 'UI/UX Designer & Developer',
      bio: 'Dijital deneyimler tasarlıyorum ve kodluyorum.',
      shape: 'circle'
    }, 0),
    makeBlock('image_gallery', {
      images: [
        { src: '', alt: 'Proje 1' },
        { src: '', alt: 'Proje 2' },
        { src: '', alt: 'Proje 3' },
        { src: '', alt: 'Proje 4' }
      ],
      columns: 2,
      gap: '8px',
      borderRadius: '12px'
    }, 1),
    makeBlock('text', {
      content: '<h3>Hakkımda</h3><p>Deneyimlerinizi ve yeteneklerinizi buraya yazın.</p>',
      alignment: 'left',
      fontSize: '16px'
    }, 2),
    makeBlock('link_list', {
      links: [
        { label: 'GitHub', url: '#', icon: '💻', color: '#333' },
        { label: 'Dribbble', url: '#', icon: '🎨', color: '#ea4c89' },
        { label: 'Behance', url: '#', icon: '🅱️', color: '#1769ff' }
      ]
    }, 3)
  ],

  e_commerce: [
    makeBlock('hero', {
      title: 'Yeni Koleksiyon',
      subtitle: 'En trend ürünleri keşfedin',
      accentWord: 'Koleksiyon',
      accentColor: '#6366f1',
      bgColor: '#0f0f13',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),
    makeBlock('product_card', {
      image: '',
      name: 'Ürün Adı',
      price: '299₺',
      originalPrice: '499₺',
      buyUrl: '#',
      currency: '₺'
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
      label: 'Hemen Satın Al',
      url: '#',
      style: 'filled',
      color: '#6366f1',
      textColor: '#ffffff',
      icon: '🛒',
      target: '_blank'
    }, 3)
  ],

  pdf_lead: [
    makeBlock('hero', {
      title: 'Ücretsiz E-Kitap',
      subtitle: 'Dijital pazarlama rehberinizi indirin',
      accentWord: 'Ücretsiz',
      accentColor: '#10b981',
      bgColor: '#0f0f13',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),
    makeBlock('text', {
      content: '<p>Bu e-kitapta neler öğreneceksiniz? Dijital pazarlamanın temellerinden ileri strateji tekniklerine kadar her şeyi kapsayan kapsamlı rehber.</p>',
      alignment: 'center',
      fontSize: '16px'
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
      label: 'Ücretsiz İndir',
      url: '#',
      style: 'filled',
      color: '#10b981',
      textColor: '#ffffff',
      icon: '📥',
      target: '_blank'
    }, 3)
  ],

  coupon_page: [
    makeBlock('hero', {
      title: '%50 İndirim!',
      subtitle: 'Sınırlı süreli özel kampanya',
      accentWord: '%50',
      accentColor: '#ef4444',
      bgColor: '#0f0f13',
      textColor: '#ffffff',
      alignment: 'center'
    }, 0),
    makeBlock('coupon', {
      code: 'SUPER50',
      discount: '%50',
      description: 'Tüm ürünlerde geçerli indirim kuponu',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      copyable: true
    }, 1),
    makeBlock('countdown', {
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      label: 'Kampanya Bitimine Kalan Süre',
      style: 'card',
      showDays: true
    }, 2),
    makeBlock('button', {
      label: 'Alışverişe Başla',
      url: '#',
      style: 'filled',
      color: '#ef4444',
      textColor: '#ffffff',
      icon: '🛍️',
      target: '_blank'
    }, 3)
  ]
};

const getTemplateBlocks = (templateId) => {
  const blocks = templateDefinitions[templateId];
  if (!blocks) return [];
  // Generate fresh UUIDs for each instance
  return blocks.map((block, index) => ({
    ...block,
    id: uuidv4(),
    order: index
  }));
};

module.exports = { getTemplateBlocks, templateDefinitions };
