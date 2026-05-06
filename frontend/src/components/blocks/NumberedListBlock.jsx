export default function NumberedListBlock({ data }) {
  const { items = [], accentColor = '#6366f1', titleColor = '#ffffff', descColor = 'rgba(255, 255, 255, 0.7)' } = data || {};

  if (!items || items.length === 0) {
    return (
      <div style={{ 
        padding: '32px 20px', 
        textAlign: 'center', 
        backgroundColor: 'var(--color-surface-2, rgba(255,255,255,0.05))', 
        borderRadius: '12px', 
        color: 'var(--color-text-muted, #9ca3af)',
        border: '1px dashed var(--color-border, #374151)'
      }}>
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>📋</span>
        Henüz liste maddesi eklenmedi. Sağ panelden yeni madde ekleyebilirsiniz.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <span style={{
            color: accentColor, fontSize: '36px', fontWeight: 800,
            lineHeight: 1, minWidth: '48px', paddingTop: '2px'
          }}>
            {item.number || String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 600, color: titleColor }}>{item.title || 'Yeni Madde'}</h4>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: descColor }}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
