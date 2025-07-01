export const API_URL = "http://localhost:8000";

export async function fetchStudents() {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const users = await res.json();
    const alunos = users.filter((user) => user.role === "aluno");
    return alunos;
  } catch (err) {
    console.error("Erro no fetchStudents:", err);
    throw err;
  }
}

export async function fetchStudentById(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error("Aluno não encontrado");
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar aluno:", err);
    throw err;
  }
}

// export async function loadStudentData(studentId, formElement) {
//   try {
//     const res = await fetch(`${API_URL}/users/${studentId}`);
//     if (!res.ok) {
//       throw new Error("Erro ao buscar dados do aluno");
//     }
//     const student = await res.json();

//     formElement.querySelector('input[name="name"]').value = student.name || "";

//     formElement.querySelector('input[name="registration"]').value =
//       student.registration || "";

//     formElement.querySelector('input[name="email"]').value =
//       student.email || "";

//     formElement.querySelector('select[name="subject"]').value =
//       student.subject || "";
//   } catch (err) {
//     console.error("Erro ao carregar dados do aluno:", err);
//     alert("Não foi possível carregar os dados do aluno.");
//   }
// }

// export function setupStudentEditForm(studentId, formElement) {
//   formElement.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = new FormData(formElement);
//     const data = Object.fromEntries(formData.entries());

//     const body = JSON.stringify(data);

//     try {
//       const res = await fetch(`${API_URL}/users/${studentId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body,
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.error || "Erro ao atualizar o aluno");
//       }

//       alert("Aluno atualizado com sucesso!");
//     } catch (err) {
//       console.error("Erro ao atualizar aluno:", err);
//       alert("Erro ao atualizar aluno: " + err.message);
//     }
//   });
// }
