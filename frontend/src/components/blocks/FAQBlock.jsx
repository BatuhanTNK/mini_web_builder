import { useState } from 'react';

export default function FAQBlock({ data = {}, isDarkMode }) {
  const {
    items = [],
    title = '',
    // Renkler
    questionColor = '#ffffff',
    answerColor = 'rgba(255,255,255,0.65)',
    borderColor = 'rgba(255,255,255,0.12)',
    iconColor = '#6366f1',
    activeBg = 'rgba(99,102,241,0.08)',
  } = data;

  const [openIndex, setOpenIndex] = useState(null);

  const resolved = {
    questionColor: (questionColor === '#ffffff' || questionColor === 'var(--site-text)') ? 'var(--site-text)' : questionColor,
    answerColor: (answerColor === 'rgba(255,255,255,0.65)' || answerColor === 'var(--site-text)') ? 'var(--site-text)' : answerColor,
    borderColor: (borderColor === 'rgba(255,255,255,0.12)') ? 'var(--site-border, rgba(0,0,0,0.1))' : borderColor,
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items.length) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', opacity: 0.4, fontSize: '14px' }}>
        Henüz soru eklenmedi.
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {title && (
        <h3 style={{ 
          margin: '0 0 16px', 
          fontSize: '18px', 
          fontWeight: 700, 
          color: resolved.questionColor,
          padding: '0 8px'
        }}>
          {title}
        </h3>
      )}
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              borderBottom: `1px solid ${resolved.borderColor}`,
              background: isOpen ? activeBg : 'transparent',
              borderRadius: isOpen ? '8px' : '0',
              transition: 'background 0.2s',
            }}
          >
            <button
              onClick={() => toggle(index)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '12px',
              }}
            >
              <span style={{
                fontSize: '15px',
                fontWeight: 600,
                color: resolved.questionColor,
                lineHeight: 1.4,
                flex: 1,
              }}>
                {item.question}
              </span>
              {/* Chevron ikonu */}
              <svg
                width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke={iconColor} strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                style={{
                  flexShrink: 0,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Cevap — animasyonlu açılma */}
            <div style={{
              maxHeight: isOpen ? '500px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}>
              <p style={{
                margin: 0,
                padding: '0 16px 16px',
                fontSize: '14px',
                lineHeight: 1.7,
                color: resolved.answerColor,
              }}>
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
