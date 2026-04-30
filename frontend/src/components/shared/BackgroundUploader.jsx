import { useState, useRef } from 'react';
import ImageCropper from './ImageCropper';

// Background images are always uploaded to local server (no Cloudinary)
// This ensures easy CDN migration later
const UPLOAD_SERVER = '';

export default function BackgroundUploader({ value, onChange, label = 'Arka Plan', aspectRatio = 16/9, cropData }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [tempImageFile, setTempImageFile] = useState(null);
  const [initialZoom, setInitialZoom] = useState(1);
  const [initialOffsetY, setInitialOffsetY] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Sadece resim dosyaları yüklenebilir');
      return;
    }

    // Validate file size (max 10MB for backgrounds)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Dosya boyutu 10MB\'dan küçük olmalı');
      return;
    }

    // Show cropper with temp URL (new image, reset zoom/offset)
    const tempUrl = URL.createObjectURL(file);
    setTempImageUrl(tempUrl);
    setTempImageFile(file);
    setInitialZoom(1);
    setInitialOffsetY(0);
    setShowCropper(true);
  };

  const handleCrop = async (croppedUrl, croppedBlob, cropInfo) => {
    setShowCropper(false);
    setUploading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      
      // Upload original image first
      let originalUrl = '';
      if (tempImageFile) {
        const originalFormData = new FormData();
        originalFormData.append('image', tempImageFile);
        
        const token = localStorage.getItem('miniweb_token');
        if (!token) {
          throw new Error('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
        }
        
        const originalRes = await fetch(`${UPLOAD_SERVER}/api/media/upload-background`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: originalFormData
        });

        if (originalRes.ok) {
          const originalData = await originalRes.json();
          originalUrl = originalData.url;
        }
      } else {
        // Editing existing image, keep original URL
        originalUrl = cropData?.bgImageOriginal || value;
      }

      // Upload cropped image
      const fileName = tempImageFile ? tempImageFile.name : `cropped-${Date.now()}.jpg`;
      const croppedFile = new File([croppedBlob], fileName, { type: 'image/jpeg' });
      formData.append('image', croppedFile);
      
      const token = localStorage.getItem('miniweb_token');
      if (!token) {
        throw new Error('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
      }
      
      const res = await fetch(`${UPLOAD_SERVER}/api/media/upload-background`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        let errorMessage = 'Yükleme başarısız';
        try {
          const error = await res.json();
          errorMessage = error.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      
      // Return cropped image URL + crop metadata
      onChange({
        bgImage: data.url,
        bgImageOriginal: originalUrl,
        bgImageZoom: cropInfo.zoom,
        bgImageOffsetY: cropInfo.offsetY
      });
      
      // Cleanup
      if (tempImageUrl && tempImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(tempImageUrl);
      }
      if (croppedUrl) {
        URL.revokeObjectURL(croppedUrl);
      }
      
    } catch (err) {
      setErrorMsg(err.message || 'Yükleme sırasında hata oluştu');
      console.error('Background upload error:', err);
    } finally {
      setUploading(false);
      setTempImageUrl('');
      setTempImageFile(null);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    if (tempImageUrl && tempImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(tempImageUrl);
    }
    setTempImageUrl('');
    setTempImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemove = () => {
    onChange('');
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = () => {
    // Open cropper with existing image and saved crop settings
    if (cropData?.bgImageOriginal) {
      setTempImageUrl(cropData.bgImageOriginal);
      setTempImageFile(null);
      setInitialZoom(cropData.bgImageZoom || 1);
      setInitialOffsetY(cropData.bgImageOffsetY || 0);
      setShowCropper(true);
    } else if (value) {
      // Fallback: no original, use cropped image
      setTempImageUrl(value);
      setTempImageFile(null);
      setInitialZoom(1);
      setInitialOffsetY(0);
      setShowCropper(true);
    }
  };

  const hasImage = value && value.trim() !== '';

  return (
    <>
      {showCropper && (
        <ImageCropper
          imageUrl={tempImageUrl}
          aspectRatio={aspectRatio}
          initialZoom={initialZoom}
          initialOffsetY={initialOffsetY}
          onCrop={handleCrop}
          onCancel={handleCropCancel}
        />
      )}
      
      <div className="image-uploader">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />

      {hasImage ? (
        <div className="image-uploader__preview" style={{ aspectRatio: '16/9' }}>
          <img src={value} alt={label} style={{ objectFit: 'cover' }} />
          <div className="image-uploader__overlay">
            <button
              className="image-uploader__btn"
              onClick={handleEdit}
              title="Düzenle"
            >
              ✏️ Düzenle
            </button>
            <button
              className="image-uploader__btn"
              onClick={() => fileInputRef.current?.click()}
              title="Değiştir"
            >
              🔄 Değiştir
            </button>
            <button
              className="image-uploader__btn image-uploader__btn--danger"
              onClick={handleRemove}
              title="Kaldır"
            >
              🗑️ Kaldır
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
          style={{ aspectRatio: '16/9' }}
        >
          {uploading ? (
            <>
              <div className="image-uploader__spinner" />
              <span>Yükleniyor...</span>
            </>
          ) : (
            <>
              <span className="image-uploader__icon">🖼️</span>
              <span className="image-uploader__text">
                Arka plan resmi yükle
              </span>
              <span className="image-uploader__hint">
                JPG, PNG, WebP (max 10MB)
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
    </>
  );
}
