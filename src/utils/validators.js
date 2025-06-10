export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/;
  return passwordRegex.test(password);
}

export function validateLoginCredentials(email, password) {
  if (!isValidEmail(email)) {
    return { isValid: false, message: "Email inválido." };
  }
  if (!isValidPassword(password)) {
    return {
      isValid: false,
      message: "Senha inválida.",
    };
  }
  return { isValid: true, message: "" };
}
