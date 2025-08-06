import { CreationButton } from "./Buttons/CreationButton.js";
import { PaginationButton } from "./Buttons/PaginationButton.js";
import { ReturnButton } from "./Buttons/ReturnButton.js";
import { ChartNames } from "./ChartNames.js";
import { Title } from "./Title.js";
import { EmptyData } from "../components/EmptyData.js";
import { Toaster } from "../components/Toaster.js";

export function ItemsList({
  titleProps,
  buttonProps,
  chartNamesProps,
  fetchData,
  removeItem,
  createItemComponent,
  emptyMessage,
  editRoutePrefix,
  data,
}) {
  let currentPage = 1;

  const listContainer = document.createElement("div");
  listContainer.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const btnArea = document.createElement("div");

  const returnButton = ReturnButton();

  const title = Title(titleProps);

  const createButton = CreationButton(buttonProps);

  const chartNames = ChartNames(chartNamesProps);

  const contentArea = document.createElement("div");
  contentArea.classList.add("users-area");

  const paginationArea = document.createElement("div");
  paginationArea.classList.add("pagination");

  const paginationText = document.createElement("p");
  paginationText.classList.add("pagination-text");

  const paginationButtons = document.createElement("div");
  paginationButtons.classList.add("pagination-btns-container");

  const prevButton = PaginationButton({
    btnName: "Anterior",
    initiateDisabled: true,
  });

  const nextButton = PaginationButton({ btnName: "Próxima" });

  paginationButtons.append(prevButton, nextButton);
  paginationArea.append(paginationText, paginationButtons);

  function loadItems(page = 1) {
    contentArea.innerHTML = "";
    fetchData(page)
      .then((response) => {
        const items = response[data] || [];
        const { total, currentPage: cp, totalPages } = response;
        currentPage = cp;

        title.querySelector(".textLg").textContent = `${total} Cadastrados`;
        paginationText.textContent = `Mostrando ${items.length} de ${total} entradas.`;

        if (items.length === 0) {
          const emptyComponent = EmptyData({ text: emptyMessage });
          contentArea.appendChild(emptyComponent);
        } else {
          items.forEach((item) => {
            const itemComponent = createItemComponent({
              ...item,
              onEdit: () => {
                window.location.hash = `${editRoutePrefix}${item._id}`;
              },
              onRemove: () => {
                removeItem(item._id)
                  .then(() => {
                    Toaster({
                      title: "Sucesso!",
                      description: "Removido com sucesso!",
                      type: "success",
                    });
                    loadItems(currentPage);
                  })
                  .catch(() => {
                    Toaster({
                      title: "Erro ao remover",
                      description: "Não foi possível remover.",
                      type: "error",
                    });
                  });
              },
            });
            contentArea.appendChild(itemComponent);
          });
        }

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
      })
      .catch((err) => {
        console.error("Erro durante carregamento:", err);
        title.querySelector(".textLg").textContent = "Erro ao carregar";
      });
  }

  prevButton.addEventListener("click", () => loadItems(--currentPage));
  nextButton.addEventListener("click", () => loadItems(++currentPage));

  returnButton.addEventListener("click", () => window.history.back());

  titleArea.append(returnButton, title);
  btnArea.append(createButton);
  header.append(titleArea, btnArea);
  listContainer.append(header, chartNames, contentArea, paginationArea);

  loadItems(currentPage);

  return listContainer;
}
