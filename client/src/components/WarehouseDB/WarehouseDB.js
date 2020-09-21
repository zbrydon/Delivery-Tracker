import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Tools/WarehouseNavbar";
import "../WarehouseDB/WarehouseDB.Modules.css";
import WarehouseChart from "../WarehouseChart/WarehouseChart";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";

const WarehouseDB = () => {
  const [orders, setOrders] = useState([]);
  const [itemOrder, setItemOrder] = useState({
    frozenQuantity: 0,
    meatQuantity: 0,
    dairyQuantity: 0,
    ambientQuantity: 0,
    produceQuantity: 0,
  });
  const [ordersView, setOrdersView] = useState([]);

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
        console.log(data);

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
    setItemOrder(order);
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
            id={itemOrder.frozenQuantity > 0 ? "button" : "button-none"}
          >
            <span className="glyphicon glyphicon-asterisk">
              <strong>
                Frozen{" "}
                {itemOrder.frozenQuantity > 0
                  ? "(" + itemOrder.frozenQuantity + ")"
                  : ""}
              </strong>
            </span>
          </button>
          <button
            className="btn btn-sm"
            id={itemOrder.meatQuantity > 0 ? "button" : "button-none"}
          >
            <span className="glyphicon glyphicon-tree-deciduous">
              <strong>
                Meat{" "}
                {itemOrder.meatQuantity > 0
                  ? "(" + itemOrder.meatQuantity + ")"
                  : ""}
              </strong>
            </span>
          </button>
          <button
            className="btn btn-sm"
            id={itemOrder.dairyQuantity > 0 ? "button" : "button-none"}
          >
            <span className="glyphicon glyphicon-grain">
              <strong>
                Dairy{" "}
                {itemOrder.dairyQuantity > 0
                  ? "(" + itemOrder.dairyQuantity + ")"
                  : ""}
              </strong>
            </span>
          </button>
          <button
            className="btn btn-sm"
            id={itemOrder.ambientQuantity > 0 ? "button" : "button-none"}
          >
            <span className="glyphicon glyphicon-grain">
              <strong>
                Ambient{" "}
                {itemOrder.ambientQuantity > 0
                  ? "(" + itemOrder.ambientQuantity + ")"
                  : ""}
              </strong>
            </span>
          </button>
          <button
            className="btn btn-sm"
            id={itemOrder.produceQuantity > 0 ? "button" : "button-none"}
          >
            <span className="glyphicon glyphicon-grain">
              <strong>
                Produce{" "}
                {itemOrder.produceQuantity > 0
                  ? "(" + itemOrder.produceQuantity + ")"
                  : ""}
              </strong>
            </span>
          </button>
        </div>
        <div id="piechart">
          <WarehouseChart />
        </div>
      </div>
      <div className="viewSOH">
        <a href={"/stockWarehouse"}>
          <button className="btn btn-sm" id="SoH-button">
            View SOH
          </button>
        </a>
        <a href={"/storeView"}>
          <button className="btn btn-sm">Store View</button>
        </a>
      </div>
    </>
  );
};

export default WarehouseDB;
