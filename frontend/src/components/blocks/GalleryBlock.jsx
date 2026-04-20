import { useState } from 'react';

export default function GalleryBlock({ data = {} }) {
  const { images = [], columns = 2, gap = 8, borderRadius = 12 } = data;
  const [lightbox, setLightbox] = useState(null);

  const sampleImages = [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', alt: 'Fotoğraf 1' },
    { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', alt: 'Fotoğraf 2' },
    { src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400', alt: 'Fotoğraf 3' },
    { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400', alt: 'Fotoğraf 4' },
  ];

  const displayImages = images.length > 0 ? images : sampleImages;

  return (
    <div className="gallery-block">
      <div
        className="gallery-block__grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        }}
      >
        {displayImages.map((img, i) => (
          <div
            key={i}
            className="gallery-block__item"
            style={{ borderRadius: `${borderRadius}px` }}
            onClick={() => setLightbox(img)}
          >
            <img
              src={img.src}
              alt={img.alt || `Fotoğraf ${i + 1}`}
              loading="lazy"
              style={{ borderRadius: `${borderRadius}px` }}
            />
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="gallery-block__lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery-block__lightbox-content">
            <img src={lightbox.src} alt={lightbox.alt} />
            <button className="gallery-block__lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
