export function SidebarItem({ text, iconSrc, helperIconSrc, onClick }) {
  const sidebarItem = document.createElement("div");
  sidebarItem.classList.add("sidebar-item");

  const sidebarItemIcon = document.createElement("img");
  sidebarItemIcon.src = iconSrc;
  sidebarItemIcon.alt = "Ícone de " + text;
  sidebarItemIcon.classList.add("sidebar-icon");

  const sidebarItemText = document.createElement("a");
  sidebarItemText.classList.add("textMd");
  sidebarItemText.style.color = "var(--indigo-50)";
  sidebarItemText.textContent = text;

  sidebarItem.appendChild(sidebarItemIcon);
  sidebarItem.appendChild(sidebarItemText);

  let sidebarHelperIcon = null;
  if (helperIconSrc) {
    sidebarHelperIcon = document.createElement("img");
    sidebarHelperIcon.src = helperIconSrc;
    sidebarHelperIcon.alt = "Ícone de dropdown";
    sidebarHelperIcon.classList.add("sidebar-dropdown-icon");
    sidebarItem.appendChild(sidebarHelperIcon);
  }

  sidebarItem.addEventListener("click", (e) => {
    e.preventDefault();

    if (sidebarHelperIcon) {
      sidebarHelperIcon.classList.toggle("rotated");
    }

    if (typeof onClick === "function") {
      onClick();
    }
  });

  return sidebarItem;
}
