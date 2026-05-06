import { useState } from 'react';

export default function CouponBlock({ data }) {
  const {
    code = '',
    discount = '',
    description = '',
    expiryDate = '',
    copyable = true,
    // Colors
    discountColor = '#ffffff',
    descriptionColor = 'rgba(255,255,255,0.7)',
    codeBg = 'rgba(255,255,255,0.08)',
    codeColor = '#ffffff',
    borderColor = 'rgba(255,255,255,0.25)',
    copyBtnBg = '#6366f1',
    copyBtnColor = '#ffffff',
    expiryColor = 'rgba(255,255,255,0.45)',
  } = data || {};

  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isExpired = expiryDate && new Date(expiryDate) < new Date().setHours(0,0,0,0);

  const handleCopy = async () => {
    if (isExpired) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setShowConfetti(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowConfetti(false), 1000);
    } catch { /* clipboard not available */ }
  };

  return (
    <div className={`coupon-card ${isExpired ? 'coupon-card--expired' : ''}`} style={{
      border: `2px dashed ${borderColor}`,
      borderRadius: '20px',
      padding: '30px 20px',
      textAlign: 'center',
      position: 'relative',
      background: isExpired ? 'rgba(0,0,0,0.2)' : 'transparent',
      transition: 'all 0.3s ease'
    }}>
      {isExpired && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: '#ef4444',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: '20px',
          textTransform: 'uppercase'
        }}>Süresi Doldu</div>
      )}

      {discount && (
        <div style={{
          fontSize: '36px', fontWeight: 900, marginBottom: '4px',
          color: isExpired ? '#666' : discountColor,
          textShadow: isExpired ? 'none' : '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          {discount}
        </div>
      )}
      {description && (
        <p style={{
          fontSize: '14px', margin: '0 0 20px',
          color: isExpired ? '#555' : descriptionColor,
          fontWeight: 500
        }}>
          {description}
        </p>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        backgroundColor: isExpired ? 'rgba(255,255,255,0.03)' : codeBg, 
        borderRadius: '12px', padding: '14px 20px',
        border: `1px solid ${isExpired ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'}`,
        position: 'relative'
      }}>
        <code style={{
          fontSize: '22px', fontWeight: 800, letterSpacing: '3px',
          color: isExpired ? '#444' : codeColor,
          fontFamily: 'monospace'
        }}>
          {code}
        </code>
        {copyable && !isExpired && (
          <button onClick={handleCopy} style={{
            background: copied ? '#22c55e' : copyBtnBg,
            border: 'none', borderRadius: '8px',
            padding: '8px 16px', color: copyBtnColor,
            cursor: 'pointer', fontSize: '13px', fontWeight: 700,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: copied ? '0 0 15px rgba(34,197,94,0.4)' : '0 4px 10px rgba(0,0,0,0.2)',
            transform: copied ? 'scale(1.05)' : 'scale(1)'
          }}>
            {copied ? '✓' : 'Kopyala'}
          </button>
        )}
        
        {showConfetti && (
          <div className="coupon-confetti">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`confetti-bit bit-${i}`} />
            ))}
          </div>
        )}
      </div>

      {expiryDate && (
        <p style={{
          fontSize: '12px', marginTop: '16px', marginBottom: 0,
          color: isExpired ? '#ef4444' : expiryColor,
          fontWeight: 600
        }}>
          {isExpired ? 'Kampanya Sona Erdi' : `Son Gün: ${new Date(expiryDate).toLocaleDateString('tr-TR')}`}
        </p>
      )}
    </div>
  );
}
