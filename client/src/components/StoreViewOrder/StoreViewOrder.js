import React from 'react'
import NavBar from "../Tools/StoreNavbar"
import "../StoreViewOrder/StoreView.css"

// this page will show the orders that the store has placed for a particular warehouse
function storeViewOrder() {
    return (
        <>
      <NavBar />
      <br/>
      <div className="wrap">
        <div className="search">
          <input type="text" className="searchID" placeholder="Order ID" />
          <button type="submit" className="searchButton" value="select">
            <i className="glyphicon glyphicon-search"></i>
          </button>
        </div>
        <div>
          <table className="deliver-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Warehouse ID</th>
                <th>Product Type</th>
                <th>Quantity</th>
                <th>Order Date Time</th>
                <th>Delivery Date Time</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Example</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                </tr>
                <tr>
                <td>Example</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>
    )
}

export default storeViewOrder
