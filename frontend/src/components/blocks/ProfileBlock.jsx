export default function ProfileBlock({ data }) {
  const { avatar = '', name = '', title = '', bio = '', shape = 'circle' } = data || {};

  return (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <div style={{
        width: '96px', height: '96px', margin: '0 auto 16px',
        borderRadius: shape === 'circle' ? '50%' : '16px', overflow: 'hidden',
        backgroundColor: '#2a2a3e'
      }}>
        {avatar ? (
          <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', color: '#666' }}>
            {name ? name.charAt(0).toUpperCase() : '?'}
          </div>
        )}
      </div>
      <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 700 }}>{name}</h2>
      {title && <p style={{ margin: '0 0 8px', fontSize: '14px', opacity: 0.7 }}>{title}</p>}
      {bio && <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, lineHeight: 1.6 }}>{bio}</p>}
    </div>
  );
}
