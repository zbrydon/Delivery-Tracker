import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Tools/WarehouseNavbar";
import "../WarehouseDB/WarehouseDB.Modules.css";
import { useHistory, useLocation } from "react-router-dom";
import Moment from "react-moment";

const WarehouseDB = () => {
  const [orders, setOrders] = useState([]);
  const [ordersView, setOrdersView] = useState([]);
  const [productType, setproductType] = useState("");
  const query = useQuery();

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = { authorization: token };
    const param = { storeId: query.get("storeId"), warehouseId: 1111 };

    axios
      .get(`${API_URL}/viewWarehouseOrders`, {
        headers: headers,
        params: param,
      })
      .then(function (response) {
        let data = response.data;
        setOrders(data.orders);
        setOrdersView(data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function searchOrder(e) {
    let keySearch = e.target.value;
    if (keySearch == "") {
      setOrders(ordersView);
      return;
    }
    keySearch = parseInt(keySearch);
    let ordersTemp = ordersView.filter((x) => x.orderId === keySearch);
    setOrders(ordersTemp);
  }

  function selecteRow(index) {
    let order = ordersView[index];
    let productType = order.productType;
    setproductType(productType);
  }

  return (
    <>
      <NavBar />
      <br />
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchID"
            placeholder="Deliver ID"
            onChange={searchOrder}
          />
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
              {orders.map((order, i) => {
                // Return the element. Also pass key
                return (
                  <tr key={i} onClick={selecteRow.bind(this, i)}>
                    <td>{order.orderId}</td>
                    <td>
                      <Moment format="DD/MM/YYYY">
                        {order.deliveryDateTime}
                      </Moment>
                    </td>
                    <td>{order.orderStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="wrap-table">
        <div className="card1">
          <h4>Order from Store</h4>
          <button
            className="btn btn-sm"
            id={productType == "frozen" ? "button" : "button-none"}
          >
            <span className="glyphicon glyphicon-asterisk">
              <strong>Frozen</strong>
            </span>
          </button>
          <button
            className="btn btn-sm"
            id={productType == "normal" ? "button" : "button-none"}
          >
            <span className="glyphicon glyphicon-tree-deciduous">
              <strong>Normal</strong>
            </span>
          </button>
          <button
            className="btn btn-sm"
            id={productType == "dry" ? "button" : "button-none"}
          >
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
