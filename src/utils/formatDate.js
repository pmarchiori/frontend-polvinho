export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleDateString("pt-BR", {
    month: "long",
    timeZone: "UTC",
  });
  return `${day} de ${month}`;
}
