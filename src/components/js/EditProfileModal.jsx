import React, { useState, useEffect, useRef } from "react";

export default function EditProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onUpdateProfile,
}) {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [nameError, setNameError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const fileInputRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setName(currentProfile.name || "");
      setField(currentProfile.field || "");
      setAvatarPreview(currentProfile.avatar || "");
      setNameError("");
      setFieldError("");
    }
  }, [isOpen, currentProfile]);

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Validation:
  const validateName = (value) => {
    if (value.trim().length === 0) {
      return "Name is required.*";
    }
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters.*";
    }
    return "";
  };

  const validateField = (value) => {
    if (value.trim().length === 0) {
      return "Field is required.*";
    }
    if (value.trim().length < 3) {
      return "Field must be at least 3 characters.*";
    }
    return "";
  };

  // On each change, update value & error state:
const onNameChange = (e) => {
  const input = e.target;
  setName(input.value);
  // Use the built-in validation API
  setNameError(input.validationMessage);
};


const onFieldChange = (e) => {
  const input = e.target;
  setField(input.value);
  // Use the built-in validation API
  setFieldError(input.validationMessage);
};

  const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    // This triggers the browser's built-in validation UI
    form.reportValidity();
    return;
  }

    const updated = {
      name: name.trim(),
      field: field.trim(),
      avatar: avatarPreview,
    };
    // Save to localStorage
    localStorage.setItem("profile", JSON.stringify(updated));
    onUpdateProfile(updated);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="editModal"
      id="profileEditModal"
      style={{ display: "flex" }}
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
            onChange={onNameChange}
            onBlur={(e) => setNameError(validateName(e.target.value))}
          />
          {nameError && (
            <small className="error">{nameError}</small>
          )}

          <label htmlFor="profileFieldInput">Field:</label>
          <textarea
            id="profileFieldInput"
            name="field"
            required
            minLength={3}
            value={field}
            onChange={onFieldChange}
            onBlur={(e) => setFieldError(validateField(e.target.value))}
            className="profile-textarea"
          />
          {fieldError && (
            <small className="error">{fieldError}</small>
          )}

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
          <button type="submit" className="save-btn mt-4">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
