import { UserEdit } from "../../components/Forms/UserEdit.js";
import { UserRegisterForm } from "../../components/Forms/UserRegisterForm.js";
import { fetchSubjects } from "../../handlers/subjects/subjectHandler.js";

export async function TeacherEdit(teacherId) {
  return await UserEdit({
    titleText: "Edição do Professor",
    userId: teacherId,
    fetchData: fetchSubjects,
    createForm: (data) => UserRegisterForm(data.subjects),
    routeName: "teachers",
  });
}
