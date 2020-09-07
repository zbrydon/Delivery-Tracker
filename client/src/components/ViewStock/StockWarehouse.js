import React, { Component } from "react";
import "./styling.css";
import Charts from "./WarehouseCharts/WarehouseChart";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

class StockWarehouse extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="chart">
          <Charts />
        </div>
      </>
    );
  }
}
export default withRouter(StockWarehouse);
