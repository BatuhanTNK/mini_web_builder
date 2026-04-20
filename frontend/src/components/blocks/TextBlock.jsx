import DOMPurify from 'dompurify';

export default function TextBlock({ data }) {
  const { content = '', alignment = 'left', fontSize = '16px' } = data || {};

  return (
    <div
      style={{ textAlign: alignment, fontSize, lineHeight: 1.7, color: 'inherit' }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
}
