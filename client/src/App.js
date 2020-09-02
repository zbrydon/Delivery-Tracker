import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Tools/Navbar";
import StockStore from "./components/ViewStock/StockStore";
import StockWarehouse from "./components/ViewStock/StockWarehouse";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
        <Navbar />
        <Switch>
        
          {/* Place all thee stores that should have the navbar under here */}
          <Route path="/stockStore" component={StockStore} />
          <Route path="/stockWarehouse" component={StockWarehouse} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
