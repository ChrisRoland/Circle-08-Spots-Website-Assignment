import React from 'react';

export default function ProfileHeader({
  userName,
  userField,
  userAvatar,
  onEditProfile,
  onNewPost,
}) {
  return (
    <section className="profile-header" aria-label="Profile Section">
      <div className="avatar-section">
        <img
          className="avatar"
          id="userAvatar"
          src={userAvatar}
          alt={userName}
        />
        <div className="avatar-description">
          <div className="avatar-children">
            <h3 className="avatar-name" id="userName">
              {userName}
            </h3>
            <span className="avatar-field" id="userField">
              {userField}
            </span>
          </div>
          <div className="edit-profile" title='Edit Profile'>
            <button
              id="profileEditBtn"
              className="edit-btn"
              onClick={onEditProfile}
            >
            <img
              className="small-pencil"
              src="./../../assets/img/Group 2.png"
              alt="Edit icon"
            />
              <span className="edit-btn-text">Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
      <button
        className="button-large"
        id="newPostBtn"
        onClick={onNewPost}
      >
        <img className="btn-plus" src="/assets/img/Group 26.png" alt="Plus icon" />
        <span className="btn-text">New Post</span>
      </button>
    </section>
  );
}


