import { AlertModal } from "../Modals/AlertModal.js";
import { Toaster } from "../Toaster.js";
import { removeQuiz } from "../../handlers/quizzes/quizHandler.js";
import { navigateTo } from "../../routes/navigate.js";

export function QuizList(quizzes, subjectId) {
  const container = document.createElement("div");
  container.classList.add("quiz-list");

  if (!quizzes || quizzes.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Nenhum quiz cadastrado ainda.";
    emptyMsg.classList.add("textMd");
    emptyMsg.style.color = "var(--stone-500)";
    container.appendChild(emptyMsg);
    return container;
  }

  quizzes.forEach((quiz) => {
    const item = document.createElement("div");
    item.classList.add("dashboard-item");

    const name = document.createElement("p");
    name.textContent = quiz.name;
    name.classList.add("textMd");
    name.style.color = "var(--stone-900)";

    const rightArea = document.createElement("div");
    rightArea.classList.add("quiz-actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.classList.add("link-btn");
    editBtn.addEventListener("click", () => {
      //rota de editar quiz
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";
    removeBtn.classList.add("link-btn", "danger");
    removeBtn.addEventListener("click", () => {
      const confirmDeleteModal = AlertModal({
        title: "Tem certeza?",
        message: `Você irá eliminar o quiz "${quiz.name}". Esta ação não pode ser desfeita.`,
        type: "delete",
        confirmText: "Eliminar",
        onConfirm: () => {
          removeQuiz(quiz._id)
            .then(() => {
              Toaster({
                title: "Sucesso!",
                description: `O quiz "${quiz.name}" foi removido.`,
                type: "success",
              });
              navigateTo(`#/subject-edit/${subjectId}`);
            })
            .catch(() => {
              Toaster({
                title: "Erro ao remover",
                description: "Não foi possível remover o quiz",
                type: "error",
              });
            });
        },
      });
      document.body.appendChild(confirmDeleteModal);
    });

    rightArea.append(editBtn, removeBtn);
    item.append(name, rightArea);
    container.appendChild(item);
  });

  return container;
}
