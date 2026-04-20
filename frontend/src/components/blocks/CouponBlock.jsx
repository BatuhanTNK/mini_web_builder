import { useState } from 'react';

export default function CouponBlock({ data }) {
  const { code = '', discount = '', description = '', expiryDate = '', copyable = true } = data || {};
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  return (
    <div style={{
      border: '2px dashed rgba(255,255,255,0.3)', borderRadius: '16px',
      padding: '24px', textAlign: 'center'
    }}>
      {discount && <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>{discount}</div>}
      {description && <p style={{ fontSize: '14px', opacity: 0.8, margin: '0 0 16px' }}>{description}</p>}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px'
      }}>
        <code style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '2px' }}>{code}</code>
        {copyable && (
          <button onClick={handleCopy} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px',
            padding: '6px 14px', color: 'inherit', cursor: 'pointer', fontSize: '13px'
          }}>
            {copied ? 'Kopyalandi!' : 'Kopyala'}
          </button>
        )}
      </div>
      {expiryDate && (
        <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '12px', marginBottom: 0 }}>
          Son kullanma: {new Date(expiryDate).toLocaleDateString('tr-TR')}
        </p>
      )}
    </div>
  );
}
