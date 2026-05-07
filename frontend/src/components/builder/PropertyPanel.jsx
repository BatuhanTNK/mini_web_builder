import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBuilderStore } from '../../store/builderStore';
import ImageUploader from '../shared/ImageUploader';
import BackgroundUploader from '../shared/BackgroundUploader';
import ProfileAvatarUploader from '../shared/ProfileAvatarUploader';
import VideoUploader from '../shared/VideoUploader';
import EmojiPicker from 'emoji-picker-react';

// ─── Emoji Picker Field ───────────────────────────────────────────────────────
function EmojiPickerField({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const pickerRef = useRef(null);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const handler = (e) => {
      if (
        pickerRef.current && !pickerRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleOpen = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const pickerW = 260;
      const pickerH = 320;
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // Sağa sığmıyorsa sola aç
      let left = rect.right - pickerW;
      if (left < 8) left = rect.left;
      if (left + pickerW > viewportW - 8) left = viewportW - pickerW - 8;

      // Alta sığmıyorsa yukarı aç
      let top = rect.bottom + 4;
      if (top + pickerH > viewportH - 8) top = rect.top - pickerH - 4;

      setPickerPos({ top, left });
    }
    setOpen(v => !v);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <button
          ref={btnRef}
          type="button"
          onClick={handleOpen}
          style={{
            flex: 1, padding: '8px 12px', borderRadius: '8px',
            border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)',
            color: '#fff', fontSize: '16px', cursor: 'pointer', textAlign: 'left',
            minHeight: '38px', display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          {value ? <span style={{ fontSize: '20px' }}>{value}</span> : <span style={{ opacity: 0.4, fontSize: '13px' }}>Emoji seç...</span>}
        </button>
        {value && (
          <button className="property-panel__remove-btn" style={{ flexShrink: 0 }} onClick={() => onChange('')}>✕</button>
        )}
      </div>

      {open && createPortal(
        <div
          ref={pickerRef}
          style={{
            position: 'fixed',
            top: pickerPos.top,
            left: pickerPos.left,
            zIndex: 99999,
          }}
        >
          <EmojiPicker
            onEmojiClick={(emojiData) => { onChange(emojiData.emoji); setOpen(false); }}
            width={260}
            height={320}
            theme="dark"
            searchPlaceholder="Emoji ara..."
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>,
        document.body
      )}
    </div>
  );
}

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
      <Section icon="🌗" title="Görünüm Modu" defaultOpen={true}>
        <Field label="Karanlık / Aydınlık Mod">
          <ToggleRow
            value={!!theme.darkMode}
            onChange={v => updateTheme({ darkMode: v })}
          />
        </Field>
        {theme.darkMode && (
          <>
            {/* ── Karanlık Mod Renkleri ── */}
            <div style={{ margin: '10px 0 4px', fontSize: '12px', fontWeight: 600, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              🌙 Karanlık Mod
            </div>
            <Field label="Arka Plan Rengi">
              <ColorRow
                value={theme.darkBg || '#0f0f13'}
                onChange={v => updateTheme({ darkBg: v })}
              />
            </Field>
            <Field label="Metin Rengi">
              <ColorRow
                value={theme.darkText || '#ffffff'}
                onChange={v => updateTheme({ darkText: v })}
              />
            </Field>

            {/* ── Aydınlık Mod Renkleri ── */}
            <div style={{ margin: '14px 0 4px', fontSize: '12px', fontWeight: 600, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ☀️ Aydınlık Mod
            </div>
            <Field label="Arka Plan Rengi">
              <ColorRow
                value={theme.lightBg || '#ffffff'}
                onChange={v => updateTheme({ lightBg: v })}
              />
            </Field>
            <Field label="Metin Rengi">
              <ColorRow
                value={theme.lightText || '#1a1a1a'}
                onChange={v => updateTheme({ lightText: v })}
              />
            </Field>

            <p style={{ fontSize: '12px', opacity: 0.45, margin: '10px 0 0', lineHeight: 1.5 }}>
              Ziyaretçiler sağ üstteki ☀️/🌙 butonuyla modu değiştirebilir.
            </p>
          </>
        )}
      </Section>

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

      <Section icon="📱" title="Mobil Uygulama (PWA)" defaultOpen={false}>
        <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '12px', lineHeight: 1.4 }}>
          Sitenizin bir mobil uygulama gibi davranmasını sağlayın.
        </p>
        
        <Field label="Alt Navigasyon Çubuğu">
          <ToggleRow 
            value={!!settings.showBottomNav} 
            onChange={v => updateSettings({ showBottomNav: v })} 
          />
        </Field>
        
        {settings.showBottomNav && (
          <Field label="İletişim Telefonu">
            <input 
              className="pp-input" 
              type="tel"
              value={settings.contactPhone || ''}
              onChange={e => updateSettings({ contactPhone: e.target.value })}
              placeholder="+90 555..." 
            />
          </Field>
        )}

        <Field label="Uygulama İkonu">
          <ImageUploader 
            value={settings.appIcon || ''} 
            onChange={v => updateSettings({ appIcon: v })} 
            label="App Icon" 
          />
        </Field>

        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(99,102,241,0.1)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6366f1', marginBottom: '4px' }}>A2HS Aktif</div>
          <p style={{ fontSize: '11px', margin: 0, opacity: 0.8, lineHeight: 1.4 }}>
            Ziyaretçileriniz sayfayı "Ana Ekrana Ekle" diyerek uygulama olarak kullanabilirler.
          </p>
        </div>
      </Section>
    </div>
  );
}

// ─── Block-specific Forms ─────────────────────────────────────────────────────
function HeroForm({ block, updateBlock, isDarkMode }) {
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
      
      {isDarkMode ? <DarkModeTextNote /> : (
        <Field 
          label="Metin Rengi"
          onReset={() => updateBlock(block.id, { textColor: defaults.textColor })}
        >
          <ColorRow 
            value={d.textColor || '#ffffff'} 
            onChange={v => updateBlock(block.id, { textColor: v })} 
          />
        </Field>
      )}
      
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
      <Field label="En-Boy Oranı">
        <select className="property-panel__select" value={d.aspectRatio || '16/9'} onChange={e => updateBlock(block.id, { aspectRatio: e.target.value })}>
          <option value="auto">Otomatik (Orijinal)</option>
          <option value="1/1">1:1 (Kare)</option>
          <option value="16/9">16:9 (Yatay)</option>
          <option value="4/3">4:3 (Yatay)</option>
          <option value="9/16">9:16 (Dikey Story)</option>
        </select>
      </Field>
      <Field label="Görsel Sığdırma">
        <select className="property-panel__select" value={d.objectFit || 'cover'} onChange={e => updateBlock(block.id, { objectFit: e.target.value })}>
          <option value="cover">Alan Kapla (Cover)</option>
          <option value="contain">İçine Sığdır (Contain)</option>
        </select>
      </Field>
      <Field label={
        <>
          Maksimum Genişlik
          <span className="pp-field__value-badge">{d.maxWidth || '100%'}</span>
        </>
      }>
        <input 
          className="property-panel__input" 
          type="range" 
          min={10} 
          max={100} 
          step={1}
          value={parseInt(d.maxWidth) || 100} 
          onChange={e => updateBlock(block.id, { maxWidth: `${e.target.value}%` })} 
        />
      </Field>
      <Field label="Hizalama">
        <AlignRow value={d.alignment || 'center'} onChange={v => updateBlock(block.id, { alignment: v })} />
      </Field>
      <Field label="Renk Örtüsü (Overlay)">
        <ColorRow value={d.overlayColor || '#000000'} onChange={v => updateBlock(block.id, { overlayColor: v })} />
      </Field>
      <Field label={
        <>
          Örtü Saydamlığı
          <span className="pp-field__value-badge">{((d.overlayOpacity ?? 0) * 100).toFixed(0)}%</span>
        </>
      }>
        <input 
          className="property-panel__input" 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={d.overlayOpacity ?? 0} 
          onChange={e => updateBlock(block.id, { overlayOpacity: Number(e.target.value) })} 
        />
      </Field>
      <Field label="Siyah/Beyaz Filtre">
        <ToggleRow value={!!d.grayscale} onChange={v => updateBlock(block.id, { grayscale: v })} />
      </Field>
      <Field label={
        <>
          Bulanıklık (Blur)
          <span className="pp-field__value-badge">{d.blur ?? 0}px</span>
        </>
      }>
        <input 
          className="property-panel__input" 
          type="range" 
          min="0" 
          max="20" 
          value={d.blur ?? 0} 
          onChange={e => updateBlock(block.id, { blur: Number(e.target.value) })} 
        />
      </Field>
      <Field label="Tıklanınca Tam Ekran (Lightbox)">
        <ToggleRow value={!!d.lightboxEnabled} onChange={v => updateBlock(block.id, { lightboxEnabled: v })} />
      </Field>
      <Field label={
        <>
          Köşe Yuvarlama
          <span className="pp-field__value-badge">{d.borderRadius ?? 0}px</span>
        </>
      }>
        <input className="property-panel__input" type="range" min={0} max={64} value={d.borderRadius ?? 0} onChange={e => updateBlock(block.id, { borderRadius: Number(e.target.value) })} />
      </Field>
      <Field label="Alt Yazı (Caption)">
        <input className="property-panel__input" value={d.caption || ''} onChange={e => updateBlock(block.id, { caption: e.target.value })} placeholder="Görsel açıklama metni..." />
      </Field>
      <Field label="Alt Yazı Rengi">
        <ColorRow value={d.captionColor || '#888888'} onChange={v => updateBlock(block.id, { captionColor: v })} />
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
      <Field label="Boyut">
        <select className="property-panel__select" value={d.size || 'md'} onChange={e => updateBlock(block.id, { size: e.target.value })}>
          <option value="sm">Küçük</option>
          <option value="md">Orta</option>
          <option value="lg">Büyük</option>
        </select>
      </Field>
      <Field label="Tam Genişlik">
        <ToggleRow value={d.fullWidth !== false} onChange={v => updateBlock(block.id, { fullWidth: v })} />
      </Field>
      <Field label={
        <>
          Köşe Yuvarlama
          <span className="pp-field__value-badge">{d.borderRadius ?? 12}px</span>
        </>
      }>
        <input className="property-panel__input" type="range" min={0} max={50} value={d.borderRadius ?? 12} onChange={e => updateBlock(block.id, { borderRadius: Number(e.target.value) })} />
      </Field>
      <Field label="Renk">
        <ColorRow value={d.color || '#6366f1'} onChange={v => updateBlock(block.id, { color: v })} />
      </Field>
      <Field label="Yazı Rengi">
        <ColorRow value={d.textColor || '#ffffff'} onChange={v => updateBlock(block.id, { textColor: v })} />
      </Field>
      <Field label="Yazı Kalınlığı">
        <select className="property-panel__select" value={d.fontWeight || 'bold'} onChange={e => updateBlock(block.id, { fontWeight: e.target.value })}>
          <option value="normal">Normal</option>
          <option value="bold">Kalın</option>
        </select>
      </Field>
      <Field label="Metin Dönüşümü">
        <select className="property-panel__select" value={d.textTransform || 'none'} onChange={e => updateBlock(block.id, { textTransform: e.target.value })}>
          <option value="none">Normal</option>
          <option value="uppercase">BÜYÜK HARF</option>
          <option value="capitalize">İlk Harfler Büyük</option>
        </select>
      </Field>
      <Field label="Hover Efekti">
        <select className="property-panel__select" value={d.hoverEffect || 'lift'} onChange={e => updateBlock(block.id, { hoverEffect: e.target.value })}>
          <option value="none">Yok</option>
          <option value="lift">Yukarı Kay</option>
          <option value="grow">Büyüme</option>
          <option value="opacity">Opaklık</option>
          <option value="glow">Parlama</option>
          <option value="shake">Titreme</option>
        </select>
      </Field>
      <Field label="Dikkat Animasyonu">
        <select className="property-panel__select" value={d.animation || 'none'} onChange={e => updateBlock(block.id, { animation: e.target.value })}>
          <option value="none">Yok</option>
          <option value="pulse">Nabız (Pulse)</option>
          <option value="bounce">Zıplama (Bounce)</option>
        </select>
      </Field>
      <Field label={
        <>
          Kenarlık Kalınlığı
          <span className="pp-field__value-badge">{d.borderWidth ?? 0}px</span>
        </>
      }>
        <input className="property-panel__input" type="range" min={0} max={4} value={d.borderWidth ?? 0} onChange={e => updateBlock(block.id, { borderWidth: Number(e.target.value) })} />
      </Field>
      {(d.borderWidth > 0) && (
        <>
          <Field label="Kenarlık Stili">
            <select className="property-panel__select" value={d.borderStyle || 'solid'} onChange={e => updateBlock(block.id, { borderStyle: e.target.value })}>
              <option value="solid">Düz</option>
              <option value="dashed">Kesik Çizgi</option>
              <option value="dotted">Noktalı</option>
            </select>
          </Field>
          <Field label="Kenarlık Rengi">
            <ColorRow value={d.borderColor || '#000000'} onChange={v => updateBlock(block.id, { borderColor: v })} />
          </Field>
        </>
      )}
      <Field label="Bağlantı Tipi">
        <select className="property-panel__select" value={d.linkType || 'url'} onChange={e => updateBlock(block.id, { linkType: e.target.value })}>
          <option value="url">URL (Web Adresi)</option>
          <option value="tel">Telefon Arama</option>
          <option value="mail">E-posta Gönder</option>
        </select>
      </Field>
      <Field label="Yeni Sekmede Aç">
        <ToggleRow value={d.target === '_blank'} onChange={v => updateBlock(block.id, { target: v ? '_blank' : '_self' })} />
      </Field>
    </>
  );
}

function ProfileForm({ block, updateBlock, isDarkMode }) {
  const d = block.data;

  const defaults = {
    avatar: '',
    name: '',
    title: '',
    bio: '',
    shape: 'circle',
    textColor: '#ffffff',
    alignment: 'center',
    verifiedBadge: false,
    bannerImage: '',
    bannerColor: '#1a1a2e',
    haloEnabled: false,
    haloColor1: '#6366f1',
    haloColor2: '#8b5cf6',
    avatarHover: 'none',
    bioMaxLines: 0,
  };

  const resetAll = () => updateBlock(block.id, defaults);

  return (
    <>
      {/* ── Tümünü Sıfırla ── */}
      <div className="pp-reset-all">
        <button className="pp-reset-all__btn" onClick={resetAll} title="Tüm profil ayarlarını varsayılan değerlere döndür">
          <span className="pp-reset-all__icon">↺</span>
          <span className="pp-reset-all__text">Tümünü Sıfırla</span>
        </button>
      </div>

      {/* ── Temel Bilgiler ── */}
      <Field label="Profil Fotografı">
        <ProfileAvatarUploader value={d.avatar || ''} onChange={v => updateBlock(block.id, { avatar: v })} />
      </Field>
      <Field label="İsim" onReset={() => updateBlock(block.id, { name: defaults.name })}>
        <input className="property-panel__input" value={d.name || ''} onChange={e => updateBlock(block.id, { name: e.target.value })} placeholder="Adınız Soyadınız" />
      </Field>
      <Field label="Unvan" onReset={() => updateBlock(block.id, { title: defaults.title })}>
        <input className="property-panel__input" value={d.title || ''} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="Pozisyon" />
      </Field>
      <Field label="Bio" onReset={() => updateBlock(block.id, { bio: defaults.bio })}>
        <textarea className="property-panel__textarea" rows={3} value={d.bio || ''} onChange={e => updateBlock(block.id, { bio: e.target.value })} placeholder="Kısa bio..." />
      </Field>

      {/* ── Görünüm ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Görünüm</h4>

      <Field label="Hizalama" onReset={() => updateBlock(block.id, { alignment: defaults.alignment })}>
        <AlignRow value={d.alignment || 'center'} onChange={v => updateBlock(block.id, { alignment: v })} />
      </Field>
      <Field label="Avatar Şekli" onReset={() => updateBlock(block.id, { shape: defaults.shape })}>
        <select className="property-panel__select" value={d.shape || 'circle'} onChange={e => updateBlock(block.id, { shape: e.target.value })}>
          <option value="circle">Daire</option>
          <option value="square">Kare</option>
        </select>
      </Field>
      <Field label="Metin Rengi" onReset={() => updateBlock(block.id, { textColor: defaults.textColor })} hidden={isDarkMode}>
        <ColorRow value={d.textColor || '#ffffff'} onChange={v => updateBlock(block.id, { textColor: v })} />
      </Field>
      {isDarkMode && <DarkModeTextNote />}

      {/* ── Avatar Hover Animasyonu ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Avatar Hover Efekti</h4>

      <Field label="Animasyon" onReset={() => updateBlock(block.id, { avatarHover: defaults.avatarHover })}>
        <select className="property-panel__select" value={d.avatarHover || 'none'} onChange={e => updateBlock(block.id, { avatarHover: e.target.value })}>
          <option value="none">Yok</option>
          <option value="scale">Büyüme (Scale)</option>
          <option value="grayscale">Gri → Renkli</option>
          <option value="flip">Çevirme (Flip)</option>
        </select>
      </Field>

      {/* ── Doğrulanmış Rozeti ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Doğrulanmış Rozeti</h4>

      <Field label="Mavi Tik Göster" onReset={() => updateBlock(block.id, { verifiedBadge: defaults.verifiedBadge })}>
        <ToggleRow value={!!d.verifiedBadge} onChange={v => updateBlock(block.id, { verifiedBadge: v })} />
      </Field>

      {/* ── Kapak Görseli (Banner) ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Kapak Görseli (Banner)</h4>

      <Field label="Banner Resmi" onReset={() => updateBlock(block.id, { bannerImage: defaults.bannerImage })}>
        <ImageUploader value={d.bannerImage || ''} onChange={v => updateBlock(block.id, { bannerImage: v })} label="Banner" />
      </Field>
      <Field label="Banner Rengi (Resim Yoksa)" onReset={() => updateBlock(block.id, { bannerColor: defaults.bannerColor })}>
        <ColorRow value={d.bannerColor || '#1a1a2e'} onChange={v => updateBlock(block.id, { bannerColor: v })} />
      </Field>

      {/* ── Avatar Çerçevesi / Halo ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Avatar Çerçevesi (Halo)</h4>

      <Field label="Halo Efekti Aktif" onReset={() => updateBlock(block.id, { haloEnabled: defaults.haloEnabled })}>
        <ToggleRow value={!!d.haloEnabled} onChange={v => updateBlock(block.id, { haloEnabled: v })} />
      </Field>
      {d.haloEnabled && (
        <>
          <Field label="Halo Renk 1" onReset={() => updateBlock(block.id, { haloColor1: defaults.haloColor1 })}>
            <ColorRow value={d.haloColor1 || '#6366f1'} onChange={v => updateBlock(block.id, { haloColor1: v })} />
          </Field>
          <Field label="Halo Renk 2" onReset={() => updateBlock(block.id, { haloColor2: defaults.haloColor2 })}>
            <ColorRow value={d.haloColor2 || '#8b5cf6'} onChange={v => updateBlock(block.id, { haloColor2: v })} />
          </Field>
        </>
      )}

      {/* ── Bio Read More ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Bio Genişletme</h4>

      <Field
        label={<>Satır Limiti <span className="pp-field__value-badge">{d.bioMaxLines > 0 ? `${d.bioMaxLines} satır` : 'Kapalı'}</span></>}
        onReset={() => updateBlock(block.id, { bioMaxLines: defaults.bioMaxLines })}
      >
        <input
          className="property-panel__input"
          type="range" min={0} max={6} step={1}
          value={d.bioMaxLines ?? 0}
          onChange={e => updateBlock(block.id, { bioMaxLines: Number(e.target.value) })}
        />
      </Field>
      <p style={{ fontSize: '11px', opacity: 0.45, margin: '2px 0 0', lineHeight: 1.4 }}>
        0 = tüm bio gösterilir, 1–6 = o kadar satırdan sonra "devamını oku" çıkar
      </p>

    </>
  );
}

function CountdownForm({ block, updateBlock }) {
  const d = block.data;

  const defaults = {
    label: 'Etkinliğe Kalan Süre', showDays: true,
    labelColor: 'rgba(255,255,255,0.8)',
    style: 'card', expiredMessage: 'Kampanya Sona Erdi!', hideOnExpire: false,
    boxBg: 'rgba(255,255,255,0.1)',
    numberColor: '#ffffff',
    unitLabelColor: 'rgba(255,255,255,0.6)',
    accentColor: '#6366f1',
  };

  return (
    <>
      {/* ── Tümünü Sıfırla ── */}
      <div className="pp-reset-all">
        <button className="pp-reset-all__btn" onClick={() => updateBlock(block.id, defaults)}
          title="Tüm ayarları varsayılana döndür">
          <span className="pp-reset-all__icon">↺</span>
          <span className="pp-reset-all__text">Tümünü Sıfırla</span>
        </button>
      </div>

      {/* ── İçerik ── */}
      <Field label="Görünüm Stili">
        <select className="property-panel__select" value={d.style || 'card'} onChange={e => updateBlock(block.id, { style: e.target.value })}>
          <option value="card">Kart (Card)</option>
          <option value="minimal">Minimal</option>
          <option value="neon">Neon Parlama</option>
        </select>
      </Field>
      <Field label="Hedef Tarih">
        <input className="property-panel__input" type="datetime-local" value={d.targetDate || ''} onChange={e => updateBlock(block.id, { targetDate: e.target.value })} />
      </Field>
      <Field label="Etiket" onReset={() => updateBlock(block.id, { label: defaults.label })}>
        <input className="property-panel__input" value={d.label || ''} onChange={e => updateBlock(block.id, { label: e.target.value })} placeholder="Etkinliğe kalan süre" />
      </Field>
      <Field label="Günleri Göster">
        <ToggleRow value={d.showDays !== false} onChange={v => updateBlock(block.id, { showDays: v })} />
      </Field>

      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Süre Dolduğunda</h4>
      <Field label="Bitiş Mesajı" onReset={() => updateBlock(block.id, { expiredMessage: defaults.expiredMessage })}>
        <input className="property-panel__input" value={d.expiredMessage || ''} onChange={e => updateBlock(block.id, { expiredMessage: e.target.value })} placeholder="Kampanya bitti..." />
      </Field>
      <Field label="Süre Bitince Gizle">
        <ToggleRow value={!!d.hideOnExpire} onChange={v => updateBlock(block.id, { hideOnExpire: v })} />
      </Field>

      {/* ── Renk Paleti ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Renk Paleti</h4>

      <Field label="Etiket Rengi" onReset={() => updateBlock(block.id, { labelColor: defaults.labelColor })}>
        <ColorRow value={d.labelColor || 'rgba(255,255,255,0.8)'} onChange={v => updateBlock(block.id, { labelColor: v })} />
      </Field>
      {d.style === 'card' && (
        <Field label="Kutu Arka Planı" onReset={() => updateBlock(block.id, { boxBg: defaults.boxBg })}>
          <ColorRow value={d.boxBg || 'rgba(255,255,255,0.1)'} onChange={v => updateBlock(block.id, { boxBg: v })} />
        </Field>
      )}
      <Field label="Sayı Rengi" onReset={() => updateBlock(block.id, { numberColor: defaults.numberColor })}>
        <ColorRow value={d.numberColor || '#ffffff'} onChange={v => updateBlock(block.id, { numberColor: v })} />
      </Field>
      <Field label="Birim Etiketi Rengi" onReset={() => updateBlock(block.id, { unitLabelColor: defaults.unitLabelColor })}>
        <ColorRow value={d.unitLabelColor || 'rgba(255,255,255,0.6)'} onChange={v => updateBlock(block.id, { unitLabelColor: v })} />
      </Field>
      {d.style === 'neon' && (
        <Field label="Vurgu (Neon) Rengi" onReset={() => updateBlock(block.id, { accentColor: defaults.accentColor })}>
          <ColorRow value={d.accentColor || '#6366f1'} onChange={v => updateBlock(block.id, { accentColor: v })} />
        </Field>
      )}
    </>
  );
}

function CouponForm({ block, updateBlock }) {
  const d = block.data;

  const defaults = {
    code: 'INDIRIM20', discount: '%20 İndirim', description: 'Tüm ürünlerde geçerli',
    expiryDate: '', copyable: true,
    discountColor: '#ffffff', descriptionColor: 'rgba(255,255,255,0.7)',
    codeBg: 'rgba(255,255,255,0.08)', codeColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.25)',
    copyBtnBg: '#6366f1', copyBtnColor: '#ffffff',
    expiryColor: 'rgba(255,255,255,0.45)',
  };

  return (
    <>
      {/* ── Tümünü Sıfırla ── */}
      <div className="pp-reset-all">
        <button className="pp-reset-all__btn" onClick={() => updateBlock(block.id, defaults)}
          title="Tüm ayarları varsayılana döndür">
          <span className="pp-reset-all__icon">↺</span>
          <span className="pp-reset-all__text">Tümünü Sıfırla</span>
        </button>
      </div>

      {/* ── İçerik ── */}
      <Field label="Kupon Kodu" onReset={() => updateBlock(block.id, { code: defaults.code })}>
        <input className="property-panel__input" value={d.code || ''} onChange={e => updateBlock(block.id, { code: e.target.value })} placeholder="INDIRIM20" />
      </Field>
      <Field label="İndirim" onReset={() => updateBlock(block.id, { discount: defaults.discount })}>
        <input className="property-panel__input" value={d.discount || ''} onChange={e => updateBlock(block.id, { discount: e.target.value })} placeholder="%20 İndirim" />
      </Field>
      <Field label="Açıklama" onReset={() => updateBlock(block.id, { description: defaults.description })}>
        <input className="property-panel__input" value={d.description || ''} onChange={e => updateBlock(block.id, { description: e.target.value })} placeholder="Tüm ürünlerde geçerli" />
      </Field>
      <Field label="Son Kullanım Tarihi" onReset={() => updateBlock(block.id, { expiryDate: defaults.expiryDate })}>
        <input className="property-panel__input" type="date" value={d.expiryDate || ''} onChange={e => updateBlock(block.id, { expiryDate: e.target.value })} />
      </Field>
      <Field label="Kopyalanabilir">
        <ToggleRow value={d.copyable !== false} onChange={v => updateBlock(block.id, { copyable: v })} />
      </Field>

      {/* ── Renk Paleti ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Renk Paleti</h4>

      <Field label="İndirim Rengi" onReset={() => updateBlock(block.id, { discountColor: defaults.discountColor })}>
        <ColorRow value={d.discountColor || '#ffffff'} onChange={v => updateBlock(block.id, { discountColor: v })} />
      </Field>
      <Field label="Açıklama Rengi" onReset={() => updateBlock(block.id, { descriptionColor: defaults.descriptionColor })}>
        <ColorRow value={d.descriptionColor || 'rgba(255,255,255,0.7)'} onChange={v => updateBlock(block.id, { descriptionColor: v })} />
      </Field>
      <Field label="Kod Arka Planı" onReset={() => updateBlock(block.id, { codeBg: defaults.codeBg })}>
        <ColorRow value={d.codeBg || 'rgba(255,255,255,0.08)'} onChange={v => updateBlock(block.id, { codeBg: v })} />
      </Field>
      <Field label="Kod Rengi" onReset={() => updateBlock(block.id, { codeColor: defaults.codeColor })}>
        <ColorRow value={d.codeColor || '#ffffff'} onChange={v => updateBlock(block.id, { codeColor: v })} />
      </Field>
      <Field label="Çerçeve Rengi" onReset={() => updateBlock(block.id, { borderColor: defaults.borderColor })}>
        <ColorRow value={d.borderColor || 'rgba(255,255,255,0.25)'} onChange={v => updateBlock(block.id, { borderColor: v })} />
      </Field>
      <Field label="Kopyala Butonu Rengi" onReset={() => updateBlock(block.id, { copyBtnBg: defaults.copyBtnBg })}>
        <ColorRow value={d.copyBtnBg || '#6366f1'} onChange={v => updateBlock(block.id, { copyBtnBg: v })} />
      </Field>
      <Field label="Kopyala Yazı Rengi" onReset={() => updateBlock(block.id, { copyBtnColor: defaults.copyBtnColor })}>
        <ColorRow value={d.copyBtnColor || '#ffffff'} onChange={v => updateBlock(block.id, { copyBtnColor: v })} />
      </Field>
      <Field label="Son Kullanım Rengi" onReset={() => updateBlock(block.id, { expiryColor: defaults.expiryColor })}>
        <ColorRow value={d.expiryColor || 'rgba(255,255,255,0.45)'} onChange={v => updateBlock(block.id, { expiryColor: v })} />
      </Field>
    </>
  );
}

function VideoForm({ block, updateBlock }) {
  const d = block.data;
  return (
    <>
      <Field label="Video URL veya Dosya">
        <VideoUploader value={d.videoUrl || ''} onChange={v => updateBlock(block.id, { videoUrl: v })} />
        <div style={{ marginTop: '8px' }}>
          <input className="property-panel__input" value={d.videoUrl || ''} onChange={e => updateBlock(block.id, { videoUrl: e.target.value })} placeholder="Veya YouTube/Vimeo linki yapıştırın..." />
        </div>
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

function ImageCarouselForm({ block, updateBlock }) {
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
      <Field label="En-Boy Oranı">
        <select className="property-panel__select" value={d.aspectRatio || '16/9'} onChange={e => updateBlock(block.id, { aspectRatio: e.target.value })}>
          <option value="auto">Otomatik (Orijinal)</option>
          <option value="1/1">1:1 (Kare)</option>
          <option value="16/9">16:9 (Yatay)</option>
          <option value="4/3">4:3 (Yatay)</option>
          <option value="9/16">9:16 (Dikey Story)</option>
        </select>
      </Field>
      <Field label={
        <>
          Köşe Yuvarlama
          <span className="pp-field__value-badge">{d.borderRadius ?? 12}px</span>
        </>
      }>
        <input className="property-panel__input" type="range" min={0} max={64} value={d.borderRadius ?? 12} onChange={e => updateBlock(block.id, { borderRadius: Number(e.target.value) })} />
      </Field>

      <div className="property-panel__list-header">
        <span>Görseller ({images.length})</span>
      </div>

      {images.map((img, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{img.alt || `Görsel ${i + 1}`}</span>
            <button className="property-panel__remove-btn" onClick={() => removeImage(i)}>X</button>
          </div>
          {img.src && (
            <img src={img.src} alt={img.alt} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
          )}
          <Field label="Alt Metin">
            <input className="property-panel__input" value={img.alt || ''} onChange={e => updateImageAlt(i, e.target.value)} placeholder="Görsel açıklaması..." />
          </Field>
        </div>
      ))}

      <Field label="Yeni Görsel Ekle">
        <ImageUploader value="" onChange={url => { if (url) addImage(url); }} label="Carousel" />
      </Field>
    </>
  );
}

function ProductCardForm({ block, updateBlock }) {
  const d = block.data;

  const defaults = {
    name: 'Ürün Adı', description: 'Ürün açıklaması buraya gelecek.',
    price: '299', originalPrice: '399', currency: '₺',
    showButton: true, buttonText: 'Satın Al', buyUrl: '',
    buttonColor: '#6366f1', buttonTextColor: '#ffffff',
    priceColor: '#6366f1',
    cardBg: 'rgba(255,255,255,0.05)',
    imageBg: 'rgba(255,255,255,0.08)',
    nameColor: '#ffffff',
    descriptionColor: 'rgba(255,255,255,0.65)',
    originalPriceColor: 'rgba(255,255,255,0.4)',
  };

  return (
    <>
      {/* ── Tümünü Sıfırla ── */}
      <div className="pp-reset-all">
        <button className="pp-reset-all__btn" onClick={() => updateBlock(block.id, defaults)}
          title="Tüm ayarları varsayılana döndür">
          <span className="pp-reset-all__icon">↺</span>
          <span className="pp-reset-all__text">Tümünü Sıfırla</span>
        </button>
      </div>

      {/* ── İçerik ── */}
      {/* Çoklu Görsel */}
      <div className="property-panel__list-header">
        <span>Görseller ({(d.images?.length > 0 ? d.images : (d.image ? [d.image] : [])).length})</span>
      </div>

      {/* Görsel listesi */}
      {(() => {
        const imgs = d.images?.length > 0 ? d.images : (d.image ? [d.image] : []);
        return imgs.map((src, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <img src={src} alt={`Görsel ${i + 1}`} style={{
              width: '48px', height: '48px', objectFit: 'cover',
              borderRadius: '8px', flexShrink: 0,
            }} />
            <span style={{ flex: 1, fontSize: '12px', opacity: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Görsel {i + 1}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                disabled={i === 0}
                onClick={() => {
                  const next = [...imgs];
                  [next[i - 1], next[i]] = [next[i], next[i - 1]];
                  updateBlock(block.id, { images: next, image: next[0] });
                }}
                style={{ background: 'none', border: 'none', color: i === 0 ? '#444' : '#aaa', cursor: i === 0 ? 'default' : 'pointer', fontSize: '14px' }}
              >↑</button>
              <button
                disabled={i === imgs.length - 1}
                onClick={() => {
                  const next = [...imgs];
                  [next[i], next[i + 1]] = [next[i + 1], next[i]];
                  updateBlock(block.id, { images: next, image: next[0] });
                }}
                style={{ background: 'none', border: 'none', color: i === imgs.length - 1 ? '#444' : '#aaa', cursor: i === imgs.length - 1 ? 'default' : 'pointer', fontSize: '14px' }}
              >↓</button>
              <button
                onClick={() => {
                  const next = imgs.filter((_, idx) => idx !== i);
                  updateBlock(block.id, { images: next, image: next[0] || '' });
                }}
                className="property-panel__remove-btn"
              >✕</button>
            </div>
          </div>
        ));
      })()}

      <Field label="Görsel Ekle">
        <ImageUploader
          value=""
          onChange={url => {
            if (!url) return;
            const existing = d.images?.length > 0 ? d.images : (d.image ? [d.image] : []);
            updateBlock(block.id, { images: [...existing, url], image: existing[0] || url });
          }}
          label="Ürün"
        />
      </Field>
      <Field label="Ürün Adı" onReset={() => updateBlock(block.id, { name: defaults.name })}>
        <input className="property-panel__input" value={d.name || ''} onChange={e => updateBlock(block.id, { name: e.target.value })} placeholder="Ürün adı..." />
      </Field>
      <Field label="Açıklama" onReset={() => updateBlock(block.id, { description: defaults.description })}>
        <textarea className="property-panel__textarea" value={d.description || ''} onChange={e => updateBlock(block.id, { description: e.target.value })} placeholder="Ürün açıklaması..." rows={2} />
      </Field>
      <Field label="Fiyat" onReset={() => updateBlock(block.id, { price: defaults.price })}>
        <input className="property-panel__input" value={d.price || ''} onChange={e => updateBlock(block.id, { price: e.target.value })} placeholder="299" />
      </Field>
      <Field label="Orijinal Fiyat" onReset={() => updateBlock(block.id, { originalPrice: defaults.originalPrice })}>
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

      {/* ── Buton ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Buton Ayarları</h4>

      <Field label="Butonu Göster">
        <ToggleRow value={d.showButton !== false} onChange={v => updateBlock(block.id, { showButton: v })} />
      </Field>
      {d.showButton !== false && (
        <>
          <Field label="Buton Metni" onReset={() => updateBlock(block.id, { buttonText: defaults.buttonText })}>
            <input className="property-panel__input" value={d.buttonText || 'Satın Al'} onChange={e => updateBlock(block.id, { buttonText: e.target.value })} placeholder="Satın Al" />
          </Field>
          <Field label="Buton URL" onReset={() => updateBlock(block.id, { buyUrl: defaults.buyUrl })}>
            <input className="property-panel__input" value={d.buyUrl || ''} onChange={e => updateBlock(block.id, { buyUrl: e.target.value })} placeholder="https://..." />
          </Field>
        </>
      )}

      {/* ── Renk Paleti ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Renk Paleti</h4>

      <Field label="Kart Arka Planı" onReset={() => updateBlock(block.id, { cardBg: defaults.cardBg })}>
        <ColorRow value={d.cardBg || 'rgba(255,255,255,0.05)'} onChange={v => updateBlock(block.id, { cardBg: v })} />
      </Field>
      <Field label="Görsel Arka Planı" onReset={() => updateBlock(block.id, { imageBg: defaults.imageBg })}>
        <ColorRow value={d.imageBg || 'rgba(255,255,255,0.08)'} onChange={v => updateBlock(block.id, { imageBg: v })} />
      </Field>
      <Field label="Ürün Adı Rengi" onReset={() => updateBlock(block.id, { nameColor: defaults.nameColor })}>
        <ColorRow value={d.nameColor || '#ffffff'} onChange={v => updateBlock(block.id, { nameColor: v })} />
      </Field>
      <Field label="Açıklama Rengi" onReset={() => updateBlock(block.id, { descriptionColor: defaults.descriptionColor })}>
        <ColorRow value={d.descriptionColor || 'rgba(255,255,255,0.65)'} onChange={v => updateBlock(block.id, { descriptionColor: v })} />
      </Field>
      <Field label="Fiyat Rengi" onReset={() => updateBlock(block.id, { priceColor: defaults.priceColor })}>
        <ColorRow value={d.priceColor || '#6366f1'} onChange={v => updateBlock(block.id, { priceColor: v })} />
      </Field>
      <Field label="Orijinal Fiyat Rengi" onReset={() => updateBlock(block.id, { originalPriceColor: defaults.originalPriceColor })}>
        <ColorRow value={d.originalPriceColor || 'rgba(255,255,255,0.4)'} onChange={v => updateBlock(block.id, { originalPriceColor: v })} />
      </Field>
      {d.showButton !== false && (
        <>
          <Field label="Buton Rengi" onReset={() => updateBlock(block.id, { buttonColor: defaults.buttonColor })}>
            <ColorRow value={d.buttonColor || '#6366f1'} onChange={v => updateBlock(block.id, { buttonColor: v })} />
          </Field>
          <Field label="Buton Yazı Rengi" onReset={() => updateBlock(block.id, { buttonTextColor: defaults.buttonTextColor })}>
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

function VCardForm({ block, updateBlock, isDarkMode }) {
  const d = block.data;

  const defaults = {
    name: 'Ad Soyad', jobTitle: 'Pozisyon', company: 'Şirket Adı',
    phone: '+90 555 000 00 00', email: 'ornek@email.com', website: '',
    downloadable: true,
    avatarBg: '#6366f1', avatarTextColor: '#ffffff',
    nameColor: '#ffffff', textColor: 'rgba(255,255,255,0.7)',
    iconColor: '#6366f1', btnBg: '#6366f1', btnTextColor: '#ffffff',
  };

  return (
    <>
      {/* ── Tümünü Sıfırla ── */}
      <div className="pp-reset-all">
        <button className="pp-reset-all__btn" onClick={() => updateBlock(block.id, defaults)}
          title="Tüm ayarları varsayılana döndür">
          <span className="pp-reset-all__icon">↺</span>
          <span className="pp-reset-all__text">Tümünü Sıfırla</span>
        </button>
      </div>

      {/* ── İçerik ── */}
      <Field label="Profil Fotoğrafı">
        <ProfileAvatarUploader
          value={d.avatar || ''}
          onChange={v => updateBlock(block.id, { avatar: v })}
        />
      </Field>
      <Field label="Ad Soyad" onReset={() => updateBlock(block.id, { name: defaults.name })}>
        <input className="property-panel__input" value={d.name || ''} onChange={e => updateBlock(block.id, { name: e.target.value })} placeholder="Ad Soyad" />
      </Field>
      <Field label="Pozisyon" onReset={() => updateBlock(block.id, { jobTitle: defaults.jobTitle })}>
        <input className="property-panel__input" value={d.jobTitle || ''} onChange={e => updateBlock(block.id, { jobTitle: e.target.value })} placeholder="Pozisyon" />
      </Field>
      <Field label="Şirket" onReset={() => updateBlock(block.id, { company: defaults.company })}>
        <input className="property-panel__input" value={d.company || ''} onChange={e => updateBlock(block.id, { company: e.target.value })} placeholder="Şirket Adı" />
      </Field>
      <Field label="Telefon" onReset={() => updateBlock(block.id, { phone: defaults.phone })}>
        <input className="property-panel__input" value={d.phone || ''} onChange={e => updateBlock(block.id, { phone: e.target.value })} placeholder="+90 555 000 00 00" />
      </Field>
      <Field label="E-posta" onReset={() => updateBlock(block.id, { email: defaults.email })}>
        <input className="property-panel__input" value={d.email || ''} onChange={e => updateBlock(block.id, { email: e.target.value })} placeholder="ornek@email.com" />
      </Field>
      <Field label="Website" onReset={() => updateBlock(block.id, { website: defaults.website })}>
        <input className="property-panel__input" value={d.website || ''} onChange={e => updateBlock(block.id, { website: e.target.value })} placeholder="https://..." />
      </Field>
      <Field label="İndirilebilir">
        <ToggleRow value={d.downloadable !== false} onChange={v => updateBlock(block.id, { downloadable: v })} />
      </Field>

      {/* ── Renk Paleti ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Renk Paleti</h4>

      <Field label="Avatar Arka Plan" onReset={() => updateBlock(block.id, { avatarBg: defaults.avatarBg })}>
        <ColorRow value={d.avatarBg || '#6366f1'} onChange={v => updateBlock(block.id, { avatarBg: v })} />
      </Field>
      <Field label="Avatar Harf Rengi" onReset={() => updateBlock(block.id, { avatarTextColor: defaults.avatarTextColor })}>
        <ColorRow value={d.avatarTextColor || '#ffffff'} onChange={v => updateBlock(block.id, { avatarTextColor: v })} />
      </Field>
      <Field label="İsim Rengi" onReset={() => updateBlock(block.id, { nameColor: defaults.nameColor })} hidden={isDarkMode}>
        <ColorRow value={d.nameColor || '#ffffff'} onChange={v => updateBlock(block.id, { nameColor: v })} />
      </Field>
      <Field label="Metin Rengi" onReset={() => updateBlock(block.id, { textColor: defaults.textColor })} hidden={isDarkMode}>
        <ColorRow value={d.textColor || 'rgba(255,255,255,0.7)'} onChange={v => updateBlock(block.id, { textColor: v })} />
      </Field>
      {isDarkMode && <DarkModeTextNote />}
      <Field label="İkon Rengi" onReset={() => updateBlock(block.id, { iconColor: defaults.iconColor })}>
        <ColorRow value={d.iconColor || '#6366f1'} onChange={v => updateBlock(block.id, { iconColor: v })} />
      </Field>
      <Field label="Buton Rengi" onReset={() => updateBlock(block.id, { btnBg: defaults.btnBg })}>
        <ColorRow value={d.btnBg || '#6366f1'} onChange={v => updateBlock(block.id, { btnBg: v })} />
      </Field>
      <Field label="Buton Yazı Rengi" onReset={() => updateBlock(block.id, { btnTextColor: defaults.btnTextColor })}>
        <ColorRow value={d.btnTextColor || '#ffffff'} onChange={v => updateBlock(block.id, { btnTextColor: v })} />
      </Field>
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
          <Field label="İkon (Emoji)">
            <EmojiPickerField value={link.icon || ''} onChange={v => updateLink(i, 'icon', v)} />
          </Field>
          <Field label="Renk"><ColorRow value={link.color || '#6366f1'} onChange={v => updateLink(i, 'color', v)} /></Field>
        </div>
      ))}

      {/* ─── Genel Stil Ayarları ─── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '12px', paddingTop: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, marginBottom: '10px' }}>Genel Stil</div>
      </div>
      <Field label="Boyut">
        <select className="property-panel__select" value={d.size || 'md'} onChange={e => updateBlock(block.id, { size: e.target.value })}>
          <option value="sm">Küçük</option>
          <option value="md">Orta</option>
          <option value="lg">Büyük</option>
        </select>
      </Field>
      <Field label={<>Köşe Yuvarlama<span className="pp-field__value-badge">{d.borderRadius ?? 12}px</span></>}>
        <input className="property-panel__input" type="range" min={0} max={50} value={d.borderRadius ?? 12} onChange={e => updateBlock(block.id, { borderRadius: Number(e.target.value) })} />
      </Field>
      <Field label="Yazı Kalınlığı">
        <select className="property-panel__select" value={d.fontWeight || 'bold'} onChange={e => updateBlock(block.id, { fontWeight: e.target.value })}>
          <option value="normal">Normal</option>
          <option value="bold">Kalın</option>
        </select>
      </Field>
      <Field label="Metin Dönüşümü">
        <select className="property-panel__select" value={d.textTransform || 'none'} onChange={e => updateBlock(block.id, { textTransform: e.target.value })}>
          <option value="none">Normal</option>
          <option value="uppercase">BÜYÜK HARF</option>
          <option value="capitalize">İlk Harfler Büyük</option>
        </select>
      </Field>
      <Field label="Hover Efekti">
        <select className="property-panel__select" value={d.hoverEffect || 'lift'} onChange={e => updateBlock(block.id, { hoverEffect: e.target.value })}>
          <option value="none">Yok</option>
          <option value="lift">Yukarı Kay</option>
          <option value="grow">Büyüme</option>
          <option value="opacity">Opaklık</option>
          <option value="glow">Parlama</option>
          <option value="shake">Titreme</option>
        </select>
      </Field>
      <Field label="Dikkat Animasyonu">
        <select className="property-panel__select" value={d.animation || 'none'} onChange={e => updateBlock(block.id, { animation: e.target.value })}>
          <option value="none">Yok</option>
          <option value="pulse">Nabız (Pulse)</option>
          <option value="bounce">Zıplama (Bounce)</option>
        </select>
      </Field>
      <Field label={<>Kenarlık Kalınlığı<span className="pp-field__value-badge">{d.borderWidth ?? 0}px</span></>}>
        <input className="property-panel__input" type="range" min={0} max={4} value={d.borderWidth ?? 0} onChange={e => updateBlock(block.id, { borderWidth: Number(e.target.value) })} />
      </Field>
      {(d.borderWidth > 0) && (
        <>
          <Field label="Kenarlık Stili">
            <select className="property-panel__select" value={d.borderStyle || 'solid'} onChange={e => updateBlock(block.id, { borderStyle: e.target.value })}>
              <option value="solid">Düz</option>
              <option value="dashed">Kesik Çizgi</option>
              <option value="dotted">Noktalı</option>
            </select>
          </Field>
          <Field label="Kenarlık Rengi">
            <ColorRow value={d.borderColor || '#000000'} onChange={v => updateBlock(block.id, { borderColor: v })} />
          </Field>
        </>
      )}
    </>
  );
}

function SocialIconsForm({ block, updateBlock }) {
  const d = block.data;
  const socials = d.socials || [];

  const PLATFORMS = ['instagram', 'twitter', 'facebook', 'youtube', 'linkedin', 'tiktok', 'github', 'whatsapp', 'telegram', 'pinterest', 'snapchat', 'spotify', 'discord', 'twitch', 'reddit', 'medium', 'dribbble', 'behance', 'email', 'website', 'other'];

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
      {/* Renk Ayarları */}
      <Field label="Arka Plan Rengi">
        <ColorRow 
          value={d.iconBgColor || 'rgba(0,0,0,0.06)'} 
          onChange={v => updateBlock(block.id, { iconBgColor: v })} 
        />
      </Field>
      <Field label="Border Rengi">
        <ColorRow 
          value={d.iconBorderColor || 'rgba(0,0,0,0.12)'} 
          onChange={v => updateBlock(block.id, { iconBorderColor: v })} 
        />
      </Field>
      <Field 
        label={
          <>
            Border Kalınlığı
            <span className="pp-field__value-badge">{d.iconBorderWidth ?? 2}px</span>
          </>
        }
      >
        <input 
          className="property-panel__input" 
          type="range" 
          min={0} 
          max={4} 
          value={d.iconBorderWidth ?? 2} 
          onChange={e => updateBlock(block.id, { iconBorderWidth: Number(e.target.value) })} 
        />
      </Field>

      <div className="property-panel__divider" />

      <div className="property-panel__list-header">
        <span>Sosyal Hesaplar ({socials.length})</span>
        <button className="property-panel__add-btn" onClick={addSocial}>+ Ekle</button>
      </div>
      {socials.map((social, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{social.platform === 'other' ? (social.customName || 'Diğer') : social.platform}</span>
            <button className="property-panel__remove-btn" onClick={() => removeSocial(i)}>✕</button>
          </div>
          <Field label="Platform">
            <select className="property-panel__select" value={social.platform || 'instagram'} onChange={e => updateSocial(i, 'platform', e.target.value)}>
              {PLATFORMS.map(p => <option key={p} value={p}>{p === 'other' ? 'Diğer (Özel)' : p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </Field>
          {social.platform === 'other' && (
            <>
              <Field label="Platform Adı">
                <input className="property-panel__input" value={social.customName || ''} onChange={e => updateSocial(i, 'customName', e.target.value)} placeholder="Örn: X (Twitter)" />
              </Field>
              <Field label="Özel Logo">
                <ImageUploader value={social.customIcon || ''} onChange={v => updateSocial(i, 'customIcon', v)} label="Logo Yükle" folder="logo" />
              </Field>
            </>
          )}
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
      <Field label="Başlık Rengi"><ColorRow value={d.titleColor || '#ffffff'} onChange={v => updateBlock(block.id, { titleColor: v })} /></Field>
      <Field label="Açıklama Rengi"><ColorRow value={d.descColor || 'rgba(255, 255, 255, 0.7)'} onChange={v => updateBlock(block.id, { descColor: v })} /></Field>
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

  const defaults = {
    questionColor: '#ffffff',
    answerColor: 'rgba(255,255,255,0.65)',
    borderColor: 'rgba(255,255,255,0.12)',
    iconColor: '#6366f1',
    activeBg: 'rgba(99,102,241,0.08)',
  };

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

  const moveItem = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    updateBlock(block.id, { items: next });
  };

  return (
    <>
      <Field label="Kategori Başlığı (Opsiyonel)">
        <input 
          className="property-panel__input" 
          value={d.title || ''} 
          onChange={e => updateBlock(block.id, { title: e.target.value })} 
          placeholder="Örn: Sipariş ve Teslimat" 
        />
      </Field>
      {/* ── Sorular ── */}
      <div className="property-panel__list-header">
        <span>Sorular ({items.length})</span>
        <button className="property-panel__add-btn" onClick={addItem}>+ Ekle</button>
      </div>

      {items.map((item, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => moveItem(i, -1)} disabled={i === 0}
                style={{ background: 'none', border: 'none', color: i === 0 ? '#444' : '#aaa', cursor: i === 0 ? 'default' : 'pointer', fontSize: '14px' }}
              >↑</button>
              <button
                onClick={() => moveItem(i, 1)} disabled={i === items.length - 1}
                style={{ background: 'none', border: 'none', color: i === items.length - 1 ? '#444' : '#aaa', cursor: i === items.length - 1 ? 'default' : 'pointer', fontSize: '14px' }}
              >↓</button>
              <span style={{ marginLeft: '4px' }}>Soru {i + 1}</span>
            </div>
            <button className="property-panel__remove-btn" onClick={() => removeItem(i)}>✕</button>
          </div>
          <Field label="Soru">
            <input className="property-panel__input" value={item.question || ''} onChange={e => updateItem(i, 'question', e.target.value)} placeholder="Soru..." />
          </Field>
          <Field label="Cevap">
            <textarea className="property-panel__textarea" rows={3} value={item.answer || ''} onChange={e => updateItem(i, 'answer', e.target.value)} placeholder="Cevap..." />
          </Field>
        </div>
      ))}

      {/* ── Renk Paleti ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Renk Paleti</h4>

      <Field label="Soru Rengi" onReset={() => updateBlock(block.id, { questionColor: defaults.questionColor })}>
        <ColorRow value={d.questionColor || '#ffffff'} onChange={v => updateBlock(block.id, { questionColor: v })} />
      </Field>
      <Field label="Cevap Rengi" onReset={() => updateBlock(block.id, { answerColor: defaults.answerColor })}>
        <ColorRow value={d.answerColor || 'rgba(255,255,255,0.65)'} onChange={v => updateBlock(block.id, { answerColor: v })} />
      </Field>
      <Field label="Ayırıcı Rengi" onReset={() => updateBlock(block.id, { borderColor: defaults.borderColor })}>
        <ColorRow value={d.borderColor || 'rgba(255,255,255,0.12)'} onChange={v => updateBlock(block.id, { borderColor: v })} />
      </Field>
      <Field label="İkon Rengi" onReset={() => updateBlock(block.id, { iconColor: defaults.iconColor })}>
        <ColorRow value={d.iconColor || '#6366f1'} onChange={v => updateBlock(block.id, { iconColor: v })} />
      </Field>
      <Field label="Açık Soru Arka Planı" onReset={() => updateBlock(block.id, { activeBg: defaults.activeBg })}>
        <ColorRow value={d.activeBg || 'rgba(99,102,241,0.08)'} onChange={v => updateBlock(block.id, { activeBg: v })} />
      </Field>
    </>
  );
}

// ─── Toplu Fiyat Güncelleme Paneli ───────────────────────────────────────────
function BulkPricePanel({ catName, onApply }) {
  const [open, setOpen] = useState(false);
  const [percent, setPercent] = useState(10);
  const [type, setType] = useState('zam'); // 'zam' | 'indirim'

  const handleApply = () => {
    const pct = type === 'zam' ? percent : -percent;
    onApply(pct);
    setOpen(false);
  };

  return (
    <div style={{ margin: '8px 0 12px' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', padding: '8px 12px', borderRadius: '8px',
          border: '1.5px solid rgba(99,102,241,0.4)',
          background: open ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)',
          color: '#a5b4fc', fontSize: '12px', fontWeight: 600,
          cursor: 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}
      >
        <span>💰</span>
        <span>Toplu Fiyat Güncelle</span>
        <span style={{ marginLeft: 'auto', opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          marginTop: '6px', padding: '12px', borderRadius: '8px',
          background: 'rgba(99,102,241,0.08)',
          border: '1px solid rgba(99,102,241,0.2)',
        }}>
          <p style={{ margin: '0 0 10px', fontSize: '11px', opacity: 0.6, lineHeight: 1.4 }}>
            <strong>"{catName}"</strong> kategorisindeki tüm ürün fiyatlarına uygulanır.
          </p>

          {/* Zam / İndirim seçimi */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <button
              onClick={() => setType('zam')}
              style={{
                flex: 1, padding: '7px', borderRadius: '6px', border: 'none',
                background: type === 'zam' ? '#6366f1' : 'rgba(255,255,255,0.08)',
                color: type === 'zam' ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              }}
            >📈 Zam</button>
            <button
              onClick={() => setType('indirim')}
              style={{
                flex: 1, padding: '7px', borderRadius: '6px', border: 'none',
                background: type === 'indirim' ? '#10b981' : 'rgba(255,255,255,0.08)',
                color: type === 'indirim' ? '#fff' : 'rgba(255,255,255,0.5)',
                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              }}
            >📉 İndirim</button>
          </div>

          {/* Yüzde input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <input
              type="number" min={1} max={200} value={percent}
              onChange={e => setPercent(Math.max(1, Number(e.target.value)))}
              style={{
                flex: 1, padding: '8px 10px', borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)', color: '#fff',
                fontSize: '16px', fontWeight: 700, textAlign: 'center',
              }}
            />
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>%</span>
          </div>

          {/* Hızlı seçim */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {[5, 10, 15, 20, 25, 50].map(p => (
              <button
                key={p}
                onClick={() => setPercent(p)}
                style={{
                  padding: '4px 8px', borderRadius: '5px', border: 'none',
                  background: percent === p ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.07)',
                  color: percent === p ? '#a5b4fc' : 'rgba(255,255,255,0.5)',
                  fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                }}
              >%{p}</button>
            ))}
          </div>

          {/* Uygula butonu */}
          <button
            onClick={handleApply}
            style={{
              width: '100%', padding: '9px', borderRadius: '7px', border: 'none',
              background: type === 'zam' ? '#6366f1' : '#10b981',
              color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            }}
          >
            {type === 'zam' ? `📈 %${percent} Zam Uygula` : `📉 %${percent} İndirim Uygula`}
          </button>
        </div>
      )}
    </div>
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

  // ── Toplu Fiyat Güncelleme — bir kategorideki tüm ürünlere zam/indirim uygula
  const bulkUpdatePrices = (ci, percent) => {
    const multiplier = 1 + percent / 100;
    const newCats = categories.map((cat, i) => {
      if (i !== ci) return cat;
      return {
        ...cat,
        subcategories: (cat.subcategories || []).map(sub => ({
          ...sub,
          items: (sub.items || []).map(item => {
            const num = parseFloat(item.price);
            if (isNaN(num)) return item;
            return { ...item, price: Math.round(num * multiplier).toString() };
          })
        }))
      };
    });
    setCategories(newCats);
  };

  return (
    <>
      <Field label="Menü Başlığı">
        <input className="property-panel__input" value={d.title || ''}
          onChange={e => updateBlock(block.id, { title: e.target.value })}
          placeholder="Menümüz" />
      </Field>
      <Field label="Vurgu Rengi (Fiyat & Çizgi)">
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

      {/* ── Renk Paleti ── */}
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Renk Paleti</h4>

      <Field label="Arka Plan" onReset={() => updateBlock(block.id, { containerBg: 'rgba(255,255,255,0.04)' })}>
        <ColorRow value={d.containerBg || 'rgba(255,255,255,0.04)'} onChange={v => updateBlock(block.id, { containerBg: v })} />
      </Field>
      <Field label="Başlık Rengi" onReset={() => updateBlock(block.id, { titleColor: '#ffffff' })}>
        <ColorRow value={d.titleColor || '#ffffff'} onChange={v => updateBlock(block.id, { titleColor: v })} />
      </Field>
      <Field label="Kart Arka Planı" onReset={() => updateBlock(block.id, { cardBg: 'rgba(255,255,255,0.06)' })}>
        <ColorRow value={d.cardBg || 'rgba(255,255,255,0.06)'} onChange={v => updateBlock(block.id, { cardBg: v })} />
      </Field>
      <Field label="Kart Kenarlık" onReset={() => updateBlock(block.id, { cardBorder: 'rgba(255,255,255,0.1)' })}>
        <ColorRow value={d.cardBorder || 'rgba(255,255,255,0.1)'} onChange={v => updateBlock(block.id, { cardBorder: v })} />
      </Field>
      <Field label="Kart Görsel Arka Planı" onReset={() => updateBlock(block.id, { cardImageBg: 'rgba(255,255,255,0.08)' })}>
        <ColorRow value={d.cardImageBg || 'rgba(255,255,255,0.08)'} onChange={v => updateBlock(block.id, { cardImageBg: v })} />
      </Field>
      <Field label="Kategori Adı Rengi" onReset={() => updateBlock(block.id, { cardNameColor: '#ffffff' })}>
        <ColorRow value={d.cardNameColor || '#ffffff'} onChange={v => updateBlock(block.id, { cardNameColor: v })} />
      </Field>
      <Field label="Alt Bilgi Rengi" onReset={() => updateBlock(block.id, { cardSubColor: 'rgba(255,255,255,0.5)' })}>
        <ColorRow value={d.cardSubColor || 'rgba(255,255,255,0.5)'} onChange={v => updateBlock(block.id, { cardSubColor: v })} />
      </Field>
      <Field label="Geri Butonu Arka Planı" onReset={() => updateBlock(block.id, { backBtnBg: 'rgba(255,255,255,0.08)' })}>
        <ColorRow value={d.backBtnBg || 'rgba(255,255,255,0.08)'} onChange={v => updateBlock(block.id, { backBtnBg: v })} />
      </Field>
      <Field label="Geri Butonu Yazı Rengi" onReset={() => updateBlock(block.id, { backBtnColor: '#ffffff' })}>
        <ColorRow value={d.backBtnColor || '#ffffff'} onChange={v => updateBlock(block.id, { backBtnColor: v })} />
      </Field>
      <Field label="Ürün Adı Rengi" onReset={() => updateBlock(block.id, { itemNameColor: '#ffffff' })}>
        <ColorRow value={d.itemNameColor || '#ffffff'} onChange={v => updateBlock(block.id, { itemNameColor: v })} />
      </Field>
      <Field label="Ürün Açıklama Rengi" onReset={() => updateBlock(block.id, { itemDescColor: 'rgba(255,255,255,0.6)' })}>
        <ColorRow value={d.itemDescColor || 'rgba(255,255,255,0.6)'} onChange={v => updateBlock(block.id, { itemDescColor: v })} />
      </Field>
      <Field label="Ürün Ayırıcı Rengi" onReset={() => updateBlock(block.id, { itemDivider: 'rgba(255,255,255,0.08)' })}>
        <ColorRow value={d.itemDivider || 'rgba(255,255,255,0.08)'} onChange={v => updateBlock(block.id, { itemDivider: v })} />
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

            {/* ── Toplu Fiyat Güncelleme ── */}
            <BulkPricePanel catName={cat.name} onApply={(pct) => bulkUpdatePrices(ci, pct)} />

            <Field label="Kategori Adı">
              <input className="property-panel__input" value={cat.name || ''}
                onChange={e => updateCategory(ci, 'name', e.target.value)} placeholder="Örn. İçecekler" />
            </Field>
            <Field label="Ikon (Emoji)">
              <EmojiPickerField value={cat.icon || ''} onChange={v => updateCategory(ci, 'icon', v)} />
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
                    <EmojiPickerField value={sub.icon || ''} onChange={v => updateSubcategory(ci, si, 'icon', v)} />
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

  const defaults = {
    submitLabel: 'Gönder',
    successMessage: 'Mesajınız başarıyla iletildi!',
    namePlaceholder: 'Adınız',
    emailPlaceholder: 'E-posta adresiniz',
    messagePlaceholder: 'Mesajınız',
    btnBg: '#6366f1',
    btnTextColor: '#ffffff',
    inputBg: 'rgba(255,255,255,0.05)',
    inputBorderColor: 'rgba(255,255,255,0.15)',
    inputTextColor: '#ffffff'
  };

  return (
    <>
      <div className="pp-reset-all">
        <button className="pp-reset-all__btn" onClick={() => updateBlock(block.id, defaults)}>
          <span className="pp-reset-all__icon">↺</span>
          <span className="pp-reset-all__text">Tümünü Sıfırla</span>
        </button>
      </div>

      <h4 className="property-panel__section-title">Metinler</h4>
      <Field label="Buton Metni" onReset={() => updateBlock(block.id, { submitLabel: defaults.submitLabel })}>
        <input className="property-panel__input" value={d.submitLabel || ''} onChange={e => updateBlock(block.id, { submitLabel: e.target.value })} placeholder="Gönder" />
      </Field>
      <Field label="Başarı Mesajı" onReset={() => updateBlock(block.id, { successMessage: defaults.successMessage })}>
        <input className="property-panel__input" value={d.successMessage || ''} onChange={e => updateBlock(block.id, { successMessage: e.target.value })} placeholder="Mesajınız iletildi..." />
      </Field>
      
      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Placeholderlar</h4>
      <Field label="İsim Alanı">
        <input className="property-panel__input" value={d.namePlaceholder || ''} onChange={e => updateBlock(block.id, { namePlaceholder: e.target.value })} placeholder="Adınız" />
      </Field>
      <Field label="Email Alanı">
        <input className="property-panel__input" value={d.emailPlaceholder || ''} onChange={e => updateBlock(block.id, { emailPlaceholder: e.target.value })} placeholder="E-posta" />
      </Field>
      <Field label="Mesaj Alanı">
        <input className="property-panel__input" value={d.messagePlaceholder || ''} onChange={e => updateBlock(block.id, { messagePlaceholder: e.target.value })} placeholder="Mesajınız" />
      </Field>

      <div className="property-panel__divider" />
      <h4 className="property-panel__section-title">Renk Paleti</h4>
      <Field label="Buton Rengi">
        <ColorRow value={d.btnBg || '#6366f1'} onChange={v => updateBlock(block.id, { btnBg: v })} />
      </Field>
      <Field label="Buton Yazı Rengi">
        <ColorRow value={d.btnTextColor || '#ffffff'} onChange={v => updateBlock(block.id, { btnTextColor: v })} />
      </Field>
      <Field label="Giriş Arka Planı">
        <ColorRow value={d.inputBg || 'rgba(255,255,255,0.05)'} onChange={v => updateBlock(block.id, { inputBg: v })} />
      </Field>
      <Field label="Giriş Kenarlık">
        <ColorRow value={d.inputBorderColor || 'rgba(255,255,255,0.15)'} onChange={v => updateBlock(block.id, { inputBorderColor: v })} />
      </Field>
      <Field label="Giriş Yazı Rengi">
        <ColorRow value={d.inputTextColor || '#ffffff'} onChange={v => updateBlock(block.id, { inputTextColor: v })} />
      </Field>
    </>
  );
}

function CoverForm({ block, updateBlock }) {
  const d = block.data;
  const defaults = {
    title: 'Amazing Cover Title',
    subtitle: 'This is a beautiful cover section.',
    badgeText: 'Featured',
    ctaText: 'Learn More',
    ctaLink: '#',
    textColor: '#ffffff',
    buttonColor: '#f2f2f2',
    buttonTextColor: '#1a1a1a',
    alignment: 'center',
    showButton: true
  };

  return (
    <>
      <Field label="Başlık" onReset={() => updateBlock(block.id, { title: defaults.title })}>
        <input className="property-panel__input" value={d.title || ''} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="BAŞLIK" />
      </Field>
      <Field label="Alt Başlık" onReset={() => updateBlock(block.id, { subtitle: defaults.subtitle })}>
        <input className="property-panel__input" value={d.subtitle || ''} onChange={e => updateBlock(block.id, { subtitle: e.target.value })} placeholder="Alt başlık..." />
      </Field>
      <Field label="Rozet/Etiket" onReset={() => updateBlock(block.id, { badgeText: defaults.badgeText })}>
        <input className="property-panel__input" value={d.badgeText || ''} onChange={e => updateBlock(block.id, { badgeText: e.target.value })} placeholder="Etiket..." />
      </Field>
      <Field label="Yazı Rengi" onReset={() => updateBlock(block.id, { textColor: defaults.textColor })}>
        <ColorRow value={d.textColor || '#ffffff'} onChange={v => updateBlock(block.id, { textColor: v })} />
      </Field>
      <Field label="Hizalama" onReset={() => updateBlock(block.id, { alignment: defaults.alignment })}>
        <AlignRow value={d.alignment || 'center'} onChange={v => updateBlock(block.id, { alignment: v })} />
      </Field>

      <div className="property-panel__divider" />
      
      <Field label="Buton Göster">
        <ToggleRow value={d.showButton !== false} onChange={v => updateBlock(block.id, { showButton: v })} />
      </Field>

      {d.showButton !== false && (
        <>
          <Field label="Buton Metni" onReset={() => updateBlock(block.id, { ctaText: defaults.ctaText })}>
            <input className="property-panel__input" value={d.ctaText || ''} onChange={e => updateBlock(block.id, { ctaText: e.target.value })} placeholder="Buton metni..." />
          </Field>
          <Field label="Buton URL" onReset={() => updateBlock(block.id, { ctaLink: defaults.ctaLink })}>
            <input className="property-panel__input" value={d.ctaLink || ''} onChange={e => updateBlock(block.id, { ctaLink: e.target.value })} placeholder="https://..." />
          </Field>
          <Field label="Buton Arka Plan" onReset={() => updateBlock(block.id, { buttonColor: defaults.buttonColor })}>
            <ColorRow value={d.buttonColor || '#f2f2f2'} onChange={v => updateBlock(block.id, { buttonColor: v })} />
          </Field>
          <Field label="Buton Yazı Rengi" onReset={() => updateBlock(block.id, { buttonTextColor: defaults.buttonTextColor })}>
            <ColorRow value={d.buttonTextColor || '#1a1a1a'} onChange={v => updateBlock(block.id, { buttonTextColor: v })} />
          </Field>
        </>
      )}
    </>
  );
}

function TimelineForm({ block, updateBlock }) {
  const d = block.data;
  // Support both 'items' (new) and 'cards' (legacy)
  const items = d.items || d.cards || [];

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) => i === index ? { ...item, [field]: value } : item);
    // Standardize on 'items' going forward
    updateBlock(block.id, { items: newItems, cards: undefined });
  };

  const addItem = () => {
    const newItem = { title: 'Yeni Adım', description: 'Açıklama...', time: '' };
    updateBlock(block.id, { items: [...items, newItem], cards: undefined });
  };

  const removeItem = (index) => {
    updateBlock(block.id, { items: items.filter((_, i) => i !== index), cards: undefined });
  };

  return (
    <>
      <Field label="Bölüm Başlığı">
        <input className="property-panel__input" value={d.title || ''} onChange={e => updateBlock(block.id, { title: e.target.value })} placeholder="Süreç Başlığı" />
      </Field>
      <Field label="Başlık Rengi">
        <ColorRow value={d.titleColor || 'var(--site-text, #ffffff)'} onChange={v => updateBlock(block.id, { titleColor: v })} />
      </Field>
      <Field label="Vurgu Rengi">
        <ColorRow value={d.accentColor || '#6366f1'} onChange={v => updateBlock(block.id, { accentColor: v })} />
      </Field>
      <div className="property-panel__list-header">
        <span>Süreç Adımları ({items.length})</span>
        <button className="property-panel__add-btn" onClick={addItem}>+ Ekle</button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="property-panel__list-item">
          <div className="property-panel__list-item-header">
            <span>{item.title || `Adım ${i + 1}`}</span>
            <button className="property-panel__remove-btn" onClick={() => removeItem(i)}>✕</button>
          </div>
          <Field label="Başlık">
            <input className="property-panel__input" value={item.title || ''} onChange={e => updateItem(i, 'title', e.target.value)} placeholder="Adım başlığı..." />
          </Field>
          <Field label="Açıklama">
            <textarea className="property-panel__textarea" rows={2} value={item.description || ''} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Süreç detayı..." />
          </Field>
          <Field label="Görsel">
            <ImageUploader value={item.image || ''} onChange={v => updateItem(i, 'image', v)} label="Adım Görseli" />
          </Field>
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
      <Field label="Başlık Rengi"><ColorRow value={d.titleColor || '#ffffff'} onChange={v => updateBlock(block.id, { titleColor: v })} /></Field>
      <Field label="Yazı Rengi"><ColorRow value={d.textColor || '#ffffff'} onChange={v => updateBlock(block.id, { textColor: v })} /></Field>
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
function Field({ label, children, onReset, hidden }) {
  if (hidden) return null;
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

// Dark mod açıkken metin rengi alanı yerine gösterilen not
function DarkModeTextNote() {
  return (
    <div style={{
      fontSize: '12px',
      color: 'rgba(255,255,255,0.45)',
      background: 'rgba(99,102,241,0.08)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '8px',
      padding: '8px 12px',
      marginBottom: '8px',
      lineHeight: 1.5,
    }}>
      🌗 Metin rengi <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Görünüm Modu</strong> bölümünden yönetiliyor.
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
  image_carousel: ImageCarouselForm,
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
  image_carousel: '🎠 Görsel Slider',
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
  image_carousel: '#f472b6',
};
// ─── Visual Settings Controls ──────────────────────────────────────────────────
function VisualSettingsControls({ block }) {
  const { updateBlockProps } = useBuilderStore();
  const id = block.id;

  return (
    <>
      <Section icon="✨" title="Görünüm ve Animasyon" defaultOpen={false}>
        <Field label="Giriş Animasyonu">
          <select className="property-panel__select" value={block.animation || 'none'} onChange={e => updateBlockProps(id, { animation: e.target.value })}>
            <option value="none">Yok</option>
            <option value="fade-in">Soluklaşarak Giriş (Fade In)</option>
            <option value="slide-up">Aşağıdan Kayarak (Slide Up)</option>
            <option value="slide-down">Yukarıdan Kayarak (Slide Down)</option>
            <option value="slide-left">Sağdan Kayarak (Slide Left)</option>
            <option value="slide-right">Soldan Kayarak (Slide Right)</option>
            <option value="zoom-in">Yakınlaşarak (Zoom In)</option>
            <option value="rotate-in">Dönerek Giriş (Rotate In)</option>
            <option value="bounce-in">Sıçrama (Bounce In)</option>
            <option value="blur-in">Odaklanarak (Blur In)</option>
          </select>
        </Field>
      </Section>

      <Section icon="✒️" title="Tipografi Ayarları" defaultOpen={false}>
        <Field label={
          <>
            Yazı Boyutu
            <span className="pp-field__value-badge">{block.fontSize || 16}px</span>
          </>
        }>
          <input 
            className="property-panel__input" 
            type="range" min={12} max={72} step={1}
            value={block.fontSize || 16} 
            onChange={e => updateBlockProps(id, { fontSize: parseInt(e.target.value) })}
          />
        </Field>

        <Field label={
          <>
            Satır Yüksekliği
            <span className="pp-field__value-badge">{block.lineHeight || 1.5}</span>
          </>
        }>
          <input 
            className="property-panel__input" 
            type="range" min={1} max={3} step={0.1}
            value={block.lineHeight || 1.5} 
            onChange={e => updateBlockProps(id, { lineHeight: parseFloat(e.target.value) })}
          />
        </Field>

        <Field label={
          <>
            Harf Aralığı
            <span className="pp-field__value-badge">{block.letterSpacing || 0}px</span>
          </>
        }>
          <input 
            className="property-panel__input" 
            type="range" min={-2} max={10} step={0.1}
            value={block.letterSpacing || 0} 
            onChange={e => updateBlockProps(id, { letterSpacing: parseFloat(e.target.value) })}
          />
        </Field>

        <Field label="Yazı Kalınlığı">
          <select className="property-panel__select" value={block.fontWeight || 'normal'} onChange={e => updateBlockProps(id, { fontWeight: e.target.value })}>
            <option value="300">İnce (300)</option>
            <option value="normal">Normal (400)</option>
            <option value="500">Orta (500)</option>
            <option value="600">Yarı Kalın (600)</option>
            <option value="bold">Kalın (700)</option>
            <option value="800">Ekstra Kalın (800)</option>
            <option value="900">Siyah (900)</option>
          </select>
        </Field>
      </Section>

      <Section icon="↕️" title="Boyut ve Yükseklik" defaultOpen={false}>
        <Field label="Yükseklik Tipi">
          <select className="property-panel__select" value={block.heightType || 'auto'} onChange={e => updateBlockProps(id, { heightType: e.target.value })}>
            <option value="auto">Otomatik (İçeriğe Göre)</option>
            <option value="px">Sabit (Pixel)</option>
            <option value="vh">Ekran Oranı (VH)</option>
            <option value="full">Tam Ekran (100vh)</option>
          </select>
        </Field>

        {block.heightType === 'px' && (
          <Field label={
            <>
              Yükseklik (PX)
              <span className="pp-field__value-badge">{block.heightPx || 400}px</span>
            </>
          }>
            <input 
              className="property-panel__input" 
              type="range" min={50} max={1200} step={10}
              value={block.heightPx || 400} 
              onChange={e => updateBlockProps(id, { heightPx: parseInt(e.target.value) })}
            />
          </Field>
        )}

        {block.heightType === 'vh' && (
          <Field label={
            <>
              Yükseklik (VH)
              <span className="pp-field__value-badge">{block.heightVh || 50}vh</span>
            </>
          }>
            <input 
              className="property-panel__input" 
              type="range" min={10} max={100} step={1}
              value={block.heightVh || 50} 
              onChange={e => updateBlockProps(id, { heightVh: parseInt(e.target.value) })}
            />
          </Field>
        )}
      </Section>
    </>
  );
}


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
  const isDarkMode = !!(site?.theme?.darkMode);

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
              <BlockForm block={selectedBlock} updateBlock={updateBlock} isDarkMode={isDarkMode} />
            </Section>

            {/* Background Settings for Hero & Cover Blocks */}
            {(selectedBlock.type === 'hero' || selectedBlock.type === 'cover') && (
              <Section icon="🎨" title="Arka Plan" defaultOpen={true}>
                <HeroBackgroundForm block={selectedBlock} updateBlock={updateBlock} />
              </Section>
            )}

            {/* Layout Controls */}
            <VisualSettingsControls block={selectedBlock} />
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

