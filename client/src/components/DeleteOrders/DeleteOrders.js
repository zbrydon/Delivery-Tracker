import axios from "axios";
import React, { useEffect, useState } from "react";
import "./DeleteOrders.css";
import NavBar from "../Tools/StoreNavbar";
import Moment from "react-moment";
import { useLocation, useHistory } from "react-router-dom";

const DeleteOrders = () => {
  const query = useQuery();
  const [orders, setOrders] = useState([]);
  const param = { orderId: query.get("orderId") };
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("auth-token");
  const headers = { authorization: token };
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  useEffect(() => {
    axios
      .get(`${API_URL}/viewStoreOrders`, {
        headers: headers,
      })
      .then(function (response) {
        let data = response.data;
        let orders = data.orders;

        orders.sort((orders1, orders2) =>
          orders1.orderDateTime < orders2.orderDateTime ? 1 : -1
        );

        orders = orders.filter((order) => order.orderStatus === "Unfulfilled");
        setOrders(orders);
      })
      .catch(function (error) {
        let response = error.response;
        // if (response.status == 403) {
        //   // redirect to login page
        //   history.push("/");
        // }
      });
  }, []);

  //Delete orders button
  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API_URL}/deleteOrder`, {
        headers: headers,
      })
      .then(function (res) {
        let data = res.data;
        console.log(data);
      })
      .catch(function (err) {
        let errData = err.response;
        console.log(errData);
      });
  };
  return (
    <>
      <NavBar />
      <br />
      <div className="order-cards">
        {orders.map((order, index) => {
          // Return the element. Also pass key
          return (
            <div className="card">
              <div className="card-header" key={index}>
                {" "}
                Order {order.orderId}
              </div>
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
                      <th scope="row">Frozen</th>
                      <td>{order.frozenQuantity}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {order.orderDateTime}
                        </Moment>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Dairy</th>
                      <td>{order.dairyQuantity}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {order.orderDateTime}
                        </Moment>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Meat</th>
                      <td>{order.meatQuantity}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {order.orderDateTime}
                        </Moment>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Produce</th>
                      <td>{order.produceQuantity}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {order.orderDateTime}
                        </Moment>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Ambient</th>
                      <td>{order.ambientQuantity}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {order.orderDateTime}
                        </Moment>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-danger" onClick={handleSubmitClick}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DeleteOrders;
