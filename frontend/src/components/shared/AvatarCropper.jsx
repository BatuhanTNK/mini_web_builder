import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const CROP_SIZE = 300; // daire çapı (px) — canvas'ta da bu kullanılır

export default function AvatarCropper({ imageUrl, onCrop, onCancel }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 }); // doğal boyut

  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  // Resmi yükle
  useEffect(() => {
    const img = imgRef.current;
    img.onload = () => {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
      // Başlangıçta resmi ortala
      setOffset({ x: 0, y: 0 });
      setZoom(1);
    };
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
  }, [imageUrl]);

  // Canvas'a çiz
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgSize.w) return;
    const ctx = canvas.getContext('2d');
    const size = CROP_SIZE;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Karartılmış arka plan
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, size, size);

    // Resmi çiz (zoom + offset)
    const img = imgRef.current;
    const scale = (size / Math.min(imgSize.w, imgSize.h)) * zoom;
    const drawW = imgSize.w * scale;
    const drawH = imgSize.h * scale;
    const drawX = (size - drawW) / 2 + offset.x;
    const drawY = (size - drawH) / 2 + offset.y;

    ctx.save();
    // Daire clip
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Daire çerçevesi
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [imgSize, zoom, offset]);

  useEffect(() => { draw(); }, [draw]);

  // Sınır kontrolü
  const clampOffset = useCallback((ox, oy, z) => {
    if (!imgSize.w) return { x: ox, y: oy };
    const size = CROP_SIZE;
    const scale = (size / Math.min(imgSize.w, imgSize.h)) * z;
    const drawW = imgSize.w * scale;
    const drawH = imgSize.h * scale;
    const maxX = Math.max(0, (drawW - size) / 2);
    const maxY = Math.max(0, (drawH - size) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, ox)),
      y: Math.max(-maxY, Math.min(maxY, oy)),
    };
  }, [imgSize]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const raw = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
    setOffset(clampOffset(raw.x, raw.y, zoom));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: t.clientX - offset.x, y: t.clientY - offset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const t = e.touches[0];
    const raw = { x: t.clientX - dragStart.x, y: t.clientY - dragStart.y };
    setOffset(clampOffset(raw.x, raw.y, zoom));
  };

  const handleZoom = (newZoom) => {
    const z = Math.max(1, Math.min(4, newZoom));
    setZoom(z);
    setOffset(prev => clampOffset(prev.x, prev.y, z));
  };

  const handleApply = () => {
    if (!imgSize.w) return;
    const size = CROP_SIZE;
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = size;
    outputCanvas.height = size;
    const ctx = outputCanvas.getContext('2d');

    const img = imgRef.current;
    const scale = (size / Math.min(imgSize.w, imgSize.h)) * zoom;
    const drawW = imgSize.w * scale;
    const drawH = imgSize.h * scale;
    const drawX = (size - drawW) / 2 + offset.x;
    const drawY = (size - drawH) / 2 + offset.y;

    // Daire clip ile kırp
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    outputCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      onCrop(url, blob);
    }, 'image/png');
  };

  const modal = (
    <div
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.92)',
        zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(8px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '24px', width: '100%', maxWidth: '400px',
        animation: 'avatarCropFadeIn 0.2s ease-out',
      }}>
        {/* Başlık */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', margin: '0 0 6px', fontSize: '22px', fontWeight: 700 }}>
            Profil Fotoğrafını Kırp
          </h2>
          <p style={{ color: '#9ca3af', margin: 0, fontSize: '14px' }}>
            Sürükle ve yakınlaştır, daire içindeki alan kaydedilir
          </p>
        </div>

        {/* Canvas — daire önizleme */}
        <div style={{ position: 'relative' }}>
          <canvas
            ref={canvasRef}
            width={CROP_SIZE}
            height={CROP_SIZE}
            style={{
              borderRadius: '50%',
              cursor: isDragging ? 'grabbing' : 'grab',
              display: 'block',
              boxShadow: '0 0 0 4px #6366f1, 0 20px 60px rgba(0,0,0,0.6)',
              touchAction: 'none',
              userSelect: 'none',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          />
        </div>

        {/* Zoom */}
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px',
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <button
            onClick={() => handleZoom(zoom - 0.1)}
            disabled={zoom <= 1}
            style={{
              width: '36px', height: '36px', borderRadius: '8px', border: 'none',
              background: zoom <= 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
              color: zoom <= 1 ? '#4b5563' : '#fff',
              fontSize: '20px', cursor: zoom <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >−</button>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>Yakınlaştırma</span>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range" min="1" max="4" step="0.05" value={zoom}
              onChange={(e) => handleZoom(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#6366f1', cursor: 'pointer' }}
            />
          </div>

          <button
            onClick={() => handleZoom(zoom + 0.1)}
            disabled={zoom >= 4}
            style={{
              width: '36px', height: '36px', borderRadius: '8px', border: 'none',
              background: zoom >= 4 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
              color: zoom >= 4 ? '#4b5563' : '#fff',
              fontSize: '20px', cursor: zoom >= 4 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >+</button>
        </div>

        {/* Butonlar */}
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
              color: '#d1d5db', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            İptal
          </button>
          <button
            onClick={handleApply}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              border: 'none', background: '#6366f1',
              color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99,102,241,0.5)',
            }}
          >
            ✓ Uygula
          </button>
        </div>
      </div>

      <style>{`
        @keyframes avatarCropFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );

  return createPortal(modal, document.body);
}
