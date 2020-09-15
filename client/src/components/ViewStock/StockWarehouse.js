import React, { Component } from "react";
import "./styling.css";
import BarChart from "./WarehouseCharts/BarWarehouseChart";
import LineChart from "./WarehouseCharts/LineWarehouseChart"
import { withRouter } from "react-router-dom";
import Navbar from "../Tools/WarehouseNavbar";

class StockWarehouse extends Component 
{
    render()
    {   
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                <br/>
                <div className="block">
                    <div className="Stock">
                        <BarChart />
                    </div>
                    <div className='Temp'>    
                        <LineChart />
                    </div>
                <br/>
                </div>
            </div>
        )
    }
}
export default withRouter(StockWarehouse);
