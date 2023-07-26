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
import downArrow from "./icons/down-arrow.svg";
import editIcon from "./icons/edit-icon.svg";
import copyIcon from "./icons/copy-icon.svg";
import deleteIcon from "./icons/delete-icon.svg";
import addIcon from "./icons/add-icon.svg";


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
  const [roads, setRoads] = useState(["Road #1", "Road #2", "Road #3", "Road #4", "Road #5"]);
  const [selectedRoadIndex, setSelectedRoadIndex] = useState(0);
  const [selectedRoad, setSelectedRoad] = useState(roads[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef(null);

  const handleAddRoad = () => {
    const newIndex = roads.length;
    const newRoads = [...roads];
    newRoads.push("");
    setRoads(newRoads);
    handleRoadChange(newRoads[newIndex], newIndex);
    handleEditRoad(newRoads[newIndex], newIndex)
    setIsDropdownOpen(true);
  }

  const handleRoadChange = (road, index) => {
    setSelectedRoad(road);
    setSelectedRoadIndex(index);
    setIsDropdownOpen(false);
  };

  const handleEditRoad = (road, index) => {
    setIsEditing(true);
    const newRoads = [...roads];
    newRoads[index] = road;
    setRoads(newRoads);
    setSelectedRoad(road);
    setSelectedRoadIndex(index);
    handleRoadChange(road, index);
    setIsDropdownOpen(true);
  };

  const handleDeleteRoad = (index) => {
    const newRoads = [...roads];
    newRoads.splice(index, 1);
    setRoads(newRoads);
    const newIndex = Math.max(0, index-1);
    handleRoadChange(newRoads[newIndex], newIndex);
    setIsDropdownOpen(true);
  };

  const handleCopyRoad = (road, index) => {
    const newRoads = [...roads];
    newRoads.splice(index, 0, road);
    setRoads(newRoads);
    handleRoadChange(newRoads[index+1], index+1);
    setIsDropdownOpen(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (!event.target.classList.contains("delete-button")) { // Check if handleDeleteRoad is being called
        setIsDropdownOpen(false);
        setIsEditing(false);
      }
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
        <span>{selectedRoad}</span>
        <img className="dropdown-icon" src={downArrow} alt="Down Arrow" />
      </div>
      <div className={`dropdown-menu ${isDropdownOpen ? "dropdown-menu-open" : ""}`}>
        <DropdownRoads
          roads={roads}
          handleRoadChange={handleRoadChange}
          handleEditRoad={handleEditRoad}
          handleDeleteRoad={handleDeleteRoad}
          handleCopyRoad={handleCopyRoad}
          selectedRoadIndex={selectedRoadIndex}
          selectedRoad={selectedRoad}
          setSelectedRoad={setSelectedRoad}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleAddRoad={handleAddRoad}
        />
        <div className="dropdown-add">
          <button onClick={() => handleAddRoad()}>
            <img className="roadIcons" src={addIcon} alt="Add" />
          </button>
        </div>
      </div>
    </div>
  );
};

// import editIcon from "./icons/edit-icon.svg";
// import copyIcon from "./icons/copy-icon.svg";
// import deleteIcon from "./icons/delete-icon.svg";
// import addIcon from "./icons/add-icon.svg";

const DropdownRoads = ({ roads, handleRoadChange, handleEditRoad, handleDeleteRoad, handleCopyRoad, selectedRoadIndex, selectedRoad, setSelectedRoad, isEditing, setIsEditing }) => {
  return roads.map((road, index) => (
    <div className="dropdown-road" key={index}>
      {isEditing && index === selectedRoadIndex ? (
        <input
          type="text"
          autoFocus
          value={selectedRoad}
          onChange={(e) => handleEditRoad(e.target.value, index)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <span onClick={() => handleRoadChange(road, index)}>{road}</span>
      )}
      <div>
        <button onClick={() => handleEditRoad(road, index)}>
          <img className="roadIcons" src={editIcon} alt="Edit" />
        </button>
        <button onClick={() => handleCopyRoad(road, index)}>
          <img className="roadIcons"src={copyIcon} alt="Copy" />
        </button>
        <button className="delete-button" onClick={() => handleDeleteRoad(index)}>
          <img className="roadIcons" src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  ));
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