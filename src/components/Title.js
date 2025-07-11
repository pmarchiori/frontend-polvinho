export function Title({
  title,
  subtitle = "",
  titleClass = "",
  subtitleClass = "",
  titleColor = "",
  subtitleColor = "",
}) {
  const titleContent = document.createElement("div");
  titleContent.classList.add("title-content");

  const pageTitle = document.createElement("p");
  pageTitle.textContent = title;

  if (titleClass) {
    pageTitle.classList.add(...titleClass.split(" "));
  }
  if (titleColor) {
    pageTitle.style.color = titleColor;
  }

  titleContent.appendChild(pageTitle);

  if (subtitle) {
    const pageSubtitle = document.createElement("p");
    pageSubtitle.textContent = subtitle;

    if (subtitleClass) {
      pageSubtitle.classList.add(...subtitleClass.split(" "));
    }
    if (subtitleColor) {
      pageSubtitle.style.color = subtitleColor;
    }

    titleContent.appendChild(pageSubtitle);
  }

  return titleContent;
}
