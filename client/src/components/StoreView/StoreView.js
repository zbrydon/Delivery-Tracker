import React from "react";
import "../StoreView/StoreView.Modules.css";
import NavBar from "../Tools/StoreNavbar";
const StoreView = () => {
  return (
    <div>
      <NavBar />
      <br></br>
      <div class="card-container">
        <div class="cards">
          <div class="card">
            <span class="card-title">
              <h3>Store 1</h3>
            </span>
            <span class="status">No Request</span>
            <span class="icon w3-xxlarge tooltip-container">
              <a class="glyphicon glyphicon-ok"></a>
            </span>
          </div>

          <div class="card">
            <span class="card-title">
              <h3>Store 2</h3>
            </span>
            <span class="status">Requested</span>
            <span class="icon w3-xxlarge tooltip-container">
              <a class="glyphicon glyphicon-user"></a>
            </span>
          </div>
        </div>
      </div>

      <div class="card-container">
        <div class="cards">
          <div class="card">
            <span class="card-title">
              <h3>Store 3</h3>
            </span>
            <span class="status">No Request</span>
            <span class="icon w3-xxlarge tooltip-container">
              <a class="glyphicon glyphicon-ok"></a>
            </span>
          </div>

          <div class="card">
            <span class="card-title">
              <h3>Store 4</h3>
            </span>
            <span class="status">Requested</span>
            <span class="icon w3-xxlarge tooltip-container">
              <a class="glyphicon glyphicon-user"></a>
            </span>
          </div>
        </div>
      </div>
      </div>
  );
};

export default StoreView;
