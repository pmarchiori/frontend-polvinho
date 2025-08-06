import { UserEdit } from "../../components/UserEdit.js";
import { UserRegisterForm } from "../../components/UserRegisterForm.js";
import { fetchSubjects } from "../../handlers/subjects/subjectHandler.js";

export async function StudentEdit(studentId) {
  return await UserEdit({
    titleText: "Edição do Aluno",
    userId: studentId,
    fetchData: fetchSubjects,
    createForm: (data) => UserRegisterForm(data.subjects),
    routeName: "students",
  });
}
