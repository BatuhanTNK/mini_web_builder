import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  onSaveAndConfirm,
  title = 'Onay', 
  message, 
  confirmText = 'Tamam', 
  cancelText = 'İptal',
  saveAndConfirmText,
  type = 'warning', // 'warning', 'danger', 'info'
  showSaveOption = false
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const icons = {
    warning: '⚠️',
    danger: '🚨',
    info: 'ℹ️'
  };

  const colors = {
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  };

  const modalContent = (
    <div 
      className="confirm-dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog__icon" style={{ color: colors[type] }}>
          {icons[type]}
        </div>
        
        <div className="confirm-dialog__content">
          <h3 className="confirm-dialog__title">{title}</h3>
          <p className="confirm-dialog__message">{message}</p>
        </div>

        <div className={`confirm-dialog__actions ${showSaveOption ? 'confirm-dialog__actions--three' : ''}`}>
          <button 
            className="confirm-dialog__btn confirm-dialog__btn--cancel"
            onClick={onClose}
          >
            {cancelText}
          </button>
          
          {showSaveOption && onSaveAndConfirm && (
            <button 
              className="confirm-dialog__btn confirm-dialog__btn--save"
              onClick={() => {
                onSaveAndConfirm();
                onClose();
              }}
            >
              {saveAndConfirmText || '💾 Kaydet ve Ayrıl'}
            </button>
          )}
          
          <button 
            className="confirm-dialog__btn confirm-dialog__btn--confirm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{ 
              background: colors[type],
              borderColor: colors[type]
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
