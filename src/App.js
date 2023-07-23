import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Schedule from "./components/Schedule";
import MyRoad from "./components/MyRoad";
import Courses from "./components/Courses";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavigationMenu />

          <Routes>
            <Route path="/" element={<Schedule />} />
            <Route path="/myroad" element={<MyRoad />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

const NavigationMenu = () => {
  const navigate = useNavigate();

  return (
    <nav className="menu">
      <button className="menu-button" onClick={() => navigate("/")}>
        <span>Schedule</span>
      </button>
      <button className="menu-button" onClick={() => navigate("/myroad")}>
      <span>My Road</span>
      </button>
      <button className="menu-button" onClick={() => navigate("/courses")}>
        <span>Courses</span>
      </button>
    </nav>
  );
};

export default App;