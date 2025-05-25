// components/js/newPost.js

const STORAGE_KEY = "spotsAppLS";

// 1) Inject the “New Post” modal into the DOM
const modal = document.createElement("div");
modal.className = "modal";
modal.id = "modal-post";
modal.innerHTML = `
  <div class="modal-content">
    <button class="modal-close" data-close>&times;</button>
    <h2>New Post</h2>
    <form id="form-post">
      <label>
        Upload Image:<br/>
        <input type="file" id="postFile" class="upload-img" accept="image/*" autofocus required />
      </label>
      <label>
        Title:<br/>
        <input type="text" id="postTitle" minlength="3" required />
      </label>
      <button type="submit" class="button-large">Save</button>
    </form>
  </div>
`;
document.body.appendChild(modal);

// 2) Open / close logic
const modalElement = document.getElementById("modal-post");
const newPostBtn = document.getElementById("newPostBtn");

if (newPostBtn) {
  newPostBtn.addEventListener("click", () => {
    document.getElementById("form-post").reset();
    modalElement.classList.add("modal-open");
    document.getElementById("postFile").focus();
  });
}

modalElement.addEventListener("click", (e) => {
  if (e.target === modalElement || e.target.dataset.close !== undefined) {
    modalElement.classList.remove("modal-open");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modalElement.classList.remove("modal-open");
});

// 3) Handle form submission
document.getElementById("form-post").addEventListener("submit", (e) => {
  e.preventDefault();

  const file = document.getElementById("postFile").files[0];
  const title = document.getElementById("postTitle").value.trim();
  if (!file || !title) return;

  const reader = new FileReader();
  reader.onload = () => {
    const newCard = { src: reader.result, caption: title };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    existing.unshift(newCard);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      if (err.name === "QuotaExceededError") {
        existing.pop();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
    }

    // Fire custom event
    window.dispatchEvent(new CustomEvent("post-added", { detail: newCard }));

    // Reset modal
    e.target.reset();
    modalElement.classList.remove("modal-open");
  };

  reader.readAsDataURL(file);
});
