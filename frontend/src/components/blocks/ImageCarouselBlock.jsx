import { useState } from 'react';

export default function ImageCarouselBlock({ data = {} }) {
  const { images = [], borderRadius = 12, aspectRatio = '16/9', autoPlay = false } = data;
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const sampleImages = [
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', alt: 'Salon' },
    { src: 'https://images.unsplash.com/photo-1600566753086-00f18efc2294?w=600', alt: 'Mutfak' },
    { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600', alt: 'Banyo' },
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', alt: 'Dış Görünüm' },
  ];

  const displayImages = images.length > 0 ? images : sampleImages;
  const total = displayImages.length;

  const prev = (e) => { e.stopPropagation(); setCurrent(c => (c - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); setCurrent(c => (c + 1) % total); };

  if (total === 0) {
    return (
      <div style={{
        width: '100%', aspectRatio, borderRadius: `${borderRadius}px`, backgroundColor: '#2a2a3e',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '14px'
      }}>
        Görsel ekleyin
      </div>
    );
  }

  return (
    <div className="image-carousel-block" style={{ position: 'relative', borderRadius: `${borderRadius}px`, overflow: 'hidden' }}>
      {/* Main Image */}
      <div
        style={{ width: '100%', aspectRatio, position: 'relative', cursor: 'zoom-in' }}
        onClick={() => setLightbox(true)}
      >
        <img
          src={displayImages[current]?.src}
          alt={displayImages[current]?.alt || `Fotoğraf ${current + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />

        {/* Counter Badge */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px',
          borderRadius: '20px', fontSize: '13px', fontWeight: '600', backdropFilter: 'blur(4px)'
        }}>
          {current + 1} / {total}
        </div>

        {/* Prev Button */}
        {total > 1 && (
          <button
            onClick={prev}
            style={{
              position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
              width: '36px', height: '36px', borderRadius: '50%', border: 'none',
              background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.8)'}
            onMouseLeave={e => e.target.style.background = 'rgba(0,0,0,0.5)'}
          >
            ‹
          </button>
        )}

        {/* Next Button */}
        {total > 1 && (
          <button
            onClick={next}
            style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              width: '36px', height: '36px', borderRadius: '50%', border: 'none',
              background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.8)'}
            onMouseLeave={e => e.target.style.background = 'rgba(0,0,0,0.5)'}
          >
            ›
          </button>
        )}
      </div>

      {/* Dot Indicators */}
      {total > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '6px',
          padding: '10px 0', background: 'rgba(0,0,0,0.03)'
        }}>
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: current === i ? '#6366f1' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery-block__lightbox" onClick={() => setLightbox(false)}>
          <div className="gallery-block__lightbox-content" style={{ position: 'relative' }}>
            <img src={displayImages[current]?.src} alt={displayImages[current]?.alt} />
            
            {/* Lightbox Navigation */}
            {total > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrent(c => (c - 1 + total) % total); }}
                  style={{
                    position: 'absolute', left: '-50px', top: '50%', transform: 'translateY(-50%)',
                    width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                    background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '22px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrent(c => (c + 1) % total); }}
                  style={{
                    position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)',
                    width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                    background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '22px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  ›
                </button>
              </>
            )}

            {/* Lightbox Counter */}
            <div style={{
              position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)',
              color: '#fff', fontSize: '14px', fontWeight: '600'
            }}>
              {current + 1} / {total}
            </div>

            <button className="gallery-block__lightbox-close" onClick={(e) => { e.stopPropagation(); setLightbox(false); }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
