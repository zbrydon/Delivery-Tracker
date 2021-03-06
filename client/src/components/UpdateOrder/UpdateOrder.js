import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateOrder.css";
import NavBar from "../Tools/StoreNavbar";
import { useLocation, useHistory } from "react-router-dom";

const UpdateOrder = () => {
  const query = useQuery();
  const history = useHistory();
  const [order, setOrder] = useState({});
  const [frozenQuantity, setFrozenQuantity] = useState('');
  const [dairyQuantity, setDairyQuantity] = useState('');
  const [meatQuantity, setMeatQuantity] = useState('');
  const [produceQuantity, setProduceQuantity] = useState('');
  const [ambientQuantity, setAmbientQuantity] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("auth-token");
  const headers = { authorization: token };
  const param = { orderId: query.get("orderId") };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function updateOrder(event) {
    event.preventDefault();

    let data = {
      frozenQuantity: frozenQuantity,
      dairyQuantity: dairyQuantity,
      meatQuantity: meatQuantity,
      produceQuantity: produceQuantity,
      ambientQuantity: ambientQuantity,
      orderId: order.orderId
    };

    axios.post(`${API_URL}/updateOrder`, data, {headers: headers})
      .then(function (response) {
        let data = response.data;

        // setMessage(data.message);
      })
      .catch(function (error) {
        let data = error.response.data;
        // setMessage(data.message);
      });
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/viewOrdersByOrderId`, {
        headers: headers,
        params: param,
      })
      .then(function (response) {
        let data = response.data;
        let orders = data.orders;
        if (orders.length > 0) {
          setOrder(orders[0]);

          setFrozenQuantity(orders[0].frozenQuantity);
          setDairyQuantity(orders[0].dairyQuantity);
          setMeatQuantity(orders[0].meatQuantity);
          setProduceQuantity(orders[0].produceQuantity);
          setAmbientQuantity(orders[0].ambientQuantity);
        }
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
      <div>
        <form className="form1">
          <h1 className="headP">
            <strong>Update Order</strong>
          </h1>

          <legend>
            <span className="number">1</span>Order Stock To:
          </legend>

          <label for="OrderID">Order ID:</label>
          <input type="text" id="OrderID" value={order.orderId} />
          <label for="dry-product">Frozen</label>
          <input
            type="number"
            id="product"
            value={frozenQuantity}
            onChange={(e) => setFrozenQuantity(e.target.value)}
          />
          <label for="normal-product">Dairy</label>
          <input
            type="number"
            id="product"
            value={dairyQuantity}
            onChange={(e) => setDairyQuantity(e.target.value)}
          />
          <label for="frozen-product">Meat</label>
          <input
            type="number"
            id="product"
            value={meatQuantity}
            onChange={(e) => setMeatQuantity(e.target.value)}
          />
          <label for="frozen-product">Produce</label>
          <input
            type="number"
            id="product"
            value={produceQuantity}
            onChange={(e) => setProduceQuantity(e.target.value)}
          />
          <label for="frozen-product">Ambient</label>
          <input
            type="number"
            id="product"
            value={ambientQuantity}
            onChange={(e) => setAmbientQuantity(e.target.value)}
          />

          <a onClick={updateOrder}>
            <button className="update-btn">Submit</button>
          </a>
        </form>
      </div>
    </>
  );
};

export default UpdateOrder;
