// import React from 'react'
// import Navbar from '../Tools/StoreNavbar'
// import  {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps"
// import "../DisplayWarehouses/maps.css"
// import mapStyles from '../DisplayWarehouses/mapStyles'
// import Chart from "../InTransit/chart"

// function Map()
// {
//     return(
//         <div>
//             <GoogleMap
//                 defaultZoom={14}
//                 defaultCenter={{lat: -37.850130, lng: 145.119060}}
//                 defaultOptions={{styles: mapStyles}}
//             />
//         </div>
//     );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map))

// export default function displayWarehouses()
// {
//     return(
//         <div>
//             <div>
//                 <Navbar />
//             </div>
//             <br/>
//             <h1>In Transit</h1>
//             <div style={{width: '800px', height: '420px'}} className="Maps">
//                 <WrappedMap
//                     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
//                     loadingElement={<div style={{height: "100%"}}  />}
//                     containerElement={<div style={{height: "100%"}}  />}
//                     mapElement={<div style={{height: "100%"}}  />}                 
//                  />
//                 <Chart />
//             </div>
//         </div>
//     )
// }