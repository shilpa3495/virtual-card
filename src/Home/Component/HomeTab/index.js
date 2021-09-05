import { useHome } from "../../context";
import { useNavigate, useParams } from "react-router";
import "./style.css";
import { useEffect } from "react";

export const HomeTab = ({ tab, userId }) => {
  const tabData = ["Your", "All", "Blocked"];
  const { activeTab } = useParams();
  const navigate = useNavigate();

  const { dispatch } = useHome();

  const defaultActiveTab = "All";

  useEffect(() => {
    if (!activeTab) {
      navigate(`/${defaultActiveTab}`);
    }
  }, []);

  const getTabRoute = (tabName) => {
    if (activeTab !== tabName) {
      navigate(`/${tabName}`);
    }
    if (tabName === "Your") {
      navigate(`/${userId}`);
    }

    dispatch({
      type: "tab",
      payload: tabName,
    });
  };

  return (
    <ul className="hometab-list-container">
      {tabData.map((tabName, index) => (
        <li
          className={`hometab-list-item ${
            tab === tabName && "hometab-activated"
          }`}
          key={index}
          onClick={() => getTabRoute(tabName)}
        >
          {tabName}
        </li>
      ))}
    </ul>
  );
};
