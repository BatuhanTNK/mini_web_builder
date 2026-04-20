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
  const { targetDate = '', label = '', showDays = true } = data || {};
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    if (!targetDate) return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [];
  if (showDays) units.push({ value: timeLeft.days, label: 'Gun' });
  units.push({ value: timeLeft.hours, label: 'Saat' });
  units.push({ value: timeLeft.minutes, label: 'Dk' });
  units.push({ value: timeLeft.seconds, label: 'Sn' });

  const boxStyle = {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px',
    padding: '16px 12px', minWidth: '60px', textAlign: 'center'
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {label && <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.8 }}>{label}</p>}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {units.map((u, i) => (
          <div key={i} style={boxStyle}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{String(u.value).padStart(2, '0')}</div>
            <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px' }}>{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
