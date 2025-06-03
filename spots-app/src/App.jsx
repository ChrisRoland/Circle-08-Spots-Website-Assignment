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
    const stored = JSON.parse(localStorage.getItem("profile") || "null");
    if (stored) {
      setProfile(stored);
    } else {
      setProfile({
        name: "Bessie Coleman",
        field: "Civil Aviator",
        avatar: "/assets/img/Avatar.png",
      });
    }
  }, []);

  // Persist profile whenever it changes
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
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

      {/* Gallery receives the array of user-uploaded posts */}
      <Gallery posts={posts} />

      <Footer />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentProfile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onSave={handleAddPost}
      />
    </>
  );
}

export default App;


