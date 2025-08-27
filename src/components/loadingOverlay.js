export function showLoading() {
  let overlay = document.querySelector("#loading-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "loading-overlay";
    overlay.classList.add("loading-overlay");

    const spinner = document.createElement("div");
    spinner.classList.add("spinner");

    overlay.appendChild(spinner);

    document.body.appendChild(overlay);
  }

  overlay.style.display = "flex";
}

export function hideLoading() {
  const overlay = document.querySelector("#loading-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}
