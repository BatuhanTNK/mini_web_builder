import { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import ImageUploader from '../shared/ImageUploader';
import BackgroundUploader from '../shared/BackgroundUploader';

// ─── Collapsible Section ──────────────────────────────────────────────────────
function Section({ icon, title, defaultOpen = true, children, badge }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`pp-section ${open ? 'pp-section--open' : ''}`}>
      <button className="pp-section__header" onClick={() => setOpen(!open)}>
        <div className="pp-section__header-left">
          <span className="pp-section__icon">{icon}</span>
          <span className="pp-section__title">{title}</span>
          {badge && <span className="pp-section__badge">{badge}</span>}
        </div>
        <svg className={`pp-section__chevron ${open ? 'pp-section__chevron--open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="pp-section__body">{children}</div>}
    </div>
  );
}

// ─── Page Settings Panel ──────────────────────────────────────────────────────
function PageSettingsPanel() {
  const { site, updateTheme, updateSettings } = useBuilderStore();
  if (!site) return null;
  const { theme = {}, settings = {} } = site;

  const FONTS = [
    { value: 'Inter', label: 'Inter', style: 'Modern' },
    { value: 'Outfit', label: 'Outfit', style: 'Clean' },
    { value: 'Roboto', label: 'Roboto', style: 'Klasik' },
    { value: 'Poppins', label: 'Poppins', style: 'Yuvarlak' },
    { value: 'Montserrat', label: 'Montserrat', style: 'Güçlü' },
    { value: 'Playfair Display', label: 'Playfair', style: 'Zarif' },
  ];

  return (
    <div className="pp-settings-content">
      <Section icon="🎨" title="Renk Paleti" defaultOpen={true}>
        <div className="pp-color-grid">
          <div className="pp-color-card">
            <label className="pp-color-card__label">Arka Plan</label>
            <div className="pp-color-card__picker">
              <input type="color" value={theme.backgroundColor || '#ffffff'}
                onChange={e => updateTheme({ backgroundColor: e.target.value })} />
              <input className="pp-color-card__hex" value={theme.backgroundColor || '#ffffff'}
                onChange={e => updateTheme({ backgroundColor: e.target.value })} maxLength={7} />
            </div>
          </div>
        </div>
      </Section>

      <Section icon="🔤" title="Yazı Tipi" defaultOpen={true}>
        <div className="pp-font-grid">
          {FONTS.map(f => (
            <button
              key={f.value}
              className={`pp-font-card ${theme.fontFamily === f.value || (!theme.fontFamily && f.value === 'Inter') ? 'pp-font-card--active' : ''}`}
              onClick={() => updateTheme({ fontFamily: f.value })}
              style={{ fontFamily: f.value }}
            >
              <span className="pp-font-card__name">{f.label}</span>
              <span className="pp-font-card__style">{f.style}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section icon="🌐" title="SEO & Meta" defaultOpen={false}>
        <Field label="Meta Başlık">
          <input className="pp-input" type="text"
            value={settings.metaTitle || ''}
            onChange={e => updateSettings({ metaTitle: e.target.value })}
            placeholder="Sayfa başlığı..." />
        </Field>
        <Field label="Meta Açıklaması">
          <textarea className="pp-textarea"
            value={settings.metaDescription || ''}
            onChange={e => updateSettings({ metaDescription: e.target.value })}
            placeholder="Sayfa açıklaması..." rows={3} />
        </Field>
      </Section>

      <Section icon="🚀" title="Yayınlama" defaultOpen={false}>
        <div className="pp-publish-row">
          <div className="pp-publish-info">
            <span className="pp-publish-status">
              {settings.isPublished ? '🟢 Yayında' : '🔴 Taslak'}
            </span>
            <span className="pp-publish-desc">
              {settings.isPublished ? 'Siteniz herkes tarafından görülebilir' : 'Siteniz henüz yayınlanmadı'}
            </span>
          </div>
          <ToggleRow value={!!settings.isPublished} onChange={() => useBuilderStore.getState().togglePublish(site.id)} />
        </div>
      </Section>
    </div>
  );
}

// ─── Block-specific Forms ─────────────────────────────────────────────────────
function HeroForm({ block, updateBlock }) {
  const d = block.data;
  
  // Default values for Hero block content
  const defaults = {
    title: 'Welcome to My Site',
    subtitle: 'This is a beautifully designed hero section. Add your subtitle here.',
    accentWord: 'Beautiful',
    accentColor: '#6366f1',
    textColor: '#ffffff',
    alignment: 'center'
  };
  
  return (
    <>
      <Field 
        label="Başlık"
        onReset={() => updateBlock(block.id, { title: defaults.title })}
      >
        <input 
          className="property-panel__input" 
          value={d.title || ''} 
          onChange={e => updateBlock(block.id, { title: e.target.value })} 
          placeholder="Ana başlık..." 
        />
      </Field>
      
      <Field 
        label="Alt Başlık"
        onReset={() => updateBlock(block.id, { subtitle: defaults.subtitle })}
      >
        <input 
          className="property-panel__input" 
          value={d.subtitle || ''} 
          onChange={e => updateBlock(block.id, { subtitle: e.target.value })} 
          placeholder="Alt başlık..." 
        />
      </Field>
      
      <Field 
        label="Vurgulanan Kelime"
        onReset={() => updateBlock(block.id, { accentWord: defaults.accentWord })}
      >
        <input 
          className="property-panel__input" 
          value={d.accentWord || ''} 
          onChange={e => updateBlock(block.id, { accentWord: e.target.value })} 
          placeholder="Vurgulanacak kelime..." 
        />
      </Field>
      
      <Field 
        label="Vurgu Rengi"
        onReset={() => updateBlock(block.id, { accentColor: defaults.accentColor })}
      >
        <ColorRow 
          value={d.accentColor || '#6366f1'} 
          onChange={v => updateBlock(block.id, { accentColor: v })} 
        />
      </Field>
      
      <Field 
        label="Metin Rengi"
        onReset={() => updateBlock(block.id, { textColor: defaults.textColor })}
      >
        <ColorRow 
          value={d.textColor || '#ffffff'} 
          onChange={v => updateBlock(block.id, { textColor: v })} 
        />
      </Field>
      
      <Field 
        label="Hizalama"
        onReset={() => updateBlock(block.id, { alignment: defaults.alignment })}
      >
        <AlignRow 
          value={d.alignment || 'center'} 
          onChange={v => updateBlock(block.id, { alignment: v })} 
        />
      </Field>
    </>
  );
}

function HeroBackgroundForm({ block, updateBlock }) {
  const d = block.data;
  
  // Default values for background
  const defaults = {
    bgColor: '#0f0f13',
    bgImage: '',
    bgImageOriginal: '',
    bgImageZoom: 1,
    bgImageOffsetY: 0,
    bgGradient: false,
    gradientColor1: '#6366f1',
    gradientColor2: '#8b5cf6',
    gradientAngle: 135,
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    bgBlur: 0
  };

  // Determine current background type
  const bgType = d.bgGradient ? 'gradient' : (d.bgImage !== undefined && !d.bgGradient) ? 'image' : 'solid';
  
  // Reset all background settings
  const resetAll = () => {
    updateBlock(block.id, defaults);
  };
  
  return (
    <>
      {/* Reset All Button */}
      <div className="pp-reset-all">
        <button 
          className="pp-reset-all__btn"
          onClick={resetAll}
          title="Tüm arka plan ayarlarını varsayılan değerlere döndür"
        >
          <span className="pp-reset-all__icon">↺</span>
          <span className="pp-reset-all__text">Tümünü Sıfırla</span>
        </button>
      </div>

      <Field 
        label="Arka Plan Tipi"
        onReset={() => updateBlock(block.id, { bgImage: undefined, bgGradient: false, bgImageOriginal: '', bgImageZoom: 1, bgImageOffsetY: 0 })}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`pp-align-btn ${bgType === 'solid' ? 'pp-align-btn--active' : ''}`}
            onClick={() => updateBlock(block.id, { bgImage: undefined, bgGradient: false })}
            style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
          >
            🎨 Düz Renk
          </button>
          <button
            className={`pp-align-btn ${bgType === 'gradient' ? 'pp-align-btn--active' : ''}`}
            onClick={() => updateBlock(block.id, { bgImage: undefined, bgGradient: true })}
            style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
          >
            🌈 Gradient
          </button>
          <button
            className={`pp-align-btn ${bgType === 'image' ? 'pp-align-btn--active' : ''}`}
            onClick={() => updateBlock(block.id, { bgGradient: false, bgImage: '' })}
            style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
          >
            🖼️ Resim
          </button>
        </div>
      </Field>

      {/* Solid Color */}
      {bgType === 'solid' && (
        <Field 
          label="Arka Plan Rengi"
          onReset={() => updateBlock(block.id, { bgColor: defaults.bgColor })}
        >
          <ColorRow 
            value={d.bgColor || '#0f0f13'} 
            onChange={v => updateBlock(block.id, { bgColor: v })} 
          />
        </Field>
      )}

      {/* Gradient */}
      {bgType === 'gradient' && (
        <>
          <Field 
            label="Gradient Renk 1"
            onReset={() => updateBlock(block.id, { gradientColor1: defaults.gradientColor1 })}
          >
            <ColorRow 
              value={d.gradientColor1 || '#6366f1'} 
              onChange={v => updateBlock(block.id, { gradientColor1: v })} 
            />
          </Field>
          <Field 
            label="Gradient Renk 2"
            onReset={() => updateBlock(block.id, { gradientColor2: defaults.gradientColor2 })}
          >
            <ColorRow 
              value={d.gradientColor2 || '#8b5cf6'} 
              onChange={v => updateBlock(block.id, { gradientColor2: v })} 
            />
          </Field>
          <Field 
            label={
              <>
                Gradient Açısı
                <span className="pp-field__value-badge">{d.gradientAngle || 135}°</span>
              </>
            }
            onReset={() => updateBlock(block.id, { gradientAngle: defaults.gradientAngle })}
          >
            <input 
              className="property-panel__input" 
              type="range" 
              min="0" 
              max="360" 
              value={d.gradientAngle || 135} 
              onChange={e => updateBlock(block.id, { gradientAngle: Number(e.target.value) })} 
            />
          </Field>
          
          <Field 
            label="Overlay Rengi"
            onReset={() => updateBlock(block.id, { overlayColor: defaults.overlayColor })}
          >
            <ColorRow 
              value={d.overlayColor || '#000000'} 
              onChange={v => updateBlock(block.id, { overlayColor: v })} 
            />
          </Field>
          
          <Field 
            label={
              <>
                Overlay Saydamlığı
                <span className="pp-field__value-badge">{((d.overlayOpacity ?? 0.5) * 100).toFixed(0)}%</span>
              </>
            }
            onReset={() => updateBlock(block.id, { overlayOpacity: defaults.overlayOpacity })}
          >
            <input 
              className="property-panel__input" 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={d.overlayOpacity ?? 0.5} 
              onChange={e => updateBlock(block.id, { overlayOpacity: Number(e.target.value) })} 
            />
          </Field>
        </>
      )}

      {/* Background Image */}
      {bgType === 'image' && (
        <>
          <Field 
            label="Arka Plan Resmi"
            onReset={() => updateBlock(block.id, { bgImage: '', bgImageOriginal: '', bgImageZoom: 1, bgImageOffsetY: 0 })}
          >
            <BackgroundUploader 
              value={d.bgImage || ''} 
              onChange={(data) => {
                if (typeof data === 'string') {
                  updateBlock(block.id, { bgImage: data });
                } else {
                  updateBlock(block.id, data);
                }
              }}
              cropData={{
                bgImageOriginal: d.bgImageOriginal,
                bgImageZoom: d.bgImageZoom,
                bgImageOffsetY: d.bgImageOffsetY
              }}
              label="Arka Plan" 
            />
          </Field>
          
          {/* Show controls only if image is uploaded */}
          {d.bgImage && d.bgImage.length > 0 && (
            <>
              <Field 
                label={
                  <>
                    Bulanıklık
                    <span className="pp-field__value-badge">{d.bgBlur ?? 0}px</span>
                  </>
                }
                onReset={() => updateBlock(block.id, { bgBlur: defaults.bgBlur })}
              >
                <input 
                  className="property-panel__input" 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={d.bgBlur ?? 0} 
                  onChange={e => updateBlock(block.id, { bgBlur: Number(e.target.value) })} 
                />
              </Field>
              
              <Field 
                label="Overlay Rengi"
                onReset={() => updateBlock(block.id, { overlayColor: defaults.overlayColor })}
              >
                <ColorRow 
                  value={d.overlayColor || '#000000'} 
                  onChange={v => updateBlock(block.id, { overlayColor: v })} 
                />
              </Field>
              
              <Field 
                label={
                  <>
                    Overlay Saydamlığı
                    <span className="pp-field__value-badge">{((d.overlayOpacity ?? 0.5) * 100).toFixed(0)}%</span>
                  </>
                }
                onReset={() => updateBlock(block.id, { overlayOpacity: defaults.overlayOpacity })}
              >
                <input 
                  className="property-panel__input" 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={d.overlayOpacity ?? 0.5} 
                  onChange={e => updateBlock(block.id, { overlayOpacity: Number(e.target.value) })} 
                />
              </Field>
            </>
          )}
        </>
      )}
    </>
  );
}

function TextForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="İçerik">
        <textarea className="property-panel__textarea" rows={6} value={d.content || ''} onChange={e => updateBlock(block.id, { content: e.target.value })} placeholder="Metin içeriği..." />
      </Field>
      <Field label="Hizalama">
        <AlignRow value={d.alignment || 'left'} onChange={v => updateBlock(block.id, { alignment: v })} />
      </Field>
      <Field label="Yazı Boyutu">
        <select className="property-panel__select" value={d.fontSize || 'md'} onChange={e => updateBlock(block.id, { fontSize: e.target.value })}>
          <option value="sm">Küçük</option>
          <option value="md">Orta</option>
          <option value="lg">Büyük</option>
          <option value="xl">Çok Büyük</option>
        </select>
      </Field>
    </>
  );
}

function ImageForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Gorsel">
        <ImageUploader value={d.src || ''} onChange={v => updateBlock(block.id, { src: v })} label="Gorsel" />
      </Field>
      <Field label="Alt Metin">
        <input className="property-panel__input" value={d.alt || ''} onChange={e => updateBlock(block.id, { alt: e.target.value })} placeholder="Görsel açıklaması..." />
      </Field>
      <Field label="Link URL">
        <input className="property-panel__input" value={d.link || ''} onChange={e => updateBlock(block.id, { link: e.target.value })} placeholder="https://..." />
      </Field>
      <Field label="Köşe Yuvarlama">
        <input className="property-panel__input" type="number" min={0} max={48} value={d.borderRadius ?? 0} onChange={e => updateBlock(block.id, { borderRadius: Number(e.target.value) })} />
      </Field>
    </>
  );
}

function ButtonForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Buton Metni">
        <input className="property-panel__input" value={d.label || ''} onChange={e => updateBlock(block.id, { label: e.target.value })} placeholder="Tıkla..." />
      </Field>
      <Field label="URL">
        <input className="property-panel__input" value={d.url || ''} onChange={e => updateBlock(block.id, { url: e.target.value })} placeholder="https://..." />
      </Field>
      <Field label="Stil">
        <select className="property-panel__select" value={d.style || 'filled'} onChange={e => updateBlock(block.id, { style: e.target.value })}>
          <option value="filled">Dolu</option>
          <option value="outline">Çerçeveli</option>
          <option value="ghost">Şeffaf</option>
        </select>
      </Field>
      <Field label="Renk">
        <ColorRow value={d.color || '#6366f1'} onChange={v => updateBlock(block.id, { color: v })} />
      </Field>
      <Field label="Yeni Sekmede Aç">
        <ToggleRow value={d.target === '_blank'} onChange={v => updateBlock(block.id, { target: v ? '_blank' : '_self' })} />
      </Field>
    </>
  );
}

function ProfileForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Profil Fotografı">
        <ImageUploader value={d.avatar || ''} onChange={v => updateBlock(block.id, { avatar: v })} label="Profil" />
      </Field>
      <Field label="İsim">
        <input className="property-panel__input" value={d.name || ''} onChange={e => updateBlock(block.id, { name: e.target.value })} placeholder="Adınız Soyadınız" />
      </Field>
      <Field label="Unvan">
        <input className="property-panel__input" value={d.title || ''} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="Pozisyon" />
      </Field>
      <Field label="Bio">
        <textarea className="property-panel__textarea" rows={3} value={d.bio || ''} onChange={e => updateBlock(block.id, { bio: e.target.value })} placeholder="Kısa bio..." />
      </Field>
      <Field label="Şekil">
        <select className="property-panel__select" value={d.shape || 'circle'} onChange={e => updateBlock(block.id, { shape: e.target.value })}>
          <option value="circle">Daire</option>
          <option value="square">Kare</option>
        </select>
      </Field>
    </>
  );
}

function CountdownForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Hedef Tarih">
        <input className="property-panel__input" type="datetime-local" value={d.targetDate || ''} onChange={e => updateBlock(block.id, { targetDate: e.target.value })} />
      </Field>
      <Field label="Etiket">
        <input className="property-panel__input" value={d.label || ''} onChange={e => updateBlock(block.id, { label: e.target.value })} placeholder="Etkinliğe kalan süre" />
      </Field>
      <Field label="Günleri Göster">
        <ToggleRow value={d.showDays !== false} onChange={v => updateBlock(block.id, { showDays: v })} />
      </Field>
    </>
  );
}

function CouponForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Kupon Kodu">
        <input className="property-panel__input" value={d.code || ''} onChange={e => updateBlock(block.id, { code: e.target.value })} placeholder="INDIRIM20" />
      </Field>
      <Field label="İndirim">
        <input className="property-panel__input" value={d.discount || ''} onChange={e => updateBlock(block.id, { discount: e.target.value })} placeholder="%20 İndirim" />
      </Field>
      <Field label="Açıklama">
        <input className="property-panel__input" value={d.description || ''} onChange={e => updateBlock(block.id, { description: e.target.value })} placeholder="Tüm ürünlerde geçerli" />
      </Field>
      <Field label="Son Kullanım Tarihi">
        <input className="property-panel__input" type="date" value={d.expiryDate || ''} onChange={e => updateBlock(block.id, { expiryDate: e.target.value })} />
      </Field>
      <Field label="Kopyalanabilir">
        <ToggleRow value={d.copyable !== false} onChange={v => updateBlock(block.id, { copyable: v })} />
      </Field>
    </>
  );
}

function VideoForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Video URL">
        <input className="property-panel__input" value={d.videoUrl || ''} onChange={e => updateBlock(block.id, { videoUrl: e.target.value })} placeholder="YouTube veya Vimeo linki..." />
      </Field>
      <Field label="En-Boy Oranı">
        <select className="property-panel__select" value={d.aspectRatio || '16/9'} onChange={e => updateBlock(block.id, { aspectRatio: e.target.value })}>
          <option value="16/9">16:9 (Yatay)</option>
          <option value="9/16">9:16 (Dikey)</option>
          <option value="1/1">1:1 (Kare)</option>
        </select>
      </Field>
      <Field label="Otomatik Oynat">
        <ToggleRow value={!!d.autoPlay} onChange={v => updateBlock(block.id, { autoPlay: v })} />
      </Field>
    </>
  );
}

function GalleryForm({ block, updateBlock }) {
  const d = block.data;
  const images = d.images || [];

  const addImage = (url) => {
    updateBlock(block.id, { images: [...images, { src: url, alt: '' }] });
  };

  const removeImage = (index) => {
    updateBlock(block.id, { images: images.filter((_, i) => i !== index) });
  };

  const updateImageAlt = (index, alt) => {
    const newImages = images.map((img, i) => i === index ? { ...img, alt } : img);
    updateBlock(block.id, { images: newImages });
  };

  return (
    <>
      <Field label="Kolon Sayisi">
        <select className="property-panel__select" value={d.columns || 2} onChange={e => updateBlock(block.id, { columns: Number(e.target.value) })}>
          <option value={1}>1 Kolon</option>
          <option value={2}>2 Kolon</option>
          <option value={3}>3 Kolon</option>
        </select>
      </Field>
      <Field label="Bosluk (px)">
        <input className="property-panel__input" type="number" min={0} max={32} value={d.gap ?? 8} onChange={e => updateBlock(block.id, { gap: Number(e.target.value) })} />
      </Field>
      <Field label="Kose Yuvarlama">
        <input className="property-panel__input" type="number" min={0} max={48} value={d.borderRadius ?? 12} onChange={e => updateBlock(block.id, { borderRadius: Number(e.target.value) })} />
      </Field>

      <div className="property-panel__list-header">
        <span>Gorseller ({images.length})</span>
      </div>

      {images.map((img, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{img.alt || `Gorsel ${i + 1}`}</span>
            <button className="property-panel__remove-btn" onClick={() => removeImage(i)}>X</button>
          </div>
          {img.src && (
            <img src={img.src} alt={img.alt} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
          )}
          <Field label="Alt Metin">
            <input className="property-panel__input" value={img.alt || ''} onChange={e => updateImageAlt(i, e.target.value)} placeholder="Gorsel aciklamasi..." />
          </Field>
        </div>
      ))}

      <Field label="Yeni Gorsel Ekle">
        <ImageUploader value="" onChange={url => { if (url) addImage(url); }} label="Galeri" />
      </Field>
    </>
  );
}

function ProductCardForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Urun Gorseli">
        <ImageUploader value={d.image || ''} onChange={v => updateBlock(block.id, { image: v })} label="Urun" />
      </Field>
      <Field label="Ürün Adı">
        <input className="property-panel__input" value={d.name || ''} onChange={e => updateBlock(block.id, { name: e.target.value })} placeholder="Ürün adı..." />
      </Field>
      <Field label="Açıklama">
        <textarea className="property-panel__textarea" value={d.description || ''} onChange={e => updateBlock(block.id, { description: e.target.value })} placeholder="Ürün açıklaması..." rows={2} />
      </Field>
      <Field label="Fiyat">
        <input className="property-panel__input" value={d.price || ''} onChange={e => updateBlock(block.id, { price: e.target.value })} placeholder="299" />
      </Field>
      <Field label="Orijinal Fiyat">
        <input className="property-panel__input" value={d.originalPrice || ''} onChange={e => updateBlock(block.id, { originalPrice: e.target.value })} placeholder="499" />
      </Field>
      <Field label="Para Birimi">
        <select className="property-panel__select" value={d.currency || '₺'} onChange={e => updateBlock(block.id, { currency: e.target.value })}>
          <option value="₺">₺ (TL)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (EUR)</option>
          <option value="£">£ (GBP)</option>
        </select>
      </Field>
      <Field label="Fiyat Rengi">
        <ColorRow value={d.priceColor || '#6366f1'} onChange={v => updateBlock(block.id, { priceColor: v })} />
      </Field>

      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Buton Ayarları</h4>

      <Field label="Butonu Göster">
        <label className="property-panel__toggle">
          <input type="checkbox" checked={d.showButton !== false} onChange={e => updateBlock(block.id, { showButton: e.target.checked })} />
          <span>{d.showButton !== false ? 'Açık' : 'Kapalı'}</span>
        </label>
      </Field>
      {d.showButton !== false && (
        <>
          <Field label="Buton Metni">
            <input className="property-panel__input" value={d.buttonText || 'Satin Al'} onChange={e => updateBlock(block.id, { buttonText: e.target.value })} placeholder="Satin Al" />
          </Field>
          <Field label="Buton URL">
            <input className="property-panel__input" value={d.buyUrl || ''} onChange={e => updateBlock(block.id, { buyUrl: e.target.value })} placeholder="https://..." />
          </Field>
          <Field label="Buton Rengi">
            <ColorRow value={d.buttonColor || '#6366f1'} onChange={v => updateBlock(block.id, { buttonColor: v })} />
          </Field>
          <Field label="Buton Yazı Rengi">
            <ColorRow value={d.buttonTextColor || '#ffffff'} onChange={v => updateBlock(block.id, { buttonTextColor: v })} />
          </Field>
        </>
      )}
    </>
  );
}

function MapForm({ block, updateBlock }) {
  const d = block.data || {};
  return (
    <>
      <Field label="Konum Belirleme Yöntemi">
        <select className="pp-select" value={d.locationType || 'address'} onChange={e => updateBlock(block.id, { locationType: e.target.value })}>
          <option value="address">Adres ile (Arama)</option>
          <option value="coordinates">Koordinat ile (Tam Nokta)</option>
        </select>
      </Field>

      {d.locationType !== 'coordinates' ? (
        <Field label="Adres">
          <input className="pp-input" value={d.address || ''} onChange={e => updateBlock(block.id, { address: e.target.value })} placeholder="Örn: Kadıköy, İstanbul" />
        </Field>
      ) : (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Field label="Enlem (Latitude)">
            <input className="pp-input" type="number" step="any" value={d.lat || ''} onChange={e => updateBlock(block.id, { lat: e.target.value })} placeholder="41.0082" />
          </Field>
          <Field label="Boylam (Longitude)">
            <input className="pp-input" type="number" step="any" value={d.lng || ''} onChange={e => updateBlock(block.id, { lng: e.target.value })} placeholder="28.9784" />
          </Field>
        </div>
      )}

      <Field label={`Zoom Seviyesi: ${d.zoom || 14}`}>
        <input className="pp-range" type="range" min={1} max={20} value={d.zoom || 14} onChange={e => updateBlock(block.id, { zoom: Number(e.target.value) })} />
      </Field>
      <Field label="Yükseklik (px)">
        <input className="pp-input" type="number" min={150} max={600} value={d.height || 300} onChange={e => updateBlock(block.id, { height: Number(e.target.value) })} />
      </Field>
    </>
  );
}

function DividerForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Stil">
        <select className="property-panel__select" value={d.style || 'line'} onChange={e => updateBlock(block.id, { style: e.target.value })}>
          <option value="line">Çizgi</option>
          <option value="dots">Noktalar</option>
          <option value="wave">Dalga</option>
          <option value="space">Boşluk</option>
        </select>
      </Field>
      <Field label="Renk">
        <ColorRow value={d.color || '#e5e7eb'} onChange={v => updateBlock(block.id, { color: v })} />
      </Field>
      <Field label="Yükseklik (px)">
        <input className="property-panel__input" type="number" min={1} max={100} value={d.height || 24} onChange={e => updateBlock(block.id, { height: Number(e.target.value) })} />
      </Field>
    </>
  );
}

function SpotifyForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Spotify URL">
        <input className="property-panel__input" value={d.spotifyUrl || ''} onChange={e => updateBlock(block.id, { spotifyUrl: e.target.value })} placeholder="https://open.spotify.com/track/..." />
      </Field>
      <Field label="Kompakt Mod">
        <ToggleRow value={!!d.compact} onChange={v => updateBlock(block.id, { compact: v })} />
      </Field>
    </>
  );
}

function VCardForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Ad Soyad"><input className="property-panel__input" value={d.name || ''} onChange={e => updateBlock(block.id, { name: e.target.value })} placeholder="Ad Soyad" /></Field>
      <Field label="Pozisyon"><input className="property-panel__input" value={d.jobTitle || ''} onChange={e => updateBlock(block.id, { jobTitle: e.target.value })} placeholder="Pozisyon" /></Field>
      <Field label="Şirket"><input className="property-panel__input" value={d.company || ''} onChange={e => updateBlock(block.id, { company: e.target.value })} placeholder="Şirket Adı" /></Field>
      <Field label="Telefon"><input className="property-panel__input" value={d.phone || ''} onChange={e => updateBlock(block.id, { phone: e.target.value })} placeholder="+90 555 000 00 00" /></Field>
      <Field label="E-posta"><input className="property-panel__input" value={d.email || ''} onChange={e => updateBlock(block.id, { email: e.target.value })} placeholder="ornek@email.com" /></Field>
      <Field label="Website"><input className="property-panel__input" value={d.website || ''} onChange={e => updateBlock(block.id, { website: e.target.value })} placeholder="https://..." /></Field>
      <Field label="İndirilebilir"><ToggleRow value={d.downloadable !== false} onChange={v => updateBlock(block.id, { downloadable: v })} /></Field>
    </>
  );
}

function LinkListForm({ block, updateBlock }) {
  const d = block.data;
  const links = d.links || [];

  const updateLink = (index, field, value) => {
    const newLinks = links.map((l, i) => i === index ? { ...l, [field]: value } : l);
    updateBlock(block.id, { links: newLinks });
  };

  const addLink = () => {
    updateBlock(block.id, { links: [...links, { label: 'Yeni Link', url: '', icon: '', color: '#6366f1' }] });
  };

  const removeLink = (index) => {
    updateBlock(block.id, { links: links.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div className="property-panel__list-header">
        <span>Linkler ({links.length})</span>
        <button className="property-panel__add-btn" onClick={addLink}>+ Ekle</button>
      </div>
      {links.map((link, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>Link {i + 1}</span>
            <button className="property-panel__remove-btn" onClick={() => removeLink(i)}>✕</button>
          </div>
          <Field label="Metin"><input className="property-panel__input" value={link.label || ''} onChange={e => updateLink(i, 'label', e.target.value)} placeholder="Link metni..." /></Field>
          <Field label="URL"><input className="property-panel__input" value={link.url || ''} onChange={e => updateLink(i, 'url', e.target.value)} placeholder="https://..." /></Field>
          <Field label="Renk"><ColorRow value={link.color || '#6366f1'} onChange={v => updateLink(i, 'color', v)} /></Field>
        </div>
      ))}
    </>
  );
}

function SocialIconsForm({ block, updateBlock }) {
  const d = block.data;
  const socials = d.socials || [];

  const PLATFORMS = ['instagram', 'twitter', 'facebook', 'youtube', 'linkedin', 'tiktok', 'github', 'whatsapp', 'telegram', 'pinterest', 'snapchat', 'spotify'];

  const updateSocial = (index, field, value) => {
    const newSocials = socials.map((s, i) => i === index ? { ...s, [field]: value } : s);
    updateBlock(block.id, { socials: newSocials });
  };

  const addSocial = () => {
    updateBlock(block.id, { socials: [...socials, { platform: 'instagram', url: '' }] });
  };

  const removeSocial = (index) => {
    updateBlock(block.id, { socials: socials.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div className="property-panel__list-header">
        <span>Sosyal Hesaplar ({socials.length})</span>
        <button className="property-panel__add-btn" onClick={addSocial}>+ Ekle</button>
      </div>
      {socials.map((social, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{social.platform}</span>
            <button className="property-panel__remove-btn" onClick={() => removeSocial(i)}>✕</button>
          </div>
          <Field label="Platform">
            <select className="property-panel__select" value={social.platform || 'instagram'} onChange={e => updateSocial(i, 'platform', e.target.value)}>
              {PLATFORMS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </Field>
          <Field label="URL"><input className="property-panel__input" value={social.url || ''} onChange={e => updateSocial(i, 'url', e.target.value)} placeholder="https://..." /></Field>
        </div>
      ))}
    </>
  );
}

function NumberedListForm({ block, updateBlock }) {
  const d = block.data;
  const items = d.items || [];

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) => i === index ? { ...item, [field]: value } : item);
    updateBlock(block.id, { items: newItems });
  };

  const addItem = () => {
    updateBlock(block.id, { items: [...items, { number: String(items.length + 1).padStart(2, '0'), title: '', description: '' }] });
  };

  const removeItem = (index) => {
    updateBlock(block.id, { items: items.filter((_, i) => i !== index) });
  };

  return (
    <>
      <Field label="Vurgu Rengi"><ColorRow value={d.accentColor || '#6366f1'} onChange={v => updateBlock(block.id, { accentColor: v })} /></Field>
      <div className="property-panel__list-header">
        <span>Maddeler ({items.length})</span>
        <button className="property-panel__add-btn" onClick={addItem}>+ Ekle</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{item.number || String(i + 1).padStart(2, '0')}</span>
            <button className="property-panel__remove-btn" onClick={() => removeItem(i)}>✕</button>
          </div>
          <Field label="Başlık"><input className="property-panel__input" value={item.title || ''} onChange={e => updateItem(i, 'title', e.target.value)} placeholder="Madde başlığı..." /></Field>
          <Field label="Açıklama"><textarea className="property-panel__textarea" rows={2} value={item.description || ''} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Açıklama..." /></Field>
        </div>
      ))}
    </>
  );
}

function FAQForm({ block, updateBlock }) {
  const d = block.data;
  const items = d.items || [];

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) => i === index ? { ...item, [field]: value } : item);
    updateBlock(block.id, { items: newItems });
  };

  const addItem = () => {
    updateBlock(block.id, { items: [...items, { question: '', answer: '' }] });
  };

  const removeItem = (index) => {
    updateBlock(block.id, { items: items.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div className="property-panel__list-header">
        <span>Sorular ({items.length})</span>
        <button className="property-panel__add-btn" onClick={addItem}>+ Ekle</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>Soru {i + 1}</span>
            <button className="property-panel__remove-btn" onClick={() => removeItem(i)}>✕</button>
          </div>
          <Field label="Soru"><input className="property-panel__input" value={item.question || ''} onChange={e => updateItem(i, 'question', e.target.value)} placeholder="Soru..." /></Field>
          <Field label="Cevap"><textarea className="property-panel__textarea" rows={3} value={item.answer || ''} onChange={e => updateItem(i, 'answer', e.target.value)} placeholder="Cevap..." /></Field>
        </div>
      ))}
    </>
  );
}

function MenuForm({ block, updateBlock }) {
  const d = block.data;
  const categories = d.categories || [];

  // ── Helpers
  const setCategories = (newCats) => updateBlock(block.id, { categories: newCats });

  const addCategory = () => setCategories([...categories, {
    name: 'Yeni Kategori', icon: '🍽️', image: '', subcategories: []
  }]);
  const removeCategory = (ci) => setCategories(categories.filter((_, i) => i !== ci));
  const moveCategory = (ci, dir) => {
    const target = ci + dir;
    if (target < 0 || target >= categories.length) return;
    const next = [...categories];
    [next[ci], next[target]] = [next[target], next[ci]];
    setCategories(next);
  };
  const updateCategory = (ci, field, value) => {
    setCategories(categories.map((c, i) => i === ci ? { ...c, [field]: value } : c));
  };

  const addSubcategory = (ci) => {
    const cat = categories[ci];
    const subs = [...(cat.subcategories || []), { name: 'Yeni Alt Kategori', icon: '🍴', image: '', items: [] }];
    updateCategory(ci, 'subcategories', subs);
  };
  const removeSubcategory = (ci, si) => {
    const subs = categories[ci].subcategories.filter((_, i) => i !== si);
    updateCategory(ci, 'subcategories', subs);
  };
  const moveSubcategory = (ci, si, dir) => {
    const subs = [...(categories[ci].subcategories || [])];
    const target = si + dir;
    if (target < 0 || target >= subs.length) return;
    [subs[si], subs[target]] = [subs[target], subs[si]];
    updateCategory(ci, 'subcategories', subs);
  };
  const updateSubcategory = (ci, si, field, value) => {
    const subs = categories[ci].subcategories.map((s, i) => i === si ? { ...s, [field]: value } : s);
    updateCategory(ci, 'subcategories', subs);
  };

  const addItem = (ci, si) => {
    const items = [...(categories[ci].subcategories[si].items || []), { name: '', price: '', description: '', image: '' }];
    updateSubcategory(ci, si, 'items', items);
  };
  const removeItem = (ci, si, ii) => {
    const items = categories[ci].subcategories[si].items.filter((_, i) => i !== ii);
    updateSubcategory(ci, si, 'items', items);
  };
  const moveItem = (ci, si, ii, dir) => {
    const items = [...(categories[ci].subcategories[si].items || [])];
    const target = ii + dir;
    if (target < 0 || target >= items.length) return;
    [items[ii], items[target]] = [items[target], items[ii]];
    updateSubcategory(ci, si, 'items', items);
  };
  const updateItem = (ci, si, ii, field, value) => {
    const items = categories[ci].subcategories[si].items.map((it, i) => i === ii ? { ...it, [field]: value } : it);
    updateSubcategory(ci, si, 'items', items);
  };

  return (
    <>
      <Field label="Menü Başlığı">
        <input className="property-panel__input" value={d.title || ''}
          onChange={e => updateBlock(block.id, { title: e.target.value })}
          placeholder="Menümüz" />
      </Field>
      <Field label="Vurgu Rengi">
        <ColorRow value={d.accentColor || '#f59e0b'} onChange={v => updateBlock(block.id, { accentColor: v })} />
      </Field>
      <Field label="Para Birimi">
        <select className="property-panel__select" value={d.currency || '₺'}
          onChange={e => updateBlock(block.id, { currency: e.target.value })}>
          <option value="₺">₺ (TL)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (EUR)</option>
          <option value="£">£ (GBP)</option>
        </select>
      </Field>

      <div className="property-panel__divider" />
      <div className="property-panel__list-header">
        <span>📂 Kategoriler ({categories.length})</span>
        <button className="property-panel__add-btn" onClick={addCategory}>+ Kategori</button>
      </div>

      {categories.map((cat, ci) => (
        <details key={ci} className="menu-editor__category">
          <summary className="menu-editor__summary">
            <span>{cat.icon || '📁'} {cat.name || 'Kategori'}</span>
            <span className="menu-editor__count">{(cat.subcategories || []).length} alt kat.</span>
          </summary>
          <div className="menu-editor__body">
            <div className="menu-editor__toolbar">
              <button className="menu-editor__btn" onClick={() => moveCategory(ci, -1)} title="Yukarı">↑</button>
              <button className="menu-editor__btn" onClick={() => moveCategory(ci, 1)} title="Aşağı">↓</button>
              <button className="menu-editor__btn menu-editor__btn--danger" onClick={() => removeCategory(ci)} title="Sil">🗑</button>
            </div>
            <Field label="Kategori Adı">
              <input className="property-panel__input" value={cat.name || ''}
                onChange={e => updateCategory(ci, 'name', e.target.value)} placeholder="Örn. İçecekler" />
            </Field>
            <Field label="Ikon (Emoji)">
              <input className="property-panel__input" value={cat.icon || ''}
                onChange={e => updateCategory(ci, 'icon', e.target.value)} placeholder="🥤" maxLength={4} />
            </Field>
            <Field label="Kategori Görseli">
              <ImageUploader value={cat.image || ''} onChange={v => updateCategory(ci, 'image', v)} label="Kategori" />
            </Field>

            <div className="property-panel__list-header" style={{ marginTop: 10 }}>
              <span>📋 Alt Kategoriler ({(cat.subcategories || []).length})</span>
              <button className="property-panel__add-btn" onClick={() => addSubcategory(ci)}>+ Alt Kat.</button>
            </div>

            {(cat.subcategories || []).map((sub, si) => (
              <details key={si} className="menu-editor__subcategory">
                <summary className="menu-editor__summary">
                  <span>{sub.icon || '📄'} {sub.name || 'Alt Kategori'}</span>
                  <span className="menu-editor__count">{(sub.items || []).length} ürün</span>
                </summary>
                <div className="menu-editor__body">
                  <div className="menu-editor__toolbar">
                    <button className="menu-editor__btn" onClick={() => moveSubcategory(ci, si, -1)}>↑</button>
                    <button className="menu-editor__btn" onClick={() => moveSubcategory(ci, si, 1)}>↓</button>
                    <button className="menu-editor__btn menu-editor__btn--danger" onClick={() => removeSubcategory(ci, si)}>🗑</button>
                  </div>
                  <Field label="Alt Kategori Adı">
                    <input className="property-panel__input" value={sub.name || ''}
                      onChange={e => updateSubcategory(ci, si, 'name', e.target.value)}
                      placeholder="Örn. Soğuk İçecekler" />
                  </Field>
                  <Field label="Ikon (Emoji)">
                    <input className="property-panel__input" value={sub.icon || ''}
                      onChange={e => updateSubcategory(ci, si, 'icon', e.target.value)}
                      placeholder="🧊" maxLength={4} />
                  </Field>
                  <Field label="Alt Kategori Görseli">
                    <ImageUploader value={sub.image || ''} onChange={v => updateSubcategory(ci, si, 'image', v)} label="Alt Kategori" />
                  </Field>

                  <div className="property-panel__list-header" style={{ marginTop: 10 }}>
                    <span>🍴 Ürünler ({(sub.items || []).length})</span>
                    <button className="property-panel__add-btn" onClick={() => addItem(ci, si)}>+ Ürün</button>
                  </div>

                  {(sub.items || []).map((item, ii) => (
                    <div key={ii} className="menu-editor__item">
                      <div className="menu-editor__item-header">
                        <strong>{item.name || `Ürün ${ii + 1}`}</strong>
                        <div className="menu-editor__toolbar">
                          <button className="menu-editor__btn" onClick={() => moveItem(ci, si, ii, -1)}>↑</button>
                          <button className="menu-editor__btn" onClick={() => moveItem(ci, si, ii, 1)}>↓</button>
                          <button className="menu-editor__btn menu-editor__btn--danger" onClick={() => removeItem(ci, si, ii)}>🗑</button>
                        </div>
                      </div>
                      <Field label="Ürün Adı">
                        <input className="property-panel__input" value={item.name || ''}
                          onChange={e => updateItem(ci, si, ii, 'name', e.target.value)}
                          placeholder="Örn. Kola" />
                      </Field>
                      <Field label="Fiyat">
                        <input className="property-panel__input" value={item.price || ''}
                          onChange={e => updateItem(ci, si, ii, 'price', e.target.value)}
                          placeholder="40" />
                      </Field>
                      <Field label="Açıklama">
                        <input className="property-panel__input" value={item.description || ''}
                          onChange={e => updateItem(ci, si, ii, 'description', e.target.value)}
                          placeholder="Örn. 330ml" />
                      </Field>
                      <Field label="Ürün Görseli">
                        <ImageUploader value={item.image || ''} onChange={v => updateItem(ci, si, ii, 'image', v)} label="Ürün" />
                      </Field>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </details>
      ))}
    </>
  );
}

function ContactFormForm({ block, updateBlock }) {
  const d = block.data;
  const fields = d.fields || [];

  const FIELD_TYPES = ['text', 'email', 'tel', 'textarea', 'select'];

  const addField = () => {
    updateBlock(block.id, { fields: [...fields, { label: 'Yeni Alan', type: 'text', required: false }] });
  };

  const removeField = (index) => {
    updateBlock(block.id, { fields: fields.filter((_, i) => i !== index) });
  };

  const updateField = (index, key, value) => {
    const newFields = fields.map((f, i) => i === index ? { ...f, [key]: value } : f);
    updateBlock(block.id, { fields: newFields });
  };

  return (
    <>
      <Field label="Gönder Butonu Metni"><input className="property-panel__input" value={d.submitLabel || ''} onChange={e => updateBlock(block.id, { submitLabel: e.target.value })} placeholder="Gönder" /></Field>
      <Field label="Alıcı E-posta"><input className="property-panel__input" value={d.recipientEmail || ''} onChange={e => updateBlock(block.id, { recipientEmail: e.target.value })} placeholder="ornek@email.com" /></Field>
      <div className="property-panel__list-header">
        <span>Form Alanları ({fields.length})</span>
        <button className="property-panel__add-btn" onClick={addField}>+ Alan</button>
      </div>
      {fields.map((field, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{field.label || `Alan ${i + 1}`}</span>
            <button className="property-panel__remove-btn" onClick={() => removeField(i)}>✕</button>
          </div>
          <Field label="Etiket"><input className="property-panel__input" value={field.label || ''} onChange={e => updateField(i, 'label', e.target.value)} placeholder="Alan adı..." /></Field>
          <Field label="Tip">
            <select className="property-panel__select" value={field.type || 'text'} onChange={e => updateField(i, 'type', e.target.value)}>
              {FIELD_TYPES.map(t => <option key={t} value={t}>{t === 'text' ? 'Metin' : t === 'email' ? 'E-posta' : t === 'tel' ? 'Telefon' : t === 'textarea' ? 'Uzun Metin' : 'Seçenek'}</option>)}
            </select>
          </Field>
          <Field label="Zorunlu"><ToggleRow value={!!field.required} onChange={v => updateField(i, 'required', v)} /></Field>
        </div>
      ))}
    </>
  );
}

function CoverForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Başlık"><input className="property-panel__input" value={d.title || ''} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="48 HOURS IN CHICAGO" /></Field>
      <Field label="Alt Başlık"><input className="property-panel__input" value={d.subtitle || ''} onChange={e => updateBlock(block.id, { subtitle: e.target.value })} placeholder="Food & Architecture" /></Field>
      <Field label="Rozet/Etiket"><input className="property-panel__input" value={d.badgeText || ''} onChange={e => updateBlock(block.id, { badgeText: e.target.value })} placeholder="Weekend Guide" /></Field>
      <Field label="Arka Plan Görseli"><ImageUploader value={d.bgImage || ''} onChange={v => updateBlock(block.id, { bgImage: v })} label="Kapak" /></Field>
      <Field label="Buton Metni"><input className="property-panel__input" value={d.ctaText || ''} onChange={e => updateBlock(block.id, { ctaText: e.target.value })} placeholder="Get Itinerary" /></Field>
      <Field label="Buton URL"><input className="property-panel__input" value={d.ctaLink || ''} onChange={e => updateBlock(block.id, { ctaLink: e.target.value })} placeholder="#" /></Field>
      <Field label="Yazı Rengi"><ColorRow value={d.textColor || '#ffffff'} onChange={v => updateBlock(block.id, { textColor: v })} /></Field>
      <Field label="Buton Arka Plan Rengi"><ColorRow value={d.buttonColor || '#f2f2f2'} onChange={v => updateBlock(block.id, { buttonColor: v })} /></Field>
      <Field label="Buton Yazı Rengi"><ColorRow value={d.buttonTextColor || '#1a1a1a'} onChange={v => updateBlock(block.id, { buttonTextColor: v })} /></Field>
      <Field label="Örtü (Overlay) Rengi"><ColorRow value={d.overlayColor || '#000000'} onChange={v => updateBlock(block.id, { overlayColor: v })} /></Field>
      <Field label="Örtü Saydamlığı (0-1)"><input className="property-panel__input" type="number" step="0.1" min="0" max="1" value={d.overlayOpacity || 0} onChange={e => updateBlock(block.id, { overlayOpacity: parseFloat(e.target.value) })} /></Field>
      <Field label="Hizalama"><AlignRow value={d.alignment || 'center'} onChange={v => updateBlock(block.id, { alignment: v })} /></Field>
    </>
  );
}

function TimelineForm({ block, updateBlock }) {
  const d = block.data;
  const cards = d.cards || [];

  const updateCard = (index, field, value) => {
    const newCards = cards.map((c, i) => i === index ? { ...c, [field]: value } : c);
    updateBlock(block.id, { cards: newCards });
  };

  const addCard = () => {
    updateBlock(block.id, { cards: [...cards, { time: '10:00 AM', title: 'Yeni Etkinlik', bgColor: '#6366f1', textColor: '#ffffff' }] });
  };

  const removeCard = (index) => {
    updateBlock(block.id, { cards: cards.filter((_, i) => i !== index) });
  };

  return (
    <>
      <Field label="Bölüm Başlığı"><input className="property-panel__input" value={d.title || ''} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="Day 1" /></Field>
      <div className="property-panel__list-header">
        <span>Kartlar ({cards.length})</span>
        <button className="property-panel__add-btn" onClick={addCard}>+ Ekle</button>
      </div>
      {cards.map((c, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{c.time || `Kart ${i + 1}`}</span>
            <button className="property-panel__remove-btn" onClick={() => removeCard(i)}>✕</button>
          </div>
          <Field label="Zaman"><input className="property-panel__input" value={c.time || ''} onChange={e => updateCard(i, 'time', e.target.value)} placeholder="09:00 AM" /></Field>
          <Field label="Başlık"><input className="property-panel__input" value={c.title || ''} onChange={e => updateCard(i, 'title', e.target.value)} placeholder="Aktivite..." /></Field>
          <Field label="Açıklama"><textarea className="property-panel__textarea" rows={2} value={c.description || ''} onChange={e => updateCard(i, 'description', e.target.value)} placeholder="Açıklama" /></Field>
          <Field label="Arka Plan Rengi"><ColorRow value={c.bgColor || '#6366f1'} onChange={v => updateCard(i, 'bgColor', v)} /></Field>
          <Field label="Yazı Rengi"><ColorRow value={c.textColor || '#ffffff'} onChange={v => updateCard(i, 'textColor', v)} /></Field>
          <Field label="Görsel"><ImageUploader value={c.image || ''} onChange={v => updateCard(i, 'image', v)} label="Kart Görseli" /></Field>
        </div>
      ))}
    </>
  );
}

function ChecklistForm({ block, updateBlock }) {
  const d = block.data;
  const items = d.items || [];

  const updateItem = (index, value) => {
    const newItems = items.map((item, i) => i === index ? { ...item, text: value } : item);
    updateBlock(block.id, { items: newItems });
  };

  const addItem = () => {
    updateBlock(block.id, { items: [...items, { text: '' }] });
  };

  const removeItem = (index) => {
    updateBlock(block.id, { items: items.filter((_, i) => i !== index) });
  };

  return (
    <>
      <Field label="Bölüm Başlığı"><input className="property-panel__input" value={d.title || ''} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="Packing List" /></Field>
      <Field label="İkon Rengi"><ColorRow value={d.checkColor || '#9ca3af'} onChange={v => updateBlock(block.id, { checkColor: v })} /></Field>
      <div className="property-panel__list-header">
        <span>Maddeler ({items.length})</span>
        <button className="property-panel__add-btn" onClick={addItem}>+ Ekle</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="property-panel__list-item" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
           <input className="property-panel__input" style={{flex: 1}} value={item.text || ''} onChange={e => updateItem(i, e.target.value)} placeholder="Eşya..." />
           <button className="property-panel__remove-btn" onClick={() => removeItem(i)}>✕</button>
        </div>
      ))}
    </>
  );
}

function GenericForm({ block }) {
  return (
    <div className="property-panel__generic">
      <p className="property-panel__generic-text">
        Bu blok tipi için özel düzenleyici henüz eklenmedi.
      </p>
      <code className="property-panel__generic-type">{block.type}</code>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────
function Field({ label, children, onReset }) {
  return (
    <div className="pp-field">
      <div className="pp-field__header">
        <label className="pp-field__label">{label}</label>
        {onReset && (
          <button 
            className="pp-field__reset" 
            onClick={onReset}
            title="Varsayılana dön"
          >
            ↺
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function ColorRow({ value, onChange }) {
  return (
    <div className="pp-color-row">
      <div className="pp-color-swatch">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} />
      </div>
      <input className="pp-input pp-input--mono" value={value} onChange={e => onChange(e.target.value)} maxLength={7} />
    </div>
  );
}

function AlignRow({ value, onChange }) {
  const aligns = [
    { key: 'left', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/>
      </svg>
    )},
    { key: 'center', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
      </svg>
    )},
    { key: 'right', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/>
      </svg>
    )},
  ];
  return (
    <div className="pp-align-row">
      {aligns.map(a => (
        <button key={a.key} className={`pp-align-btn ${value === a.key ? 'pp-align-btn--active' : ''}`} onClick={() => onChange(a.key)} title={a.key}>
          {a.icon}
        </button>
      ))}
    </div>
  );
}

function ToggleRow({ value, onChange }) {
  return (
    <button
      className={`pp-toggle ${value ? 'pp-toggle--on' : ''}`}
      onClick={() => onChange(!value)}
      type="button"
    >
      <span className="pp-toggle__track">
        <span className="pp-toggle__thumb" />
      </span>
      <span className="pp-toggle__label">{value ? 'Açık' : 'Kapalı'}</span>
    </button>
  );
}

// ─── Block type → Form mapping ────────────────────────────────────────────────
const BLOCK_FORMS = {
  hero: HeroForm,
  text: TextForm,
  image: ImageForm,
  button: ButtonForm,
  profile: ProfileForm,
  countdown: CountdownForm,
  coupon: CouponForm,
  video: VideoForm,
  image_gallery: GalleryForm,
  product_card: ProductCardForm,
  map: MapForm,
  divider: DividerForm,
  spotify_embed: SpotifyForm,
  vcard: VCardForm,
  link_list: LinkListForm,
  social_icons: SocialIconsForm,
  numbered_list: NumberedListForm,
  faq: FAQForm,
  menu: MenuForm,
  contact_form: ContactFormForm,
  cover: CoverForm,
  timeline: TimelineForm,
  checklist: ChecklistForm,
};

const BLOCK_TYPE_LABELS = {
  hero: '🎯 Hero Başlık',
  text: '📝 Metin',
  image: '🖼️ Görsel',
  button: '🔘 Buton',
  link_list: '📋 Link Listesi',
  social_icons: '💬 Sosyal İkonlar',
  profile: '👤 Profil',
  countdown: '⏰ Geri Sayım',
  coupon: '🏷️ Kupon',
  product_card: '🛍️ Ürün Kartı',
  video: '▶️ Video',
  image_gallery: '🖼️ Galeri',
  faq: '❓ SSS',
  menu: '🍽️ Menü',
  vcard: '💳 Dijital Kartvizit',
  spotify_embed: '🎵 Spotify',
  divider: '➖ Ayırıcı',
  contact_form: '📬 İletişim Formu',
  map: '📍 Harita',
  numbered_list: '📊 Numaralı Liste',
  cover: '🖼️ Kapak Görseli',
  timeline: '🗓️ Zaman Çizelgesi',
  checklist: '✅ Kontrol Listesi',
};

const BLOCK_TYPE_COLORS = {
  hero: '#6366f1',
  text: '#8b5cf6',
  image: '#ec4899',
  button: '#f59e0b',
  link_list: '#10b981',
  social_icons: '#3b82f6',
  profile: '#8b5cf6',
  countdown: '#6366f1',
  coupon: '#ef4444',
  product_card: '#f59e0b',
  video: '#ef4444',
  image_gallery: '#ec4899',
  faq: '#8b5cf6',
  menu: '#f97316',
  vcard: '#06b6d4',
  spotify_embed: '#22c55e',
  divider: '#64748b',
  contact_form: '#3b82f6',
  map: '#10b981',
  numbered_list: '#06b6d4',
  cover: '#8b5cf6',
  timeline: '#6366f1',
  checklist: '#10b981',
};

// ─── Spacing Controls ─────────────────────────────────────────────────────────
function SpacingControls({ block }) {
  const { updateBlockProps } = useBuilderStore();
  const id = block.id;

  // Default spacing values
  const spacingDefaults = {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  };

  // Default radius values
  const radiusDefaults = {
    rounded: true,
    borderRadius: 16
  };

  return (
    <>
      <Section icon="📐" title="Boşluk Ayarları" defaultOpen={false}>
        {/* Reset All Spacing Button */}
        <div className="pp-reset-all">
          <button 
            className="pp-reset-all__btn"
            onClick={() => updateBlockProps(id, spacingDefaults)}
            title="Tüm boşluk ayarlarını varsayılan değerlere döndür"
          >
            <span className="pp-reset-all__icon">↺</span>
            <span className="pp-reset-all__text">Tümünü Sıfırla</span>
          </button>
        </div>

        {/* Margin Controls */}
        <div className="pp-spacing-group">
          <div className="pp-spacing-group__header">
            <span className="pp-spacing-group__title">Dış Boşluk (Margin)</span>
            <button 
              className="pp-spacing-group__reset"
              onClick={() => updateBlockProps(id, { marginTop: 0, marginBottom: 0 })}
              title="Sıfırla"
            >
              ↺
            </button>
          </div>
          
          <div className="pp-spacing-control">
            <label className="pp-spacing-control__label">
              <span>Üst</span>
              <span className="pp-spacing-control__value">{block.marginTop || 0}px</span>
            </label>
            <input 
              type="range" 
              className="pp-spacing-control__slider"
              min={0} 
              max={100} 
              step={4}
              value={block.marginTop || 0} 
              onChange={e => updateBlockProps(id, { marginTop: parseInt(e.target.value) })}
            />
          </div>

          <div className="pp-spacing-control">
            <label className="pp-spacing-control__label">
              <span>Alt</span>
              <span className="pp-spacing-control__value">{block.marginBottom || 0}px</span>
            </label>
            <input 
              type="range" 
              className="pp-spacing-control__slider"
              min={0} 
              max={100} 
              step={4}
              value={block.marginBottom || 0} 
              onChange={e => updateBlockProps(id, { marginBottom: parseInt(e.target.value) })}
            />
          </div>

          <div className="pp-spacing-presets">
            {[0, 8, 16, 24, 32, 48].map(v => (
              <button
                key={v}
                className={`pp-spacing-preset ${(block.marginTop === v && block.marginBottom === v) ? 'pp-spacing-preset--active' : ''}`}
                onClick={() => updateBlockProps(id, { marginTop: v, marginBottom: v })}
                title={`Üst ve alt: ${v}px`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Padding Controls */}
        <div className="pp-spacing-group">
          <div className="pp-spacing-group__header">
            <span className="pp-spacing-group__title">İç Boşluk (Padding)</span>
            <button 
              className="pp-spacing-group__reset"
              onClick={() => updateBlockProps(id, { paddingTop: 0, paddingBottom: 0 })}
              title="Sıfırla"
            >
              ↺
            </button>
          </div>
          
          <div className="pp-spacing-control">
            <label className="pp-spacing-control__label">
              <span>Üst</span>
              <span className="pp-spacing-control__value">{block.paddingTop || 0}px</span>
            </label>
            <input 
              type="range" 
              className="pp-spacing-control__slider"
              min={0} 
              max={100} 
              step={4}
              value={block.paddingTop || 0} 
              onChange={e => updateBlockProps(id, { paddingTop: parseInt(e.target.value) })}
            />
          </div>

          <div className="pp-spacing-control">
            <label className="pp-spacing-control__label">
              <span>Alt</span>
              <span className="pp-spacing-control__value">{block.paddingBottom || 0}px</span>
            </label>
            <input 
              type="range" 
              className="pp-spacing-control__slider"
              min={0} 
              max={100} 
              step={4}
              value={block.paddingBottom || 0} 
              onChange={e => updateBlockProps(id, { paddingBottom: parseInt(e.target.value) })}
            />
          </div>

          <div className="pp-spacing-presets">
            {[0, 8, 16, 24, 32, 48].map(v => (
              <button
                key={v}
                className={`pp-spacing-preset ${(block.paddingTop === v && block.paddingBottom === v) ? 'pp-spacing-preset--active' : ''}`}
                onClick={() => updateBlockProps(id, { paddingTop: v, paddingBottom: v })}
                title={`Üst ve alt: ${v}px`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Preview */}
        <div className="pp-spacing-preview">
          <div className="pp-spacing-preview__label">Önizleme</div>
          <div className="pp-spacing-preview__box" style={{
            padding: `${block.marginTop || 0}px 8px ${block.marginBottom || 0}px 8px`,
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '4px'
          }}>
            <div style={{
              padding: `${block.paddingTop || 0}px 8px ${block.paddingBottom || 0}px 8px`,
              background: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '4px',
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center'
            }}>
              İçerik
            </div>
          </div>
        </div>
      </Section>

      <Section icon="🔲" title="Köşe Kavisi" defaultOpen={false}>
        {/* Reset All Radius Button */}
        <div className="pp-reset-all">
          <button 
            className="pp-reset-all__btn"
            onClick={() => updateBlockProps(id, radiusDefaults)}
            title="Köşe kavisi ayarlarını varsayılan değerlere döndür"
          >
            <span className="pp-reset-all__icon">↺</span>
            <span className="pp-reset-all__text">Tümünü Sıfırla</span>
          </button>
        </div>

        <div className="pp-radius-control">
          <div className="pp-radius-toggle">
            <span>Kavisli Köşeler</span>
            <ToggleRow value={block.rounded !== false} onChange={v => updateBlockProps(id, { rounded: v })} />
          </div>

          {block.rounded !== false && (
            <>
              <div className="pp-radius-slider">
                <div className="pp-radius-value">{block.borderRadius != null ? block.borderRadius : 16}px</div>
                <input
                  className="pp-range"
                  type="range"
                  min={0}
                  max={48}
                  value={block.borderRadius != null ? block.borderRadius : 16}
                  onChange={e => updateBlockProps(id, { borderRadius: parseInt(e.target.value) })}
                />
              </div>
              <div className="pp-presets__btns">
                {[
                  { label: 'Yok', val: 0 },
                  { label: 'Az', val: 8 },
                  { label: 'Orta', val: 16 },
                  { label: 'Çok', val: 24 },
                  { label: 'Tam', val: 48 }
                ].map(p => (
                  <button
                    key={p.val}
                    className={`pp-presets__btn ${block.borderRadius === p.val ? 'pp-presets__btn--active' : ''}`}
                    onClick={() => updateBlockProps(id, { borderRadius: p.val })}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {/* Visual preview */}
              <div className="pp-radius-preview" style={{ borderRadius: block.borderRadius != null ? block.borderRadius : 16 }}>
                <span>Önizleme</span>
              </div>
            </>
          )}
        </div>
      </Section>
    </>
  );
}

// ─── Main PropertyPanel ───────────────────────────────────────────────────────
export default function PropertyPanel({ onClose }) {
  const { site, selectedBlockId, selectBlock, updateBlock, removeBlock, getSelectedBlock } = useBuilderStore();

  const selectedBlock = getSelectedBlock();
  const BlockForm = selectedBlock ? (BLOCK_FORMS[selectedBlock.type] || GenericForm) : null;
  const blockColor = selectedBlock ? (BLOCK_TYPE_COLORS[selectedBlock.type] || '#6366f1') : '#6366f1';

  return (
    <div className="pp">
      {!selectedBlock ? (
        <>
          <div className="pp__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="pp__header-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="pp__header-text">
                <h3>Sayfa Ayarları</h3>
                <p>Tema, yazı tipi ve SEO ayarlarını düzenleyin</p>
              </div>
            </div>
            {onClose && (
              <button className="mobile-close-btn pp__close-btn" onClick={onClose} title="Paneli Kapat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          <div className="pp__scroll">
            <PageSettingsPanel />
          </div>
        </>
      ) : (
        <>
          {/* Block Edit Header */}
          <div className="pp__header pp__header--block">
            <div className="pp__header-icon" style={{ background: blockColor }}>
              <span className="pp__header-emoji">
                {(BLOCK_TYPE_LABELS[selectedBlock.type] || '📦').split(' ')[0]}
              </span>
            </div>
            <div className="pp__header-text">
              <h3>{(BLOCK_TYPE_LABELS[selectedBlock.type] || selectedBlock.type).replace(/^[^\s]+\s/, '')}</h3>
              <p>Blok özelliklerini düzenleyin</p>
            </div>
            <button
              className="pp__close-btn"
              onClick={() => selectBlock(null)}
              title="Kapat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="pp__scroll">
            {/* Block Content Form */}
            <Section icon="✏️" title="İçerik" defaultOpen={true}>
              <BlockForm block={selectedBlock} updateBlock={updateBlock} />
            </Section>

            {/* Background Settings for Hero Block */}
            {selectedBlock.type === 'hero' && (
              <Section icon="🎨" title="Arka Plan" defaultOpen={true}>
                <HeroBackgroundForm block={selectedBlock} updateBlock={updateBlock} />
              </Section>
            )}

            {/* Layout Controls */}
            <SpacingControls block={selectedBlock} />

            {/* Delete */}
            <div className="pp__delete-section">
              <button
                className="pp__delete-btn"
                onClick={() => { removeBlock(selectedBlock.id); selectBlock(null); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Bloğu Sil
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

