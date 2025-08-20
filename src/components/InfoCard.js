import { FormButton } from "./Buttons/FormButton.js";
import { Title } from "./Title.js";

export function InfoCard({ titleText, titleClass }) {
  const infoCard = document.createElement("div");
  infoCard.classList.add("info-card");

  const title = Title({
    title: titleText,
    titleClass: titleClass,
    titleColor: "var(--stone-700)",
  });

  const infoCardBtn = FormButton({
    btnName: "Entregar",
    btnClass: "save-quiz-btn",
  });

  infoCard.append(title, infoCardBtn);

  return infoCard;
}
