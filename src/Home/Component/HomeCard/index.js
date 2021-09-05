import "./style.css";

import { ReactComponent as BurnerIcon } from "../../../assets/svg/burner.svg";
import { ReactComponent as SubscriptionIcon } from "../../../assets/svg/subscription.svg";

export const HomeCard = ({
  name,
  ownerName,
  budgetName,
  spent,
  spentCurrency,
  available,
  availableCurrency,
  expire,
  cardType,
  limit,
}) => {
  return (
    <div className="home-card-container">
      <div className="home-card-title-container">
        <div>
          <h1 className="home-card-title">{name}</h1>
          <div className="home-card-user-container">
            <span className="home-card-owner-name"> {ownerName}</span>
            <div className="home-card-dot"></div>
            <span className="home-card-budget-name">{budgetName}</span>
          </div>
        </div>
        {cardType === "burner" ? (
          <div className="home-card-burner-icon">
            <BurnerIcon className="home-card-burner-svg" />
          </div>
        ) : (
          <div className="home-card-subscription-icon">
            <SubscriptionIcon className="home-card-subscription-svg" />
          </div>
        )}
      </div>

      {cardType === "burner" ? (
        <div className="home-card-burner-container">
          <div className="home-card-burner-badge">burner</div>
          <div className="home-card-burner-expire-value">Expires: {expire}</div>
        </div>
      ) : (
        <div className="home-card-subscription-container">
          <div className="home-card-subscription-badge">subscription</div>
          <div className="home-card-subscription-limit-value">
            Limit: {limit}
            {availableCurrency}
          </div>
        </div>
      )}

      <div className="home-card-progress-container">
        <div
          className="home-card-spent-progress"
          style={{ width: `${(spent / available) * 100}%` }}
        ></div>
      </div>

      <div className="home-card-spent-container">
        <div className="home-card-spent-title">
          <div className="home-card-spent-dot"></div>Spent
        </div>
        <div className="home-card-spent-value">
          {spent} {spentCurrency}
        </div>
      </div>

      <div className="home-card-available-container">
        <div className="home-card-available-title">
          <div className="home-card-available-dot"></div>Available to spend
        </div>
        <div className="home-card-available-value">
          {available} {availableCurrency}
        </div>
      </div>
    </div>
  );
};
