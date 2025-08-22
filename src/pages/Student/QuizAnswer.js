import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { InfoCard } from "../../components/InfoCard.js";
import { Title } from "../../components/Title.js";
import { Question } from "../../components/Question.js";
import { fetchQuizById } from "../../handlers/quizzes/quizHandler.js";

export async function QuizAnswer(quizId) {
  const quiz = await fetchQuizById(quizId);

  const answerQuizContainer = document.createElement("div");
  answerQuizContainer.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const returnButton = ReturnButton();
  returnButton.addEventListener("click", () => window.history.back());

  const title = Title({
    title: quiz.name,
    subtitle: quiz.subject.name,
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  const infoCard = InfoCard({
    titleText: "Respostas",
    titleClass: "card-title",
    contentType: "answers",
    answers: [],
    showButton: true,
    buttonConfig: { btnName: "Entregar", btnClass: "save-quiz-btn" },
  });

  const questionsContainer = document.createElement("div");
  questionsContainer.classList.add("questions-container");

  quiz.questions.forEach((question, index) => {
    const questionComponent = Question({ question, index });
    questionsContainer.append(questionComponent);
  });

  titleArea.append(returnButton, title);
  header.append(titleArea);

  answerQuizContainer.append(header, infoCard, questionsContainer);

  return answerQuizContainer;
}
