import { createContext, useContext, useReducer } from "react";
import { homeReducer } from "./reducer";

const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const initialState ={
    tab:"All",
    filterData:{},
    searchTerm:"",
    searchResults:{},
    modal:false
  }
  const [state, dispatch]= useReducer(homeReducer,initialState)
  return (
    <HomeContext.Provider value={{ state, dispatch }}>{children}</HomeContext.Provider>
  );
};

export const useHome = () => {
  return useContext(HomeContext);
};
