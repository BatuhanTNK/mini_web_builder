export default function TimelineBlock({ data }) {
  const { title = '', items = [], cards = [], accentColor = '#6366f1', titleColor = 'var(--site-text, #ffffff)' } = data || {};
  
  // Support both 'items' (new) and 'cards' (legacy)
  const displayItems = items.length > 0 ? items : cards;

  if (!displayItems || displayItems.length === 0) {
    return (
      <div style={{ 
        padding: '32px 20px', 
        textAlign: 'center', 
        backgroundColor: 'rgba(255,255,255,0.03)', 
        borderRadius: '16px', 
        color: 'var(--site-text, #9ca3af)',
        border: '1px dashed var(--site-border, rgba(255,255,255,0.1))',
        opacity: 0.6
      }}>
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>⏳</span>
        Süreç adımları henüz eklenmedi.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0' }}>
      {title && (
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          margin: '0 0 4px 0',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: titleColor
        }}>
          {title}
        </h3>
      )}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0', 
        position: 'relative',
        paddingLeft: '32px',
        borderLeft: `2px solid var(--site-border, rgba(255,255,255,0.1))`
      }}>
        {displayItems.map((item, i) => (
          <div key={i} style={{
            position: 'relative',
            paddingBottom: i === displayItems.length - 1 ? 0 : '32px',
          }}>
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: '-41px',
              top: '4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: accentColor,
              border: '4px solid var(--site-bg, #0a0a0a)',
              boxShadow: `0 0 15px ${accentColor}44`,
              zIndex: 2
            }} />
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {item.title && (
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  margin: 0, 
                  lineHeight: 1.3,
                  color: 'var(--site-text, #ffffff)' 
                }}>
                  {item.title}
                </h4>
              )}
              {item.description && (
                <p style={{ 
                  fontSize: '15px', 
                  margin: 0, 
                  opacity: 0.7, 
                  lineHeight: 1.6,
                  color: 'var(--site-text, #ffffff)' 
                }}>
                  {item.description}
                </p>
              )}
              {item.image && (
                <img src={item.image} alt={item.title || 'Step image'} style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  marginTop: '12px',
                  border: '1px solid var(--site-border, rgba(255,255,255,0.1))'
                }}/>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
