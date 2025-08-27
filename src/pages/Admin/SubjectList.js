import { ItemsList } from "../../components/Listing/ItemsList.js";
import { SubjectListing } from "../../components/Listing/SubjectListing.js";
import {
  fetchSubjects,
  removeSubject,
} from "../../handlers/subjects/subjectHandler.js";

export function SubjectList() {
  return ItemsList({
    titleProps: {
      title: "Disciplinas",
      titleClass: "title2",
      titleColor: "var(--stone-900)",
      subtitle: "0 cadastradas",
      subtitleClass: "textLg",
      subtitleColor: "var(--stone-700)",
    },
    buttonProps: {
      btnName: "Cadastrar",
      btnClass: "creation-btn",
      route: "#/subject-register",
    },
    chartNamesProps: {
      text1: "Nome",
      text2: "Professor",
      text3: "Quiz",
      text4: "Ações",
      text1Class: "col-registration",
      text2Class: "col-name",
      text3Class: "col-subjects",
    },
    fetchData: fetchSubjects,
    removeItem: removeSubject,
    createItemComponent: ({ name, teacher, quizzes, onEdit, onRemove }) =>
      SubjectListing({
        name,
        teacher: teacher?.name || "Nenhum Professor",
        quizzes,
        onEdit,
        onRemove,
      }),
    emptyMessage: "Nenhuma disciplina cadastrada",
    editRoutePrefix: "#/subject-edit/",
    data: "subjects",
  });
}
