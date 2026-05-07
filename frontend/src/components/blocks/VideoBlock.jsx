export default function VideoBlock({ data = {}, isBuilder }) {
  const { videoUrl = '', aspectRatio = '16/9', autoPlay = false, muted = true, controls = true } = data;

  const isDirectVideo = videoUrl.match(/\.(mp4|webm|ogg|mov|m4v)$/i) || videoUrl.startsWith('/uploads/video');

  const getEmbedUrl = (url) => {
    if (!url || isDirectVideo) return '';
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

  if (!videoUrl) {
    return (
      <div className="video-block video-block--empty">
        <div className="video-block__placeholder">
          <span className="video-block__icon">▶</span>
          <p>Video URL ekleyin veya yükleyin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-block" style={{ position: 'relative' }}>
      <div className="video-block__wrapper" style={{ paddingTop }}>
        {isDirectVideo ? (
          <video
            src={videoUrl}
            className="video-block__video"
            autoPlay={autoPlay}
            muted={muted}
            controls={controls}
            playsInline
            loop
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <iframe
            src={embedUrl}
            className="video-block__iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
      {isBuilder && (
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0, 
            zIndex: 10, cursor: 'pointer' 
          }} 
        />
      )}
    </div>
  );
}
