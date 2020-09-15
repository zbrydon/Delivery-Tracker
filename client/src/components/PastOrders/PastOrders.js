import React,  { useState, useEffect } from "react";
import axios from "axios";
import "./PastOrders.css";
import NavBar from "../Tools/StoreNavbar";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = { authorization: token };


    axios
      .get(`${API_URL}/viewStoreOrders`, {
        headers: headers
      })
      .then(function (response) {
        let data = response.data;
        let orders = data.orders;

        // Sort decrease by orderDateTime
        orders.sort((orders1, orders2) => (orders1.orderDateTime < orders2.orderDateTime) ? 1 : -1);
        
        if (orders.length > 0) {
          // Remove two element first
          orders.splice(0, 2);
        }

       
        setOrders(data.orders);
       
      })
      .catch(function (error) {
        let response = error.response;
        if (response.status == 403) {
            // redirect to login page
            history.push("/");
        }
      });
  }, []);

  return (
    <>
      <NavBar />
      <br />
      <div className="order-cards">
      {orders.map((order, i) => {
          // Return the element. Also pass key
          return (
            <div className="card">
              <div className="card-header"> OrderID</div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Quantities</th>
                      <th scope="col">Order date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{order.productType}</td>
                      <td>{order.quantity}</td>
                      <td>
                      <Moment format="DD/MM/YYYY">
                        {order.orderDateTime}
                      </Moment>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PastOrders;
