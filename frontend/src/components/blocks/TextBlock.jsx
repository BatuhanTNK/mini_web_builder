import DOMPurify from 'dompurify';

export default function TextBlock({ data }) {
  const { content = '', alignment = 'left', fontSize = 'md' } = data || {};

  const sizeMap = {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  };

  const actualFontSize = sizeMap[fontSize] || fontSize;

  return (
    <div
      style={{ 
        textAlign: alignment, 
        fontSize: 'var(--block-font-size, inherit)', 
        lineHeight: 'var(--block-line-height, 1.7)', 
        letterSpacing: 'var(--block-letter-spacing, normal)',
        fontWeight: 'var(--block-font-weight, normal)',
        color: 'inherit',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        minHeight: '24px',
        padding: '8px 16px'
      }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}
