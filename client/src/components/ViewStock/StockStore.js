import React, {Component} from "react";
import "../ViewStock/styling.css";
import Charts from "./StoreCharts/StoreChart";
import { withRouter } from "react-router-dom";

class StockStore extends Component
{
    render()
    {
        return(
            <div className="chart">
                <Charts />
            </div>
        )
    }
}
export default withRouter(StockStore);