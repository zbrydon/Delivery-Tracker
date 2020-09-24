import React, { useState, useEffect } from "react";
import "../StoreView/StoreView.Modules.css";
import NavBar from "../Tools/WarehouseNavbar";
import Axios from "axios";

const StoreView = () => {
  const [store1, setStore1] = useState({});
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const data = async () => {
      const API_URL = process.env.REACT_APP_API_URL;
      const token = localStorage.getItem("auth-token");
      const headers = { authorization: token };

      const result = await Axios.get(`${API_URL}/viewStores`, { headers });
      let stores = result.data.stores;
      
      if (stores && stores.length > 0) {
        
        let tempStores = [];
        for (let index = 0; index < stores.length; index++) {
          const element1 = stores[index];
          let element2 = [];
          if (stores.length > 1) {
            element2 = stores[index + 1];
          }
          let array = [element1, element2];
          tempStores.push(array);
          index += 2;

          setStores(tempStores);
          if (index >= stores.length) {
            break;
          }
        }
      }
    };
    data();
  }, []);
  return (
    <div>
      <NavBar />
      <br></br>
      {stores.map((elements, i) => {
          // Return the element. Also pass key
          return (
            <div className="card-container">
              <div className="cards">
              {elements.map((element, i) => {
                // Return the element. Also pass key
                return (
                  <div  className="card" style={{
                    background:
                    element.hasOrdered ? '#FDC0C3' : "c9deff",
                  }}>
                  <h3>{element.id}</h3>
                  <span className="status" >
                    {
                      element.hasOrdered ? 'Requested' : 'No Request'
                    }
                  </span>
                  <a href={"/warehouseDB?storeId=" + element.id}>
                    <button className="detail-button">Details</button>
                  </a>
                </div>
                );
              })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default StoreView;
