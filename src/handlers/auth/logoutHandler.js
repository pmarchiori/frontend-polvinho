import { navigateTo } from "../../routes/navigate.js";

export function logout() {
  localStorage.removeItem("authToken");
  navigateTo("#/login");
}
