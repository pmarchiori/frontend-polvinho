export function SidebarBottom() {
  const sidebarBottom = document.createElement("div");
  sidebarBottom.classList.add("sidebar-top");

  // const sidebarBottomMenu = document.createElement("div");
  // sidebarBottomMenu.classList.add("sidebar-menu");

  const sidebarPassword = document.createElement("div");
  sidebarPassword.classList.add("sidebar-password");

  const changePasswordText = document.createElement("a");
  changePasswordText.classList.add("sidebar-menu-text");
  changePasswordText.textContent = "Trocar senha";

  const sidebarFinishSession = document.createElement("div");
  sidebarFinishSession.classList.add("sidebar-finish-session");

  const finishSessionText = document.createElement("a");
  finishSessionText.classList.add("sidebar-menu-text");
  finishSessionText.textContent = "Encerrar sessão";

  const changePasswordIcon = document.createElement("img");
  const finishSessionIcon = document.createElement("img");

  changePasswordIcon.src = "/assets/Password.svg";
  changePasswordIcon.alt = "Ícone de alteração de senha";
  changePasswordIcon.classList.add("password-icon");

  finishSessionIcon.src = "/assets/SignOut.svg";
  finishSessionIcon.alt = "Ícone de finalizar sessão";
  finishSessionIcon.classList.add("finish-session-icon");

  sidebarPassword.appendChild(changePasswordIcon);
  sidebarPassword.appendChild(changePasswordText);

  sidebarFinishSession.appendChild(finishSessionIcon);
  sidebarFinishSession.appendChild(finishSessionText);

  sidebarBottom.appendChild(sidebarPassword);
  sidebarBottom.appendChild(sidebarFinishSession);

  return sidebarBottom;
}
