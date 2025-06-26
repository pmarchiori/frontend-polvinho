export function EmptyData({ text }) {
  const emptyData = document.createElement("div");
  emptyData.classList.add("empty-data-container");

  const emptyDataImage = document.createElement("img");
  emptyDataImage.src = "/assets/no-data.svg";
  emptyDataImage.alt = "Imagem de pranchetas vazias";

  const emptyDataText = document.createElement("p");
  emptyDataText.classList.add("textMd");
  emptyDataText.textContent = text;
  emptyDataText.style.color = "var(--stone-400)";

  emptyData.appendChild(emptyDataImage);
  emptyData.appendChild(emptyDataText);

  return emptyData;
}
