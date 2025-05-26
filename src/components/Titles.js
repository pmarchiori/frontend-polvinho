export function createTitle(title, subtitle) {
  const titleContent = document.createElement("div");
  titleContent.classList.add("title-content");

  const pageTitle = document.createElement("p");
  pageTitle.textContent = title;
  //CRIAR AS CLASSES DE TEXTO DO FIGMA E APLICAR AQUI
  pageTitle.style.fontSize = "30px";
  pageTitle.style.lineHeight = "36px";
  pageTitle.style.fontWeight = "bold";
  pageTitle.style.color = "var(--stone-900)";
  //pageTitle.classList.add("");

  const pageSubtitle = document.createElement("p");
  pageSubtitle.textContent = subtitle;
  //CRIAR AS CLASSES DE TEXTO DO FIGMA E APLICAR AQUI
  pageSubtitle.style.fontSize = "24px";
  pageSubtitle.style.lineHeight = "32px";
  pageSubtitle.style.color = "var(--stone-700)";
  //pageSubtitle.classList.add("");

  titleContent.appendChild(pageTitle);
  titleContent.appendChild(pageSubtitle);

  return titleContent;
}
