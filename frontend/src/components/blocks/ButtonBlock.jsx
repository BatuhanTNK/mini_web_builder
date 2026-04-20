export default function ButtonBlock({ data }) {
  const { label = 'Buton', url = '#', style = 'filled', color = '#6366f1', textColor = '#ffffff', icon = '', target = '_blank' } = data || {};

  const baseStyle = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    padding: '14px 28px', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
    textDecoration: 'none', cursor: 'pointer', width: '100%', boxSizing: 'border-box',
    transition: 'transform 0.2s, opacity 0.2s', border: 'none', fontFamily: 'inherit'
  };

  const styles = {
    filled: { ...baseStyle, backgroundColor: color, color: textColor },
    outline: { ...baseStyle, backgroundColor: 'transparent', color, border: `2px solid ${color}` },
    ghost: { ...baseStyle, backgroundColor: 'transparent', color, opacity: 0.9 }
  };

  return (
    <div style={{ padding: '4px 0' }}>
      <a href={url} target={target} rel="noopener noreferrer" style={styles[style] || styles.filled}>
        {icon && <span>{icon}</span>}
        {label}
      </a>
    </div>
  );
}
