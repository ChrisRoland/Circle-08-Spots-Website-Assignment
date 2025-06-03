import React, { useState, useRef, useEffect } from 'react';

export default function NewPost({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [fileDataUrl, setFileDataUrl] = useState('');
  const fileInputRef = useRef(null);
  const overlayRef = useRef(null);

  // Reset form fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setFileDataUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        fileInputRef.current.focus();
      }
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Clicking on backdrop closes modal
  const handleBackdropClick = e => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileDataUrl('');
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      setFileDataUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!fileDataUrl || !title.trim()) return;

    // Build the new post object
    const newCard = { src: fileDataUrl, caption: title.trim() };

    // Pass newCard up to App.jsx
    onSave(newCard);

    // Close modal
    onClose();
  };

  // Don’t render modal at all if isOpen is false
  if (!isOpen) return null;

  return (
    <div
      className="modal modal-open"
      id="modal-post"
      ref={overlayRef}
      onClick={handleBackdropClick}
    >
      <div className="modal-content">
        <button className="modal-close" data-close onClick={onClose}>
          &times;
        </button>
        <h2>New Post</h2>
        <form id="form-post" onSubmit={handleSubmit}>
          <label>
            Upload Image:
            <br />
            <input
              type="file"
              id="postFile"
              className="upload-img"
              accept="image/*"
              required
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </label>
          <label>
            Title:
            <br />
            <input
              type="text"
              id="postTitle"
              minLength={3}
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
          <button type="submit" className="button-large">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}