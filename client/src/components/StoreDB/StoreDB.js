import React, {useState, useEffect} from "react";
import "./StoreDB.css";
import axios from "axios";
import NavBar from "../Tools/StoreNavbar";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";


const StoreDB = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState();
  const history = useHistory();

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = { authorization: token };
    const storeId = localStorage.getItem("login_id");
    const param = { storeId: storeId };

    axios
      .get(`${API_URL}/viewStoreOrders`, {
        headers: headers,
        params: param,
      })
      .then(function (response) {
        let data = response.data; 
        let orders = data.orders;
        debugger;
        
        orders.sort((orders1, orders2) => (orders1.orderDateTime < orders2.orderDateTime) ? 1 : -1);

        orders = orders.filter(order=> order.orderStatus == 'Unfulfilled');
        
        if (orders.length > 2) {
          // Remove two element first
          orders.splice(2, orders.length -1);
        }

        setOrders(orders);
       
      })
      .catch(function (error) {
        let response = error.response;
        if (response.status == 403) {
            // redirect to login page
            history.push("/");
        }
      });
  }, []);

  const selectRow = async (orderId) => {
    setOrderId(orderId);
  };
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
            {orders.map((order, i) => {
                // Return the element. Also pass key
                return (
                  <tr key={i} onClick={selectRow.bind(this, order.orderId)}>
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
          {
            orderId  ?
            <div id="option">
              <a href={"/updateOrder?orderId=" + orderId}>
                <button className="choosing-btn">Update Order</button>
              </a>
            </div>
            :''
          }
          
        </div>
      </div>
    </>
  );
};

export default StoreDB;
