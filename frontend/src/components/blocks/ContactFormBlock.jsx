import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ContactFormBlock({ data }) {
  const { slug } = useParams();
  const { 
    submitLabel = 'Gönder', 
    successMessage = 'Mesajınız başarıyla iletildi!',
    namePlaceholder = 'Adınız',
    emailPlaceholder = 'E-posta adresiniz',
    messagePlaceholder = 'Mesajınız',
    // Colors
    btnBg = '#6366f1',
    btnTextColor = '#ffffff',
    inputBg = 'rgba(255,255,255,0.05)',
    inputBorderColor = 'rgba(255,255,255,0.15)',
    inputTextColor = 'inherit'
  } = data || {};

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: '12px', 
    border: `1.5px solid ${inputBorderColor}`,
    backgroundColor: inputBg, 
    color: inputTextColor, 
    fontSize: '14px',
    boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none',
    transition: 'all 0.2s ease'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slug) {
      // If we're in builder mode (no slug in URL), just mock success
      setSent(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/public/${slug}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ 
        textAlign: 'center', padding: '40px 20px', borderRadius: '16px', 
        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' 
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>✅</div>
        <p style={{ margin: 0, fontWeight: 600, color: 'inherit' }}>{successMessage}</p>
        <button 
          onClick={() => setSent(false)} 
          style={{ 
            marginTop: '16px', background: 'none', border: 'none', 
            color: '#6366f1', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' 
          }}
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <input 
        type="text" 
        placeholder={namePlaceholder} 
        required 
        style={inputStyle}
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input 
        type="email" 
        placeholder={emailPlaceholder} 
        required 
        style={inputStyle}
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea 
        placeholder={messagePlaceholder} 
        rows={4} 
        required 
        style={{ ...inputStyle, resize: 'vertical' }}
        value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })}
      />
      <button 
        type="submit" 
        disabled={loading}
        style={{
          padding: '16px', borderRadius: '12px', border: 'none', 
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: btnBg, 
          color: btnTextColor, 
          fontSize: '15px', fontWeight: 700, fontFamily: 'inherit',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Gönderiliyor...' : submitLabel}
      </button>
    </form>
  );
}
