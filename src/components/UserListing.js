export function UserListing() {
  const userListing = document.createElement("div");
  userListing.classList.add("user-listing");

  const userRegistration = document.createElement("p");
  userRegistration.textContent = "registration";
  userRegistration.classList.add("textMd");

  const userName = document.createElement("p");
  userName.textContent = "name";
  userName.classList.add("textMd");

  const userSubjects = document.createElement("p");
  userSubjects.textContent = "subjects";
  userSubjects.classList.add("textMd");

  const actionsArea = document.createElement("div");
  actionsArea.classList.add("actions-area");

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
