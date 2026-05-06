import { useState } from 'react';

export default function ProfileBlock({ data, isDarkMode = false }) {
  const {
    avatar = '',
    name = '',
    title = '',
    bio = '',
    shape = 'circle',
    textColor = '#ffffff',
    alignment = 'center',
    verifiedBadge = false,
    bannerImage = '',
    bannerColor = '#1a1a2e',
    haloEnabled = false,
    haloColor1 = '#6366f1',
    haloColor2 = '#8b5cf6',
    avatarHover = 'none',
    bioMaxLines = 0,
  } = data || {};

  const [bioExpanded, setBioExpanded] = useState(false);

  const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
  const textAlignMap = { left: 'left', center: 'center', right: 'right' };

  // Hover animasyon CSS sınıfı
  const hoverClass = avatarHover !== 'none' ? `profile-avatar-hover--${avatarHover}` : '';

  // Bio kırpma
  const bioStyle = bioMaxLines > 0 && !bioExpanded
    ? {
        display: '-webkit-box',
        WebkitLineClamp: bioMaxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : {};

  const showReadMore = bioMaxLines > 0 && bio.length > 0;

  return (
    <div style={{ padding: '0 0 16px', color: textColor }}>

      {/* ── Keyframe stilleri ── */}
      <style>{`
        .profile-avatar-hover--scale:hover { transform: scale(1.08); transition: transform 0.3s ease; }
        .profile-avatar-hover--grayscale { filter: grayscale(100%); transition: filter 0.3s ease; }
        .profile-avatar-hover--grayscale:hover { filter: grayscale(0%); }
        .profile-avatar-hover--flip { transition: transform 0.5s ease; transform-style: preserve-3d; }
        .profile-avatar-hover--flip:hover { transform: rotateY(180deg); }
        
        /* Avatar container - köşe kavisi ayarından bağımsız */
        .profile-avatar-container {
          position: relative;
          margin-bottom: 12px;
        }
        .profile-avatar-halo {
          padding: 3px;
        }
        .profile-avatar-halo.profile-avatar-halo--circle {
          border-radius: 50% !important;
        }
        .profile-avatar-halo.profile-avatar-halo--square {
          border-radius: 20px !important;
        }
        .profile-avatar-inner {
          width: 88px;
          height: 88px;
          overflow: hidden !important;
          background-color: rgba(255,255,255,0.1);
          box-sizing: border-box;
        }
        .profile-avatar-inner.profile-avatar-inner--circle {
          border-radius: 50% !important;
        }
        .profile-avatar-inner.profile-avatar-inner--square {
          border-radius: 16px !important;
        }
        
        /* Read more button - köşe kavisi ayarından bağımsız */
        .profile-readmore-wrapper {
          max-width: 320px;
          width: 100%;
        }
        .profile-readmore-btn {
          width: 100%;
          border-radius: 50px !important;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          padding: 14px 24px;
          margin-top: 12px;
          opacity: 0.9;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          overflow: visible !important;
          box-sizing: border-box;
        }
        .profile-readmore-btn:hover {
          opacity: 1;
          transform: translateY(-2px);
        }
        .profile-readmore-btn svg {
          flex-shrink: 0;
        }
      `}</style>

      {/* ── Kapak Görseli (Banner) ── */}
      {(bannerImage || bannerColor) && (
        <div style={{
          width: '100%',
          height: '100px',
          background: bannerImage
            ? `url(${bannerImage}) center/cover no-repeat`
            : bannerColor,
          borderRadius: '12px 12px 0 0',
        }} />
      )}

      {/* ── Avatar + İçerik ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignMap[alignment] || 'center',
        textAlign: textAlignMap[alignment] || 'center',
        padding: '16px 0 0',
        marginTop: bannerImage ? '-40px' : '0',
      }}>

        {/* Avatar */}
        <div className="profile-avatar-container">
          <div 
            className={`profile-avatar-halo ${shape === 'circle' ? 'profile-avatar-halo--circle' : 'profile-avatar-halo--square'}`}
            style={{
              background: haloEnabled ? `linear-gradient(135deg, ${haloColor1}, ${haloColor2})` : 'transparent',
              padding: haloEnabled ? '3px' : '0'
            }}
          >
            <div
              className={`profile-avatar-inner ${shape === 'circle' ? 'profile-avatar-inner--circle' : 'profile-avatar-inner--square'} ${hoverClass}`}
              style={{
                border: bannerImage ? '3px solid rgba(0,0,0,0.3)' : 'none',
                cursor: avatarHover !== 'none' ? 'pointer' : 'default',
              }}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '34px', color: 'rgba(255,255,255,0.5)',
                }}>
                  {name ? name.charAt(0).toUpperCase() : '?'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* İsim + Mavi Tik */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          justifyContent: alignMap[alignment] || 'center',
          marginBottom: '4px',
        }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: textColor }}>{name}</h2>
          {verifiedBadge && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="12" fill="#1d9bf0" />
              <path d="M9.5 16.5L5.5 12.5L6.91 11.09L9.5 13.67L17.09 6.08L18.5 7.5L9.5 16.5Z" fill="white" />
            </svg>
          )}
        </div>

        {/* Unvan */}
        {title && (
          <p style={{ margin: '0 0 8px', fontSize: '14px', opacity: 0.7, color: textColor }}>{title}</p>
        )}

        {/* Bio + Read More */}
        {bio && (
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <p style={{
              margin: 0, fontSize: '14px', opacity: 0.8,
              lineHeight: 1.6, color: textColor,
              ...bioStyle,
            }}>
              {bio}
            </p>
            {showReadMore && (
              <div className="profile-readmore-wrapper">
                <button
                  className="profile-readmore-btn"
                  style={{ 
                    color: textColor,
                    borderRadius: '50px',
                    WebkitBorderRadius: '50px',
                    MozBorderRadius: '50px',
                    background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
                  }}
                  onClick={() => setBioExpanded(!bioExpanded)}
                >
                  {bioExpanded ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                      Daha az göster
                    </>
                  ) : (
                    <>
                      Devamını oku
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
