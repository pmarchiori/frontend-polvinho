export function ReturnButton() {
  const returnButton = document.createElement("img");
  returnButton.src = "/assets/caret-left.svg";
  returnButton.classList.add("return-btn");

  return returnButton;
}
