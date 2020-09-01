import React from "react";
import "../NavBar/Navbar.Modules.css";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li class="w3-xxlarge tooltip-container">
          <a>
            <i class="glyphicon glyphicon-home"></i>
          </a>
        </li>

        <li class="w3-xxlarge tooltip-container">
          <a>
            <i class="glyphicon glyphicon-off"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
