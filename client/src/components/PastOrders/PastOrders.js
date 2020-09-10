import React from "react";
import "./PastOrders.css";
import NavBar from "../Tools/StoreNavbar";

const PastOrders = () => {
  return (
    <>
      <NavBar />
      <br />
      <div className="order-cards">
        <div className="card">
          <div className="card-header"> OrderID</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frozen</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td>Dry</td>
                  <td>12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"> OrderID</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Normal</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>Dry</td>
                  <td>23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"> OrderID</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frozen</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>Normal</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header"> OrderID</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frozen</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td>Dry</td>
                  <td>12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header"> OrderID</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Quantities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Frozen</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td>Dry</td>
                  <td>12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastOrders;
