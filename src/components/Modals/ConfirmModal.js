import { Title } from "../Title.js";

export function ConfirmModal({ title, message, btnText, onConfirm }) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("confirm-modal");

  const titleArea = document.createElement("div");
  titleArea.classList.add("confirm-modal-title-area");

  const icon = document.createElement("img");
  icon.src = "../../assets/CheckCircle.svg";

  const modalTitle = Title({
    title: title,
    titleClass: "title3",
    titleColor: "var(--stone-900)",
  });

  const modalMessage = document.createElement("p");
  modalMessage.textContent = message;
  modalMessage.classList.add("modal-message");

  const btn = document.createElement("button");
  btn.textContent = btnText;
  btn.classList.add("confirm-modal-btn");
  btn.classList.add("textMdBold");
  btn.addEventListener("click", () => {
    onConfirm?.();
    document.body.removeChild(overlay);
  });

  titleArea.append(icon, modalTitle);
  modal.append(titleArea, modalMessage, btn);
  overlay.appendChild(modal);

  return overlay;
}
