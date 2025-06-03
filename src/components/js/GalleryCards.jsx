import React from 'react';

export default function GalleryCards({
  item,
  isLiked,
  toggleLike,   
  onPreview,   
}) {
  const handleHeartClick = e => {
    e.stopPropagation();
    toggleLike(item.caption);
  };

  return (
    <div className="Image-container" onClick={() => onPreview(item)}>
      <figure>
        <img
          className="Images"
          src={item.src}
          alt={item.caption}
          data-name={item.caption}
        />
        <figcaption className={item.caption.length > 25 ? 'desc' : 'Name-heart'}>
          <p>{item.caption}</p>
          <img
            className={`heart-icon${isLiked ? ' liked' : ''}`}
            alt="Heart icon"
            src={
              isLiked
                ? '/assets/heart-solid.svg'
                : '/assets/img/Union.png'
            }
            onClick={handleHeartClick}
          />
        </figcaption>
      </figure>
    </div>
  );
}
