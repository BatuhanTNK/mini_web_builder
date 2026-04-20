export default function HeroBlock({ data }) {
  const { title = '', subtitle = '', accentWord = '', accentColor = '#6366f1', bgColor = '#0f0f13', textColor = '#ffffff', alignment = 'center' } = data || {};

  const renderTitle = () => {
    if (!accentWord || !title.includes(accentWord)) {
      return title;
    }
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}<span style={{ color: accentColor }}>{accentWord}</span>{parts.slice(1).join(accentWord)}
      </>
    );
  };

  return (
    <div style={{
      backgroundColor: bgColor,
      color: textColor,
      padding: '48px 24px',
      textAlign: alignment,
      borderRadius: '16px'
    }}>
      <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.2 }}>
        {renderTitle()}
      </h1>
      {subtitle && <p style={{ fontSize: '16px', opacity: 0.8, margin: 0 }}>{subtitle}</p>}
    </div>
  );
}
