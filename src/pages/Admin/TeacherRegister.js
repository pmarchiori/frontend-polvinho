import { UserRegister } from "../../components/UserRegister.js";
import { UserRegisterForm } from "../../components/UserRegisterForm.js";
import { fetchSubjects } from "../../handlers/subjects/subjectHandler.js";

export async function TeacherRegister() {
  return await UserRegister({
    titleText: "Cadastro do Professor",
    userType: "teacher",
    fetchData: fetchSubjects,
    createForm: (data) => UserRegisterForm(data.subjects),
  });
}
