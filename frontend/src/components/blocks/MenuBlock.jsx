import { useState } from 'react';

export default function MenuBlock({ data = {} }) {
  const { title = 'Menü', categories = [], accentColor = '#f59e0b', currency = '₺' } = data;
  // Navigation state: null = show categories, {catIdx} = show subcategories, {catIdx, subIdx} = show items
  const [nav, setNav] = useState({ level: 0 });

  const current = {
    category: nav.catIdx != null ? categories[nav.catIdx] : null,
    subcategory: nav.subIdx != null && nav.catIdx != null
      ? categories[nav.catIdx]?.subcategories?.[nav.subIdx] : null,
  };

  const goBack = () => {
    if (nav.level === 2) setNav({ level: 1, catIdx: nav.catIdx });
    else if (nav.level === 1) setNav({ level: 0 });
  };

  const containerStyle = {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 16,
    fontFamily: 'inherit',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    paddingBottom: 12,
    borderBottom: `2px solid ${accentColor}`,
  };

  const backBtnStyle = {
    background: 'rgba(255,255,255,0.08)',
    border: 'none',
    color: 'inherit',
    padding: '6px 12px',
    borderRadius: 8,
    fontSize: 13,
    cursor: 'pointer',
    fontWeight: 600,
  };

  const titleStyle = { margin: 0, fontSize: 20, fontWeight: 700, flex: 1 };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
    overflow: 'hidden',
  };

  const cardImgStyle = {
    width: '100%',
    height: 80,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 8,
    background: '#2a2a3e',
  };

  const itemRowStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  };

  const itemImgStyle = {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 8,
    flexShrink: 0,
    background: '#2a2a3e',
  };

  // ─── Level 0: Categories
  if (nav.level === 0) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{title}</h3>
        </div>
        {categories.length === 0 ? (
          <div style={{ opacity: 0.6, textAlign: 'center', padding: 20 }}>Henüz kategori yok</div>
        ) : (
          <div style={gridStyle}>
            {categories.map((cat, i) => (
              <div
                key={i}
                style={cardStyle}
                onClick={() => setNav({ level: 1, catIdx: i })}
              >
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} style={cardImgStyle} />
                ) : (
                  <div style={{ ...cardImgStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                    {cat.icon || '🍽️'}
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 600 }}>{cat.name}</div>
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                  {(cat.subcategories?.length || 0)} alt kategori
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── Level 1: Subcategories of selected category
  if (nav.level === 1 && current.category) {
    const subs = current.category.subcategories || [];
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <button style={backBtnStyle} onClick={goBack}>← Geri</button>
          <h3 style={titleStyle}>{current.category.name}</h3>
        </div>
        {subs.length === 0 ? (
          <div style={{ opacity: 0.6, textAlign: 'center', padding: 20 }}>Alt kategori yok</div>
        ) : (
          <div style={gridStyle}>
            {subs.map((sub, i) => (
              <div
                key={i}
                style={cardStyle}
                onClick={() => setNav({ level: 2, catIdx: nav.catIdx, subIdx: i })}
              >
                {sub.image ? (
                  <img src={sub.image} alt={sub.name} style={cardImgStyle} />
                ) : (
                  <div style={{ ...cardImgStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                    {sub.icon || '🥂'}
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 600 }}>{sub.name}</div>
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                  {(sub.items?.length || 0)} ürün
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── Level 2: Items of selected subcategory
  if (nav.level === 2 && current.subcategory) {
    const items = current.subcategory.items || [];
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <button style={backBtnStyle} onClick={goBack}>← Geri</button>
          <h3 style={titleStyle}>{current.subcategory.name}</h3>
        </div>
        {items.length === 0 ? (
          <div style={{ opacity: 0.6, textAlign: 'center', padding: 20 }}>Ürün yok</div>
        ) : (
          <div>
            {items.map((item, i) => (
              <div key={i} style={itemRowStyle}>
                {item.image ? (
                  <img src={item.image} alt={item.name} style={itemImgStyle} />
                ) : null}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{item.name}</div>
                    {item.price && (
                      <div style={{ fontSize: 15, fontWeight: 700, color: accentColor, whiteSpace: 'nowrap' }}>
                        {item.price}{currency}
                      </div>
                    )}
                  </div>
                  {item.description && (
                    <div style={{ fontSize: 12, opacity: 0.7, marginTop: 3, lineHeight: 1.4 }}>
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
