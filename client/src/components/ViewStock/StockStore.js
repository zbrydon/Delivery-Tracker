import React, {Component} from "react";
import "./styling.css";
import BarChart from "./StoreCharts/BarStoreChart";
import LineChart from "./StoreCharts/LineStoreChart"
import Navbar from "../Tools/StoreNavbar";
import { withRouter } from "react-router-dom";


class StockStore extends Component
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
                    <div className='Temperature'>    
                        <LineChart />
                    </div>
                <br/>
                </div>
            </div>
        )
    }
}
export default withRouter(StockStore)

