export function ChartNames({ text1, text2, text3, text4 }) {
  const chartNames = document.createElement("div");
  chartNames.classList.add("chart-names");

  const registration = document.createElement("p");
  registration.textContent = text1;
  registration.classList.add("col-registration", "textSm", "chart-names-text");

  const name = document.createElement("p");
  name.textContent = text2;
  name.classList.add("col-name", "textSm", "chart-names-text");

  const subjects = document.createElement("p");
  subjects.textContent = text3;
  subjects.classList.add("col-subjects", "textSm", "chart-names-text");

  const actions = document.createElement("p");
  actions.textContent = text4;
  actions.classList.add("col-actions", "textSm", "chart-names-text");

  chartNames.append(registration, name, subjects, actions);

  return chartNames;
}
