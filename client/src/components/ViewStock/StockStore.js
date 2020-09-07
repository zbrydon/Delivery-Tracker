import React, {Component} from "react";
import "../ViewStock/styling.css";
import Charts from "./StoreCharts/StoreChart";
import Navbar from "../Tools/StoreNavbar";
import { withRouter } from "react-router-dom";
// import { Map, GoogleApiWrapper } from 'google-maps-react';

class StockStore extends Component
{
    render()
    {
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                    {/* <div>
                        <Map 
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 47.444, lng: -122.176}}
                        />
                    </div> */}
                <div className="chart">
                    <Charts />
                </div>
            </div>
        )
    }
}
export default withRouter(StockStore)
// module.exports = withRouter(StockStore);
// module.exports = GoogleApiWrapper(MapContainer);
