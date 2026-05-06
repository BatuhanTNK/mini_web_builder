import { useState } from 'react';

export default function ProductCardBlock({ data }) {
  const {
    image = '',
    images = [],
    name = '',
    price = '',
    originalPrice = '',
    buyUrl = '',
    currency = '₺',
    buttonText = 'Satın Al',
    buttonColor = '#6366f1',
    buttonTextColor = '#ffffff',
    showButton = true,
    priceColor = '#6366f1',
    description = '',
    cardBg = 'rgba(255,255,255,0.05)',
    imageBg = 'rgba(255,255,255,0.08)',
    nameColor = '#ffffff',
    descriptionColor = 'rgba(255,255,255,0.65)',
    originalPriceColor = 'rgba(255,255,255,0.4)',
  } = data || {};

  // images array varsa onu kullan, yoksa tekil image'ı array'e çevir
  const allImages = images.length > 0 ? images : (image ? [image] : []);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = allImages[activeIdx] || null;
  const hasMultiple = allImages.length > 1;

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: cardBg }}>

      {/* ── Ana Görsel ── */}
      <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: imageBg, overflow: 'hidden' }}>
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${name} - ${activeIdx + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.25)', fontSize: '13px',
          }}>
            Ürün görseli
          </div>
        )}

        {/* Ok butonları — birden fazla görsel varsa */}
        {hasMultiple && (
          <>
            <button
              onClick={() => setActiveIdx(i => (i - 1 + allImages.length) % allImages.length)}
              style={{
                position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', color: '#fff', fontSize: '16px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >‹</button>
            <button
              onClick={() => setActiveIdx(i => (i + 1) % allImages.length)}
              style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', color: '#fff', fontSize: '16px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >›</button>

            {/* Nokta indikatörü */}
            <div style={{
              position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '5px',
            }}>
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    width: i === activeIdx ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    border: 'none',
                    background: i === activeIdx ? '#fff' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnail Şeridi ── */}
      {hasMultiple && (
        <div style={{
          display: 'flex', gap: '6px', padding: '8px 12px',
          overflowX: 'auto', backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                flexShrink: 0,
                width: '48px', height: '48px',
                borderRadius: '8px', overflow: 'hidden',
                border: i === activeIdx ? '2px solid #6366f1' : '2px solid transparent',
                padding: 0, cursor: 'pointer', background: imageBg,
                transition: 'border-color 0.2s',
              }}
            >
              <img
                src={src} alt={`Görsel ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </button>
          ))}
        </div>
      )}

      {/* ── İçerik ── */}
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 600, color: nameColor }}>
          {name}
        </h3>
        {description && (
          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5, color: descriptionColor }}>
            {description}
          </p>
        )}

        {/* Fiyat */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, color: priceColor }}>
            {price}{currency}
          </span>
          {originalPrice && (
            <span style={{ fontSize: '14px', textDecoration: 'line-through', color: originalPriceColor }}>
              {originalPrice}{currency}
            </span>
          )}
        </div>

        {/* Buton */}
        {showButton && (
          <a
            href={buyUrl || '#'}
            target={buyUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{
              display: 'block', textAlign: 'center',
              padding: '12px', borderRadius: '10px',
              backgroundColor: buttonColor, color: buttonTextColor,
              textDecoration: 'none', fontWeight: 600, fontSize: '14px',
            }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}
