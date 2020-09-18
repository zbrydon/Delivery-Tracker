import React, { useState, useEffect } from "react";
import Navbar from '../Tools/StoreNavbar'
import  {GoogleMap, withScriptjs, withGoogleMap, Marker , DirectionsRenderer} from "react-google-maps"
import "../DisplayWarehouses/maps.css"
import mapStyles from '../DisplayWarehouses/mapStyles'
import Chart from "../InTransit/chart"
import axios from "axios";


const TrackOrder = () => {
    const [orderLat, setOrderLat] = useState();
    const [orderLng, setOrderLng] = useState();
    const [storeLat, setStoreLat] = useState();
    const [storeLng, setStoreLng] = useState();
    const [directions, setDirections] = useState();
    const [count, setCount] = useState(0);
    

    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = { authorization: token };

    function GetData() {
        const params = { orderId: 1000 };
        axios.get(
            `${API_URL}/viewOrder`, { headers, params }
        ).then(response => {
            if (response.data.success) {
                setOrderLat(response.data.order.location.lat);
                setOrderLng(response.data.order.location.long);
                
                setStoreLat(response.data.location.lat);
                setStoreLng(response.data.location.long);

                /*setStoreLat(-37.84866);
                setStoreLng(145.11306);*/
            }
        }).catch(error => {
            localStorage.setItem('err', error);
            if (error.response === 406) {
                //display "please refresh your session" here
                //return history.push("/refresh");
            } if (error.response === 403) {
                //display "please login" here
                //this.redirectToLogin();
            }
        });
    }


    useEffect(() => {
        GetData();

    }, []);

    useEffect(() => {
        
    });

    function Map() {
        if (count < 1) {
            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route({
                origin: new window.google.maps.LatLng(orderLat, orderLng),
                destination: new window.google.maps.LatLng(storeLat, storeLng),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);

                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
            setCount(1);
        } 
        
        
        return (
            <div>
                <GoogleMap
                    defaultZoom={12}
                    defaultCenter={{ lat: -37.850130, lng: 145.119060 }}
                    defaultOptions={{ styles: mapStyles }}
                >
                    <Marker position={{
                        lat: orderLat,
                        lng: orderLng
                    }} />
                    <Marker position={{
                        lat: storeLat,
                        lng: storeLng
                    }} />
                    <DirectionsRenderer directions={directions} />
                </GoogleMap>
            </div>
        );
    }
   

    const WrappedMap = withScriptjs(withGoogleMap(Map))

    return (
        <>
            <div>
                <div>
                    <Navbar />
                </div>
                <br />
                <h1>In Transit</h1>
                <div style={{ width: '800px', height: '420px' }} className="Maps">
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                    />
                    <Chart />
                </div>
            </div>


        </>
    );
};

export default TrackOrder;


/*function Map()
{


    return(
        <div>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{lat: -37.850130, lng: 145.119060}}
                defaultOptions={{styles: mapStyles}}
            >
                <Marker position={{lat: -37.84866,
                lng: 145.11306}} />
            </GoogleMap>
        </div>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class displayWarehouses extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            orderLocation: {
                lat:0,
                long:0
            },
            storelocation: {
                lat: -37.84866,
                long: 145.11306
            }

        }
    }


    componentDidMount() {
        const API_URL = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('auth-token');
        const headers = {
            'authorization': token
        };
        const params = { orderId: 1000 };
        axios.get(
            `${API_URL}/viewOrder`, { headers, params }
        ).then(response => {
            if (response.data.success) {
                
                
                this.setState({
                    orderLocation: {
                        lat: response.data.order.location.lat,
                        long: response.data.order.location.long
                    }
                });
            }
        }).catch(error => {
            localStorage.setItem('err', error);
            if (error.response.status === 406) {
                //display "please refresh your session" here
                //return history.push("/refresh");
            } if (error.response.status === 403) {
                //display "please login" here
                this.redirectToLogin();
            }
        });
    }
    render() {
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <br />
                <h1>In Transit</h1>
                <div style={{ width: '800px', height: '420px' }} className="Maps">
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                    />
                    <Chart />
                </div>
            </div>
        )
    }
}*/