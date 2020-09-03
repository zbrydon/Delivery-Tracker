import React, {Component} from "react"
import "./styling.css";
import BarChart from "./WarehouseCharts/WarehouseStockChart";
import LineChart from "./WarehouseCharts/WarehouseTempChart";
import { withRouter } from "react-router-dom";

class StockWarehouse extends Component 
{
    render()
    {
        return (
            <div className="chart">
                <BarChart />
                <br></br>
                <br></br>
                <br></br>
                <LineChart />
            </div>
        )
    }
}

export default withRouter(StockWarehouse);
