import { useState, useRef } from 'react';

// Vite proxy handles /api and /uploads — no hardcoded host needed
const UPLOAD_SERVER = '';

// Fallback: read file as base64 data URL (works entirely in-browser)
function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Dosya okunamadi'));
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({ value, onChange, label = 'Gorsel', folder = 'images' }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setErrorMsg('');

    // 1) Try backend upload (fast + small storage footprint)
    try {
      const formData = new FormData();
      if (folder) {
        formData.append('folder', folder);
      }
      formData.append('image', file);
      const res = await fetch(`${UPLOAD_SERVER}/api/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          onChange(UPLOAD_SERVER + data.url);
          setUploading(false);
          return;
        }
      }
      // non-2xx response → fall through to base64 fallback
    } catch {
      // network error / backend down → fall through to base64 fallback
    }

    // 2) Fallback: store as base64 data URL (local-only, survives without backend)
    try {
      // Warn if file is large — base64 bloats by ~33% and localStorage is ~5MB
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('Uyari: Dosya 2MB uzeri, tarayici depolama sinirini asabilir.');
      }
      const dataUrl = await readAsDataURL(file);
      onChange(dataUrl);
    } catch (err) {
      setErrorMsg('Yukleme basarisiz: ' + (err.message || 'Bilinmeyen hata'));
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleUpload(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasImage = value && value.trim() !== '';

  return (
    <div className="image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {hasImage ? (
        <div className="image-uploader__preview">
          <img src={value} alt={label} />
          <div className="image-uploader__overlay">
            <button
              className="image-uploader__btn"
              onClick={() => fileInputRef.current?.click()}
              title="Degistir"
            >
              Degistir
            </button>
            <button
              className="image-uploader__btn image-uploader__btn--danger"
              onClick={handleRemove}
              title="Kaldir"
            >
              Kaldir
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`image-uploader__dropzone ${dragOver ? 'image-uploader__dropzone--active' : ''} ${uploading ? 'image-uploader__dropzone--uploading' : ''}`}
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <>
              <div className="image-uploader__spinner" />
              <span>Yukleniyor...</span>
            </>
          ) : (
            <>
              <span className="image-uploader__icon">+</span>
              <span className="image-uploader__text">
                Gorsel yukle veya surukle
              </span>
              <span className="image-uploader__hint">
                JPG, PNG, GIF, WebP (max 10MB)
              </span>
            </>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="image-uploader__error" style={{
          marginTop: 8, padding: '8px 10px', borderRadius: 8,
          background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
          fontSize: 12, border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
