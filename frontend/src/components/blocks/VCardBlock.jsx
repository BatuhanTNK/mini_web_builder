export default function VCardBlock({ data = {} }) {
  const {
    name = 'Ahmet Yılmaz',
    phone = '+90 532 123 45 67',
    email = 'ahmet.yilmaz@example.com',
    company = 'Tech Solutions A.Ş.',
    website = 'https://ahmetyilmaz.com',
    downloadable = true,
    jobTitle = 'Yazılım Geliştirici',
    avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
    // Renkler
    avatarBg = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    avatarTextColor = '#ffffff',
    nameColor = '#ffffff',
    textColor = 'rgba(255,255,255,0.8)',
    iconColor = '#667eea',
    btnBg = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    btnTextColor = '#ffffff',
  } = data;

  const generateVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      `ORG:${company}`,
      `TITLE:${jobTitle}`,
      `TEL:${phone}`,
      `EMAIL:${email}`,
      website ? `URL:${website}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\s+/g, '_')}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="vcard-block">
      <div className="vcard-block__header">
        <div className="vcard-block__avatar" style={{ background: avatarBg, color: avatarTextColor }}>
          {avatar
            ? <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
            : name.charAt(0).toUpperCase()
          }
        </div>
        <div className="vcard-block__info">
          <h3 className="vcard-block__name" style={{ color: nameColor }}>{name}</h3>
          {jobTitle && <p className="vcard-block__title" style={{ color: textColor }}>{jobTitle}</p>}
          {company && <p className="vcard-block__company" style={{ color: textColor }}>{company}</p>}
        </div>
      </div>

      <div className="vcard-block__contacts">
        {phone && (
          <a href={`tel:${phone}`} className="vcard-block__contact-item" style={{ color: textColor }}>
            <span className="vcard-block__contact-icon" style={{ color: iconColor }}>📞</span>
            <span>{phone}</span>
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="vcard-block__contact-item" style={{ color: textColor }}>
            <span className="vcard-block__contact-icon" style={{ color: iconColor }}>✉️</span>
            <span>{email}</span>
          </a>
        )}
        {website && (
          <a href={website} target="_blank" rel="noreferrer" className="vcard-block__contact-item" style={{ color: textColor }}>
            <span className="vcard-block__contact-icon" style={{ color: iconColor }}>🌐</span>
            <span>{website.replace(/^https?:\/\//, '')}</span>
          </a>
        )}
      </div>

      {downloadable && (
        <button
          className="vcard-block__download"
          onClick={generateVCard}
          style={{ background: btnBg, color: btnTextColor }}
        >
          <span>📥</span> Kişiyi Kaydet
        </button>
      )}
    </div>
  );
}
