const platformIcons = {
  instagram: '📸', twitter: '🐦', youtube: '🎬', linkedin: '💼',
  facebook: '👤', tiktok: '🎵', github: '💻', spotify: '🎧',
  pinterest: '📌', telegram: '✈️', whatsapp: '💬', email: '📧', website: '🌐'
};

export default function SocialIconsBlock({ data }) {
  const { socials = [] } = data || {};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
            fontSize: '20px', transition: 'transform 0.2s'
          }}
          title={social.platform}
        >
          {platformIcons[social.platform] || '🔗'}
        </a>
      ))}
    </div>
  );
}
