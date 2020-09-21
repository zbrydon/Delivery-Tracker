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
import UpdateStock from "./components/UpdateStock/UpdateStock";
import FulfillOrder from "./components/FufillOrder/fulfillOrder";
import StoreViewOrder from "./components/StoreViewOrder/StoreViewOrder";
import PastOrders from "./components/PastOrders/PastOrders";
import StoreDB from "./components/StoreDB/StoreDB";
import UpdateOrder from "./components/UpdateOrder/UpdateOrder";
import WarehouseChart from "./components/WarehouseChart/WarehouseChart";
import DeleteOrders from "./components/DeleteOrders/DeleteOrders";
import DisplayWarehouses from "./components/DisplayWarehouses/displayWarehouse";
import InTransit from "./components/InTransit/inTransit";
import RegisterAdmin from "./components/RegisterAdmin/RegisterAd";

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
          <Route path="/UpdateStock" component={UpdateStock} />
          <Route path="/fulfillOrder" component={FulfillOrder} />
          <Route path="/StoreViewOrder" component={StoreViewOrder} />
          <Route path="/pastOrders" component={PastOrders} />
          <Route path="/storeDB" component={StoreDB} />
          <Route path="/warehouseChart" component={WarehouseChart} />
          <Route path="/updateOrder" component={UpdateOrder} />
          <Route path="/deleteOrder" component={DeleteOrders} />
          <Route path="/displayWarehouses" component={DisplayWarehouses} />
          <Route path="/inTransit" component={InTransit} />
          <Route path="/registerAd" component={RegisterAdmin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
