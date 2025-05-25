const images = document.querySelectorAll(".Images");
// adding an event on each of the images
images.forEach((img) => {
  img.addEventListener("click", function () {
    const imageContainer = document.createElement("div"); // create and style div element
    imageContainer.className = 'img-preview-styles'
    imageContainer.innerHTML = "";
    
    // create and  style image element
    const previewImage = document.createElement("img");
    previewImage.src = img.src;
    
    // create and style p element
    const imgTitle = document.createElement("p");
    imgTitle.className = 'image-name'
    imgTitle.textContent = img.getAttribute("data-name");
    
    // append the image and p elements to the div
    imageContainer.appendChild(previewImage);
    imageContainer.appendChild(imgTitle);
    document.body.appendChild(imageContainer);
    
    // to remove the image when clicked
    imageContainer.addEventListener("click", function () {
      document.body.removeChild(imageContainer);
    });
  });
});

//function to get the current year for the copyright
function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}