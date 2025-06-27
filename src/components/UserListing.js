export function UserListing({ registration, name, subjects }) {
  const userListing = document.createElement("div");
  userListing.classList.add("user-listing");

  const userRegistration = document.createElement("p");
  userRegistration.textContent = registration;
  userRegistration.classList.add("textMd", "col-registration", "list-text");

  const userName = document.createElement("p");
  userName.textContent = name;
  userName.classList.add("textMd", "col-name", "list-text");

  const userSubjects = document.createElement("p");
  userSubjects.textContent = subjects.length;
  userSubjects.classList.add("textMd", "col-subjects", "list-text");
  if (subjects.length === 0) {
    userSubjects.classList.add("empty-subjects");
  }

  const actionsArea = document.createElement("div");
  actionsArea.classList.add("actions-area", "col-actions");

  const editButton = document.createElement("p");
  editButton.textContent = "Editar";
  editButton.classList.add("actions-btn");

  const removeButton = document.createElement("p");
  removeButton.textContent = "Remover";
  removeButton.classList.add("actions-btn");

  actionsArea.appendChild(editButton);
  actionsArea.appendChild(removeButton);

  userListing.appendChild(userRegistration);
  userListing.appendChild(userName);
  userListing.appendChild(userSubjects);
  userListing.appendChild(actionsArea);

  return userListing;
}
