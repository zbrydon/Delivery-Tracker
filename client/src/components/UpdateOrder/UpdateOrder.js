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
              <span className="number">1</span>Order Stock To:
            </legend>
            
            <label for="OrderID">Order ID:</label>
            <input 
            type="text" 
            id="OrderID" 
            />
            <label for="dry-product">Frozen</label>
            <input 
            type="number" 
            id="product" 
            />
            <label for="normal-product">Dairy</label>
            <input 
            type="number" 
            id="product" 
            />
            <label for="frozen-product">Meat</label>
            <input 
            type="number" 
            id="product" 
            />
            <label for="frozen-product">Produce</label>
            <input 
            type="number" 
            id="product" 
            />
            <label for="frozen-product">Produce</label>
            <input 
            type="number" 
            id="product" 
            />
          </fieldset>

          <fieldset>
            <legend>
              <span className="number">3</span>Addition Info:
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
