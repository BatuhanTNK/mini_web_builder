import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBuilderStore } from '../store/builderStore';
import { useAuthStore } from '../store/authStore';

const TEMPLATES = [
  { id: 'blank', name: 'Boş Başlangıç', icon: '⬜', desc: 'Sıfırdan oluştur', color: '#6366f1' },
  { id: 'linktree', name: 'Link Sayfası', icon: '🔗', desc: 'Linktree tarzı', color: '#8b5cf6' },
  { id: 'digital_card', name: 'Dijital Kartvizit', icon: '💳', desc: 'Profesyonel tanıtım', color: '#06b6d4' },
  { id: 'restaurant', name: 'Restoran', icon: '🍽️', desc: 'Menü & rezervasyon', color: '#f59e0b' },
  { id: 'event', name: 'Etkinlik', icon: '🎉', desc: 'Davet & kayıt', color: '#ec4899' },
  { id: 'portfolio', name: 'Portfolyo', icon: '🎨', desc: 'Freelancer tanıtımı', color: '#10b981' },
  { id: 'e_commerce', name: 'Ürün Sayfası', icon: '🛍️', desc: 'Ürün satışı', color: '#f43f5e' },
  { id: 'coupon_page', name: 'İndirim Kuponu', icon: '🏷️', desc: 'Promosyon sayfası', color: '#84cc16' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { sites, loading, fetchSites, createSite, deleteSite, duplicateSite } = useBuilderStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    const site = await createSite(newTitle.trim(), selectedTemplate);
    setCreating(false);
    if (site) {
      setShowModal(false);
      setNewTitle('');
      navigate(`/builder/${site._id}`);
    }
  };

  const handleDelete = async (siteId) => {
    await deleteSite(siteId);
    setDeleteConfirm(null);
  };

  const handleDuplicate = async (siteId) => {
    const site = await duplicateSite(siteId);
    if (site) navigate(`/builder/${site._id}`);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard__sidebar">
        <div className="dashboard__logo">
          <span className="dashboard__logo-icon">🌐</span>
          <span>MiniWeb</span>
        </div>
        <nav className="dashboard__nav">
          <a className="dashboard__nav-item dashboard__nav-item--active" href="#">
            📊 Mini Sitelerim
          </a>
          <a className="dashboard__nav-item" href="#">
            📈 Analitik
          </a>
          <a className="dashboard__nav-item" href="#">
            🎨 Şablonlar
          </a>
        </nav>
        <div className="dashboard__user">
          <div className="dashboard__user-avatar">{user?.name?.charAt(0) || 'U'}</div>
          <div className="dashboard__user-info">
            <span className="dashboard__user-name">{user?.name || 'Kullanıcı'}</span>
            <span className="dashboard__user-email">{user?.email}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard__main">
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">Mini Sitelerim</h1>
            <p className="dashboard__subtitle">{sites.length} site oluşturuldu</p>
          </div>
          <button className="btn btn--primary btn--lg" onClick={() => setShowModal(true)}>
            + Yeni Site Oluştur
          </button>
        </div>

        {loading ? (
          <div className="dashboard__loading">
            <div className="spinner" />
            <p>Yükleniyor...</p>
          </div>
        ) : sites.length === 0 ? (
          <div className="dashboard__empty">
            <div className="dashboard__empty-icon">🌐</div>
            <h2>Henüz site yok</h2>
            <p>İlk mini sitenizi oluşturmaya başlayın</p>
            <button className="btn btn--primary btn--lg" onClick={() => setShowModal(true)}>
              İlk Siteyi Oluştur ✨
            </button>
          </div>
        ) : (
          <div className="dashboard__grid">
            {sites.map(site => (
              <div key={site._id} className="site-card">
                <div className="site-card__thumb" style={{ background: `linear-gradient(135deg, ${site.theme?.primaryColor || '#6366f1'}, ${site.theme?.primaryColor || '#8b5cf6'}44)` }}>
                  <span className="site-card__thumb-icon">🌐</span>
                  {site.settings?.isPublished && <span className="site-card__live-badge">CANLI</span>}
                </div>
                <div className="site-card__body">
                  <h3 className="site-card__title">{site.title}</h3>
                  <p className="site-card__url">/{site.slug}</p>
                  <div className="site-card__stats">
                    <span>👁 {site.settings?.analytics?.views || 0} görüntülenme</span>
                    <span>{new Date(site.updatedAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="site-card__actions">
                    <button className="site-card__btn site-card__btn--primary" onClick={() => navigate(`/builder/${site._id}`)}>
                      ✏️ Düzenle
                    </button>
                    <a className="site-card__btn site-card__btn--ghost" href={`/p/${site.slug}`} target="_blank" rel="noreferrer">
                      🔗
                    </a>
                    <button className="site-card__btn site-card__btn--ghost" onClick={() => handleDuplicate(site._id)}>
                      📋
                    </button>
                    <button className="site-card__btn site-card__btn--ghost" onClick={() => navigate(`/builder/${site._id}/qr`)}>
                      📱
                    </button>
                    <button className="site-card__btn site-card__btn--danger" onClick={() => setDeleteConfirm(site._id)}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal__header">
              <h2>Yeni Site Oluştur</h2>
              <button className="modal__close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal__body">
              <div className="modal__field">
                <label>Site Başlığı</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCreate()}
                  placeholder="Benim Mini Sitem"
                  autoFocus
                />
              </div>
              <div className="modal__field">
                <label>Şablon Seç</label>
                <div className="modal__templates">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      className={`modal__template-btn ${selectedTemplate === t.id ? 'active' : ''}`}
                      onClick={() => setSelectedTemplate(t.id)}
                      style={{ '--t-color': t.color }}
                    >
                      <span className="modal__template-icon">{t.icon}</span>
                      <span className="modal__template-name">{t.name}</span>
                      <span className="modal__template-desc">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal__footer">
              <button className="btn btn--ghost" onClick={() => setShowModal(false)}>İptal</button>
              <button className="btn btn--primary" onClick={handleCreate} disabled={creating || !newTitle.trim()}>
                {creating ? '⏳ Oluşturuluyor...' : 'Oluştur →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal modal--sm" onClick={e => e.stopPropagation()}>
            <div className="modal__header">
              <h2>🗑 Siteyi Sil</h2>
            </div>
            <div className="modal__body">
              <p>Bu siteyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
            </div>
            <div className="modal__footer">
              <button className="btn btn--ghost" onClick={() => setDeleteConfirm(null)}>İptal</button>
              <button className="btn btn--danger" onClick={() => handleDelete(deleteConfirm)}>Evet, Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
