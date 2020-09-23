const { Client, Status, defaultAxiosInstance } = require("@googlemaps/google-maps-services-js");
const Order = require('../models/Order');
const Store = require('../models/Store');

function distanceCalc(message, req,res) {
    const olat = Number(message.location.lat);
    const olng = Number(message.location.long);
    const orderId = Number(message.orderId);

    const frozenTemp = Number(message.frozenTemp);
    const dairyTemp = Number(message.dairyTemp);
    const meatTemp = Number(message.meatTemp);
    const produceTemp = Number(message.produceTemp);
    const ambientTemp = Number(message.ambientTemp);
    const newTEMP = {
        frozen: frozenTemp,
        dairy: dairyTemp,
        meat: meatTemp,
        produce: produceTemp,
        ambient: ambientTemp
    }

    Order.findOne({ orderId: orderId }, (err, order) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } else {
            Store.findOne({ id: order.storeId }, (err, store) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err
                    });
                } else {
                    const dlat = Number(store.location.lat);
                    const dlng = Number(store.location.long);
                    //console.log(message);
                    if (olat == dlat && olng == dlng) {
                        Order.findOneAndUpdate(
                            { orderId: message.orderId },
                            {
                                $set: {
                                    orderStatus: "Delivered",
                                    location: store.location,
                                    ETA: 0,
                                    EDA:0
                                },
                                $push: { temperature: newTEMP }
                            },
                            {
                                returnOriginal: false
                                ,
                                useFindAndModify: false
                            },
                            (err) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return;
                                }
                            });
                        let newSOH = {
                            frozen: 0,
                            dairy: 0,
                            meat: 0,
                            produce: 0,
                            ambient: 0
                        }

                        newSOH = {
                            frozen: store.SOH.frozen + frozenQuantity,
                            dairy: store.SOH.dairy + dairyQuantity,
                            meat: store.SOH.meat + meatQuantity,
                            produce: store.SOH.produce + produceQuantity,
                            ambient: store.SOH.ambient + ambientQuantity
                        }

                        Store.findOneAndUpdate(
                            { id: order.storeId },
                            {
                                $set: {
                                    SOH: newSOH
                                }
                            },
                            {
                                returnOriginal: false
                                ,
                                useFindAndModify: false
                            },
                            (err) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return;
                                }
                            });
                    }
                    const client = new Client({});
                    client.distancematrix({
                        params: {
                            origins: [{ lat: olat, lng: olng }],
                            destinations: [{ lat: dlat, lng: dlng }],
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

                            const orderLocation = {
                                lat: olat,
                                long: olng
                            };
                            const ETA = secondsToHoursMinutes(durationValue);
                            const EDA = distanceValue / 1000;

                            Order.findOneAndUpdate(
                                { orderId: message.orderId },
                                {
                                    $set: {
                                        location: orderLocation,
                                        ETA: ETA,
                                        EDA: EDA
                                    },
                                    $push: { temperature: newTEMP }
                                },
                                {
                                    returnOriginal: false
                                    ,
                                    useFindAndModify: false
                                },
                                (err) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(400).send({
                                            success: false,
                                            message: err
                                        });
                                    } else {
                                        return;
                                    }
                                });

                            
                        }).catch(e => {
                            console.log(e);
                        });
                }
            })
            
        }
    })
    


};
function secondsToHoursMinutes(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay;
}

module.exports = distanceCalc;