import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { useBuilderStore } from '../store/builderStore';

export default function QRGenerator() {
  const { siteId } = useParams();
  const { site, fetchSite } = useBuilderStore();
  const [qrOptions, setQrOptions] = useState({
    fgColor: '#000000',
    bgColor: '#ffffff',
    size: 300,
    level: 'M',
    includeMargin: true,
  });

  useEffect(() => {
    if (!site || site.id !== siteId) fetchSite(siteId);
  }, [siteId]);

  if (!site) return (
    <div className="qr-page-loading">
      <div className="spinner" />
    </div>
  );

  const siteUrl = `${window.location.origin}/p/${site.slug}`;

  const downloadQR = (format = 'png') => {
    const canvas = document.querySelector('#qr-canvas canvas') || document.querySelector('#qr-canvas');
    if (!canvas) return;
    const url = canvas.toDataURL(`image/${format}`);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${site.slug}.${format}`;
    a.click();
  };

  return (
    <div className="qr-page">
      <div className="qr-page__bg" />
      <div className="qr-page__container">
        <div className="qr-page__header">
          <Link to={`/builder/${siteId}`} className="qr-page__back">
            ← Builder'a Dön
          </Link>
          <div>
            <h1>📱 QR Kod Oluştur</h1>
            <p>{site.title} için QR kod</p>
          </div>
        </div>

        <div className="qr-page__content">
          {/* QR Preview */}
          <div className="qr-page__preview">
            <div className="qr-page__qr-wrapper" id="qr-canvas">
              <QRCode
                value={siteUrl}
                size={qrOptions.size}
                fgColor={qrOptions.fgColor}
                bgColor={qrOptions.bgColor}
                level={qrOptions.level}
                includeMargin={qrOptions.includeMargin}
                renderAs="canvas"
              />
            </div>
            <p className="qr-page__url">{siteUrl}</p>
            <div className="qr-page__download-btns">
              <button className="btn btn--primary" onClick={() => downloadQR('png')}>
                ⬇️ PNG İndir
              </button>
              <button className="btn btn--ghost" onClick={() => downloadQR('jpeg')}>
                ⬇️ JPEG İndir
              </button>
            </div>
          </div>

          {/* QR Options */}
          <div className="qr-page__options">
            <h3>QR Kod Ayarları</h3>

            <div className="qr-page__option">
              <label>Ön Plan Rengi</label>
              <div className="property-panel__color-row">
                <input type="color" value={qrOptions.fgColor} onChange={e => setQrOptions(o => ({ ...o, fgColor: e.target.value }))} />
                <span>{qrOptions.fgColor}</span>
              </div>
            </div>

            <div className="qr-page__option">
              <label>Arka Plan Rengi</label>
              <div className="property-panel__color-row">
                <input type="color" value={qrOptions.bgColor} onChange={e => setQrOptions(o => ({ ...o, bgColor: e.target.value }))} />
                <span>{qrOptions.bgColor}</span>
              </div>
            </div>

            <div className="qr-page__option">
              <label>Boyut: {qrOptions.size}px</label>
              <input type="range" min={128} max={512} step={16} value={qrOptions.size} onChange={e => setQrOptions(o => ({ ...o, size: Number(e.target.value) }))} className="qr-page__range" />
            </div>

            <div className="qr-page__option">
              <label>Hata Düzeltme Seviyesi</label>
              <select className="property-panel__select" value={qrOptions.level} onChange={e => setQrOptions(o => ({ ...o, level: e.target.value }))}>
                <option value="L">Düşük (7%)</option>
                <option value="M">Orta (15%)</option>
                <option value="Q">Yüksek (25%)</option>
                <option value="H">En Yüksek (30%)</option>
              </select>
            </div>

            <div className="qr-page__option">
              <label>
                <input type="checkbox" checked={qrOptions.includeMargin} onChange={e => setQrOptions(o => ({ ...o, includeMargin: e.target.checked }))} />
                {' '}Beyaz kenarlık ekle
              </label>
            </div>

            <div className="qr-page__share">
              <h4>Paylaşım Linki</h4>
              <div className="qr-page__link-row">
                <input type="text" value={siteUrl} readOnly className="property-panel__input" />
                <button className="btn btn--ghost" onClick={() => navigator.clipboard.writeText(siteUrl)}>
                  📋 Kopyala
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
