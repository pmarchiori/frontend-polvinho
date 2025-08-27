import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { InfoCard } from "../../components/Quiz/InfoCard.js";
import { Title } from "../../components/Title.js";
import { Question } from "../../components/Quiz/Question.js";
import { getAttemptDetails } from "../../handlers/answers/answerHandler.js";

export async function QuizAnswerSheet(attemptId) {
  const attemptData = await getAttemptDetails(attemptId);

  const container = document.createElement("div");
  container.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const returnButton = ReturnButton();
  returnButton.addEventListener("click", () => window.history.back());

  const title = Title({
    title: attemptData.quizName,
    subtitle: attemptData.subject,
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  titleArea.append(returnButton, title);
  header.append(titleArea);
  container.append(header);

  const answersLetterArray = attemptData.answers.map((ans) => {
    const idx = ans.options.findIndex((o) => o.optionId === ans.selectedOption);
    return {
      letter: idx >= 0 ? String.fromCharCode(97 + idx) : "-",
      isCorrect: ans.isCorrect,
    };
  });

  const infoCard = InfoCard({
    titleText: `Nota: ${attemptData.score}`,
    titleClass: "card-title",
    contentType: "answers",
    answers: answersLetterArray,
    isResult: true,
  });

  container.append(infoCard);

  const questionsContainer = document.createElement("div");
  questionsContainer.classList.add("questions-container");

  attemptData.answers.forEach((ans, index) => {
    const questionComponent = Question({
      question: {
        _id: ans.questionId,
        text: ans.questionText,
        options: ans.options.map((opt) => ({
          _id: opt.optionId,
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
      },
      index,
      selectedOptionId: ans.selectedOption,
      isResult: true,
    });
    questionsContainer.append(questionComponent);
  });

  container.append(questionsContainer);

  return container;
}
