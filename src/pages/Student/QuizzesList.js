import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { Title } from "../../components/Title.js";
import { fetchSubjectById } from "../../handlers/subjects/subjectHandler.js";
import { QuizListItem } from "../../components/Quiz/QuizListItem.js";
import { navigateTo } from "../../routes/navigate.js";
import { formatDate } from "../../utils/formatDate.js";
import { ChartNames } from "../../components/Listing/ChartNames.js";

export async function QuizzesList(subjectId) {
  const subject = await fetchSubjectById(subjectId);

  const listContainer = document.createElement("div");
  listContainer.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const chartNames = ChartNames({
    text1: "Nome",
    text2: "Data de Entrega",
    text3: "Tipo",
    text1Class: "col-quiz-name",
    text2Class: "col-data",
    text3Class: "col-type",
  });

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

  const contentArea = document.createElement("div");
  contentArea.classList.add("quiz-list");

  subject.quizzes
    .filter((quiz) => quiz.isPublished)
    .forEach((quiz) => {
      const item = QuizListItem({
        title: quiz.name,
        finalDate: formatDate(quiz.finishedDate),
        quizType: quiz.quizType,
        onClick: () => {
          navigateTo(`#/quiz-details-student/${quiz._id}`);
        },
      });

      contentArea.appendChild(item);
    });

  titleArea.append(returnButton, title);
  header.append(titleArea);
  listContainer.append(header, chartNames, contentArea);

  return listContainer;
}
