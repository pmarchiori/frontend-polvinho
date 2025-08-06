import { AlertModal } from "./AlertModal.js";

export function SubjectListing({
  name,
  teacher,
  quizzes = [],
  onEdit,
  onRemove,
}) {
  const subjectListing = document.createElement("div");
  subjectListing.classList.add("user-listing");

  const subjectName = document.createElement("p");
  subjectName.textContent = name;
  subjectName.classList.add("textMd", "col-name", "list-text");

  const subjectTeacher = document.createElement("p");
  subjectTeacher.textContent = teacher;
  subjectTeacher.classList.add("textMd", "col-registration", "list-text");
  if (subjectTeacher.textContent === "Nenhum Professor") {
    subjectTeacher.classList.add("empty-color");
  }

  const subjectQuizzes = document.createElement("p");
  subjectQuizzes.textContent = quizzes.length;
  subjectQuizzes.classList.add("textMd", "col-subjects", "list-text");
  if (quizzes.length === 0) {
    subjectQuizzes.classList.add("empty-color");
  }

  const actionsArea = document.createElement("div");
  actionsArea.classList.add("actions-area", "col-actions");

  const editButton = document.createElement("p");
  editButton.textContent = "Editar";
  editButton.classList.add("actions-btn");
  editButton.addEventListener("click", () => {
    onEdit?.();
  });

  const removeButton = document.createElement("p");
  removeButton.textContent = "Remover";
  removeButton.classList.add("actions-btn");
  removeButton.addEventListener("click", () => {
    const confirmDeleteModal = AlertModal({
      title: "Tem certeza?",
      message: `Você irá eliminar a disciplina ${name}. Esta ação não pode ser desfeita.`,
      type: "delete",
      confirmText: "Eliminar",
      onConfirm: () => {
        onRemove?.();
      },
      onCancel: () => {},
    });
    document.body.appendChild(confirmDeleteModal);
  });

  actionsArea.appendChild(editButton);
  actionsArea.appendChild(removeButton);

  subjectListing.appendChild(subjectName);
  subjectListing.appendChild(subjectTeacher);
  subjectListing.appendChild(subjectQuizzes);
  subjectListing.appendChild(actionsArea);

  return subjectListing;
}
