import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBuilderStore } from '../store/builderStore';
import BlockLibrary from '../components/builder/BlockLibrary';
import Canvas from '../components/builder/Canvas';
import PropertyPanel from '../components/builder/PropertyPanel';
import MobileFrame from '../components/builder/MobileFrame';

export default function Builder() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { site, loading, saving, fetchSite, saveSite, togglePublish, updateSiteLocal, selectBlock } = useBuilderStore();
  const [activeTab, setActiveTab] = useState('blocks');
  const [saved, setSaved] = useState(false);
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);

  useEffect(() => {
    fetchSite(siteId);
  }, [siteId]);

  const handleSave = async () => {
    await saveSite();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublish = async () => {
    await togglePublish(siteId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Ayarlar tabına geçince blok seçimini kaldır — sayfa ayarları gösterilsin
    if (tab === 'settings') {
      selectBlock(null);
    }
  };

  const handleViewSite = () => {
    if (!site.settings?.isPublished) {
      const go = window.confirm('Site henüz yayınlanmadı. Yine de önizlemek ister misiniz?');
      if (!go) return;
    }
    window.open(`${window.location.origin}/p/${site.slug}`, '_blank');
  };

  if (loading) {
    return (
      <div className="builder-loading">
        <div className="builder-loading__spinner" />
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="builder-error">
        <h2>Site bulunamadı</h2>
        <Link to="/dashboard" className="btn btn--primary">Dashboard'a Dön</Link>
      </div>
    );
  }

  const siteUrl = `${window.location.origin}/p/${site.slug}`;

  // Panel visibility based on activeTab
  const showLeft = activeTab === 'blocks';
  const showRight = activeTab === 'blocks' || activeTab === 'settings';
  const isPreviewMode = activeTab === 'preview';

  // Final panel visibility (tab logic + toggle)
  const isLeftVisible = showLeft && leftPanelVisible;
  const isRightVisible = showRight && rightPanelVisible;

  return (
    <div className={`builder ${isPreviewMode ? 'builder--preview-mode' : ''}`}>
      {/* Top Bar */}
      <header className="builder__topbar">
        <div className="builder__topbar-left">
          <Link to="/dashboard" className="builder__back-btn" title="Dashboard'a dön">
            ← Geri
          </Link>
          <input
            className="builder__site-title-input"
            value={site.title || ''}
            onChange={e => updateSiteLocal({ title: e.target.value })}
            placeholder="Site başlığı..."
          />
        </div>

        <div className="builder__topbar-tabs">
          <button className={`builder__tab ${activeTab === 'blocks' ? 'active' : ''}`} onClick={() => handleTabChange('blocks')}>
            📦 Bloklar
          </button>
          <button className={`builder__tab ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => handleTabChange('preview')}>
            👁 Önizleme
          </button>
          <button className={`builder__tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabChange('settings')}>
            ⚙️ Ayarlar
          </button>
        </div>

        <div className="builder__topbar-right">
          {/* Sidebar Toggle Buttons */}
          {showLeft && (
            <button
              className={`builder__toggle-btn ${leftPanelVisible ? 'builder__toggle-btn--active' : ''}`}
              onClick={() => setLeftPanelVisible(v => !v)}
              title={leftPanelVisible ? 'Sol paneli gizle' : 'Sol paneli göster'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>
          )}
          {showRight && (
            <button
              className={`builder__toggle-btn ${rightPanelVisible ? 'builder__toggle-btn--active' : ''}`}
              onClick={() => setRightPanelVisible(v => !v)}
              title={rightPanelVisible ? 'Sağ paneli gizle' : 'Sağ paneli göster'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
            </button>
          )}

          <div className="builder__topbar-divider" />

          <button
            className="builder__action-btn builder__action-btn--ghost"
            onClick={handleViewSite}
          >
            🔗 Görüntüle
          </button>
          <Link
            to={`/builder/${siteId}/qr`}
            className="builder__action-btn builder__action-btn--ghost"
          >
            📱 QR
          </Link>
          <button
            className={`builder__action-btn ${site.settings?.isPublished ? 'builder__action-btn--published' : 'builder__action-btn--ghost'}`}
            onClick={handlePublish}
          >
            {site.settings?.isPublished ? '✅ Yayında' : '🚀 Yayınla'}
          </button>
          <button
            className={`builder__action-btn builder__action-btn--primary ${saved ? 'builder__action-btn--saved' : ''}`}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '⏳ Kaydediliyor...' : saved ? '✅ Kaydedildi!' : '💾 Kaydet'}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="builder__body">
        {/* Left: Block Library */}
        {showLeft && (
          <aside className={`builder__left-panel builder__panel--animated ${isLeftVisible ? 'builder__panel--visible' : 'builder__panel--hidden-left'}`}>
            <BlockLibrary />
          </aside>
        )}

        {/* Left Toggle Handle (when hidden) */}
        {showLeft && !isLeftVisible && (
          <button
            className="builder__panel-handle builder__panel-handle--left"
            onClick={() => setLeftPanelVisible(true)}
            title="Sol paneli göster"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Center: Canvas */}
        <main className={`builder__center builder__panel--active ${isPreviewMode ? 'builder__center--preview' : 'builder__center--edit'}`}>
          <div className="builder__canvas-wrapper">
            {isPreviewMode ? (
              <MobileFrame>
                <Canvas />
              </MobileFrame>
            ) : (
              <div className="builder__canvas-edit">
                <Canvas />
              </div>
            )}
          </div>
          <div className="builder__canvas-footer">
            <span className="builder__canvas-url">🔗 {siteUrl}</span>
            <span className="builder__canvas-info">
              {isPreviewMode ? '📱 Mobil Önizleme (480px)' : '🖥️ Düzenleme Modu'}
            </span>
          </div>
        </main>

        {/* Right Toggle Handle (when hidden) */}
        {showRight && !isRightVisible && (
          <button
            className="builder__panel-handle builder__panel-handle--right"
            onClick={() => setRightPanelVisible(true)}
            title="Sağ paneli göster"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Right: Property Panel */}
        {showRight && (
          <aside className={`builder__right-panel builder__panel--animated ${isRightVisible ? 'builder__panel--visible' : 'builder__panel--hidden-right'}`}>
            <PropertyPanel />
          </aside>
        )}
      </div>
    </div>
  );
}
