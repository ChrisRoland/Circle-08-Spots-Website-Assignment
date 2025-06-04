import React, { useState, useEffect } from 'react';
import GalleryCard from './GalleryCards';
import ImgPreview from './ImgPreview';
import staticImageData from './../../images.json';

const STORAGE_KEY_LIKES = 'likedHearts';

export default function Gallery({ posts = [] }) {

  const [likedHearts, setLikedHearts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_LIKES)) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likedHearts));
  }, [likedHearts]);

  const [allImages, setAllImages] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    setAllImages([...posts, ...staticImageData]);
  }, [posts]);

  const toggleLike = (caption) => {
    setLikedHearts((prev) =>
      prev.includes(caption)
        ? prev.filter((c) => c !== caption)
        : [...prev, caption]
    );
  };

  const openPreview = item => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewItem(null);
  };

  return (
    <>
      <main className="site-content">
        <section className="gallery" id="gallerySection">
          {allImages.map((item, idx) => (
            <GalleryCard
              key={idx}
              item={item}
              isLiked={likedHearts.includes(item.caption)}
              toggleLike={toggleLike}
              onPreview={openPreview}
            />
          ))}
        </section>
      </main>

      <ImgPreview
        isOpen={isPreviewOpen}
        item={previewItem}
        onClose={closePreview}
      />
    </>
  );
}
