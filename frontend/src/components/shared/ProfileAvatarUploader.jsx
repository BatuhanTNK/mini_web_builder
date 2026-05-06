import { useState, useRef } from 'react';
import AvatarCropper from './AvatarCropper';

const UPLOAD_SERVER = '';

export default function ProfileAvatarUploader({ value, onChange }) {
  const [showCropper, setShowCropper] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setTempUrl(url);
    setShowCropper(true);
  };

  const handleCrop = async (croppedUrl, croppedBlob) => {
    setShowCropper(false);
    setUploading(true);
    setErrorMsg('');

    try {
      // Sunucuya yükle
      const file = new File([croppedBlob], `avatar-${Date.now()}.png`, { type: 'image/png' });
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${UPLOAD_SERVER}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          onChange(UPLOAD_SERVER + data.url);
          cleanup(croppedUrl);
          return;
        }
      }

      // Fallback: base64 olarak sakla
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result);
        cleanup(croppedUrl);
      };
      reader.readAsDataURL(croppedBlob);
    } catch {
      // Fallback: base64
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result);
        cleanup(croppedUrl);
      };
      reader.readAsDataURL(croppedBlob);
    } finally {
      setUploading(false);
    }
  };

  const cleanup = (croppedUrl) => {
    if (tempUrl?.startsWith('blob:')) URL.revokeObjectURL(tempUrl);
    if (croppedUrl?.startsWith('blob:')) URL.revokeObjectURL(croppedUrl);
    setTempUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCancel = () => {
    setShowCropper(false);
    if (tempUrl?.startsWith('blob:')) URL.revokeObjectURL(tempUrl);
    setTempUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = () => {
    onChange('');
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasImage = value && value.trim() !== '';

  return (
    <>
      {showCropper && tempUrl && (
        <AvatarCropper
          imageUrl={tempUrl}
          onCrop={handleCrop}
          onCancel={handleCancel}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Önizleme dairesi */}
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0,
            background: hasImage ? 'transparent' : 'rgba(99,102,241,0.15)',
            border: '2px dashed rgba(99,102,241,0.5)',
            cursor: uploading ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            transition: 'border-color 0.2s',
          }}
          title="Fotoğraf seç"
        >
          {hasImage ? (
            <>
              <img
                src={value}
                alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.2s',
                fontSize: '18px',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
              >
                ✏️
              </div>
            </>
          ) : uploading ? (
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.2)',
              borderTopColor: '#6366f1',
              animation: 'avatarSpin 0.8s linear infinite',
            }} />
          ) : (
            <span style={{ fontSize: '24px', opacity: 0.5 }}>👤</span>
          )}
        </div>

        {/* Butonlar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              padding: '8px 14px', borderRadius: '8px', border: 'none',
              background: 'rgba(99,102,241,0.2)', color: '#a5b4fc',
              fontSize: '13px', fontWeight: 600, cursor: uploading ? 'wait' : 'pointer',
              textAlign: 'left',
            }}
          >
            {uploading ? 'Yükleniyor...' : hasImage ? '🔄 Fotoğrafı Değiştir' : '📷 Fotoğraf Seç'}
          </button>

          {hasImage && (
            <button
              onClick={handleRemove}
              style={{
                padding: '6px 14px', borderRadius: '8px',
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.08)', color: '#f87171',
                fontSize: '12px', cursor: 'pointer', textAlign: 'left',
              }}
            >
              🗑️ Kaldır
            </button>
          )}

          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
            JPG, PNG, WebP · Daire içinde kırpılır
          </span>
        </div>
      </div>

      {errorMsg && (
        <div style={{
          marginTop: 8, padding: '8px 10px', borderRadius: 8,
          background: 'rgba(239,68,68,0.1)', color: '#ef4444',
          fontSize: 12, border: '1px solid rgba(239,68,68,0.3)',
        }}>
          {errorMsg}
        </div>
      )}

      <style>{`
        @keyframes avatarSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
