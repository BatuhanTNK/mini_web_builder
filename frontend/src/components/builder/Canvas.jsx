import { useState, useRef } from 'react';
import { useBuilderStore } from '../../store/builderStore';

// ─── Block Renderers ──────────────────────────────────────────────────────────
import HeroBlock from '../blocks/HeroBlock';
import ImageBlock from '../blocks/ImageBlock';
import ButtonBlock from '../blocks/ButtonBlock';
import LinkListBlock from '../blocks/LinkListBlock';
import SocialIconsBlock from '../blocks/SocialIconsBlock';
import TextBlock from '../blocks/TextBlock';
import NumberedListBlock from '../blocks/NumberedListBlock';
import ProfileBlock from '../blocks/ProfileBlock';
import CountdownBlock from '../blocks/CountdownBlock';
import CouponBlock from '../blocks/CouponBlock';
import ProductCardBlock from '../blocks/ProductCardBlock';
import VideoBlock from '../blocks/VideoBlock';
import MapBlock from '../blocks/MapBlock';
import GalleryBlock from '../blocks/GalleryBlock';
import FAQBlock from '../blocks/FAQBlock';
import MenuBlock from '../blocks/MenuBlock';
import VCardBlock from '../blocks/VCardBlock';
import SpotifyBlock from '../blocks/SpotifyBlock';
import DividerBlock from '../blocks/DividerBlock';
import ContactFormBlock from '../blocks/ContactFormBlock';

// New Travel Iterinary Blocks
import CoverBlock from '../blocks/CoverBlock';
import TimelineBlock from '../blocks/TimelineBlock';
import ChecklistBlock from '../blocks/ChecklistBlock';

const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  image: ImageBlock,
  button: ButtonBlock,
  link_list: LinkListBlock,
  social_icons: SocialIconsBlock,
  text: TextBlock,
  numbered_list: NumberedListBlock,
  profile: ProfileBlock,
  countdown: CountdownBlock,
  coupon: CouponBlock,
  product_card: ProductCardBlock,
  video: VideoBlock,
  map: MapBlock,
  image_gallery: GalleryBlock,
  faq: FAQBlock,
  menu: MenuBlock,
  vcard: VCardBlock,
  spotify_embed: SpotifyBlock,
  divider: DividerBlock,
  contact_form: ContactFormBlock,
  cover: CoverBlock,
  timeline: TimelineBlock,
  checklist: ChecklistBlock,
};

function BlockWrapper({ block, isSelected, onSelect, onMove, onRemove, onToggleVisibility }) {
  const [showControls, setShowControls] = useState(false);
  const bypassRef = useRef(false);
  const BlockComponent = BLOCK_COMPONENTS[block.type];

  if (!BlockComponent) return null;

  // Intercept ALL clicks inside block — prevent links, buttons, and child onClick handlers
  const handleContentClick = (e) => {
    // When double-click re-dispatches a click, let it pass through
    if (bypassRef.current) return;

    // Prevent link navigation
    const anchor = e.target.closest('a');
    if (anchor) e.preventDefault();
    // Stop ALL child onClick handlers (buttons, divs with onClick, etc.)
    e.stopPropagation();
    // Select this block for editing
    onSelect(block.id);
  };

  // Double-click: perform the actual interaction
  const handleContentDoubleClick = (e) => {
    // Anchor → open URL directly
    const anchor = e.target.closest('a');
    if (anchor && anchor.href && !anchor.href.endsWith('#')) {
      e.preventDefault();
      window.open(anchor.href, '_blank');
      return;
    }
    // Other interactive elements (buttons, clickable divs):
    // temporarily disable our capture interceptor, then re-dispatch a click
    // so the target's onClick fires normally.
    const target = e.target;
    bypassRef.current = true;
    try {
      target.click();
    } catch {
      // no-op
    }
    // Reset bypass after the click event completes
    setTimeout(() => { bypassRef.current = false; }, 0);
  };

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
      className={`canvas-block ${isSelected ? 'canvas-block--selected' : ''} ${!block.visible ? 'canvas-block--hidden' : ''} ${block.rounded === false ? 'canvas-block--square' : ''}`}
      style={blockStyle}
      onClickCapture={handleContentClick}
      onDoubleClick={handleContentDoubleClick}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Block controls overlay */}
      {showControls && (
        <div className="canvas-block__controls" onClickCapture={e => e.stopPropagation()}>
          <button
            className="canvas-block__ctrl-btn"
            onClick={() => onMove(block.id, 'up')}
            title="Yukarı taşı"
          >↑</button>
          <button
            className="canvas-block__ctrl-btn"
            onClick={() => onMove(block.id, 'down')}
            title="Aşağı taşı"
          >↓</button>
          <button
            className="canvas-block__ctrl-btn"
            onClick={() => onToggleVisibility(block.id)}
            title={block.visible ? 'Gizle' : 'Göster'}
          >{block.visible ? '👁' : '🚫'}</button>
          <button
            className="canvas-block__ctrl-btn canvas-block__ctrl-btn--danger"
            onClick={() => onRemove(block.id)}
            title="Sil"
          >🗑</button>
        </div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="canvas-block__selected-badge">✏️ Düzenleniyor</div>
      )}

      {/* Block content */}
      <div className={`canvas-block__content ${!block.visible ? 'canvas-block__content--hidden' : ''}`}>
        <BlockComponent data={block.data} />
      </div>

      {/* Hidden overlay */}
      {!block.visible && (
        <div className="canvas-block__hidden-overlay">
          <span>Gizli Blok</span>
        </div>
      )}
    </div>
  );
}

export default function Canvas() {
  const {
    site,
    selectedBlockId,
    selectBlock,
    moveBlock,
    removeBlock,
    toggleBlockVisibility,
    addBlock
  } = useBuilderStore();

  if (!site) return null;

  const { blocks = [], theme = {} } = site;
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  const canvasStyle = {
    '--site-primary': theme.primaryColor || '#6366f1',
    '--site-bg': theme.backgroundColor || '#ffffff',
    '--site-text': theme.textColor || '#1a1a1a',
    '--site-font': theme.fontFamily || 'Inter',
    fontFamily: `var(--site-font), sans-serif`,
    backgroundColor: `var(--site-bg)`,
    color: `var(--site-text)`,
  };

  return (
    <div className="canvas" style={canvasStyle}>
      {sortedBlocks.length === 0 ? (
        <div className="canvas__empty">
          <div className="canvas__empty-icon">✨</div>
          <h3>Boş Sayfa</h3>
          <p>Sol panelden blok ekleyerek başlayın</p>
          <button
            className="canvas__empty-btn"
            onClick={() => addBlock('hero')}
          >
            Hero Bloğu Ekle
          </button>
        </div>
      ) : (
        sortedBlocks.map(block => (
          <BlockWrapper
            key={block.id}
            block={block}
            isSelected={selectedBlockId === block.id}
            onSelect={selectBlock}
            onMove={moveBlock}
            onRemove={removeBlock}
            onToggleVisibility={toggleBlockVisibility}
          />
        ))
      )}
    </div>
  );
}
