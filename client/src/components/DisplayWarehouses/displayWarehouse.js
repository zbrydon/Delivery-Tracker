import React from 'react'
import Navbar from '../Tools/StoreNavbar'
import  {GoogleMap, withScriptjs, withGoogleMap, Marker} from "react-google-maps"
import "../DisplayWarehouses/maps.css"
import mapStyles from './mapStyles'
import Bar from './warehouseStockSelector'
import axios from 'axios'
import { withRouter } from 'react-router'

var lat
var long

function Map()
{
    return(
        <div>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{lat: -37.850130, lng: 145.119060}}
                defaultOptions={{styles: mapStyles}}
            >
            <Marker 
             position={{lat: lat, lng: long}}
             
             />
            </GoogleMap>
        </div>
    );
}
const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class displayWarehouses extends React.Component
{
    componentDidMount()
    {
        const API_URL = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('auth-token');
        const headers = 
        {
            'authorization': token
        };
        axios.get(`${API_URL}/viewWarehouses`, {headers})
            .then(response => {   
                if(response.data.success) {
                    let data = response.data.warehouses
                    for(let i = 0; data; i++)
                    {
                        //return response.data.warehouses[i].location
                        //this.setState(response.data.warehouses[i].location.lat)
                        //this.setState(response.data.warehouses[i].location.long)
                        lat = response.data.warehouses[i].location.lat
                        long = response.data.warehouses[i].location.long
                        
                    }
                    console.log(lat)
                    console.log(long)
                } 
            }
            ).catch(error => {
                let response = error.response;
                if (response == 403) {
                    console.log(error)
                }
            }
        );
    }
    render() {
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                <br/>
                <div style={{width: '750px', height: '420px'}} className="Maps">
                    <h1>Choose a Warehouse</h1>
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        loadingElement={<div style={{height: "100%"}}  />}
                        containerElement={<div style={{height: "100%"}}  />}
                        mapElement={<div style={{height: "100%"}}  />}             
                    />
                </div>
                <div className="WarehouseStock">
                    <Bar />
                </div>
                <br/>
                    <div id="option" className="bbutton">
                        <a href={"/createOrder"}>
                            <button>Create Order</button>
                        </a>
                    </div>
            </div>
        )
    }
}
const displayTheWarehouse = withRouter(displayWarehouses)
