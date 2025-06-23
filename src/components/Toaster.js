export function Toaster({ title: titleText, description: descText, type }) {
  const typeStyles = {
    success: {
      primary: "var(--emerald-100)",
      secondary: "var(--emerald-400)",
      icon: "../../assets/success.svg",
    },
    info: {
      primary: "var(--indigo-100)",
      secondary: "var(--indigo-500)",
      icon: "../../assets/info.svg",
    },
    error: {
      primary: "var(--red-100)",
      secondary: "var(--red-500)",
      icon: "../../assets/error.svg",
    },
  };

  const { primary, secondary, icon } = typeStyles[type];

  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.classList.add("toast-container");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.style.backgroundColor = primary;
  toast.style.borderLeft = `5px solid ${secondary}`;

  const closeButton = document.createElement("img");
  closeButton.src = "../../assets/X.svg";
  closeButton.alt = "Fechar";
  closeButton.className = "toast-close";
  closeButton.addEventListener("click", () => {
    toast.classList.add("hide");
    toast.addEventListener("transitionend", () => toast.remove());
  });
  toast.appendChild(closeButton);

  if (icon) {
    const iconImg = document.createElement("img");
    iconImg.src = icon;
    iconImg.alt = `${type} icon`;
    iconImg.className = "toast-icon";
    toast.appendChild(iconImg);
  }

  const contentDiv = document.createElement("div");
  contentDiv.className = "toast-content";

  const title = document.createElement("p");
  title.className = "textMdBold";
  title.textContent = titleText;

  const description = document.createElement("p");
  description.className = "textSm";
  description.textContent = descText || "";

  contentDiv.appendChild(title);
  contentDiv.appendChild(description);
  toast.appendChild(contentDiv);
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("transitionend", () => toast.remove());
  }, 3000);
}
