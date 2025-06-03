import React, { useState, useEffect, useRef } from 'react';

export default function EditProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onUpdateProfile,
}) {
  const [name, setName] = useState('');
  const [field, setField] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setName(currentProfile.name || '');
      setField(currentProfile.field || '');
      setAvatarPreview(currentProfile.avatar || '');
    }
  }, [isOpen, currentProfile]);

  const handleBackdropClick = e => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatarPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updated = {
      name: name.trim(),
      field: field.trim(),
      avatar: avatarPreview,
    };
    // Save to localStorage
    localStorage.setItem('profile', JSON.stringify(updated));
    onUpdateProfile(updated);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="editModal"
      id="profileEditModal"
      style={{ display: 'flex' }}
      ref={overlayRef}
      onClick={handleBackdropClick}
    >
      <div className="editModal-content">
        <span
          className="closeEditModal"
          id="closeEditProfile"
          onClick={onClose}
        >
          &times;
        </span>
        <h2>Edit Profile</h2>
        <form id="editProfileForm" onSubmit={handleSubmit}>
          <label htmlFor="profileNameInput">Name:</label>
          <input
            type="text"
            id="profileNameInput"
            name="name"
            required
            minLength={3}
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label htmlFor="profileFieldInput">Field:</label>
          <input
            type="text"
            id="profileFieldInput"
            name="field"
            required
            value={field}
            onChange={e => setField(e.target.value)}
          />

          <label htmlFor="profileAvatarInput">Upload Image:</label>
          <input
            type="file"
            id="profileAvatarInput"
            name="avatar"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <br />
          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
