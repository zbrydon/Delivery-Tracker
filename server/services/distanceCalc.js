const { Client, Status, defaultAxiosInstance } = require("@googlemaps/google-maps-services-js");


function distanceCalc(message, req,res) {
    const olat = Number(message.location.lat);
    const olng = Number(message.location.long);
    const dlat = Number(message.destination.lat);
    const dlng = Number(message.destination.long);
    //console.log(message);
    const client = new Client({});
    client.distancematrix({
        params: {
            origins: [{lat:olat,lng:olng}] ,
            destinations: [{lat:dlat,lng:dlng}] ,
            key: process.env.API_KEY
        },
        timeout: 1000
    }, defaultAxiosInstance)
        .then(r => {
            //seconds
            const durationValue = r.data.rows[0].elements[0].duration.value;
            const durationText = r.data.rows[0].elements[0].duration.text;
            //meters
            const distanceValue = r.data.rows[0].elements[0].distance.value;
            const distanceText = r.data.rows[0].elements[0].distance.text;
            //console.log(r.data.rows[0].elements[0].duration.text);
            return res.json({
                durationValue: durationValue,
                durationText: durationText,
                distanceValue: distanceValue,
                distanceText: distanceText
            });
        }).catch(e => {
        console.log(e);
    });


};
module.exports = distanceCalc;