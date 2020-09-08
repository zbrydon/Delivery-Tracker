import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import Navbar from "./components/Tools/StoreNavbar";
import StockStore from "./components/ViewStock/StockStore";
import StockWarehouse from "./components/ViewStock/StockWarehouse";
import StoreView from "./components/StoreView/StoreView";
import WarehouseDB from "./components/WarehouseDB/WarehouseDB";
import createOrder from "./components/CreateOrder/createOrder";
import AddStock from "./components/AddStock/AddStock";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        {/* <Navbar /> */}{/* Place all thee stores that should have the navbar under here */}
        <Switch>
          <Route path="/storeView" component={StoreView} />
          <Route path="/stockStore" component={StockStore} />
          <Route path="/stockWarehouse" component={StockWarehouse} />
          <Route path="/warehouseDB" component={WarehouseDB} />
          <Route path="/createOrder" component={createOrder} />
          <Route path="/AddStock" component={AddStock} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
