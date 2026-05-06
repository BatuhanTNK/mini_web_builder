import { useState, useEffect } from 'react';

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

export default function CountdownBlock({ data }) {
  const {
    targetDate = '',
    label = '',
    style = 'card', // card, minimal, neon
    showDays = true,
    expiredMessage = 'Kampanya Sona Erdi!',
    hideOnExpire = false,
    // Colors
    labelColor = 'rgba(255,255,255,0.8)',
    boxBg = 'rgba(255,255,255,0.1)',
    numberColor = '#ffffff',
    unitLabelColor = 'rgba(255,255,255,0.6)',
    accentColor = '#6366f1',
  } = data || {};

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!targetDate) return;
    const update = () => {
      const left = getTimeLeft(targetDate);
      setTimeLeft(left);
      if (left.days === 0 && left.hours === 0 && left.minutes === 0 && left.seconds === 0) {
        setIsExpired(true);
      } else {
        setIsExpired(false);
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired && hideOnExpire) return null;

  if (isExpired && expiredMessage) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', borderRadius: '12px', background: boxBg }}>
        <p style={{ margin: 0, fontWeight: 700, color: numberColor }}>{expiredMessage}</p>
      </div>
    );
  }

  const units = [];
  if (showDays) units.push({ value: timeLeft.days, label: 'Gün' });
  units.push({ value: timeLeft.hours, label: 'Saat' });
  units.push({ value: timeLeft.minutes, label: 'Dk' });
  units.push({ value: timeLeft.seconds, label: 'Sn' });

  const getStyleProps = (u) => {
    switch (style) {
      case 'minimal':
        return {
          box: { padding: '8px 4px', minWidth: '50px' },
          number: { fontSize: '32px', fontWeight: 800, color: numberColor },
          unit: { fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6 }
        };
      case 'neon':
        return {
          box: { 
            padding: '16px 12px', 
            minWidth: '70px', 
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 15px ${accentColor}66, inset 0 0 10px ${accentColor}33`,
            borderRadius: '12px',
            background: 'rgba(0,0,0,0.3)'
          },
          number: { fontSize: '30px', fontWeight: 900, color: accentColor, textShadow: `0 0 10px ${accentColor}` },
          unit: { fontSize: '11px', color: unitLabelColor, fontWeight: 600 }
        };
      case 'card':
      default:
        return {
          box: { backgroundColor: boxBg, borderRadius: '12px', padding: '16px 12px', minWidth: '60px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
          number: { fontSize: '28px', fontWeight: 700, color: numberColor },
          unit: { fontSize: '11px', marginTop: '4px', color: unitLabelColor }
        };
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {label && (
        <p style={{ marginBottom: '20px', fontSize: '14px', fontWeight: 600, color: labelColor, letterSpacing: '0.05em' }}>
          {label}
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: style === 'minimal' ? '20px' : '12px', alignItems: 'center' }}>
        {units.map((u, i) => {
          const s = getStyleProps(u);
          return (
            <div key={i} style={s.box}>
              <div style={s.number}>
                {String(u.value).padStart(2, '0')}
              </div>
              <div style={s.unit}>
                {u.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
