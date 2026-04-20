export default function NumberedListBlock({ data }) {
  const { items = [], accentColor = '#6366f1' } = data || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={{
            color: accentColor, fontSize: '28px', fontWeight: 800,
            lineHeight: 1, minWidth: '40px'
          }}>
            {item.number || String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>{item.title}</h4>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
