const platformIcons = {
  instagram: '📸', twitter: '🐦', youtube: '🎬', linkedin: '💼',
  facebook: '👤', tiktok: '🎵', github: '💻', spotify: '🎧',
  pinterest: '📌', telegram: '✈️', whatsapp: '💬', email: '📧', website: '🌐'
};

export default function SocialIconsBlock({ data }) {
  const { socials = [] } = data || {};

  if (!socials || socials.length === 0) {
    return (
      <div style={{ 
        padding: '32px 20px', 
        textAlign: 'center', 
        backgroundColor: 'var(--color-surface-2, rgba(255,255,255,0.05))', 
        borderRadius: '12px', 
        color: 'var(--color-text-muted, #9ca3af)',
        border: '1px dashed var(--color-border, #374151)'
      }}>
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🌍</span>
        Henüz sosyal ağ eklenmedi. Sağ panelden hesaplarınızı ekleyebilirsiniz.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', padding: '16px 0' }}>
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '56px', height: '56px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
            fontSize: '28px', transition: 'transform 0.2s, background-color 0.2s'
          }}
          title={social.platform}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
        >
          {platformIcons[social.platform] || '🔗'}
        </a>
      ))}
    </div>
  );
}
