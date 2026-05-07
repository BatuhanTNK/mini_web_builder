import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBuilderStore } from '../store/builderStore';
import BlockLibrary from '../components/builder/BlockLibrary';
import Canvas from '../components/builder/Canvas';
import PropertyPanel from '../components/builder/PropertyPanel';
import MobileFrame from '../components/builder/MobileFrame';
import ConfirmDialog from '../components/shared/ConfirmDialog';

export default function Builder() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { 
    site, loading, saving, hasUnsavedChanges, 
    fetchSite, saveSite, togglePublish, updateSiteLocal, updateTheme,
    selectBlock, undo, redo, duplicateBlock, removeBlock, moveBlock, selectedBlockId 
  } = useBuilderStore();
  const [activeTab, setActiveTab] = useState('blocks');
  const [previewDevice, setPreviewDevice] = useState('mobile');
  const [saved, setSaved] = useState(false);
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  useEffect(() => {
    fetchSite(siteId);
  }, [siteId]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if focus is in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) {
        // Exception for Ctrl+Z/Y/Shift+Z even in inputs? Usually best to let native handle it there
        return;
      }

      const isCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // Undo: Ctrl+Z
      if (isCtrl && key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((isCtrl && key === 'y') || (isCtrl && e.shiftKey && key === 'z')) {
        e.preventDefault();
        redo();
      }
      // Duplicate: Ctrl+D
      if (isCtrl && key === 'd') {
        if (selectedBlockId) {
          e.preventDefault();
          duplicateBlock(selectedBlockId);
        }
      }
      // Delete: Delete or Backspace
      if (key === 'delete' || key === 'backspace') {
        if (selectedBlockId) {
          e.preventDefault();
          if (window.confirm('Bu bloğu silmek istediğinizden emin misiniz?')) {
            removeBlock(selectedBlockId);
          }
        }
      }
      // Move: Up/Down Arrows
      if (key === 'arrowup') {
        if (selectedBlockId) {
          e.preventDefault();
          moveBlock(selectedBlockId, 'up');
        }
      }
      if (key === 'arrowdown') {
        if (selectedBlockId) {
          e.preventDefault();
          moveBlock(selectedBlockId, 'down');
        }
      }
      // Deselect: Escape
      if (key === 'escape') {
        selectBlock(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, duplicateBlock, removeBlock, moveBlock, selectedBlockId, selectBlock]);

  // Warn user before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue to be set
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

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

  const handleBackToDashboard = () => {
    if (hasUnsavedChanges) {
      setPendingNavigation('/dashboard');
      setShowUnsavedDialog(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleConfirmNavigation = () => {
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  const handleSaveAndNavigate = async () => {
    if (pendingNavigation) {
      await saveSite();
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  const handleCancelNavigation = () => {
    setPendingNavigation(null);
    setShowUnsavedDialog(false);
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
      {/* Unsaved Changes Dialog */}
      <ConfirmDialog
        isOpen={showUnsavedDialog}
        onClose={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
        onSaveAndConfirm={handleSaveAndNavigate}
        title="Kaydedilmemiş Değişiklikler"
        message={`Yaptığınız değişiklikler kaydedilmedi.\n\nBu sayfadan ayrılırsanız, tüm değişiklikleriniz kaybolacak.\n\nNe yapmak istersiniz?`}
        confirmText="Kaydetmeden Ayrıl"
        saveAndConfirmText="💾 Kaydet ve Ayrıl"
        cancelText="İptal"
        type="warning"
        showSaveOption={true}
      />

      {/* Top Bar */}
      <header className="builder__topbar">
        <div className="builder__topbar-left">
          <button 
            onClick={handleBackToDashboard} 
            className="builder__back-btn" 
            title="Dashboard'a dön"
          >
            ← Geri
          </button>
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

        {isPreviewMode && (
          <div className="builder__device-selector">
            <button 
              className={`builder__device-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
              onClick={() => setPreviewDevice('mobile')}
              title="Mobil Görünüm"
            >📱</button>
            <button 
              className={`builder__device-btn ${previewDevice === 'tablet' ? 'active' : ''}`}
              onClick={() => setPreviewDevice('tablet')}
              title="Tablet Görünüm"
            >Tablet</button>
            <button 
              className={`builder__device-btn ${previewDevice === 'desktop' ? 'active' : ''}`}
              onClick={() => setPreviewDevice('desktop')}
              title="Masaüstü Görünüm"
            >🖥️</button>
            <div className="builder__topbar-divider" />
            <button 
              className={`builder__device-btn ${site.theme?.darkMode ? 'active' : ''}`}
              onClick={() => updateTheme({ darkMode: !site.theme?.darkMode })}
              title={site.theme?.darkMode ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
            >
              {site.theme?.darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        )}

        <div className="builder__topbar-right">
          {/* Undo/Redo Buttons */}
          {!isPreviewMode && (
            <div className="builder__history-btns">
              <button 
                className={`builder__history-btn ${site.theme?.darkMode ? 'active' : ''}`}
                onClick={() => updateTheme({ darkMode: !site.theme?.darkMode })}
                title={site.theme?.darkMode ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
              >
                {site.theme?.darkMode ? '🌙' : '☀️'}
              </button>
              <div className="builder__topbar-divider" />
              <button 
                className="builder__history-btn" 
                onClick={undo}
                title="Geri Al (Ctrl+Z)"
              >↩️</button>
              <button 
                className="builder__history-btn" 
                onClick={redo}
                title="İleri Al (Ctrl+Y)"
              >↪️</button>
              <div className="builder__topbar-divider" />
            </div>
          )}
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
            className={`builder__action-btn builder__action-btn--primary ${saved ? 'builder__action-btn--saved' : ''} ${hasUnsavedChanges ? 'builder__action-btn--unsaved' : ''}`}
            onClick={handleSave}
            disabled={saving}
            title={hasUnsavedChanges ? 'Kaydedilmemiş değişiklikler var' : 'Tüm değişiklikler kaydedildi'}
          >
            {saving ? '⏳ Kaydediliyor...' : saved ? '✅ Kaydedildi!' : hasUnsavedChanges ? '💾 Kaydet *' : '💾 Kaydet'}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="builder__body">
        {/* Left: Block Library */}
        {showLeft && (
          <aside className={`builder__left-panel builder__panel--animated ${isLeftVisible ? 'builder__panel--visible' : 'builder__panel--hidden-left'}`}>
            <BlockLibrary onClose={() => setLeftPanelVisible(false)} />
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
          <div className={`builder__canvas-wrapper builder__canvas-wrapper--${previewDevice}`}>
            {isPreviewMode ? (
              previewDevice === 'mobile' ? (
                <MobileFrame>
                  <Canvas />
                </MobileFrame>
              ) : (
                <div className={`builder__preview-frame builder__preview-frame--${previewDevice}`}>
                  <Canvas />
                </div>
              )
            ) : (
              <div className="builder__canvas-edit">
                <Canvas />
              </div>
            )}
          </div>
          <div className="builder__canvas-footer">
            <span className="builder__canvas-url">🔗 {siteUrl}</span>
            <span className="builder__canvas-info">
              {isPreviewMode 
                ? `${previewDevice === 'mobile' ? '📱 Mobil' : previewDevice === 'tablet' ? 'Tablet' : '🖥️ Masaüstü'} Önizleme` 
                : '🖥️ Düzenleme Modu'}
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
            <PropertyPanel onClose={() => setRightPanelVisible(false)} />
          </aside>
        )}
      </div>
    </div>
  );
}
