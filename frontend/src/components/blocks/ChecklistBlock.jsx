export default function ChecklistBlock({ data }) {
  const { title = '', items = [], checkColor = '#9ca3af', titleColor = '#ffffff', textColor = '#ffffff' } = data || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
      {title && (
         <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, textTransform: 'uppercase', color: titleColor }}>
           {title}
         </h3>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={checkColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                <polyline points="20 6 9 17 4 12" />
             </svg>
             <span style={{ fontSize: '16px', lineHeight: 1.5, fontWeight: 500, color: textColor }}>
               {item.text}
             </span>
          </div>
        ))}
      </div>
    </div>
  );
}
