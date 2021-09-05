import { useState } from "react";
import { homeData } from "../../../Homedata";
import { useFilter } from "./context";
import "./style.css";

export const FilterModal = ({ submitClickHandler, cancelClickHandler }) => {
  const { filter, setFilter } = useFilter();

  const cardType = [
    ...new Set(
      homeData.data.map((card) => {
        return card.card_type;
      })
    ),
  ];

  const cardHolder = [
    ...new Set(
      homeData.data.map((card) => {
        return <option>{card.owner_name}</option>;
      })
    ),
  ];

  const getCardTypeData = (e) => {
    if (e.target.checked) {
      setFilter({
        ...filter,
        type: [...filter.type, e.target.value],
      });
    } else {
      setFilter({
        ...filter,
        type: filter.type.filter((cardType) => cardType !== e.target.value),
      });
    }
  };

  const getCardHolderData = (e) => {
    setFilter({
      ...filter,
      cardHolder: e.target.value,
    });
  };

  return (
    <div className="filter-modal-container">
      <div className="filter-modal-header">Filter</div>
      <div className="filter-modal-body">
        <form action="">
          <h2 className="filter-modal-sub-heading">Type</h2>
          <div className="filter-modal-type-container">
            {cardType.map((cardName) => {
              return (
                <div className ="filter-modal-type-input-container">
                  <input
                    type="checkbox"
                    name="type"
                    onChange={(e) => getCardTypeData(e)}
                    value={cardName}
                  />
                  {cardName}
                </div>
              );
            })}
          </div>
          <h2 className="filter-modal-sub-heading">CardHolder</h2>
          <select onChange={(e) => getCardHolderData(e)}>{cardHolder}</select>

          <div className="filter-modal-button-container">
            <button
              className="filter-modal-submit-button"
              type="submit"
              onClick={submitClickHandler}
            >
              Apply
            </button>
            <button
              className="filter-modal-cancel-button"
              onClick={cancelClickHandler}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
