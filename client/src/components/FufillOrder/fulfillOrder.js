import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Tools/WarehouseNavbar"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Moment from "react-moment";


const FulfillOrder = () => {
    //Setting the orders and set order variables
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState();
    const [orderIds, setOrderIds] = useState();

    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = { authorization: token };

    useEffect(() => {
        
        let arr = [];
        let ids = [];
        axios.get( //this function will get the orders that need to be processed
            `${API_URL}/viewWarehouseOrdersToFulfill`, { headers })
            .then(response => {
                if (response.data.success) {
                    for (let i = 0; i < response.data.count; i++) {
                        arr.push(
                            {
                                orderId: response.data.orders[i].orderId,
                                storeId: response.data.orders[i].storeId,
                                warehouseID: response.data.orders[i].warehouseId,
                                frozenQuantity: response.data.orders[i].frozenQuantity,
                                dairyQuantity: response.data.orders[i].dairyQuantity,
                                meatQuantity: response.data.orders[i].meatQuantity,
                                produceQuantity: response.data.orders[i].produceQuantity,
                                ambientQuantity: response.data.orders[i].ambientQuantity,
                                deliveryDate: response.data.orders[i].deliveryDateTime,
                                orderDate: response.data.orders[i].orderDateTime,
                                orderStatus: response.data.orders[i].orderStatus
                            }
                        )
                        ids.push({ orderId: response.data.orders[i].orderId})
                        setOrders(response.data.orders);
                        
                    }
                    //localStorage.setItem('a', JSON.stringify(arr[0]));
                    //this.setState.rowData = arr;
                    setOrderIds(ids);
                    localStorage.setItem('id', arr[0].storeID)

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
    }, []);

    function selecteRow(index) {
        let orderId = orderIds[index];
        setOrderId(orderId);
    }
    // this function will submit the order as fulfilled when the button is clicked
    const handleSubmitClickFulfil = async (e) => {
        e.preventDefault();
        if (!orderId)
            return;
        const body = {
            orderId: orderId.orderId,
            orderStatus: "Fulfilled"
        };

        axios.post( // from the response of the click handler a post will be made to change the order to fulfilled
            `${API_URL}/fulfillOrder`, body, { headers }
        ).then(response => {
            if (response.data.success) {

            }
        }).catch(error => {
            localStorage.setItem('err', error);
            if (error.response.status === 406) {
                //display "please refresh your session" here
                //return history.push("/refresh");
            } if (error.response.status === 403) {

                //display "please login" here
                //this.redirectToLogin();
            }
        });
        alert("Order has been fulfilled");
    };
    
    const handleSubmitClickInTrans = async (e) => {
        e.preventDefault();
        if (!orderId)
            return;
        const body = {
            orderId: orderId.orderId,
            orderStatus: "In Transit"
        };

        axios.post(
            `${API_URL}/fulfillOrder`, body, { headers }
        ).then(response => {
            if (response.data.success) {

            }
        }).catch(error => {
            localStorage.setItem('err', error);
            if (error.response.status === 406) {
                //display "please refresh your session" here
                //return history.push("/refresh");
            } if (error.response.status === 403) {

                //display "please login" here
                //this.redirectToLogin();
            }
        });
    };

    return (
        <>
            <Navbar />
            <br />
            <div style={{ position: 'relative', left: '80px', top: '2px' }} className="table-pieChart">
                <table className="deliver-table">
                    <thead>
                        <tr>
                            {/* the different heading types and quantities of each pallet */}
                            <th>Order ID</th>
                            <th>Store ID</th>
                            <th>Frozen Quantity</th>
                            <th>Dairy Quantity</th>
                            <th>Meat Quantity</th>
                            <th>Produce Quantity</th>
                            <th>Ambeint Quantity</th>
                            <th>Delivery Date</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((arr, i) => {
                            // Return the element. Also pass key
                            return (
                                <tr key={i} onClick={selecteRow.bind(this, i)}>
                                    <td>{arr.orderId}</td>
                                    <td>{arr.storeId}</td>
                                    <td>{arr.frozenQuantity}</td>
                                    <td>{arr.dairyQuantity}</td>
                                    <td>{arr.meatQuantity}</td>
                                    <td>{arr.produceQuantity}</td>
                                    <td>{arr.ambientQuantity}</td>
                                    <td>
                                        <Moment format="DD/MM/YYYY">
                                            {arr.deliveryDate}
                                        </Moment>
                                    </td>
                                    <td>
                                        <Moment format="DD/MM/YYYY">
                                            {arr.orderDate}
                                        </Moment>
                                    </td>
                                    <td>{arr.orderStatus}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <br />
            <button className="button" style={{ position: 'relative', left: '80px', top: '2px' }} onClick={handleSubmitClickFulfil}>Fulfill</button>
            <button className="button" style={{ position: 'relative', left: '80px', top: '2px' }} onClick={handleSubmitClickInTrans} >In Transit</button>
            

        </>
    );
};
export default FulfillOrder;