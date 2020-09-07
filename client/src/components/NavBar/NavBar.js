import React from "react";
import "../NavBar/Navbar.css";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const history = useHistory();
  const handleClick = () => {
    localStorage.removeItem("auth-token");
    history.push("/");
  };

  const handleHome = () => {
    history.push("/storeView");
  };
  return (
    <nav>
      <ul>
        <li className="w3-xxlarge tooltip-container">
          <a onClick={handleHome}>
            <i className="glyphicon glyphicon-home"></i>
          </a>
        </li>

        <li className="w3-xxlarge tooltip-container">
          <a onClick={handleClick}>
            <i className="glyphicon glyphicon-off"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
