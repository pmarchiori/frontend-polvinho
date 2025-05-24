export function createTitle(title, subtitle) {
  const titleContent = document.createElement("div");
  titleContent.classList.add("title-content");

  const pageTitle = document.createElement("p");
  pageTitle.textContent = title;
  //pageTitle.classList.add("");

  const pageSubtitle = document.createElement("p");
  pageSubtitle.textContent = subtitle;
  //pageSubtitle.classList.add("");

  titleContent.appendChild(pageTitle);
  titleContent.appendChild(pageSubtitle);

  return titleContent;
}
