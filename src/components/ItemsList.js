import { CreationButton } from "./Buttons/CreationButton.js";
import { PaginationButton } from "./Buttons/PaginationButton.js";
import { ReturnButton } from "./Buttons/ReturnButton.js";
import { ChartNames } from "./ChartNames.js";
import { Title } from "./Title.js";
import { EmptyData } from "../components/EmptyData.js";
import { Toaster } from "../components/Toaster.js";
import { fetchPageData } from "../utils/pagination.js";
import { navigateTo } from "../routes/navigate.js";

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
  returnButton.addEventListener("click", () => window.history.back());

  const title = Title(titleProps);

  const updateTitleInfo = (text) => {
    const titleText = title.querySelector(".textLg");
    if (titleText) titleText.textContent = text;
  };

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

  async function loadItems(page = 1) {
    contentArea.innerHTML = "";

    try {
      const {
        items,
        total,
        currentPage: cp,
        totalPages,
      } = await fetchPageData(fetchData, page, data);
      currentPage = cp;

      updateTitleInfo(`${total} Cadastrados`);
      paginationText.textContent = `Mostrando ${items.length} de ${total} entradas.`;

      if (items.length === 0) {
        const emptyComponent = EmptyData({ text: emptyMessage });
        contentArea.appendChild(emptyComponent);
      } else {
        items.forEach((item) => {
          const itemComponent = createItemComponent({
            ...item,
            onEdit: () => {
              navigateTo(`${editRoutePrefix}${item._id}`);
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
    } catch (err) {
      updateTitleInfo("Erro ao carregar");
    }
  }

  prevButton.addEventListener("click", () => loadItems(currentPage - 1));
  nextButton.addEventListener("click", () => loadItems(currentPage + 1));

  titleArea.append(returnButton, title);
  btnArea.append(createButton);
  header.append(titleArea, btnArea);
  listContainer.append(header, chartNames, contentArea, paginationArea);

  loadItems(currentPage);

  return listContainer;
}
