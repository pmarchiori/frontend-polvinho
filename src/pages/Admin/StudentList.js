import { ItemsList } from "../../components/Listing/ItemsList.js";
import { UserListing } from "../../components/Listing/UserListing.js";
import {
  fetchStudents,
  removeStudent,
} from "../../handlers/users/userHandler.js";

export function StudentList() {
  return ItemsList({
    titleProps: {
      title: "Alunos",
      titleClass: "title2",
      titleColor: "var(--stone-900)",
      subtitle: "0 Cadastrados",
      subtitleClass: "textLg",
      subtitleColor: "var(--stone-700)",
    },
    buttonProps: {
      btnName: "Cadastrar",
      btnClass: "creation-btn",
      route: "#/student-register",
    },
    chartNamesProps: {
      text1: "Matrícula",
      text2: "Nome",
      text3: "Disciplinas",
      text4: "Ações",
    },
    fetchData: fetchStudents,
    removeItem: removeStudent,
    createItemComponent: ({ registration, name, subjects, onEdit, onRemove }) =>
      UserListing({ registration, name, subjects, onEdit, onRemove }),
    emptyMessage: "Nenhum aluno cadastrado",
    editRoutePrefix: "#/student-edit/",
    data: "users",
  });
}
