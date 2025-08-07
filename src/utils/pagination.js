export async function fetchPageData(fetchData, page, dataKey) {
  try {
    const response = await fetchData(page);
    return {
      items: response[dataKey] || [],
      total: response.total,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
}
