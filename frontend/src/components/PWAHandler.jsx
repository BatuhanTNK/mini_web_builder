import { useState, useEffect } from 'react';

export default function PWAHandler() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show the custom prompt if not dismissed before
      const isDismissed = localStorage.getItem('pwa-prompt-dismissed');
      if (!isDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="pwa-prompt">
      <div className="pwa-prompt__content">
        <div className="pwa-prompt__main">
          <div className="pwa-prompt__icon">📲</div>
          <div className="pwa-prompt__text">
            <h3>Uygulama Olarak Ekle</h3>
            <p>Daha hızlı erişim için bu sayfayı ana ekranına ekle.</p>
          </div>
        </div>
        <div className="pwa-prompt__actions">
          <button className="pwa-prompt__btn pwa-prompt__btn--dismiss" onClick={handleDismiss}>Daha Sonra</button>
          <button className="pwa-prompt__btn pwa-prompt__btn--install" onClick={handleInstall}>Ekle</button>
        </div>
      </div>
    </div>
  );
}
