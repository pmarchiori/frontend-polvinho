import { navigateTo } from "../routes/navigate.js";
import { logout } from "../handlers/auth/logoutHandler.js";
import { AlertModal } from "./AlertModal.js";
import { SidebarItem } from "./SidebarItem.js";

export function SidebarBottom() {
  const sidebarBottom = document.createElement("div");
  sidebarBottom.classList.add("sidebar-bottom");

  const sidebarPassword = SidebarItem({
    text: "Trocar senha",
    iconSrc: "/assets/Password.svg",
    onClick: () => {
      navigateTo("#/change-password");
    },
  });

  const sidebarFinishSession = SidebarItem({
    text: "Encerrar sessão",
    iconSrc: "/assets/SignOut.svg",
    onClick: () => {
      const modal = AlertModal({
        title: "Tem certeza?",
        message:
          "Você irá encerrar sua sessão e precisará realizar login para entrar novamente.",
        type: "delete",
        onConfirm: () => {
          logout();
        },
        onCancel: () => {},
      });
      document.body.appendChild(modal);
    },
  });

  sidebarBottom.appendChild(sidebarPassword);
  sidebarBottom.appendChild(sidebarFinishSession);

  return sidebarBottom;
}
