export default function LinkListBlock({ data }) {
  const { links = [] } = data || {};

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 20px', borderRadius: '12px',
            backgroundColor: link.color || '#6366f1', color: '#fff',
            textDecoration: 'none', fontWeight: 500, fontSize: '15px',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          {link.icon && <span style={{ fontSize: '18px' }}>{link.icon}</span>}
          <span style={{ flex: 1, textAlign: 'center' }}>{link.label || 'İsimsiz Link'}</span>
        </a>
      ))}
    </div>
  );
}
