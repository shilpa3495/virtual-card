export const homeReducer = (state, action) => {
  switch (action.type) {
    case "tab":
      return { ...state, tab: action.payload };

    case "modalHandler":
      return { ...state, modal: !state.modal };

    case "getSearchInput":
      return { ...state, searchTerm: action.payload };

    case "getSearchResult":
      return { ...state, searchResults: action.payload };

    case "filteredDataHandler":
      return { ...state, filterData: action.payload };

    default:
      return state;
  }
};
