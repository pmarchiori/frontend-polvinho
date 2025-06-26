import { router } from "./routes/router.js";

window.addEventListener("DOMContentLoaded", () => {
  router();
});
window.addEventListener("hashchange", router);
