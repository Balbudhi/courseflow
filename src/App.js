import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Schedule from "./components/Schedule";
import MyRoad from "./components/MyRoad";
import Courses from "./components/Courses";

import scheduleIcon from "./icons/schedule-icon.webp";
import scheduleBG from "./icons/schedule-bg.webp";
import myroadIcon from "./icons/myroad-icon.webp";
import myroadBG from "./icons/myroad-bg.webp";
import coursesIcon from "./icons/courses-icon.webp";
import coursesBG from "./icons/courses-bg.webp";
import tim from "./icons/tim.webp";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Dropdown />
        <header className="App-header">
          <NavigationMenu />
          <div className="login-container">
            <img className="login-image" src={tim} alt="Login" />
            <button className="login-button">login</button>
          </div>          
        </header>
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/myroad" element={<MyRoad />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
    </Router>
  );
};

const Dropdown = () => {
  const [selectedRoad, setSelectedRoad] = useState("Road 1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleRoadChange = (option) => {
    setSelectedRoad(option);
    setIsDropdownOpen(false);
  };

  const handleEditRoad = (option) => {
    // Handle edit option logic here
  };

  const handleCopyRoad = (option) => {
    // Handle copy option logic here
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-input" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {selectedRoad}
      </div>
      <div className={`dropdown-menu ${isDropdownOpen ? "dropdown-menu-open" : ""}`}>
        <div className="dropdown-option">
          <span onClick={() => handleRoadChange("Road 1")}>Road 1</span>
          <button onClick={() => handleEditRoad("Road 1")}>Edit</button>
          <button onClick={() => handleCopyRoad("Road 1")}>Copy</button>
        </div>
        <div className="dropdown-option">
          <span onClick={() => handleRoadChange("Road 2")}>Road 2</span>
          <button onClick={() => handleEditRoad("Road 2")}>Edit</button>
          <button onClick={() => handleCopyRoad("Road 2")}>Copy</button>
        </div>
        <div className="dropdown-option">
          <span onClick={() => handleRoadChange("Road 3")}>Road 3</span>
          <button onClick={() => handleEditRoad("Road 3")}>Edit</button>
          <button onClick={() => handleCopyRoad("Road 3")}>Copy</button>
        </div>
      </div>
    </div>
  );
};

const NavigationMenu = () => {
  return (
    <nav className="menu">
      <CustomNavLink className="menu-button" to="/">
        <div className="nav-image">
          <img className="nav-icon" src={scheduleIcon} alt="schedule" style={{marginLeft: "-3px"}}/>
          <img className="nav-bg" src={scheduleBG} />
        </div>
        <span>Schedule</span>
      </CustomNavLink>
      <CustomNavLink className="menu-button" to="/myroad">
        <div className="nav-image">
          <img className="nav-icon" src={myroadIcon} alt="my road"/>
          <img className="nav-bg" src={myroadBG} />
        </div>
        <span>My Road</span>
      </CustomNavLink>
      <CustomNavLink className="menu-button" to="/courses">
        <div className="nav-image">
          <img className="nav-icon" src={coursesIcon} alt="courses"/>
          <img className="nav-bg" src={coursesBG} />
        </div>
        <span>Courses</span>
      </CustomNavLink>
    </nav>
  );
};

const CustomNavLink = ({ to, className, children }) => {
  return (
    <NavLink to={to} className={(navData) => (navData.isActive ? className + " active" : className)}>
      {children}
    </NavLink>
  );
};

export default App;
