import { FormButton } from "../components/FormButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { ReturnButton } from "../components/ReturnButton.js";
import { fetchStudentById, API_URL } from "../utils/handlers/userHandler.js";

export function StudentEdit(studentId) {
  const studentEdit = document.createElement("form");
  studentEdit.classList.add("student-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();
  const title = Title({
    title: "Edição do Aluno",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.appendChild(returnButton);
  header.appendChild(title);

  const editForm = document.createElement("form");
  editForm.classList.add("register-container");

  const upperInputRow = document.createElement("div");
  upperInputRow.classList.add("input-row");

  const lowerInputRow = document.createElement("div");
  lowerInputRow.classList.add("input-row");

  const nameInput = TextInputField({
    label: "Nome Completo",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Nome Sobrenome",
    name: "name",
  });

  const registrationInput = TextInputField({
    label: "Matrícula",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "000000",
    name: "registration",
  });

  const emailInput = TextInputField({
    label: "Email",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "email@email.com",
    name: "email",
  });

  const subjectsInput = SelectInputField({
    label: "Disciplinas",
    fieldClass: "input-field",
    inputClass: "select-input",
    placeholder: "Disciplinas do usuário",
    disciplines: [
      { _id: "666b5a7a93be74d1c1e3271c", name: "disciplina 1" },
      { _id: "566b5a7a93be74d1c1e3271c", name: "disciplina 2" },
    ],
    name: "subject",
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Salvar",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  upperInputRow.appendChild(nameInput);
  upperInputRow.appendChild(registrationInput);
  lowerInputRow.appendChild(emailInput);
  lowerInputRow.appendChild(subjectsInput);

  editForm.appendChild(upperInputRow);
  editForm.appendChild(lowerInputRow);

  studentEdit.appendChild(header);
  studentEdit.appendChild(editForm);
  studentEdit.appendChild(buttonContainer);

  fetchStudentById(studentId)
    .then((student) => {
      nameInput.querySelector("input").value = student.name || "";
      registrationInput.querySelector("input").value =
        student.registration || "";
      emailInput.querySelector("input").value = student.email || "";
      subjectsInput.querySelector("select").value = student.subject?._id || "";
    })
    .catch((err) => {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Erro ao carregar dados do aluno.";
      errorMessage.style.color = "red";
      studentEdit.appendChild(errorMessage);
    });

  registerButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const updatedStudent = {
      name: nameInput.querySelector("input").value,
      registration: registrationInput.querySelector("input").value,
      email: emailInput.querySelector("input").value,
      subject: subjectsInput.querySelector("select").value || null,
    };

    try {
      const res = await fetch(`${API_URL}/users/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!res.ok) throw new Error("Erro ao atualizar aluno");

      window.location.hash = "#/students";
    } catch (err) {
      console.error("Erro ao atualizar aluno:", err);
    }
  });

  return studentEdit;
}
