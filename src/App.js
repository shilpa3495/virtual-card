import "./App.css";
import { Home } from "./Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="global-container">
        <Routes>
          <Route path="/:activeTab" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
