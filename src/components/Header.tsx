import React from "react";
import { NavLink } from "react-router-dom";

import scheduleIcon from "../icons/schedule-icon.webp";
import scheduleBG from "../icons/schedule-bg.webp";
import myroadIcon from "../icons/myroad-icon.webp";
import myroadBG from "../icons/myroad-bg.webp";
import coursesIcon from "../icons/courses-icon.webp";
import coursesBG from "../icons/courses-bg.webp";
import tim from "../icons/tim.webp";

const Header = () => {
    return (
        <header className="App-header">
            <NavigationMenu />
            <div className="login-container">
                <img className="login-image" src={tim} alt="Login" />
                <button className="login-button">login</button>
            </div>
        </header>
    );
};

const NavigationMenu = () => {
    return (
        <nav className="menu">
            <CustomNavLink className="menu-button" to="/">
                <div className="nav-image">
                    <img className="nav-icon" src={scheduleIcon} alt="schedule" style={{ marginLeft: "-3px" }} />
                    <img className="nav-bg" src={scheduleBG} alt=""/>
                </div>
                <span>Schedule</span>
            </CustomNavLink>
            <CustomNavLink className="menu-button" to="/myroad">
                <div className="nav-image">
                    <img className="nav-icon" src={myroadIcon} alt="my road" />
                    <img className="nav-bg" src={myroadBG} alt=""/>
                </div>
                <span>My Road</span>
            </CustomNavLink>
            <CustomNavLink className="menu-button" to="/courses">
                <div className="nav-image">
                    <img className="nav-icon" src={coursesIcon} alt="courses" />
                    <img className="nav-bg" src={coursesBG} alt=""/>
                </div>
                <span>Courses</span>
            </CustomNavLink>
        </nav>
    );
};

const CustomNavLink = ({ to, className, children }: { to: string, className: string, children: React.ReactNode }) => {
    return (
        <NavLink to={to} className={(navData: any) => (navData.isActive ? className + " active" : className + " passive")}>
            {children}
        </NavLink>
    );
};

export default Header;