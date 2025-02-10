import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation() {



  return (
    <div className="nav-container">

    <ul id="nav-links">

      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/how-it-works">How it Works</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>



    </div>
  );
}

export default Navigation;
