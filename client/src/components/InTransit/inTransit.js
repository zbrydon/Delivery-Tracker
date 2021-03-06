import React, { useState, useEffect } from "react";
import Navbar from "../Tools/StoreNavbar";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import mapStyles from "../DisplayWarehouses/mapStyles";
import Chart from "../InTransit/chart";
import axios from "axios";
import "./maps.css"

const TrackOrder = () => {
  //creating consts dor the order and store lat long, as well as the directions
  const [orderLat, setOrderLat] = useState();
  const [orderLng, setOrderLng] = useState();
  const [storeLat, setStoreLat] = useState();
  const [storeLng, setStoreLng] = useState();
  const [directions, setDirections] = useState();

  const [count, setCount] = useState();

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("auth-token");
  const headers = { authorization: token };

  function GetData() { //fetches the data of the store and mock device to track the directions of the truck
    const params = { orderId: 1000 };
    axios
      .get(`${API_URL}/viewOrder`, { headers, params })
      .then((response) => {
        if (response.data.success) {
          setOrderLat(response.data.order.location.lat);
          setOrderLng(response.data.order.location.long);

          setStoreLat(response.data.location.lat);
            setStoreLng(response.data.location.long);
            const today = new Date();
            let mins = today.getMinutes();
            let hours = today.getHours();
            if (mins + Number(response.data.order.ETA) > 60) {
                hours = hours + 1;
                mins = (mins + Number(response.data.order.ETA)) - 60;
            } else if (mins + Number(response.data.order.ETA) == 60) {
                hours = hours + 1;
                mins = 0;
            } else {
                mins = (mins + Number(response.data.order.ETA));
            }
            const ctime = hours + ":" + mins;

          document.getElementById("eta").innerHTML =
                "ETA " + ctime;
            document.getElementById("time").innerHTML =
                "Time " + response.data.order.ETA;
          document.getElementById("dist").innerHTML =
            "Distance " + response.data.order.EDA + " km";
          /*setStoreLat(-37.84866);
                setStoreLng(145.11306);*/
        }
      })
      .catch((error) => {
        localStorage.setItem("err", error);
        if (error.response === 406) {
          //display "please refresh your session" here
          //return history.push("/refresh");
        }
        if (error.response === 403) {
          //display "please login" here
          //this.redirectToLogin();
        }
      });
  }

  useEffect(() => {
    GetData();
    setCount(0);
  }, []);

  useEffect(() => {});

  function Map() {
    //let count = 0;
    if (count < 1) {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(orderLat, orderLng),
          destination: new window.google.maps.LatLng(storeLat, storeLng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
      setCount(count + 1);
      //count++;
    }

    return (
      <div>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: -37.85013, lng: 145.11906 }}
          defaultOptions={{ styles: mapStyles }}
        >
          <Marker
            position={{
              lat: orderLat,
              lng: orderLng,
            }}
            icon= {{
              url: '/store.png',
              scaledSize: new window.google.maps.Size(25, 25)
          }}
          />
          <Marker
            position={{
              lat: storeLat,
              lng: storeLng,
            }}
            icon= {{
              url: '/warehouse.png',
              scaledSize: new window.google.maps.Size(25, 25)
          }}
            
          
          />
          <DirectionsRenderer directions={directions} />
        </GoogleMap>
      </div>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <br />
        <h1>In Transit</h1>
        <div style={{ width: "800px", height: "420px" }} className="Maps">
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
          <br/>
      
        </div>
        <div className="chart">
          <Chart />
          </div>
          <br/>
            <div className="Stats">
              <h2 id="eta"></h2>
              <h2 id="time"></h2>
              <h2 id="dist"></h2>
            </div>
      </div>
    </>
  );
};

export default TrackOrder;