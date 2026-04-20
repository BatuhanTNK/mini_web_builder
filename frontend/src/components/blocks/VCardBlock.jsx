export default function VCardBlock({ data = {} }) {
  const {
    name = 'Adınız Soyadınız',
    phone = '+90 555 000 00 00',
    email = 'ornek@email.com',
    company = 'Şirket Adı',
    website = '',
    downloadable = true,
    jobTitle = 'Pozisyon'
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
        <div className="vcard-block__avatar">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="vcard-block__info">
          <h3 className="vcard-block__name">{name}</h3>
          {jobTitle && <p className="vcard-block__title">{jobTitle}</p>}
          {company && <p className="vcard-block__company">{company}</p>}
        </div>
      </div>

      <div className="vcard-block__contacts">
        {phone && (
          <a href={`tel:${phone}`} className="vcard-block__contact-item">
            <span className="vcard-block__contact-icon">📞</span>
            <span>{phone}</span>
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="vcard-block__contact-item">
            <span className="vcard-block__contact-icon">✉️</span>
            <span>{email}</span>
          </a>
        )}
        {website && (
          <a href={website} target="_blank" rel="noreferrer" className="vcard-block__contact-item">
            <span className="vcard-block__contact-icon">🌐</span>
            <span>{website.replace(/^https?:\/\//, '')}</span>
          </a>
        )}
      </div>

      {downloadable && (
        <button className="vcard-block__download" onClick={generateVCard}>
          <span>📥</span> Kişiyi Kaydet
        </button>
      )}
    </div>
  );
}
