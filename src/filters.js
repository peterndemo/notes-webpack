const filters = {
  searchText: "",
  sortBy: "byEdited",
};
const getFilters = () => {
  return filters;
};

const setFilters = (filterData) => {
  if (typeof filterData.searchText === "string") {
    filters.searchText = filterData.searchText;
  }

  if (typeof filterData.sortBy === "string") {
    filters.sortBy = filterData.sortBy;
  }
};

export { getFilters, setFilters };
