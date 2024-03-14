import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Book</NavLink>
        <NavLink to="/booking-calendar">Booking Calendar</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
