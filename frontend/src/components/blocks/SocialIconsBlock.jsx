import { 
  FaInstagram, FaTwitter, FaYoutube, FaLinkedin, 
  FaFacebook, FaTiktok, FaGithub, FaSpotify, 
  FaPinterest, FaTelegram, FaWhatsapp, FaEnvelope, FaGlobe,
  FaSnapchat, FaDiscord, FaTwitch, FaReddit, FaMedium, FaDribbble, FaBehance
} from 'react-icons/fa6';

const platformIcons = {
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
  linkedin: <FaLinkedin />,
  facebook: <FaFacebook />,
  tiktok: <FaTiktok />,
  github: <FaGithub />,
  spotify: <FaSpotify />,
  pinterest: <FaPinterest />,
  telegram: <FaTelegram />,
  whatsapp: <FaWhatsapp />,
  email: <FaEnvelope />,
  website: <FaGlobe />,
  snapchat: <FaSnapchat />,
  discord: <FaDiscord />,
  twitch: <FaTwitch />,
  reddit: <FaReddit />,
  medium: <FaMedium />,
  dribbble: <FaDribbble />,
  behance: <FaBehance />
};

const platformColors = {
  instagram: '#E1306C',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
  linkedin: '#0077B5',
  facebook: '#1877F2',
  tiktok: '#ffffff', // Beyaz veya #000000
  github: '#ffffff', // Beyaz veya #181717
  spotify: '#1DB954',
  pinterest: '#BD081C',
  telegram: '#2AABEE',
  whatsapp: '#25D366',
  email: '#EA4335',
  website: '#4285F4',
  snapchat: '#FFFC00',
  discord: '#5865F2',
  twitch: '#9146FF',
  reddit: '#FF4500',
  medium: '#ffffff', // Medium genelde siyah beyazdır
  dribbble: '#EA4C89',
  behance: '#1769FF'
};

export default function SocialIconsBlock({ data, isDarkMode = false }) {
  const { 
    socials = [],
    iconBgColor = 'rgba(0,0,0,0.06)',
    iconBorderColor = 'rgba(0,0,0,0.12)',
    iconBorderWidth = 2
  } = data || {};

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
      {socials.map((social, i) => {
        // Hover için biraz daha koyu renk
        const hoverBgColor = iconBgColor.includes('rgba') 
          ? iconBgColor.replace(/[\d.]+\)$/g, match => {
              const opacity = parseFloat(match);
              return `${Math.min(opacity + 0.04, 1)})`;
            })
          : iconBgColor;
        
        return (
          <a
            key={i}
            href={social.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
            style={{
              width: '56px', 
              height: '56px', 
              borderRadius: '50%',
              backgroundColor: iconBgColor,
              border: iconBorderWidth > 0 ? `${iconBorderWidth}px solid ${iconBorderColor}` : 'none',
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center', 
              textDecoration: 'none',
              fontSize: '28px', 
              transition: 'transform 0.2s, background-color 0.2s',
              color: platformColors[social.platform] || '#ffffff',
              boxSizing: 'border-box'
            }}
            title={social.platform === 'other' ? social.customName : social.platform}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = hoverBgColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = iconBgColor;
            }}
          >
            {social.platform === 'other' && social.customIcon ? (
              <img src={social.customIcon} alt={social.customName || 'custom'} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            ) : (
              platformIcons[social.platform] || '🔗'
            )}
          </a>
        );
      })}
    </div>
  );
}
