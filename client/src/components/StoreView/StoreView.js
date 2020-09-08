import React, { useState, useEffect } from "react";
import "../StoreView/StoreView.Modules.css";
import NavBar from "../Tools/WarehouseNavbar";
//import NavBar from "../NavBar/NavBar";
import Axios from "axios";

const StoreView = () => {
  const [store1, setStore1] = useState({});
  const [store2, setStore2] = useState({});
  const [store3, setStore3] = useState({});
  const [store4, setStore4] = useState({});

  useEffect(() => {
    const data = async () => {
      const API_URL = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem("auth-token");
      const headers = { authorization: token };

      const result = await Axios.get(`${API_URL}/viewStores`, { headers });
        for (let i = 0; i < result.data.count; i++) {
            //render components dynamically here
        }

      if (result.data.stores[0].id === 11111 && result.data.success === true) {
        setStore1({ reqStatus: "Requested", theme: "#FDC0C3" });
      } else {
        setStore1({ reqStatus: "No Request", theme: "#c9deff" });
      }

      if (result.data.stores[1].id === 11112 && result.data.success === true) {
        setStore2({ reqStatus: "Requested", theme: "#FDC0C3" });
      } else {
        setStore2({ reqStatus: "No Request", theme: "#c9deff" });
      }

      if (result.data.stores[2].id === 11113 && result.data.success === true) {
        setStore3({ reqStatus: "Requested", theme: "#FDC0C3" });
      } else {
        setStore3({ reqStatus: "No Request", theme: "#c9deff" });
      }

      if (result.data.stores[3].id === 11114 && result.data.success === true) {
        setStore4({ reqStatus: "Requested", theme: "#FDC0C3" });
      } else {
        setStore4({ reqStatus: "No Request", theme: "#c9deff" });
      }
    };
    data();
  }, []);

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="card-container">
        <div className="cards">
          <div
            className="card"
            style={{
              background:
                store1.reqStatus === "Requested" ? store1.theme : "c9deff",
            }}
          >
            <h3>Store 1</h3>
            <span className="status">{store1.reqStatus}</span>
            <a href={"/warehouseDB"}>
              <button>Details</button>
            </a>
          </div>
          <div className="card" style={{ background: store2.theme }}>
            <span className="card-title">
              <h3>Store 2</h3>
            </span>
            <span className="status">{store2.reqStatus}</span>
            <a href={"/warehouseDB"}>
              <button>Details</button>
            </a>
          </div>
        </div>
      </div>

      <div className="card-container">
        <div className="cards">
          <div className="card" style={{ background: store3.theme }}>
            <h3>Store 3</h3>
            <span className="status">{store3.reqStatus}</span>
            <a href={"/warehouseDB"}>
              <button>Details</button>
            </a>
          </div>

          <div
            className="card"
            style={{
              background:
                store4.reqStatus === "Requested" ? store4.theme : "#c9deff",
            }}
          >
            <h3>Store 4</h3>

            <span className="status">
              {store4.reqStatus === "No Request"
                ? setStore4({ reqStatus: "No Request" })
                : store4.reqStatus}
            </span>

            <a href={"/warehouseDB"}>
              <button>Details</button>
            </a>
          </div>
        </div>
      </div>
      </div>
  );
};

export default StoreView;
