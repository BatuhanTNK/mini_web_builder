import { useState } from 'react';

export default function ImageBlock({ data }) {
  const { src = '', alt = '', borderRadius = '16px', aspectRatio = '16/9', objectFit = 'cover', link = '', lightboxEnabled = false, maxWidth = '100%', alignment = 'center', overlayColor = '#000000', overlayOpacity = 0, grayscale = false, blur = 0, caption = '', captionColor = '#888888' } = data || {};
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filterStyle = [
    grayscale ? 'grayscale(100%)' : '',
    blur > 0 ? `blur(${blur}px)` : ''
  ].filter(Boolean).join(' ') || 'none';

  const justifyMap = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end'
  };

  const handleClick = () => {
    if (lightboxEnabled && !link && src) {
      setLightboxOpen(true);
    }
  };

  const imgContent = src ? (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit, display: 'block', filter: filterStyle }} loading="lazy" />
      {overlayOpacity > 0 && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: overlayColor, opacity: overlayOpacity, pointerEvents: 'none' }} />
      )}
    </div>
  ) : (
    <div style={{
      width: '100%', aspectRatio, borderRadius, backgroundColor: '#2a2a3e', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '14px', filter: filterStyle
    }}>
      Gorsel ekleyin
      {overlayOpacity > 0 && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: overlayColor, opacity: overlayOpacity, pointerEvents: 'none' }} />
      )}
    </div>
  );

  let wrappedContent;
  if (link) {
    wrappedContent = <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>{imgContent}</a>;
  } else {
    wrappedContent = (
      <div 
        style={{ aspectRatio, overflow: 'hidden', borderRadius, cursor: lightboxEnabled && src ? 'zoom-in' : 'default' }}
        onClick={handleClick}
      >
        {imgContent}
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: justifyMap[alignment] || 'center', width: '100%' }}>
        <div style={{ width: '100%', maxWidth }}>
          {wrappedContent}
          {caption && (
            <div style={{ 
              marginTop: '12px', 
              fontSize: '14px', 
              color: captionColor, 
              textAlign: alignment === 'left' ? 'left' : alignment === 'right' ? 'right' : 'center',
              fontStyle: 'italic',
              padding: '0 4px'
            }}>
              {caption}
            </div>
          )}
        </div>
      </div>
      {lightboxOpen && (
        <div className="gallery-block__lightbox" onClick={() => setLightboxOpen(false)}>
          <div className="gallery-block__lightbox-content">
            <img src={src} alt={alt} />
            <button className="gallery-block__lightbox-close" onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}
