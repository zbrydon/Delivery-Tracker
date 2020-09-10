import React from "react";
import "./UpdateOrder.css";
import NavBar from "../Tools/StoreNavbar";

const UpdateOrder = () => {
  return (
    <>
      <NavBar />
      <br />
      <div>
        <form className="form1">
          <h1 className="headP">
            <strong>Update Order</strong>
          </h1>
          <fieldset>
            <legend>
              <span className="number">1</span>Order update
            </legend>
            <label for="OrderID">Order ID:</label>
            <input type="text" id="OrderID" />
            <label for="dry-product">Dry Quantities</label>
            <input type="number" id="dry-product" />
            <label for="normal-product">Normal Quantities</label>
            <input type="number" id="normal-product" />
            <label for="frozen-product">Frozen Quantities</label>
            <input type="number" id="frozen-product" />
          </fieldset>

          <fieldset>
            <legend>
              <span className="number">2</span>Addition Info
            </legend>
            <label for="comment">Comment</label>
            <textarea id="comment"></textarea>
          </fieldset>

          <button type="submit" className="update-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateOrder;
