// Import all the pages in this portion
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import StockStore from "./components/ViewStock/StockStore";
import StockWarehouse from "./components/ViewStock/StockWarehouse";
import StoreView from "./components/StoreView/StoreView";
import WarehouseDB from "./components/WarehouseDB/WarehouseDB";
import createOrder from "./components/CreateOrder/createOrder";
import AddStock from "./components/AddStock/AddStock";
import FulfillOrder from "./components/FufillOrder/fulfillOrder";
import StoreViewOrder from "./components/StoreViewOrder/StoreViewOrder"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* the routes to the pages are below, the exact path will be the login page */}
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/storeView" component={StoreView} />
          <Route path="/stockStore" component={StockStore} />
          <Route path="/stockWarehouse" component={StockWarehouse} />
          <Route path="/warehouseDB" component={WarehouseDB} />
          <Route path="/createOrder" component={createOrder} />
          <Route path="/AddStock" component={AddStock} />
          <Route path="/fulfillOrder" component={FulfillOrder} />
          <Route path="/StoreViewOrder" component={StoreViewOrder} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;