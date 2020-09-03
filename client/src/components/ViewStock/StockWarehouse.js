import React, {Component} from "react"
import "./styling.css";
import Charts from "./WarehouseCharts/WarehouseChart"
import { withRouter } from "react-router-dom";

class StockWarehouse extends Component 
{
    render()
    {
        return (
            <div className="chart">
                <Charts />
            </div>
        )
    }
}

export default withRouter(StockWarehouse);
