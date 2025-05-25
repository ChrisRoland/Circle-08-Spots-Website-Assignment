// Creating the Edit Profile Modal
function createEditProfileModal() {
  // editProfile wrapper
  const editProfile = document.createElement("div");
  editProfile.id = "profileEditModal";
  editProfile.className = "editModal";
  editProfile.style.display = "none";

  // editProfile content
  const editProfileContent = document.createElement("div");
  editProfileContent.className = "editModal-content";

  // Close button
  const closeBtn = document.createElement("span");
  closeBtn.className = "closeEditModal";
  closeBtn.id = "closeEditProfile";
  closeBtn.innerHTML = "&times;";

  // editProfile title
  const title = document.createElement("h2");
  title.textContent = "Edit Profile";

  // Creating Edit Form
  const form = document.createElement("form");
  form.id = "editProfileForm";

  // Form Name (label and input)
  const profileNameLabel = document.createElement("label");
  profileNameLabel.setAttribute("for", "profileNameInput");
  profileNameLabel.textContent = "Name:";
  const profileNameInput = document.createElement("input");
  profileNameInput.type = "text";
  profileNameInput.id = "profileNameInput";
  profileNameInput.name = "name";
  profileNameInput.required = true;

  // form Field (label and input)
  const profileFieldLabel = document.createElement("label");
  profileFieldLabel.setAttribute("for", "profileFieldInput");
  profileFieldLabel.textContent = "Field:";
  const profileFieldInput = document.createElement("input");
  profileFieldInput.type = "text";
  profileFieldInput.id = "profileFieldInput";
  profileFieldInput.name = "field";
  profileFieldInput.required = true;

  // Form Avatar (label and input)
  const profileAvatarLabel = document.createElement("label");
  profileAvatarLabel.setAttribute("for", "profileAvatarInput");
  profileAvatarLabel.textContent = "Upload Image:";
  const profileAvatarInput = document.createElement("input");
  profileAvatarInput.type = "file";
  profileAvatarInput.id = "profileAvatarInput";
  profileAvatarInput.name = "avatar";

  // Save button
  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";

  // Create form
  form.appendChild(profileNameLabel);
  form.appendChild(profileNameInput);
  form.appendChild(profileFieldLabel);
  form.appendChild(profileFieldInput);
  form.appendChild(profileAvatarLabel);
  form.appendChild(profileAvatarInput);
  form.appendChild(document.createElement("br"));
  form.appendChild(saveBtn);

  // Create editProfile content
  editProfileContent.appendChild(closeBtn);
  editProfileContent.appendChild(title);
  editProfileContent.appendChild(form);

  // Create editProfile modal
  editProfile.appendChild(editProfileContent);

  // Display in the body
  document.body.appendChild(editProfile);
}


window.addEventListener("DOMContentLoaded", function () {
  // Call the function to create and display the editProfile modal
  createEditProfileModal();

  // Declaring the profile Edit modal functionality variables

  const editProfile = document.getElementById("profileEditModal");
  const editBtn = document.getElementById("profileEditBtn");
  const closeEdit = document.getElementById("closeEditProfile");
  const profileForm = document.getElementById("editProfileForm");

  const avatarimg = document.getElementById("userAvatar");
  const userNameElem = document.getElementById("userName");
  const fieldElem = document.getElementById("userField");

  const nameInput = document.getElementById("profileNameInput");
  const fieldInput = document.getElementById("profileFieldInput");
  const avatarInput = document.getElementById("profileAvatarInput");

  // Function to open the editProfile  modal
  editBtn.addEventListener("click", () => {
    editProfile.style.display = "flex";
    nameInput.value = userNameElem.textContent;
    fieldInput.value = fieldElem.textContent;
  });

  // closing the editProfile modal
  closeEdit.addEventListener("click", () => {
    editProfile.style.display = "none";
  });

  // Saving editProfile changes
  function saveProfileChanges(name, field, avatarDataUrl) {
    const profile = { name, field, avatar: avatarDataUrl };
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  // When changes are made to the profile, save changes
  // saving the editProfile changes
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault(); //preventing the default form subission nature of the form button
    userNameElem.textContent = nameInput.value;
    fieldElem.textContent = fieldInput.value;

    // when a new avatar is to be selected
    if (avatarInput.files && avatarInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (avatarEvt) {
        avatarimg.src = avatarEvt.target.result;

        // To save all to localStorage
        saveProfileChanges(
          nameInput.value,
          fieldInput.value,
          avatarEvt.target.result
        );
      };
      reader.readAsDataURL(avatarInput.files[0]);
    } else {
      // save all to localStorage (keep current avatar)
      saveProfileChanges(nameInput.value, fieldInput.value, avatarimg.src);
    }

    editProfile.style.display = "none";
  });

  // loading profile changes from local storage
  function loadProfileFromStorage() {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      if (profile.name) userNameElem.textContent = profile.name;
      if (profile.field) fieldElem.textContent = profile.field;
      if (profile.avatar) avatarimg.src = profile.avatar; // default avatar
    }
  }

  // when the page loads, saved profile loads
  loadProfileFromStorage();

  // function to make modal close while clicking outside the modal content

  window.addEventListener("click", function (event) {
    if (event.target === editProfile) {
      editProfile.style.display = "none";
    }
  });
});