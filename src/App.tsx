import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Schedule from "./components/Schedule";
import MyRoad from "./components/MyRoad";
import Courses from "./components/Courses";
import Header from "./components/Header";

import downArrow from "./icons/down-arrow.svg";
import editIcon from "./icons/edit-icon.svg";
import copyIcon from "./icons/copy-icon.svg";
import deleteIcon from "./icons/delete-icon.svg";
import addIcon from "./icons/add-icon.svg";

import "./App.css";

type DropdownRoadsProps = {
  roads: string[];
  handleRoadChange: (road: string, index: number) => void;
  handleEditRoad: (road: string, index: number) => void;
  handleDeleteRoad: (index: number) => void;
  handleCopyRoad: (road: string, index: number) => void;
  selectedRoadIndex: number;
  selectedRoad: string;
  setSelectedRoad: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Dropdown />
        <Header />
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
  const [roads, setRoads] = useState<string[]>([
    "Road #1",
    "Road #2",
    "Road #3",
    "Road #4",
    "Road #5"
  ]);
  const [selectedRoadIndex, setSelectedRoadIndex] = useState<number>(0);
  const [selectedRoad, setSelectedRoad] = useState<string>(roads[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAddRoad = () => {
    const newIndex = roads.length;
    const newRoads = [...roads];
    newRoads.push("");
    setRoads(newRoads);
    handleRoadChange(newRoads[newIndex], newIndex);
    handleEditRoad(newRoads[newIndex], newIndex);
    setIsDropdownOpen(true);
  };

  const handleRoadChange = (road: string, index: number) => {
    setSelectedRoad(road);
    setSelectedRoadIndex(index);
    setIsDropdownOpen(false);
  };

  const handleEditRoad = (road: string, index: number) => {
    setIsEditing(true);
    const newRoads = [...roads];
    newRoads[index] = road;
    setRoads(newRoads);
    setSelectedRoad(road);
    setSelectedRoadIndex(index);
    handleRoadChange(road, index);
    setIsDropdownOpen(true);
  };

  const handleDeleteRoad = (index: number) => {
    const newRoads = [...roads];
    newRoads.splice(index, 1);
    setRoads(newRoads);
    const newIndex = Math.max(0, index - 1);
    handleRoadChange(newRoads[newIndex], newIndex);
    setIsDropdownOpen(true);
  };

  const handleCopyRoad = (road: string, index: number) => {
    const newRoads = [...roads];
    newRoads.splice(index, 0, road);
    setRoads(newRoads);
    handleRoadChange(newRoads[index + 1], index + 1);
    setIsDropdownOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && event.target && !dropdownRef.current.contains(event.target as Node)) {
      if (!(event.target as HTMLElement).classList.contains("delete-button")) {
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

const DropdownRoads = ({
  roads,
  handleRoadChange,
  handleEditRoad,
  handleDeleteRoad,
  handleCopyRoad,
  selectedRoadIndex,
  selectedRoad,
  setSelectedRoad,
  isEditing,
  setIsEditing
}: DropdownRoadsProps) => {
  return roads.map((road: string, index: number) => (
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
          <img className="roadIcons" src={copyIcon} alt="Copy" />
        </button>
        <button className="delete-button" onClick={() => handleDeleteRoad(index)}>
          <img className="roadIcons" src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  ));
};

export default App;