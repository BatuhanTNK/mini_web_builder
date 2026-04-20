export default function ProductCardBlock({ data }) {
  const {
    image = '', name = '', price = '', originalPrice = '',
    buyUrl = '#', currency = '₺',
    buttonText = 'Satin Al', buttonColor = '#6366f1', buttonTextColor = '#ffffff',
    showButton = true, priceColor = '#6366f1',
    description = ''
  } = data || {};

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' }}>
      <div style={{ aspectRatio: '1/1', backgroundColor: '#2a2a3e', overflow: 'hidden' }}>
        {image ? (
          <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            Urun gorseli
          </div>
        )}
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600 }}>{name}</h3>
        {description && (
          <p style={{ margin: '0 0 10px', fontSize: '13px', opacity: 0.7, lineHeight: 1.4 }}>{description}</p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, color: priceColor }}>{price}{currency}</span>
          {originalPrice && (
            <span style={{ fontSize: '14px', textDecoration: 'line-through', opacity: 0.5 }}>{originalPrice}{currency}</span>
          )}
        </div>
        {showButton && (
          <a href={buyUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'block', textAlign: 'center', padding: '12px', borderRadius: '10px',
            backgroundColor: buttonColor, color: buttonTextColor, textDecoration: 'none', fontWeight: 600, fontSize: '14px'
          }}>
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}
