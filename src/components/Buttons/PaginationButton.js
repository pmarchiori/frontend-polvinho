export function PaginationButton({ btnName, initiateDisabled = false }) {
  const paginationButton = document.createElement("button");
  paginationButton.classList.add("pagination-btn");

  paginationButton.textContent = btnName;

  if (initiateDisabled === true) paginationButton.disabled = true;

  return paginationButton;
}
