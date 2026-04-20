import { useState } from 'react';

export default function ContactFormBlock({ data }) {
  const { submitLabel = 'Gonder', recipientEmail = '' } = data || {};
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)', color: 'inherit', fontSize: '14px',
    boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="text" placeholder="Adiniz" required style={inputStyle} />
      <input type="email" placeholder="E-posta adresiniz" required style={inputStyle} />
      <textarea placeholder="Mesajiniz" rows={4} required style={{ ...inputStyle, resize: 'vertical' }} />
      <button type="submit" style={{
        padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer',
        backgroundColor: '#6366f1', color: '#fff', fontSize: '15px', fontWeight: 600, fontFamily: 'inherit'
      }}>
        {sent ? 'Gonderildi!' : submitLabel}
      </button>
    </form>
  );
}
