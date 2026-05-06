export default function LinkListBlock({ data }) {
  const {
    links = [], size = 'md', borderRadius = 12,
    fontWeight = 'bold', textTransform = 'none',
    hoverEffect = 'lift', animation = 'none',
    borderWidth = 0, borderColor = '#000000', borderStyle = 'solid',
    fullWidth = true
  } = data || {};

  if (!links || links.length === 0) {
    return (
      <div style={{ 
        padding: '32px 20px', 
        textAlign: 'center', 
        backgroundColor: 'var(--color-surface-2, rgba(255,255,255,0.05))', 
        borderRadius: '12px', 
        color: 'var(--color-text-muted, #9ca3af)',
        border: '1px dashed var(--color-border, #374151)'
      }}>
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🔗</span>
        Henüz link eklenmedi. Sağ panelden link ekleyebilirsiniz.
      </div>
    );
  }

  const sizeMap = {
    sm: { padding: '10px 16px', fontSize: '13px' },
    md: { padding: '14px 20px', fontSize: '15px' },
    lg: { padding: '18px 24px', fontSize: '17px' },
  };
  const { padding, fontSize } = sizeMap[size] || sizeMap.md;

  const hoverClass = hoverEffect && hoverEffect !== 'none' ? `btn-hover--${hoverEffect}` : '';
  const animClass = animation && animation !== 'none' ? `btn-anim--${animation}` : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-block__link ${hoverClass} ${animClass}`.trim()}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding, borderRadius: `${borderRadius}px`,
            backgroundColor: link.color || '#6366f1', color: '#fff',
            textDecoration: 'none',
            fontWeight: fontWeight === 'bold' ? 600 : 400,
            fontSize, textTransform,
            width: fullWidth ? '100%' : 'auto', boxSizing: 'border-box',
            transition: 'transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease',
            border: borderWidth > 0 ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
            letterSpacing: textTransform === 'uppercase' ? '0.5px' : undefined,
          }}
        >
          {link.icon && <span style={{ fontSize: '18px' }}>{link.icon}</span>}
          <span style={{ flex: 1, textAlign: 'center' }}>{link.label || 'İsimsiz Link'}</span>
        </a>
      ))}
    </div>
  );
}
