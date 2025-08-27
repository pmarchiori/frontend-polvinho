import { Login } from "../pages/Login.js";
import { ChangePassword } from "../pages/ChangePassword.js";
import { RetrievePassword } from "../pages/RetrievePassword.js";
import { Sidebar } from "../components/Sidebar/Sidebar.js";
import { PageNotFound } from "../pages/PageNotFound.js";

import { DashboardRouter } from "../components/Dashboard/DashboardRouter.js";

import { StudentList } from "../pages/Admin/StudentList.js";
import { StudentRegister } from "../pages/Admin/StudentRegister.js";
import { StudentEdit } from "../pages/Admin/StudentEdit.js";
import { TeacherRegister } from "../pages/Admin/TeacherRegister.js";
import { TeacherList } from "../pages/Admin/TeacherList.js";
import { TeacherEdit } from "../pages/Admin/TeacherEdit.js";
import { SubjectList } from "../pages/Admin/SubjectList.js";
import { SubjectEdit } from "../pages/Admin/SubjectEdit.js";
import { SubjectRegister } from "../pages/Admin/SubjectRegister.js";
import { SubjectQuizzes } from "../pages/Teacher/SubjectQuizzes.js";
import { QuizRegister } from "../pages/Teacher/QuizRegister.js";
import { QuizDetailsTeacher } from "../pages/Teacher/QuizDetailsTeacher.js";
import { QuestionRegister } from "../pages/Teacher/QuestionRegister.js";
import { QuizzesList } from "../pages/Student/QuizzesList.js";
import { QuizDetailsStudent } from "../pages/Student/QuizDetailsStudent.js";
import { QuizAnswer } from "../pages/Student/QuizAnswer.js";
import { QuizAnswerSheet } from "../pages/Student/QuizAnswerSheet.js";
import { navigateTo } from "./navigate.js";
import { API_URL } from "../config/config.js";

import { hideLoading, showLoading } from "../components/loadingOverlay.js";

const routesWithSidebar = [
  "#/dashboard",
  "#/students",
  "#/student-register",
  "#/student-edit",
  "#/teachers",
  "#/teacher-register",
  "#/teacher-edit",
  "#/subjects",
  "#/subject-register",
  "#/subject-edit",
  "#/subject-quizzes",
  "#/quiz-register",
  "#/quiz-details-teacher",
  "#/question-register",
  "#/quizzes",
  "#/quiz-details-student",
  "#/quiz-answer",
  "#/quiz-answer-sheet",
];

const routes = {
  404: PageNotFound,
  "#/login": Login,
  "#/change-password": ChangePassword,
  "#/retrieve-password": RetrievePassword,
  "#/dashboard": DashboardRouter,

  "#/students": StudentList,
  "#/student-register": StudentRegister,
  "#/student-edit": StudentEdit,
  "#/teachers": TeacherList,
  "#/teacher-register": TeacherRegister,
  "#/teacher-edit": TeacherEdit,
  "#/subjects": SubjectList,
  "#/subject-register": SubjectRegister,
  "#/subject-edit": SubjectEdit,

  "#/subject-quizzes": SubjectQuizzes,
  "#/quiz-register": QuizRegister,
  "#/quiz-details-teacher": QuizDetailsTeacher,
  "#/question-register": QuestionRegister,

  "#/quizzes": QuizzesList,
  "#/quiz-details-student": QuizDetailsStudent,
  "#/quiz-answer": QuizAnswer,
  "#/quiz-answer-sheet": QuizAnswerSheet,
};

const protectedRoutes = {
  "#/dashboard": ["admin", "teacher", "student"],

  "#/students": ["admin", "teacher"],
  "#/student-register": ["admin"],
  "#/student-edit": ["admin", "teacher"],
  "#/teachers": ["admin"],
  "#/teacher-register": ["admin"],
  "#/teacher-edit": ["admin"],

  "#/subjects": ["admin", "teacher", "student"],
  "#/subject-register": ["admin"],
  "#/subject-edit": ["admin"],

  "#/subject-quizzes": ["teacher"],
  "#/quiz-register": ["teacher"],
  "#/question-register": ["teacher"],

  "#/quizzes": ["student"],
  "#/quiz-details-student": ["student"],
  "#/quiz-answer": ["student"],
  "#/quiz-answer-sheet": ["student", "teacher"],
};

export function getUserFromToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    return JSON.parse(atob(payloadBase64));
  } catch {
    return null;
  }
}

export async function router() {
  showLoading();

  const container =
    document.querySelector("#container") ||
    document.body.appendChild(document.createElement("div"));
  container.id = "container";
  container.innerHTML = "";

  const fullPath = window.location.hash || "#/login";
  const [basePath, param] =
    fullPath.split("/").length > 2
      ? [fullPath.split("/").slice(0, 2).join("/"), fullPath.split("/")[2]]
      : [fullPath, null];

  const user = getUserFromToken();
  const allowedRoles = protectedRoutes[basePath];

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    console.log("usuário não autorizado");
    navigateTo("#/login");
    hideLoading();
    return;
  }

  const PageComponent = routes[basePath];
  if (!PageComponent) {
    container.appendChild(routes[404]());
    hideLoading();
    return;
  }

  if (routesWithSidebar.includes(basePath)) {
    let subjects = [];
    if (user?.role === "student" || user?.role === "teacher") {
      try {
        const res = await fetch(`${API_URL}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (res.ok) {
          const userData = await res.json();
          subjects = userData.subjects || [];
        }
      } catch (err) {
        console.error("Erro ao carregar subjects:", err);
      }
    }

    container.appendChild(Sidebar({ role: user?.role, subjects }));
  }

  const pageElement = param
    ? await PageComponent(param)
    : await PageComponent();

  if (pageElement instanceof Node) {
    container.appendChild(pageElement);
  } else {
    console.error("A página não retornou um elemento válido:", pageElement);
  }

  //await new Promise((resolve) => setTimeout(resolve, 1500)); //delay pra testar o loading

  hideLoading();
}
