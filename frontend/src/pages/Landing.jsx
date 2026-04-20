import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/dashboardStore';
import { useBuilderStore } from '../store/builderStore';

const TEMPLATES = [
  { id: 'linktree', name: 'Link Sayfası', icon: '🔗', desc: 'Sosyal medya ve link listesi', color: '#8b5cf6', category: 'Linkler' },
  { id: 'digital_card', name: 'Dijital Kartvizit', icon: '💳', desc: 'Profesyonel kişisel kart', color: '#06b6d4', category: 'Kartvizit' },
  { id: 'restaurant', name: 'Restoran', icon: '🍽️', desc: 'Menü ve rezervasyon', color: '#f59e0b', category: 'İşletme' },
  { id: 'event', name: 'Etkinlik', icon: '🎉', desc: 'Davet ve kayıt sayfası', color: '#ec4899', category: 'Etkinlik' },
  { id: 'portfolio', name: 'Portfolyo', icon: '🎨', desc: 'Freelancer tanıtımı', color: '#10b981', category: 'Portfolyo' },
  { id: 'e_commerce', name: 'Ürün Sayfası', icon: '🛍️', desc: 'Tek ürün satış sayfası', color: '#f43f5e', category: 'E-ticaret' },
  { id: 'coupon_page', name: 'Kupon Sayfası', icon: '🏷️', desc: 'Promosyon ve indirim', color: '#84cc16', category: 'Pazarlama' },
  { id: 'blank', name: 'Boş Başlangıç', icon: '⬜', desc: 'Sıfırdan oluştur', color: '#6366f1', category: 'Tümü' },
];

const FEATURES = [
  { icon: '🧱', title: '20 Blok Tipi', desc: 'Hero, buton, galeri, video, harita ve çok daha fazlası' },
  { icon: '📱', title: 'Mobil-First', desc: '480px optimizasyonlu, mükemmel mobil deneyim' },
  { icon: '📱', title: 'QR Kod', desc: 'Her site için otomatik QR kod oluşturma ve indirme' },
  { icon: '🎨', title: 'Tema Sistemi', desc: 'Renkler, fontlar ve arka planı özelleştirin' },
  { icon: '📊', title: 'Analitik', desc: 'Görüntülenme ve ziyaret istatistiklerini takip edin' },
  { icon: '🔗', title: 'Benzersiz URL', desc: 'Her site için özel yourdomain.com/p/slug adresi' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { createSite } = useBuilderStore();
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const categories = ['Tümü', ...new Set(TEMPLATES.map(t => t.category))];
  const filteredTemplates = activeCategory === 'Tümü'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory);

  const handleUseTemplate = async (templateId) => {
    const site = await createSite(`Yeni Site - ${templateId}`, templateId);
    if (site) navigate(`/builder/${site._id}`);
  };

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="landing__nav">
        <div className="landing__nav-logo">
          <span className="landing__logo-icon">🌐</span>
          <span>MiniWeb</span>
        </div>
        <div className="landing__nav-links">
          <a href="#templates">Şablonlar</a>
          <a href="#features">Özellikler</a>
          {token ? (
            <Link to="/dashboard" className="btn btn--primary">Dashboard →</Link>
          ) : (
            <>
              <Link to="/dashboard" className="btn btn--ghost">Giriş Yap</Link>
              <Link to="/dashboard" className="btn btn--primary">Ücretsiz Başla →</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__hero-bg" />
        <div className="landing__hero-content">
          <div className="landing__hero-badge">✨ Ücretsiz Mini Site Builder</div>
          <h1 className="landing__hero-title">
            Dakikalar İçinde<br />
            <span className="landing__hero-accent">Güzel Mini Siteler</span><br />
            Oluşturun
          </h1>
          <p className="landing__hero-desc">
            Kod yazmadan, sürükle-bırak ile profesyonel mini web siteleri oluşturun.
            QR kod ile paylaşın, anında yayınlayın.
          </p>
          <div className="landing__hero-actions">
            <button className="btn btn--primary btn--xl" onClick={() => navigate('/dashboard')}>
              Ücretsiz Başla → 
            </button>
            <a href="#templates" className="btn btn--ghost btn--xl">
              Şablonları Gör
            </a>
          </div>
          <div className="landing__hero-stats">
            <div className="landing__stat"><span>20+</span><small>Blok Tipi</small></div>
            <div className="landing__stat"><span>9</span><small>Hazır Şablon</small></div>
            <div className="landing__stat"><span>∞</span><small>Site Oluştur</small></div>
          </div>
        </div>
        <div className="landing__hero-visual">
          <div className="landing__phone-mockup">
            <div className="landing__phone-screen">
              <div className="landing__phone-content">
                <div style={{ background: '#6366f1', borderRadius: 12, padding: '20px', color: '#fff', textAlign: 'center', marginBottom: 12 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 8px' }} />
                  <div style={{ fontWeight: 700 }}>Adınız Soyadınız</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>Dijital Girişimci</div>
                </div>
                {['🔗 Web Sitem', '📸 Instagram', '📧 E-posta', '📱 WhatsApp'].map((l, i) => (
                  <div key={i} style={{ background: '#f3f4f6', borderRadius: 10, padding: '12px 16px', marginBottom: 8, fontSize: 14 }}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="landing__templates" id="templates">
        <div className="landing__section-header">
          <h2>Hazır Şablonlar</h2>
          <p>İhtiyacınıza uygun şablonu seçin, saniyeler içinde özelleştirin</p>
        </div>

        <div className="landing__categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`landing__category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >{cat}</button>
          ))}
        </div>

        <div className="landing__template-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-card__preview" style={{ background: `linear-gradient(135deg, ${template.color}22, ${template.color}44)` }}>
                <span className="template-card__icon">{template.icon}</span>
                <span className="template-card__category-tag">{template.category}</span>
              </div>
              <div className="template-card__body">
                <h3>{template.name}</h3>
                <p>{template.desc}</p>
                <button
                  className="btn btn--primary btn--full"
                  onClick={() => handleUseTemplate(template.id)}
                >
                  Bu Şablonu Kullan →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="landing__features" id="features">
        <div className="landing__section-header">
          <h2>Güçlü Özellikler</h2>
          <p>İhtiyacınız olan her şey tek platformda</p>
        </div>
        <div className="landing__features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-card__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing__cta">
        <div className="landing__cta-content">
          <h2>Hemen Başlayın</h2>
          <p>Ücretsiz hesap oluşturun ve ilk mini sitenizi dakikalar içinde yayınlayın.</p>
          <button className="btn btn--primary btn--xl" onClick={() => navigate('/dashboard')}>
            Ücretsiz Hesap Oluştur →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <div className="landing__footer-logo">
          <span>🌐</span> MiniWeb Builder
        </div>
        <p>© 2026 MiniWeb. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
