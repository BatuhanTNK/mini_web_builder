export default function SpotifyBlock({ data = {}, isBuilder }) {
  const { spotifyUrl = '', compact = false } = data;

  const getEmbedUrl = (url) => {
    if (!url) return '';
    // Convert spotify URLs to embed format
    const match = url.match(/open\.spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
    }
    return '';
  };

  const embedUrl = getEmbedUrl(spotifyUrl);
  const height = compact ? 80 : 352;

  if (!embedUrl) {
    return (
      <div className="spotify-block spotify-block--empty">
        <div className="spotify-block__placeholder">
          <span className="spotify-block__icon">🎵</span>
          <p>Spotify URL ekleyin</p>
          <small>Parça, albüm veya playlist linki yapıştırın</small>
        </div>
      </div>
    );
  }

  return (
    <div className="spotify-block" style={{ position: 'relative' }}>
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '12px' }}
      />
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
