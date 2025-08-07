import { UserEdit } from "../../components/UserEdit.js";
import { UserRegisterForm } from "../../components/UserRegisterForm.js";
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
