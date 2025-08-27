import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { InfoCard } from "../../components/Quiz/InfoCard.js";
import { Title } from "../../components/Title.js";
import { Question } from "../../components/Quiz/Question.js";
import { fetchQuizById } from "../../handlers/quizzes/quizHandler.js";
import { submitQuizAnswers } from "../../handlers/answers/answerHandler.js";
import { ConfirmModal } from "../../components/Modals/ConfirmModal.js";
import { navigateTo } from "../../routes/navigate.js";

export async function QuizAnswer(quizId) {
  const quiz = await fetchQuizById(quizId);

  const container = document.createElement("div");
  container.classList.add("user-list");

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

  titleArea.append(returnButton, title);
  header.append(titleArea);
  container.append(header);

  const studentAnswers = {};

  const infoCard = InfoCard({
    titleText: "Respostas",
    titleClass: "card-title",
    contentType: "answers",
    answers: [],
    showButton: true,
    buttonConfig: {
      btnName: "Entregar",
      btnClass: "save-quiz-btn",
      onConfirm: async () => {
        try {
          const result = await submitQuizAnswers(quiz._id, studentAnswers);

          const finishQuizModal = ConfirmModal({
            title: "Entregue!",
            message: `O quiz "${quiz.name}" foi entregue com sucesso.`,
            btnText: "Ver Gabarito",
            onConfirm: () => navigateTo(`#/quiz-details-student/${quiz._id}`),
          });
          document.body.appendChild(finishQuizModal);

          console.log(
            `Quiz entregue!\n\nTentativa: ${result.attempt}\nAcertos: ${result.correct}\nErros: ${result.wrong}\nScore: ${result.score}`
          );
        } catch (err) {
          console.log(err.message || "Erro ao enviar quiz");
        }
      },
    },
  });

  container.append(infoCard);

  const questionsContainer = document.createElement("div");
  questionsContainer.classList.add("questions-container");

  quiz.questions.forEach((question, index) => {
    const questionComponent = Question({
      question,
      index,
      onAnswer: (questionId, optionId, optionIndex) => {
        studentAnswers[questionId] = optionId;

        if (infoCard.updateAnswers) {
          const answersLetterArray = quiz.questions.map((q) => {
            const selectedOptionId = studentAnswers[q._id];
            let letter = "";
            if (selectedOptionId) {
              const idx = q.options.findIndex(
                (o) => o._id === selectedOptionId
              );
              if (idx !== -1) letter = String.fromCharCode(97 + idx);
            }
            return { letter };
          });

          infoCard.updateAnswers(answersLetterArray);
        }
      },
    });
    questionsContainer.append(questionComponent);
  });

  container.append(questionsContainer);

  return container;
}
