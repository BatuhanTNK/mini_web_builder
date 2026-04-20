export default function MobileFrame({ children }) {
  return (
    <div className="mobile-frame">
      <div className="mobile-frame__device">
        <div className="mobile-frame__notch">
          <div className="mobile-frame__camera" />
          <div className="mobile-frame__speaker" />
        </div>
        <div className="mobile-frame__screen">
          <div className="mobile-frame__content">
            {children}
          </div>
        </div>
        <div className="mobile-frame__home-bar" />
      </div>
    </div>
  );
}
