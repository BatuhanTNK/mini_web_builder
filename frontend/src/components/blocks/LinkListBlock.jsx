export default function LinkListBlock({ data }) {
  const { links = [] } = data || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            transition: 'transform 0.2s'
          }}
        >
          {link.icon && <span style={{ fontSize: '18px' }}>{link.icon}</span>}
          <span style={{ flex: 1, textAlign: 'center' }}>{link.label}</span>
        </a>
      ))}
    </div>
  );
}
