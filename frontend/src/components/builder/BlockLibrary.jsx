import { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';

const BLOCK_CATEGORIES = [
  {
    id: 'all',
    label: 'Tümü',
    icon: '🎯',
    blocks: [],
  },
  {
    id: 'basic',
    label: 'Temel',
    icon: '⚡',
    blocks: [
      { type: 'hero', label: 'Hero Başlık', icon: '🎯', description: 'Büyük başlık + alt başlık', color: '#6366f1' },
      { type: 'text', label: 'Metin', icon: '📝', description: 'Zengin metin bloğu', color: '#8b5cf6' },
      { type: 'image', label: 'Görsel', icon: '🖼️', description: 'Tam genişlik görsel', color: '#ec4899' },
      { type: 'button', label: 'Buton', icon: '🔘', description: 'CTA / aksiyon butonu', color: '#f59e0b' },
      { type: 'divider', label: 'Ayırıcı', icon: '➖', description: 'Bölüm ayırıcı', color: '#64748b' },
    ]
  },
  {
    id: 'social',
    label: 'Sosyal',
    icon: '🔗',
    blocks: [
      { type: 'link_list', label: 'Link Listesi', icon: '📋', description: 'Linktree tarzı butonlar', color: '#10b981' },
      { type: 'social_icons', label: 'Sosyal İkonlar', icon: '💬', description: 'Sosyal medya ikonları', color: '#3b82f6' },
      { type: 'profile', label: 'Profil', icon: '👤', description: 'Profil fotoğrafı + bio', color: '#8b5cf6' },
      { type: 'vcard', label: 'Kartvizit', icon: '💳', description: 'İndirilebilir kişi kartı', color: '#06b6d4' },
    ]
  },
  {
    id: 'media',
    label: 'Medya',
    icon: '🎬',
    blocks: [
      { type: 'video', label: 'Video', icon: '▶️', description: 'YouTube / Vimeo gömme', color: '#ef4444' },
      { type: 'image_gallery', label: 'Galeri', icon: '🖼️', description: 'Fotoğraf galerisi', color: '#ec4899' },
      { type: 'spotify_embed', label: 'Spotify', icon: '🎵', description: 'Müzik oynatıcı', color: '#22c55e' },
    ]
  },
  {
    id: 'business',
    label: 'İş',
    icon: '💼',
    blocks: [
      { type: 'product_card', label: 'Ürün Kartı', icon: '🛍️', description: 'E-ticaret ürün kartı', color: '#f59e0b' },
      { type: 'coupon', label: 'Kupon', icon: '🏷️', description: 'İndirim kuponu', color: '#ef4444' },
      { type: 'countdown', label: 'Geri Sayım', icon: '⏰', description: 'Sayaç / etkinlik tarihi', color: '#6366f1' },
      { type: 'menu', label: 'Menü', icon: '🍽️', description: 'Restoran menüsü', color: '#f97316' },
    ]
  },
  {
    id: 'interact',
    label: 'Etkileşim',
    icon: '💡',
    blocks: [
      { type: 'faq', label: 'SSS', icon: '❓', description: 'Sık sorulan sorular', color: '#8b5cf6' },
      { type: 'contact_form', label: 'İletişim', icon: '📬', description: 'Form alanları', color: '#3b82f6' },
      { type: 'map', label: 'Harita', icon: '📍', description: 'Google Maps gömme', color: '#10b981' },
      { type: 'numbered_list', label: 'Liste', icon: '📊', description: 'Adım adım liste', color: '#06b6d4' },
    ]
  },
  {
    id: 'travel',
    label: 'Seyahat',
    icon: '✈️',
    blocks: [
      { type: 'cover', label: 'Kapak Görseli', icon: '🖼️', description: 'Tam ekran kapak', color: '#8b5cf6' },
      { type: 'timeline', label: 'Zaman Çizelgesi', icon: '🗓️', description: 'Gün gün etkinlikler', color: '#6366f1' },
      { type: 'checklist', label: 'Kontrol Listesi', icon: '✅', description: 'Hazırlık check list', color: '#10b981' }
    ]
  }
];

// All blocks flattened for "all" tab and search
const ALL_BLOCKS = BLOCK_CATEGORIES.filter(c => c.id !== 'all').flatMap(c => c.blocks);

export default function BlockLibrary() {
  const { addBlock } = useBuilderStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedType, setAddedType] = useState(null);

  const handleAdd = (type) => {
    addBlock(type);
    setAddedType(type);
    setTimeout(() => setAddedType(null), 800);
  };

  // Determine which blocks to show
  let displayBlocks;
  if (search) {
    const q = search.toLowerCase();
    displayBlocks = ALL_BLOCKS.filter(
      b => b.label.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );
  } else if (activeCategory === 'all') {
    displayBlocks = ALL_BLOCKS;
  } else {
    const cat = BLOCK_CATEGORIES.find(c => c.id === activeCategory);
    displayBlocks = cat ? cat.blocks : ALL_BLOCKS;
  }

  return (
    <div className="block-library-v2">
      {/* Header */}
      <div className="block-library-v2__header">
        <div className="block-library-v2__title-row">
          <h3>📦 Blok Ekle</h3>
          <span className="block-library-v2__count">{displayBlocks.length} blok</span>
        </div>

        {/* Search */}
        <div className="block-library-v2__search">
          <svg className="block-library-v2__search-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Blok ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="block-library-v2__search-input"
          />
          {search && (
            <button className="block-library-v2__search-clear" onClick={() => setSearch('')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      {!search && (
        <div className="block-library-v2__tabs">
          {BLOCK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`block-library-v2__tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="block-library-v2__tab-icon">{cat.icon}</span>
              <span className="block-library-v2__tab-label">{cat.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Block Grid */}
      <div className="block-library-v2__grid-wrapper">
        {displayBlocks.length === 0 ? (
          <div className="block-library-v2__empty">
            <span className="block-library-v2__empty-icon">🔍</span>
            <p>Sonuç bulunamadı</p>
            <button className="block-library-v2__empty-clear" onClick={() => { setSearch(''); setActiveCategory('all'); }}>
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="block-library-v2__grid">
            {displayBlocks.map(block => (
              <button
                key={block.type}
                className={`block-library-v2__card ${addedType === block.type ? 'block-library-v2__card--added' : ''}`}
                onClick={() => handleAdd(block.type)}
                title={block.description}
              >
                <div className="block-library-v2__card-icon" style={{ '--card-color': block.color }}>
                  <span>{block.icon}</span>
                </div>
                <span className="block-library-v2__card-label">{block.label}</span>
                <span className="block-library-v2__card-desc">{block.description}</span>
                <div className="block-library-v2__card-add">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
