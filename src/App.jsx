// src/App.jsx
import React, { useState, useEffect } from "react";
import LogoHeader from "./components/js/LogoHeader";
import ProfileHeader from "./components/js/ProfileHeader";
import Gallery from "./components/js/Gallery";
import Footer from "./components/js/Footer";
import EditProfileModal from "./components/js/EditProfileModal";
import NewPostModal from "./components/js/NewPost";
import "./App.css";

function App() {
  const [profile, setProfile] = useState({
    name: "",
    field: "",
    avatar: "",
  });

  // Load default profile or saved profile from localStorage
  useEffect(() => {
    const defaultProfile = {
      name: "Bessie Coleman",
      field: "Civil Aviator",
      avatar: "/assets/img/Avatar.png",
    };

    try {
      const stored = JSON.parse(localStorage.getItem("profile"));
      if (stored && Object.keys(stored).length > 0) {
        setProfile(stored);
      } else {
        // Use default profile if no stored profile exists
        setProfile(defaultProfile);
        localStorage.setItem("profile", JSON.stringify(defaultProfile));
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setProfile(defaultProfile);
      localStorage.setItem("profile", JSON.stringify(defaultProfile));
    }
  }, []);

  // Persist profile whenever it changes
  useEffect(() => {
    if (profile.name && profile.field && profile.avatar) {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);

  // Edit Profile modal visibility
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditOpen(false);
  };

  const [posts, setPosts] = useState([]);

  // Load saved posts on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("spotsAppLS") || "[]");
    setPosts(saved);
  }, []);

  // Persist posts
  useEffect(() => {
    localStorage.setItem("spotsAppLS", JSON.stringify(posts));
  }, [posts]);

  // New Post modal visibility
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setIsNewPostOpen(false);
  };

  return (
    <>
      <LogoHeader />

      <ProfileHeader
        userName={profile.name}
        userField={profile.field}
        userAvatar={profile.avatar}
        onEditProfile={() => setIsEditOpen(true)}
        onNewPost={() => setIsNewPostOpen(true)}
      />

      <Gallery posts={posts} />

      <Footer />

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentProfile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSave={handleAddPost}
      />
    </>
  );
}

export default App;
