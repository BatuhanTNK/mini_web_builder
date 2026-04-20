export default function ImageBlock({ data }) {
  const { src = '', alt = '', borderRadius = '16px', aspectRatio = '16/9', link = '' } = data || {};

  const imgContent = src ? (
    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius, display: 'block' }} loading="lazy" />
  ) : (
    <div style={{
      width: '100%', aspectRatio, borderRadius, backgroundColor: '#2a2a3e',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '14px'
    }}>
      Gorsel ekleyin
    </div>
  );

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>{imgContent}</a>;
  }
  return <div style={{ aspectRatio, overflow: 'hidden', borderRadius }}>{imgContent}</div>;
}
