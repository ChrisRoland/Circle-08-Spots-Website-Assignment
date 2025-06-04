import React, { useEffect, useRef } from 'react';

export default function ImgPreview({
  isOpen,  
  item,   
  onClose, 
}) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleBackdropClick = e => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      className="modal"
      id="modal-preview"
      style={{ display: 'flex' }}
      ref={overlayRef}
      onClick={handleBackdropClick}
    >
      <div className="image-modal-content">
        <button className="modal-close" data-close onClick={onClose}>
          &times;
        </button>
        <img
          id="previewImg"
          src={item.src}
          alt={item.caption}
          className="preview-img"
        />
        <p id="previewTitle" className="preview-title">
          {item.caption}
        </p>
      </div>
    </div>
  );
}