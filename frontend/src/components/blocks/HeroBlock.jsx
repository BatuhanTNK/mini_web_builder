export default function HeroBlock({ data }) {
  const { 
    title = '', 
    subtitle = '', 
    accentWord = '', 
    accentColor = '#6366f1', 
    bgColor = '#0f0f13', 
    textColor = '#ffffff', 
    alignment = 'center',
    // Background options
    bgImage = '',
    bgImageOriginal = '', // Original uncropped image
    bgImageZoom = 1, // Zoom level used in crop
    bgImageOffsetY = 0, // Vertical offset used in crop
    bgGradient = false,
    gradientColor1 = '#6366f1',
    gradientColor2 = '#8b5cf6',
    gradientAngle = 135,
    overlayColor = '#000000',
    overlayOpacity = 0.5,
    bgBlur = 0,
    bgSize = 'cover',
    bgPosition = 'center',
    bgRepeat = 'no-repeat'
  } = data || {};

  const highlightText = (text) => {
    if (!accentWord || !text) {
      return text;
    }

    // Case-insensitive search
    const lowerText = text.toLowerCase();
    const lowerAccent = accentWord.toLowerCase();
    const index = lowerText.indexOf(lowerAccent);

    if (index === -1) {
      return text;
    }

    // Extract the actual word from text (preserving original case)
    const before = text.substring(0, index);
    const actualWord = text.substring(index, index + accentWord.length);
    const after = text.substring(index + accentWord.length);

    return (
      <>
        {before}
        <span style={{ 
          color: accentColor,
          fontWeight: 900,
          background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
          padding: '0 12px',
          borderRadius: '8px',
          boxShadow: `0 0 20px ${accentColor}66`,
          display: 'inline-block',
          transform: 'scale(1.05)',
          textShadow: `0 0 10px ${accentColor}88`
        }}>
          {actualWord}
        </span>
        {after}
      </>
    );
  };

  // Build background style
  const getBackgroundStyle = () => {
    let style = {};

    if (bgImage) {
      // Background image
      style.backgroundImage = `url(${bgImage})`;
      style.backgroundSize = bgSize;
      style.backgroundPosition = bgPosition;
      style.backgroundRepeat = bgRepeat;
      if (bgBlur > 0) {
        style.position = 'relative';
      }
    } else if (bgGradient) {
      // Gradient background
      style.background = `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`;
    } else {
      // Solid color
      style.backgroundColor = bgColor;
    }

    return style;
  };

  return (
    <div style={{
      ...getBackgroundStyle(),
      color: textColor,
      padding: '48px 24px',
      textAlign: alignment,
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Blur layer (if bgImage and blur > 0) */}
      {bgImage && bgBlur > 0 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: bgSize,
          backgroundPosition: bgPosition,
          backgroundRepeat: bgRepeat,
          filter: `blur(${bgBlur}px)`,
          zIndex: 0
        }} />
      )}

      {/* Overlay layer (if bgImage or gradient) */}
      {(bgImage || bgGradient) && overlayOpacity > 0 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          zIndex: 1
        }} />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.2 }}>
          {highlightText(title)}
        </h1>
        {subtitle && <p style={{ fontSize: '16px', opacity: 0.8, margin: 0 }}>{highlightText(subtitle)}</p>}
      </div>
    </div>
  );
}
