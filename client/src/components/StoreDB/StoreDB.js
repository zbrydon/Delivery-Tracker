import React from "react";
import "./StoreDB.css";
import NavBar from "../Tools/StoreNavbar";
const StoreDB = () => {
  return (
    <>
      <NavBar />
      <br />
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

        <div className="cards-container">
          <div id="option">
            <a href={"/stockStore"}>
              <button className="choosing-btn">View SOH</button>
            </a>
          </div>
          <div id="option">
            <a href={"/createOrder"}>
              <button className="choosing-btn">Create Order</button>
            </a>
          </div>
          <div id="option">
            <a href={"/pastOrders"}>
              <button className="choosing-btn">Past Order</button>
            </a>
          </div>
          <div id="option">
            <a href={"/updateOrder"}>
              <button className="choosing-btn">Update Order</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreDB;
