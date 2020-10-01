import React, {useState, useEffect} from 'react'
import Navbar from '../Tools/StoreNavbar'
import  {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps"
import "../DisplayWarehouses/maps.css"
import mapStyles from './mapStyles'
import Bar from './warehouseStockSelector'
import axios from 'axios'


const DisplayWarehouses = () =>
{
    //declaring the consts latitude and logitude for the markers
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const WrappedMap = withScriptjs(withGoogleMap(Map));
    const [warehouseLat, setWarehouseLat] = useState();
    const [warehouseLng, setWarehouseLng] = useState();
    const [warehouseLat1, setWarehouseLat1] = useState();
    const [warehouseLng1, setWarehouseLng1] = useState();

    function GetData()
    {
        const API_URL = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('auth-token');
        const headers = 
        {
            'authorization': token
        };
        axios.get(`${API_URL}/viewWarehouses`, {headers})
            .then(response => {   
                if(response.data.success) 
                {  
                    //retriving the data from rhe get request and setting the latitudes and longitudes to the consts
                    setWarehouseLat(response.data.warehouses[0].location.lat)
                    setWarehouseLng(response.data.warehouses[0].location.long)
                    setWarehouseLat1(response.data.warehouses[1].location.lat)
                    setWarehouseLng1(response.data.warehouses[1].location.long)
                } 
                
            }
            //catch error if there is no response
            ).catch(error => {
                let response = error.response;
                if (response == 403) {
                    console.log(error)
                }
            }
        );
    }
    // useEffect hook is used so that it renders the data on the mmap each time page is refreshed
    useEffect(() => {
        GetData();
      }, []);
    
    function Map() //this is the map function
    { 
        return(
            <div>
                <GoogleMap
                    defaultZoom={13}
                    defaultCenter={{lat: -37.889130, lng: 145.151060}} //original position on load and refresh
                    defaultOptions={{styles: mapStyles}} 
                >
                <Marker //one warehouse marker
                    position={{lat: warehouseLat, lng: warehouseLng}}
                    icon={{
                        url: '/warehouse.png',
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                    onClick={() => {
                        setSelectedWarehouse(warehouseLng)
                    }}
                />
                <Marker // another warehouse marker
                    position={{lat: warehouseLat1, lng: warehouseLng1}} //position data from get request
                    icon={{
                        url: '/warehouse.png',
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                    onClick={() => {
                        setSelectedWarehouse(warehouseLng1)
                    }}
                />
                {selectedWarehouse && (
                    <InfoWindow
                        position={{lat: warehouseLat, lng: warehouseLng}}
                        onCloseClick={() => {
                            setSelectedWarehouse(null)
                        }}
                    >
                        <div>Warehouse 1111</div>
                    </InfoWindow>
                )}
                {selectedWarehouse && (
                    <InfoWindow
                        position={{lat: warehouseLat1, lng: warehouseLng1}}
                        onCloseClick={() => {
                            setSelectedWarehouse(null)
                        }}
                    >
                        <div>Warehouse 2222</div>
                    </InfoWindow>
                )}
                </GoogleMap>
            </div>
        );
    }
        return(
        <div>
            <div>
                <Navbar />
            </div>
            <br/>
            <div style={{width: '750px', height: '420px'}} className="Maps">
                <h1>Choose a Warehouse</h1>
                <WrappedMap //this function renders the google map on the page
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} //GoogleMaps API key in env.development file
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
export default DisplayWarehouses