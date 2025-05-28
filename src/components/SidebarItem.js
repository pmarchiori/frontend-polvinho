export function SidebarItem({ text, iconSrc, helperIconSrc = "" }) {
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

  if (helperIconSrc) {
    const sidebarHelperIcon = document.createElement("img");
    sidebarHelperIcon.src = helperIconSrc;
    sidebarHelperIcon.alt = "Ícone de dropdown";
    sidebarHelperIcon.classList.add("sidebar-icon");
    sidebarItem.appendChild(sidebarHelperIcon);
  }

  return sidebarItem;
}
