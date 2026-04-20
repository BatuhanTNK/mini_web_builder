export default function MapBlock({ data }) {
  const { locationType = 'address', address = '', lat, lng, zoom = 13, height = 200 } = data || {};

  let query = '';
  if (locationType === 'coordinates') {
    if (lat && lng) query = `${lat},${lng}`;
  } else {
    // Adres modu (Eski siteler için geriye dönük uyumluluk adına lat/lng fallback)
    query = address || (lat && lng ? `${lat},${lng}` : '');
  }

  if (!query) {
    return (
      <div style={{
        height: `${height}px`, borderRadius: '16px', backgroundColor: 'var(--color-surface-2, #2a2a3e)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted, #666)', fontSize: '14px', border: '1px solid var(--color-border)'
      }}>
        📍 Harita için konum bilgisi girin
      </div>
    );
  }

  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

  return (
    <iframe
      src={src}
      width="100%"
      height={height}
      style={{ border: 'none', borderRadius: '16px', display: 'block' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Harita"
    />
  );
}

