import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ImageCropper({ imageUrl, aspectRatio = 16/9, initialZoom = 1, initialOffsetY = 0, onCrop, onCancel }) {
  const [offsetY, setOffsetY] = useState(initialOffsetY);
  const [offsetX, setOffsetX] = useState(0);
  const [zoom, setZoom] = useState(initialZoom);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Load image to get natural dimensions
    const img = new Image();
    img.onload = () => {
      console.log('Image loaded:', img.naturalWidth, 'x', img.naturalHeight);
      setImageNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      
      // Center image initially
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const containerWidth = containerRef.current.offsetWidth;
        const scale = containerWidth / img.naturalWidth;
        const scaledHeight = img.naturalHeight * scale;
        const maxOffset = Math.max(0, scaledHeight - containerHeight);
        console.log('Initial offset:', -maxOffset / 2);
        setOffsetY(-maxOffset / 2); // Center vertically
      }
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Recalculate offset when zoom changes
  useEffect(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;
    
    const containerHeight = containerRef.current.offsetHeight;
    const wrapperHeight = imageWrapperRef.current.offsetHeight;
    const maxOffset = Math.max(0, wrapperHeight - containerHeight);
    
    // Keep image centered when zooming
    const newOffset = Math.max(-maxOffset, Math.min(0, offsetY));
    if (newOffset !== offsetY) {
      setOffsetY(newOffset);
    }
  }, [zoom]);

  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging || !containerRef.current || !imageWrapperRef.current) return;

    const deltaY = clientY - dragStart.y;
    const deltaX = clientX - dragStart.x;
    const containerHeight = containerRef.current.offsetHeight;
    const containerWidth = containerRef.current.offsetWidth;
    const wrapperHeight = imageWrapperRef.current.offsetHeight;
    const wrapperWidth = imageWrapperRef.current.offsetWidth;

    const maxOffsetY = Math.max(0, wrapperHeight - containerHeight);
    const maxOffsetX = Math.max(0, wrapperWidth - containerWidth);

    const newOffsetY = Math.max(-maxOffsetY, Math.min(0, offsetY + deltaY));
    const newOffsetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, offsetX + deltaX));

    setOffsetY(newOffsetY);
    setOffsetX(newOffsetX);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (newZoom) => {
    const clampedZoom = Math.max(1, Math.min(3, newZoom));
    console.log('Zoom changed:', clampedZoom);
    setZoom(clampedZoom);
  };

  const handleCrop = async () => {
    if (!imageRef.current || !containerRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    // Set canvas size to match container
    const canvasWidth = aspectRatio >= 1 ? 1200 : Math.round(1200 * aspectRatio);
    const canvasHeight = Math.round(canvasWidth / aspectRatio);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Load original image
    const img = new Image();
    img.onload = () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Scale factor: how much the image is scaled in display
      const displayedWidth = containerWidth * zoom;
      const scaleX = img.naturalWidth / displayedWidth;

      // X: offsetX is relative to center; convert to source coords
      const wrapperLeft = (containerWidth - displayedWidth) / 2 + offsetX;
      const sourceX = Math.max(0, -wrapperLeft * scaleX);
      const sourceWidth = Math.min(img.naturalWidth - sourceX, containerWidth * scaleX);

      // Y: offsetY is top of wrapper relative to container top
      const sourceY = Math.max(0, Math.abs(offsetY) * scaleX);
      const sourceHeight = Math.min(img.naturalHeight - sourceY, containerHeight * scaleX);

      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvasWidth, canvasHeight
      );

      canvas.toBlob((blob) => {
        const croppedUrl = URL.createObjectURL(blob);
        onCrop(croppedUrl, blob, { zoom, offsetY, offsetX });
      }, 'image/jpeg', 0.92);
    };
    img.src = imageUrl;
  };

  const modalContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.97)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        overflow: 'auto'
      }}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ 
            color: '#fff', 
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }}>
            Resmi Düzenle
          </h2>
          <p style={{ 
            color: '#9ca3af', 
            margin: 0, 
            fontSize: '15px' 
          }}>
            {aspectRatio === 1 ? 'Sürükle ve yakınlaştır' : 'Sürükle, yakınlaştır ve istediğin alanı seç'}
          </p>
        </div>

        {/* Crop Container */}
        <div
          ref={containerRef}
          style={{
            width: '100%',
            aspectRatio: `${aspectRatio}`,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            border: '3px solid #6366f1',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            touchAction: 'none',
            backgroundColor: '#000'
          }}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleEnd}
        >
          <div 
            ref={imageWrapperRef}
            style={{
              position: 'absolute',
              top: `${offsetY}px`,
              left: `calc(50% + ${offsetX}px)`,
              transform: 'translateX(-50%)',
              width: `${zoom * 100}%`,
              transition: isDragging ? 'none' : 'width 0.15s ease-out'
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Crop preview"
              draggable={false}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                pointerEvents: 'none'
              }}
            />
          </div>
          
          {/* Drag hint */}
          {!isDragging && zoom === 1 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              pointerEvents: 'none',
              opacity: 0.9,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              ↕️ Sürükle veya yakınlaştır
            </div>
          )}
        </div>

        {/* Zoom Control */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button
            onClick={() => handleZoomChange(zoom - 0.1)}
            disabled={zoom <= 1}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: zoom <= 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
              color: zoom <= 1 ? '#6b7280' : '#fff',
              fontSize: '20px',
              fontWeight: 600,
              cursor: zoom <= 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (zoom > 1) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (zoom > 1) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            −
          </button>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>
                Yakınlaştırma
              </span>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => handleZoomChange(Number(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((zoom - 1) / 2) * 100}%, rgba(255, 255, 255, 0.1) ${((zoom - 1) / 2) * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none'
              }}
            />
          </div>
          
          <button
            onClick={() => handleZoomChange(zoom + 0.1)}
            disabled={zoom >= 3}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: zoom >= 3 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
              color: zoom >= 3 ? '#6b7280' : '#fff',
              fontSize: '20px',
              fontWeight: 600,
              cursor: zoom >= 3 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (zoom < 3) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (zoom < 3) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            +
          </button>
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center' 
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '16px 40px',
              borderRadius: '14px',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#d1d5db',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '160px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#d1d5db';
            }}
          >
            İptal
          </button>
          <button
            onClick={handleCrop}
            style={{
              padding: '16px 40px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: '#6366f1',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '160px',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#4f46e5';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#6366f1';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.5)';
            }}
          >
            ✓ Uygula
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.5);
          transition: all 0.2s;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.7);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.5);
          transition: all 0.2s;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}
