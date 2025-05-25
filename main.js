import './components/js/imgPreview.js';
import './components/js/newPost.js';
import "./components/js/editProfile.js";

//function to get the current year for the copyright
function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

document.querySelector(
  ".footertext"
).textContent = `${getCurrentYear()} © Spots`;