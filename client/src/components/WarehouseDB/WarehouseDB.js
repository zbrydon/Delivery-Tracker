import React from "react";
import NavBar from "../Tools/WarehouseNavbar";
import "../WarehouseDB/WarehouseDB.Modules.css";
const WarehouseDB = () => {
  return (
    <>
      <NavBar />
      <br/>
      <div className="wrap">
        <div className="search">
          <input type="text" className="searchID" placeholder="Deliver ID" />
          <button type="submit" className="searchButton">
            <i className="glyphicon glyphicon-search"></i>
          </button>
        </div>
        <div className="table-pieChart">
          <table className="deliver-table">
            <thead>
              <tr>
                <th>Delivery ID</th>
                <th>Dispatch Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>20/7/2020</td>
                <td>Dispatched</td>
              </tr>
              <tr>
                <td>2</td>
                <td>30/8/2020</td>
                <td>Unfullfiled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="wrap-table">
        <div className="card1">
          <h4>Order from Store</h4>
          <button className="btn btn-sm" id="button">
            <span className="glyphicon glyphicon-asterisk">
              <strong>Frozen</strong>
            </span>
          </button>
          <button className="btn btn-sm" id="button">
            <span className="glyphicon glyphicon-tree-deciduous">
              <strong>Normal</strong>
            </span>
          </button>
          <button className="btn btn-sm" id="button-none">
            <span className="glyphicon glyphicon-grain">
              <strong>Dry</strong>
            </span>
          </button>
        </div>
        <div id="piechart"></div>
      </div>
      <div className="viewSOH">
        <a href={"/stockWarehouse"}>
          <button className="btn btn-sm">View SOH</button>
        </a>
      </div>
    </>
  );
};

export default WarehouseDB;
