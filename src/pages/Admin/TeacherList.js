import { ItemsList } from "../../components/Listing/ItemsList.js";
import { UserListing } from "../../components/Listing/UserListing.js";
import {
  fetchTeachers,
  removeTeacher,
} from "../../handlers/users/userHandler.js";

export function TeacherList() {
  return ItemsList({
    titleProps: {
      title: "Professores",
      titleClass: "title2",
      titleColor: "var(--stone-900)",
      subtitle: "0 Cadastrados",
      subtitleClass: "textLg",
      subtitleColor: "var(--stone-700)",
    },
    buttonProps: {
      btnName: "Cadastrar",
      btnClass: "creation-btn",
      route: "#/teacher-register",
    },
    chartNamesProps: {
      text1: "Matrícula",
      text2: "Nome",
      text3: "Disciplinas",
      text4: "Ações",
      text1Class: "col-registration",
      text2Class: "col-name",
      text3Class: "col-subjects",
    },
    fetchData: fetchTeachers,
    removeItem: removeTeacher,
    createItemComponent: ({ registration, name, subjects, onEdit, onRemove }) =>
      UserListing({ registration, name, subjects, onEdit, onRemove }),
    emptyMessage: "Nenhum professor cadastrado",
    editRoutePrefix: "#/teacher-edit/",
    data: "users",
  });
}
