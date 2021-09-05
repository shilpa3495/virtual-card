import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {

  const [filter, setFilter] = useState({
    type: [],
    cardHolder: "",
  });
  
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  return useContext(FilterContext);
};
