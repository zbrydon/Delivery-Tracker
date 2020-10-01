import React, { useState } from "react";
import Navbar from "../Tools/WarehouseNavbar";
import "../UpdateStock/UpdateStock.css";
import axios from "axios";

// the update stock for the warehouse page
const AddStock = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [frozenQuantity, setFrozenQuantity] = useState();
  const [dairyQuantity, setDairyQuantity] = useState();
  const [meatQuantity, setMeatQuantity] = useState();
  const [produceQuantity, setProduceQuantity] = useState();
  const [ambientQuantity, setAmbientQuantity] = useState();

  const token = localStorage.getItem("auth-token");
  const headers = {
    authorization: token,
  };

  //this handler will update the stock on hand at the warehouse when submitted
  const handleSubmitClick = async (e) => {
    e.preventDefault();
    alert("Stock Updated")
    const updateSOH = {
      frozenQuantity,
      dairyQuantity,
      meatQuantity,
      produceQuantity,
      ambientQuantity,
    };
    const updateRes = await axios.post(
      `${API_URL}/updateWarehouseSOH`,
      updateSOH,
      { headers }
    );
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <br></br>
        <form className="main-block">
          <h1>Update Stock</h1>
          <label className="ChooseWarehouse">Choose Pallets: </label>
          <div className="multiselect">
            <label className="Quant">Choose amount 1-20</label>
            <br />
            <div className="selectBox"></div>
            <div className="pallets">
              <label>Frozen</label>
              <input
                className="input-number"
                type="number"
                id="frozen"
                name="quantity"
                min="1"
                max="20"
                onChange={(e) => setFrozenQuantity(e.target.value)}
              />
              <br />
              <label>Dairy</label>
              <input
                className="input-number"
                type="number"
                id="dairy"
                name="quantity"
                min="1"
                max="20"
                onChange={(e) => setDairyQuantity(e.target.value)}
              />
              <br />
              <label>Meat</label>
              <input
                className="input-number"
                type="number"
                id="meat"
                name="quantity"
                min="1"
                max="20"
                onChange={(e) => setMeatQuantity(e.target.value)}
              />
              <br />
              <label>Produce</label>
              <input
                className="input-number"
                type="number"
                id="produce"
                name="quantity"
                min="1"
                max="20"
                onChange={(e) => setProduceQuantity(e.target.value)}
              />
              <br />
              <label>Ambient</label>
              <input
                className="input-number"
                type="number"
                id="ambient"
                name="quantity"
                min="1"
                max="20"
                onChange={(e) => setAmbientQuantity(e.target.value)}
              />
              <br />
            </div>
          </div>
          <br></br>
          {/* <label className="ChooseWarehouse" for="warehouseID">Choose a Quantity:</label> */}
          <div className="btn-block">
            <button
              type="submit"
              href="/"
              onClick={handleSubmitClick}
              className="update-Submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStock;
