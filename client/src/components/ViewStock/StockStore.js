import React, {Component} from "react";
import "../ViewStock/styling.css";
import BarChart from "./StoreCharts/StoreStockChart";
import LineChart from "./StoreCharts/StoreTempChart";
import { withRouter } from "react-router-dom";


class StockStore extends Component
{
    render()
    {
        return(
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
export default withRouter(StockStore);