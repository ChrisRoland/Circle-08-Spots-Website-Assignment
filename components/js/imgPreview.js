const imageData = [
  {
    src: "./assets/img/Mask group.png",
    caption: "Val Thorens"
  },
  {
    src: "./assets/img/pexels-kassandre-pedro-8639743 1.png",
    caption: "Restaurant terrace"
  },
  {
    src: "./assets/img/Mask group (1).png",
    caption: "An outdoor cafe"
  },
  {
    src: "./assets/img/pexels-kassandre-pedro-8639743 1-3.png",
    caption: "A very long bridge, over the forest …"
  },
  {
    src: "./assets/img/pexels-kassandre-pedro-8639743 1-4.png",
    caption: "Tunnel with morning light"
  },
  {
    src: "./assets/img/pexels-kassandre-pedro-8639743 1-5.png",
    caption: "Mountain house"
  }
];

// Target the gallery section
const gallerySection = document.getElementById("gallerySection");

// Inject the image cards
imageData.forEach((item) => {
  const container = document.createElement("div");
  container.className = "Image-container";

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.className = "Images";
  img.src = item.src;
  img.alt = item.caption;
  img.setAttribute("data-name", item.caption);

  const figcaption = document.createElement("figcaption");
  figcaption.className = item.caption.length > 25 ? "desc" : "Name-heart";

  const title = document.createElement("p");
  title.textContent = item.caption;

  const heartIcon = document.createElement("img");
  heartIcon.className = "heart-icon";
  heartIcon.src = "./assets/img/Union.png";
  heartIcon.alt = "Heart icon";

  // Like toggle
  heartIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    heartIcon.src = heartIcon.classList.toggle("liked")
      ? "./assets/heart-solid.svg"
      : "./assets/img/Union.png";
  });

  // Image click → open modal
  img.addEventListener("click", () => {
    const modal = document.getElementById("modal-preview");
    const previewImg = document.getElementById("previewImg");
    const previewTitle = document.getElementById("previewTitle");

    modal.style.display = "flex";
    previewImg.src = item.src;
    previewTitle.textContent = item.caption;
  });

  figcaption.appendChild(title);
  figcaption.appendChild(heartIcon);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  container.appendChild(figure);
  gallerySection.appendChild(container);
});

// Inject the modal at the end of body
const modal = document.createElement("div");
modal.className = "modal";
modal.id = "modal-preview";
modal.innerHTML = `
  <div class="modal-content">
    <button class="modal-close" data-close>&times;</button>
    <img id="previewImg" src="" alt="" class="preview-img" />
    <p id="previewTitle" class="preview-title"></p>
  </div>
`;
document.body.appendChild(modal);

// Close modal on click
modal.addEventListener("click", (e) => {
  if (e.target.id === "modal-preview" || e.target.classList.contains("modal-close")) {
    modal.style.display = "none";
  }
});