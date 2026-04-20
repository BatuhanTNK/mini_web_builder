import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeroBlock from '../components/blocks/HeroBlock';
import ImageBlock from '../components/blocks/ImageBlock';
import ButtonBlock from '../components/blocks/ButtonBlock';
import LinkListBlock from '../components/blocks/LinkListBlock';
import SocialIconsBlock from '../components/blocks/SocialIconsBlock';
import TextBlock from '../components/blocks/TextBlock';
import NumberedListBlock from '../components/blocks/NumberedListBlock';
import ProfileBlock from '../components/blocks/ProfileBlock';
import CountdownBlock from '../components/blocks/CountdownBlock';
import CouponBlock from '../components/blocks/CouponBlock';
import ProductCardBlock from '../components/blocks/ProductCardBlock';
import VideoBlock from '../components/blocks/VideoBlock';
import MapBlock from '../components/blocks/MapBlock';
import GalleryBlock from '../components/blocks/GalleryBlock';
import FAQBlock from '../components/blocks/FAQBlock';
import MenuBlock from '../components/blocks/MenuBlock';
import VCardBlock from '../components/blocks/VCardBlock';
import SpotifyBlock from '../components/blocks/SpotifyBlock';
import DividerBlock from '../components/blocks/DividerBlock';
import ContactFormBlock from '../components/blocks/ContactFormBlock';

const BLOCK_COMPONENTS = {
  hero: HeroBlock, image: ImageBlock, button: ButtonBlock,
  link_list: LinkListBlock, social_icons: SocialIconsBlock, text: TextBlock,
  numbered_list: NumberedListBlock, profile: ProfileBlock, countdown: CountdownBlock,
  coupon: CouponBlock, product_card: ProductCardBlock, video: VideoBlock,
  map: MapBlock, image_gallery: GalleryBlock, faq: FAQBlock, menu: MenuBlock,
  vcard: VCardBlock, spotify_embed: SpotifyBlock, divider: DividerBlock,
  contact_form: ContactFormBlock,
};

export default function PublicSite() {
  const { slug } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [siteTitle, setSiteTitle] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/public/${slug}`);
        if (!res.ok) {
          if (!cancelled) setError('Sayfa bulunamadı');
          return;
        }
        const { site: found } = await res.json();
        if (cancelled) return;
        if (!found) {
          setError('Sayfa bulunamadı');
          return;
        }
        if (found.settings?.passwordProtected && found.settings?.password) {
          setPasswordRequired(true);
          setSiteTitle(found.title);
        } else {
          setSite(found);
        }
      } catch {
        if (!cancelled) setError('Sayfa yüklenirken hata oluştu');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/public/${slug}`);
      if (!res.ok) {
        setPasswordError('Sayfa bulunamadı');
        return;
      }
      const { site: found } = await res.json();
      if (found && password === found.settings.password) {
        setSite(found);
        setPasswordRequired(false);
        setPasswordError('');
      } else {
        setPasswordError('Hatalı şifre');
      }
    } catch {
      setPasswordError('Bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="public-site-loading">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-site-error">
        <div className="public-site-error__icon">🌐</div>
        <h1>Sayfa Bulunamadı</h1>
        <p>{error}</p>
        <a href="/" className="btn btn--primary">Ana Sayfaya Dön</a>
      </div>
    );
  }

  // Password protection
  if (passwordRequired) {
    return (
      <div className="public-site-password">
        <div className="public-site-password__card">
          <div className="public-site-password__icon">🔒</div>
          <h2>{siteTitle}</h2>
          <p>Bu sayfa şifre korumalıdır</p>
          {passwordError && <div className="public-site-password__error">{passwordError}</div>}
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Şifreyi girin..."
              className="public-site-password__input"
            />
            <button type="submit" className="btn btn--primary btn--full">Giriş →</button>
          </form>
        </div>
      </div>
    );
  }

  if (!site) return null;

  const { theme = {}, blocks = [], settings = {} } = site;
  const sortedBlocks = [...blocks].filter(b => b.visible !== false).sort((a, b) => a.order - b.order);

  const siteStyle = {
    '--site-primary': theme.primaryColor || '#6366f1',
    '--site-bg': theme.backgroundColor || '#ffffff',
    '--site-text': theme.textColor || '#1a1a1a',
    '--site-font': theme.fontFamily || 'Inter',
    fontFamily: `var(--site-font), sans-serif`,
    backgroundColor: theme.backgroundColor || '#ffffff',
    color: theme.textColor || '#1a1a1a',
    minHeight: '100vh',
  };

  return (
    <>
      {/* SEO */}
      <title>{settings.metaTitle || site.title}</title>
      <meta name="description" content={settings.metaDescription || ''} />
      <meta property="og:title" content={settings.metaTitle || site.title} />
      <meta property="og:description" content={settings.metaDescription || ''} />

      <div className="public-site" style={siteStyle}>
        <div className="public-site__container">
          {sortedBlocks.map(block => {
            const BlockComponent = BLOCK_COMPONENTS[block.type];
            if (!BlockComponent) return null;
            const blockStyle = {
              marginTop: block.marginTop ? `${block.marginTop}px` : undefined,
              marginBottom: block.marginBottom ? `${block.marginBottom}px` : undefined,
              paddingTop: block.paddingTop ? `${block.paddingTop}px` : undefined,
              paddingBottom: block.paddingBottom ? `${block.paddingBottom}px` : undefined,
              borderRadius: block.rounded === false ? '0' : (block.borderRadius != null ? `${block.borderRadius}px` : undefined),
              overflow: block.rounded === false || block.borderRadius != null ? 'hidden' : undefined,
            };
            return (
              <div
                key={block.id}
                className={`public-site__block ${block.rounded === false ? 'public-site__block--square' : ''}`}
                style={blockStyle}
              >
                <BlockComponent data={block.data} />
              </div>
            );
          })}

          {sortedBlocks.length === 0 && (
            <div className="public-site__empty">
              <p>Bu sayfa henüz içerik eklenmemiş.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
