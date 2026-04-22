export default function TimelineBlock({ data }) {
  const { title = '', cards = [] } = data || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px 0' }}>
      {title && (
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          margin: '0 0 8px 0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {title}
        </h3>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            backgroundColor: c.bgColor || '#6366f1',
            color: c.textColor || '#ffffff',
            padding: '24px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {c.time && (
              <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.9 }}>
                {c.time}
              </span>
            )}
            {c.title && (
              <h4 style={{ fontSize: '20px', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                {c.title}
              </h4>
            )}
            {c.description && (
              <p style={{ fontSize: '15px', margin: 0, opacity: 0.85, lineHeight: 1.5 }}>
                {c.description}
              </p>
            )}
            {c.image && (
              <img src={c.image} alt={c.title || 'Timeline image'} style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginTop: '8px'
              }}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
