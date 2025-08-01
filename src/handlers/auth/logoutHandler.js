export function logout() {
  localStorage.removeItem("authToken");
  window.location.hash = "#/login";
}
