import { UserRegister } from "../../components/Forms/UserRegister.js";
import { UserRegisterForm } from "../../components/Forms/UserRegisterForm.js";
import { fetchSubjects } from "../../handlers/subjects/subjectHandler.js";

export async function StudentRegister() {
  return await UserRegister({
    titleText: "Cadastro do Aluno",
    userType: "student",
    fetchData: fetchSubjects,
    createForm: (data) => UserRegisterForm(data.subjects),
  });
}
