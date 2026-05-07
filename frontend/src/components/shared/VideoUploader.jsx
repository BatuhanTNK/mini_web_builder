import { useState, useRef } from 'react';

const UPLOAD_SERVER = '';

export default function VideoUploader({ value, onChange, label = 'Video' }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    // Check file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Video boyutu 10MB\'dan büyük olamaz.');
      return;
    }

    setUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('folder', 'video');
      formData.append('image', file); // server.js expects 'image' field name
      
      const res = await fetch(`${UPLOAD_SERVER}/api/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          onChange(data.url);
          setUploading(false);
          return;
        }
      }
      
      const errorData = await res.json().catch(() => ({}));
      setErrorMsg(errorData.message || 'Yükleme başarısız.');
    } catch (err) {
      setErrorMsg('Sunucuya bağlanılamadı.');
      console.error('Video upload error:', err);
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
    if (file && file.type.startsWith('video/')) {
      handleUpload(file);
    } else {
      setErrorMsg('Lütfen geçerli bir video dosyası yükleyin.');
    }
  };

  const handleRemove = () => {
    onChange('');
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasVideo = value && value.trim() !== '';
  const isLocalVideo = hasVideo && (value.startsWith('/uploads/video') || value.startsWith('blob:'));

  return (
    <div className="image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {hasVideo ? (
        <div className="image-uploader__preview">
          {isLocalVideo ? (
            <video 
              src={value} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
              muted
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#1a1a2e', fontSize: '12px', textAlign: 'center', padding: '10px' }}>
              Link: {value.substring(0, 30)}...
            </div>
          )}
          <div className="image-uploader__overlay">
            <button
              className="image-uploader__btn"
              onClick={() => fileInputRef.current?.click()}
              title="Değiştir"
            >
              Değiştir
            </button>
            <button
              className="image-uploader__btn image-uploader__btn--danger"
              onClick={handleRemove}
              title="Kaldır"
            >
              Kaldır
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
              <span>Yükleniyor...</span>
            </>
          ) : (
            <>
              <span className="image-uploader__icon">▶️</span>
              <span className="image-uploader__text">
                Video yükle veya sürükle
              </span>
              <span className="image-uploader__hint">
                MP4, WEBM, OGG (max 10MB)
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
