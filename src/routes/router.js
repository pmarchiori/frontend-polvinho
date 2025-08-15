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
import { QuizDetails } from "../pages/Teacher/QuizDetails.js";
import { QuestionRegister } from "../pages/Teacher/QuestionRegister.js";

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
  "#/quiz-details",
  "#/question-register",
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
  "#/quiz-details": QuizDetails,
  "#/question-register": QuestionRegister,
};

const protectedRoutes = {
  "#/dashboard": ["admin", "teacher", "student"],

  "#/students": ["admin", "teacher"],
  "#/student-register": ["admin"],
  "#/student-edit": ["admin", "teacher"],
  "#/teachers": ["admin"],
  "#/teacher-register": ["admin"],
  "#/teacher-edit": ["admin"],

  "#/subjects": ["admin", "teacher"],
  "#/subject-register": ["admin"],
  "#/subject-edit": ["admin"],

  "#/subject-quizzes": ["teacher"],
  "#/quiz-register": ["teacher"],
  "#/question-register": ["teacher"],
};

function getUserFromToken() {
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
    window.location.hash = "#/login";
    return;
  }

  const PageComponent = routes[basePath];
  if (!PageComponent) {
    container.appendChild(routes[404]());
    return;
  }

  if (routesWithSidebar.includes(basePath)) {
    container.appendChild(Sidebar());
  }

  const pageElement = param
    ? await PageComponent(param)
    : await PageComponent();

  if (pageElement instanceof Node) {
    container.appendChild(pageElement);
  } else {
    console.error("A página não retornou um elemento válido:", pageElement);
  }
}
