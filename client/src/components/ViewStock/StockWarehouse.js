import React, {Component} from "react"
import "./styling.css";
import Charts from "./WarehouseCharts/WarehouseChart"
import { withRouter } from "react-router-dom";
import Navbar from "../Tools/WarehouseNavbar";

class StockWarehouse extends Component 
{
    render()
    {
        
        return (
            <div>
                <div>
                <Navbar />  
                </div>
                <div className="chart">
                    <Charts />
                </div>
            </div>
        )
    }
}
export default withRouter(StockWarehouse);