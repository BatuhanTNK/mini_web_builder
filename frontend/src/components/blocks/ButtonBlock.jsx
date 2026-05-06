export default function ButtonBlock({ data }) {
  const {
    label = 'Buton', url = '#', style = 'filled', color = '#6366f1',
    textColor = '#ffffff', target = '_blank',
    size = 'md', fullWidth = true, borderRadius = 12,
    fontWeight = 'bold', textTransform = 'none',
    hoverEffect = 'lift',
    // Border
    borderWidth = 0, borderColor = '#000000', borderStyle = 'solid',
    // Animation
    animation = 'none',
    // Link type
    linkType = 'url'
  } = data || {};

  // ── Size presets ──
  const sizeMap = {
    sm: { padding: '10px 20px', fontSize: '14px' },
    md: { padding: '14px 28px', fontSize: '16px' },
    lg: { padding: '18px 36px', fontSize: '18px' },
  };
  const { padding, fontSize } = sizeMap[size] || sizeMap.md;

  // ── Resolve href based on linkType ──
  let href = url || '#';
  if (linkType === 'tel') href = url.startsWith('tel:') ? url : `tel:${url}`;
  else if (linkType === 'mail') href = url.startsWith('mailto:') ? url : `mailto:${url}`;

  const baseStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    padding, borderRadius: `${borderRadius}px`, fontSize,
    fontWeight: fontWeight === 'bold' ? 700 : 400,
    textTransform,
    textDecoration: 'none', cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
    boxSizing: 'border-box',
    transition: 'transform 0.25s ease, opacity 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
    fontFamily: 'inherit',
    letterSpacing: textTransform === 'uppercase' ? '0.5px' : undefined,
    border: borderWidth > 0 ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
  };

  const styles = {
    filled: { ...baseStyle, backgroundColor: color, color: textColor },
    outline: { ...baseStyle, backgroundColor: 'transparent', color, border: `2px solid ${color}` },
    ghost: { ...baseStyle, backgroundColor: 'transparent', color, opacity: 0.9 }
  };

  if (style === 'outline' && borderWidth > 0) {
    styles.outline.border = `${borderWidth}px ${borderStyle} ${borderColor || color}`;
  }

  const hoverClass = hoverEffect && hoverEffect !== 'none' ? `btn-hover--${hoverEffect}` : '';
  const animClass = animation && animation !== 'none' ? `btn-anim--${animation}` : '';

  return (
    <div style={{ padding: '4px 0', textAlign: 'center' }}>
      <a
        href={href}
        target={linkType === 'url' ? target : '_self'}
        rel="noopener noreferrer"
        style={styles[style] || styles.filled}
        className={`btn-block__link ${hoverClass} ${animClass}`.trim()}
      >
        {label}
      </a>
    </div>
  );
}
