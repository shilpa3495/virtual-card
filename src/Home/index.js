import { homeData } from "../Homedata";
import { HomeCard } from "./Component/HomeCard";
import { HomeTab } from "./Component/HomeTab";
import { useHome } from "./context";
import "./style.css";
import { useEffect } from "react";

import { ReactComponent as FilterIcon } from "../assets/svg/filter.svg";
import { FilterModal } from "./Component/FilterModal";
import { useFilter } from "./Component/FilterModal/context";

export const Home = () => {
  const userId = 1;
  const { state, dispatch } = useHome();
  const { filter } = useFilter();

  const getTabsData = (homeData, tab) => {
    switch (tab) {
      case "Your":
        return {
          data: homeData.data.filter(
            (yourCard) => yourCard.owner_id === userId
          ),
        };
      case "All":
        return homeData;

      case "Blocked":
        return {
          data: homeData.data.filter((yourCard) => yourCard.blocked === true),
        };

      default:
        return homeData;
    }
  };

  const tabData = getTabsData(homeData, state.tab);

  const getFilteredData = (tabData) => {
    if (filter.type.length !== 0) {
      return {
        data: tabData.data.filter((card) =>
          filter.type.includes(card.card_type)
        ),
      };
    }
    if (filter.cardHolder.length !== 0) {
      return {
        data: tabData.data.filter((card) =>
          filter.cardHolder.includes(card.owner_name)
        ),
      };
    }
    return tabData;
  };

  useEffect(() => {
    if (state.searchTerm !== "") {
      const results = {
        data: checkFilterData().data.filter((card) => {
          return Object.values(card)
            .join(" ")
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase());
        }),
      };
      dispatch({ type: "getSearchResult", payload: results });
    } else {
      dispatch({ type: "getSearchResult", payload: state.filterData });
    }
  }, [state.searchTerm]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "filteredDataHandler",
      payload: getFilteredData(tabData),
    });
    dispatch({ type: "modalHandler" })
  };

  const cancelHandler = () => {
    dispatch({
      type: "filteredDataHandler",
      payload: tabData,
    });
  };

  const checkFilterData = () => {
    if (Object.keys(state.filterData).length === 0) {
      return tabData;
    }
    return state.filterData;
  };

  console.log(state.searchResults);

  return (
    <>
      <h1 className="home-page-heading">Virtual Cards</h1>
      <HomeTab tab={state.tab} userId={userId} />

      <div className="home-card-filter-search-container">
        <div className="home-card-search-container">
          <input
            className="home-card-search-input"
            type="text"
            value={state.searchTerm}
            onChange={(e) =>
              dispatch({ type: "getSearchInput", payload: e.target.value })
            }
          />
        </div>
        <button
          onClick={() => dispatch({ type: "modalHandler" })}
          type="button"
          className="home-card-filter-button"
        >
          <FilterIcon className="home-card-filter-icon" /> Filter
        </button>
      </div>
      {state.modal && (
        <FilterModal
          submitClickHandler={(e) => submitHandler(e)}
          cancelClickHandler={() => cancelHandler()}
        />
      )}

      {Object.keys(state.searchResults).length === 0 ? (
        <div className="home-card-main-container">
          {checkFilterData().data.map((card) => {
            return (
              <HomeCard
                key={card.owner_name}
                name={card.name}
                ownerName={card.owner_name}
                spent={card.spent.value}
                spentCurrency={card.spent.currency}
                available={card.available_to_spend.value}
                availableCurrency={card.available_to_spend.currency}
                expire={card.expiry}
                cardType={card.card_type}
                limit={card.limit}
                budgetName={card.budget_name}
              />
            );
          })}
        </div>
      ) : (
        <div className="home-card-main-container">
          {state.searchResults.data.map((card) => {
            return (
              <HomeCard
                key={card.owner_name}
                name={card.name}
                ownerName={card.owner_name}
                spent={card.spent.value}
                spentCurrency={card.spent.currency}
                available={card.available_to_spend.value}
                availableCurrency={card.available_to_spend.currency}
                expire={card.expiry}
                cardType={card.card_type}
                limit={card.limit}
                budgetName={card.budget_name}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
