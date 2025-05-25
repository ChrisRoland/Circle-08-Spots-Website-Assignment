import '/components/js/imgPreview.js';

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
    caption: "A very long bridge, over the forest ..."
  },
  {
    src: "./assets/img/pexels-kassandre-pedro-8639743 1-4.png",
    caption: "Tunnel with morning light"
  },
  {
    src: "./assets/img/pexels-kassandre-pedro-8639743 1-5.png",
    caption: "Mountain House"
  }
];
 
const gallery = document.getElementById("gridCard");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");

imageData.forEach((item) => {
  const card = document.createElement("div");
  card.className = "grid-item";

  card.innerHTML = `
    <img src="${item.src}" alt="${item.caption}">
    <div class="grid-card-item">
      <p class="caption">${item.caption}</p>
      <img class ="heart" src = "./assets/img/Union.png"/>
  </div>
  `;
 
  // heart section
  const heart = card.querySelector(".heart");
  heart.addEventListener("click", (e) => {
    e.stopPropagation(); 

    if (heart.classList.contains("liked")) {
    heart.src = "./assets/img/Union.png"; 
    heart.classList.remove("liked");
    } else {
    heart.src = "./assets/heart-solid.svg"; 
    heart.classList.add("liked");
    }
  });



  // modal section
  const img = card.querySelector("img");
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.flexDirection = "column"
    modalImg.src = item.src;
    modalCaption.textContent = item.caption;
  });

  gallery.appendChild(card);
});

// modal closing 
modal.addEventListener("click", () => {
  modal.style.display = "none";
});


//function to get the current year for the copyright
function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

document.querySelector(
  ".footertext"
).textContent = `${getCurrentYear()} © Spots`;