export function StudentAnswerList(students, onViewAnswers) {
  const container = document.createElement("div");
  container.classList.add("student-answer-list");

  if (!students || students.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Nenhum aluno respondeu ainda.";
    emptyMsg.classList.add("textMd");
    emptyMsg.style.color = "var(--stone-500)";
    container.appendChild(emptyMsg);
    return container;
  }

  students.forEach((student) => {
    const item = document.createElement("div");
    item.classList.add("dashboard-item");

    const name = document.createElement("p");
    name.textContent = student.name;
    name.classList.add("textMd");
    name.style.color = "var(--stone-900)";

    const rightArea = document.createElement("div");
    rightArea.classList.add("student-answer-info");

    const grade = document.createElement("span");
    grade.textContent = `${student.bestScore} / 10`;
    grade.style.color = "var(--stone-600)";

    const viewBtn = document.createElement("button");
    viewBtn.textContent = "Ver Respostas";
    viewBtn.classList.add("link-btn");
    viewBtn.addEventListener("click", () => onViewAnswers(student._id));

    rightArea.append(viewBtn, grade);
    item.append(name, rightArea);
    container.appendChild(item);
  });

  return container;
}
