import React, { useState, useRef, useEffect } from "react";

export default function NewPost({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [fileDataUrl, setFileDataUrl] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);
  const overlayRef = useRef(null);

  // Reset form fields (and errors) whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setTitleError("");
      setFileDataUrl("");
      setFileError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        fileInputRef.current.focus();
      }
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Close when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  // Validation helpers
  const validateTitle = (value) => {
    if (!value.trim()) {
      return "Title is required.*";
    }
    if (value.trim().length < 3) {
      return "Title must be at least 3 characters.*";
    }
    return "";
  };

  const validateFile = (fileList) => {
    if (!fileList || fileList.length === 0) {
      return "An image file is required.*";
    }
    return "";
  };

  // Handle title changes
  const onTitleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    setTitleError(validateTitle(newValue));
  };

  const onTitleBlur = () => {
    setTitleError(validateTitle(title));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const err = validateFile(fileList);
    setFileError(err);

    if (err) {
      setFileDataUrl("");
      return;
    }

    const file = fileList[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFileDataUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onFileBlur = () => {
    const fileList = fileInputRef.current?.files;
    setFileError(validateFile(fileList));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation pass
    const finalTitleError = validateTitle(title);
    const finalFileError = validateFile(fileInputRef.current?.files);
    setTitleError(finalTitleError);
    setFileError(finalFileError);

    if (finalTitleError || finalFileError) {
      return;
    }

    const newCard = {
      src: fileDataUrl,
      caption: title.trim(),
    };

    onSave(newCard);
    onClose();
  };

  // Determine if form is valid to enable Save button
  const isFormValid =
    !validateTitle(title) && !validateFile(fileInputRef.current?.files);

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
        <form id="form-post" onSubmit={handleSubmit} noValidate>
          {/* Image Input */}
          <label htmlFor="postFile">Upload Image:</label>
          <input
            type="file"
            id="postFile"
            className="upload-img"
            accept="image/*"
            required
            ref={fileInputRef}
            onChange={handleFileChange}
            onBlur={onFileBlur}
          />
          {fileError && <small className="error">{fileError}</small>}

          {/* Title Input */}
          <label htmlFor="postTitle" style={{ marginTop: "1rem" }}>
            Title:
          </label>
          <input
            type="text"
            id="postTitle"
            minLength={3}
            required
            value={title}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
          />
          {titleError && <small className="error">{titleError}</small>}

          {/* Save Button */}
          <button
            type="submit"
            className="button-large"
            disabled={!isFormValid}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
