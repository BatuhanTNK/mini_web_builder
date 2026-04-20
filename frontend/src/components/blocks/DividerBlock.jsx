export default function DividerBlock({ data }) {
  const { style = 'line', color = 'rgba(255,255,255,0.15)', height = 1 } = data || {};

  if (style === 'space') {
    return <div style={{ height: `${height * 16}px` }} />;
  }

  if (style === 'dots') {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0', letterSpacing: '8px', color, fontSize: '16px' }}>
        ···
      </div>
    );
  }

  if (style === 'wave') {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <svg width="100%" height="20" viewBox="0 0 400 20" preserveAspectRatio="none">
          <path d="M0,10 C50,0 100,20 150,10 C200,0 250,20 300,10 C350,0 400,20 400,10" fill="none" stroke={color} strokeWidth="2"/>
        </svg>
      </div>
    );
  }

  return <hr style={{ border: 'none', borderTop: `${height}px solid ${color}`, margin: '8px 0' }} />;
}
