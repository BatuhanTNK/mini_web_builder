export default function CoverBlock({ data }) {
  const {
    title = '',
    subtitle = '',
    badgeText = '',
    bgImage = '',
    ctaText = '',
    ctaLink = '',
    textColor = '#ffffff',
    overlayOpacity = 0.5,
    overlayColor = '#000000',
    minHeight = '70vh',
    alignment = 'center',
    buttonColor = '#f2f2f2',
    buttonTextColor = '#1a1a1a',
    // New background options
    bgColor = '#0f0f13',
    bgGradient = false,
    gradientColor1 = '#6366f1',
    gradientColor2 = '#8b5cf6',
    gradientAngle = 135,
    bgBlur = 0,
    bgSize = 'cover',
    bgPosition = 'center',
    bgRepeat = 'no-repeat'
  } = data || {};

  const getBackgroundStyle = () => {
    let style = {};
    if (bgImage) {
      style.backgroundImage = `url(${bgImage})`;
      style.backgroundSize = bgSize;
      style.backgroundPosition = bgPosition;
      style.backgroundRepeat = bgRepeat;
    } else if (bgGradient) {
      style.background = `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`;
    } else {
      style.backgroundColor = bgColor;
    }
    return style;
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: minHeight,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
      textAlign: alignment,
      padding: '48px 24px',
      overflow: 'hidden',
      color: textColor,
      borderRadius: 'inherit',
      ...getBackgroundStyle()
    }}>
      {/* Background Image Layer (for Blur) */}
      {bgImage && bgBlur > 0 && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: bgSize,
          backgroundPosition: bgPosition,
          backgroundRepeat: bgRepeat,
          filter: `blur(${bgBlur}px)`,
          zIndex: 0
        }} />
      )}

      {/* Overlay */}
      {(bgImage || bgGradient) && overlayOpacity > 0 && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          zIndex: 1
        }} />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', width: '100%' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 900, margin: 0, lineHeight: 1.1, textTransform: 'uppercase' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '20px', fontWeight: 500, margin: 0, opacity: 0.9 }}>
            {subtitle}
          </p>
        )}
        
        {data.showButton !== false && ctaText && (
          <div style={{ marginTop: '16px' }}>
            <a href={ctaLink || '#'} target="_blank" rel="noreferrer" style={{
              display: 'inline-block',
              backgroundColor: buttonColor,
              color: buttonTextColor,
              padding: '14px 28px',
              borderRadius: '30px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {ctaText}
            </a>
          </div>
        )}

        {badgeText && (
          <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontWeight: 600,
              opacity: 0.8
            }}>
              {badgeText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
