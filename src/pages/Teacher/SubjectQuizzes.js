import { CreationButton } from "../../components/Buttons/CreationButton.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { Title } from "../../components/Title.js";
import { DashboardItem } from "../../components/Dashboard/DashboardItem.js";
import { fetchSubjectById } from "../../handlers/subjects/subjectHandler.js";
import { navigateTo } from "../../routes/navigate.js";

export async function SubjectQuizzes(subjectId) {
  const subject = await fetchSubjectById(subjectId);

  const listContainer = document.createElement("div");
  listContainer.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const btnArea = document.createElement("div");

  const returnButton = ReturnButton();
  returnButton.addEventListener("click", () => window.history.back());

  const title = Title({
    title: subject.name,
    subtitle: "Quizzes",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  const createButton = CreationButton({
    btnName: "Criar Quiz",
    btnClass: "creation-btn",
    route: "#/quiz-register",
  });

  const contentArea = document.createElement("div");
  contentArea.classList.add("quizzes-area");

  const postedQuizzes = document.createElement("div");
  postedQuizzes.classList.add("quizzes-list");

  const draftsQuizzes = document.createElement("div");
  draftsQuizzes.classList.add("quizzes-list");

  const postedQuizzesTitle = Title({
    title: "Postados",
    titleClass: "title4",
    titleColor: "var(--stone-700)",
  });

  const draftQuizzesTitle = Title({
    title: "Rascunhos",
    titleClass: "title4",
    titleColor: "var(--stone-700)",
  });

  postedQuizzes.append(postedQuizzesTitle);
  draftsQuizzes.append(draftQuizzesTitle);

  subject.quizzes.forEach((quiz) => {
    const item = DashboardItem({
      title: quiz.name,
      onClick: () => {
        navigateTo(`#/quiz-details-teacher/${quiz._id}`);
      },
    });

    if (quiz.isPublished) {
      postedQuizzes.appendChild(item);
    } else {
      draftsQuizzes.appendChild(item);
    }
  });
  contentArea.append(postedQuizzes, draftsQuizzes);

  titleArea.append(returnButton, title);
  btnArea.append(createButton);
  header.append(titleArea, btnArea);
  listContainer.append(header, contentArea);

  return listContainer;
}
