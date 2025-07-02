import { Title } from "../components/Title.js";

export function AlertModal({ title, message, type, onConfirm, onCancel }) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("alert-modal");

  const modalTitle = Title({
    title: title,
    subtitle: message,
    titleClass: "title3",
    subtitleClass: "textMd",
    titleColor: "var(--stone-900)",
    subtitleColor: "var(--stone-700)",
  });

  const btns = document.createElement("div");
  btns.classList.add("modal-btns-area");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancelar";
  cancelBtn.classList.add("modal-btn", "cancel-modal-btn");
  cancelBtn.addEventListener("click", () => {
    onCancel?.();
    document.body.removeChild(overlay);
  });

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Eliminar";
  confirmBtn.classList.add("modal-btn");
  type === "delete"
    ? confirmBtn.classList.add("red-action-modal-btn")
    : confirmBtn.classList.add("blue-action-modal-btn");

  confirmBtn.addEventListener("click", () => {
    onConfirm?.();
    document.body.removeChild(overlay);
  });

  btns.append(cancelBtn, confirmBtn);

  modal.append(modalTitle, btns);

  overlay.appendChild(modal);

  return overlay;
}
