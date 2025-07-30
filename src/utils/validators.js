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

export function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id,
      role: payload.role,
    };
  } catch (err) {
    throw new Error("Token inválido.");
  }
}
