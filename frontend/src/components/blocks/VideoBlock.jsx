export default function VideoBlock({ data = {} }) {
  const { videoUrl = '', aspectRatio = '16/9', autoPlay = false, muted = true } = data;

  const getEmbedUrl = (url) => {
    if (!url) return '';
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) {
      const params = new URLSearchParams({ rel: 0 });
      if (autoPlay) params.set('autoplay', 1);
      if (muted) params.set('mute', 1);
      return `https://www.youtube.com/embed/${ytMatch[1]}?${params}`;
    }
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      const params = new URLSearchParams({ byline: 0, portrait: 0 });
      if (autoPlay) params.set('autoplay', 1);
      if (muted) params.set('muted', 1);
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?${params}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const paddingTop = aspectRatio === '9/16' ? '177.77%' : aspectRatio === '1/1' ? '100%' : '56.25%';

  if (!embedUrl) {
    return (
      <div className="video-block video-block--empty">
        <div className="video-block__placeholder">
          <span className="video-block__icon">▶</span>
          <p>Video URL ekleyin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-block">
      <div className="video-block__wrapper" style={{ paddingTop }}>
        <iframe
          src={embedUrl}
          className="video-block__iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
