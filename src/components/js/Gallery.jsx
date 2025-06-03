import React, { useState, useEffect } from 'react';
import GalleryCard from './GalleryCards';
import ImgPreview from './ImgPreview';
import staticImageData from './../../images.json';

const STORAGE_KEY_LIKES = 'likedHearts';

export default function Gallery({ posts = [] }) {
  const [allImages, setAllImages] = useState([]);
  const [likedHearts, setLikedHearts] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  //load likedHearts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_LIKES);
    try {
      setLikedHearts(stored ? JSON.parse(stored) : []);
    } catch {
      setLikedHearts([]);
    }
  }, []);

  useEffect(() => {

    setAllImages([...posts, ...staticImageData]);
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likedHearts));
  }, [likedHearts]);

  const toggleLike = caption => {
    setLikedHearts(prev => {
      if (prev.includes(caption)) {
        return prev.filter(c => c !== caption);
      } else {
        return [...prev, caption];
      }
    });
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
