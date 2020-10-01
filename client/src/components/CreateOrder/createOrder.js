import React, { useState , useEffect} from "react";
import Navbar from "../Tools/StoreNavbar";
import "../CreateOrder/createOrder.css";
import DatePickers from "../CreateOrder/DatePicker";
import axios from "axios";
import { useHistory } from "react-router-dom";
 
const CreateOrder = () => {
    // seting the constant values for HTTP requests
    const API_URL = process.env.REACT_APP_API_URL;
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseId, setWarehouseId] = useState();
    const [frozenQuantity, setFrozenQuantity] = useState();
    const [dairyQuantity, setDairyQuantity] = useState();
    const [meatQuantity, setMeatQuantity] = useState();
    const [produceQuantity, setProduceQuantity] = useState();
    const [ambientQuantity, setAmbientQuantity] = useState();
    const [deliveryDateTime, setDeliveryDateTime] = useState();

    const token = localStorage.getItem("auth-token");
    const headers = {
        authorization: token,
    };
    // handle submit order quantity on post request
    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const body = {
            warehouseId: 1111,
            frozenQuantity: frozenQuantity,
            dairyQuantity: dairyQuantity,
            meatQuantity: meatQuantity,
            produceQuantity: produceQuantity,
            ambientQuantity: ambientQuantity,
            deliveryDateTime: deliveryDateTime
        };
        //post the order quantity
        axios.post(
            `${API_URL}/submitOrder`, body, { headers }
        ).then(response => {
            if (response.data.success) {
                
            }
        }).catch(error => {
            if (error.response.status === 406) {
                //display "please refresh your session" here
                //return history.push("/refresh");
            } if (error.response.status === 403) {

                //display "please login" here
                //this.redirectToLogin();
            }
        });
        alert("Order has been Sumbitted")
        window.location.reload()
        
    };
    useEffect(() => {
        const data = async () => {
            const result = await axios.get(`${API_URL}/viewWarehouses`, { headers: headers });
            for (let i = 0; i < result.data.count; i++) {
                setWarehouses(result.data.warehouses[i]);
            }
            
            localStorage.setItem('warehouser', result.data.warehouses[0].id);
            localStorage.setItem('this', warehouses[0]);
        };
        data();
    }, []);
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <br />
            <div>
                <form className="main-block">
                    <h1>Create Order</h1>
                    <br></br>
                    <label className="ChooseWarehouse">
                        Choose Pallets:{" "}
                    </label>
                    <div className="multiselect">
                        <label className="Quant">
                            Choose amount 1-5
              </label>
                        <div className="selectBox"></div>
                        <div className="pallets">
                          {/* All the pallet types as aa input quantity */}
                            <label>Frozen</label>
                            <input
                                className="input-number"
                                type="number"
                                id="frozen"
                                name="quantity"
                                min="1"
                                max="5"
                                onChange={(e) => setFrozenQuantity(e.target.value)}
                            />
                            <br />
                            <label>Dairy</label>
                            <input
                                className="input-number"
                                type="number"
                                id="dairy"
                                name="quantity"
                                min="1"
                                max="5"
                                onChange={(e) => setDairyQuantity(e.target.value)}
                            />
                            <br />
                            <label>Meat</label>
                            <input
                                className="input-number"
                                type="number"
                                id="meat"
                                name="quantity"
                                min="1"
                                max="5"
                                onChange={(e) => setMeatQuantity(e.target.value)}
                            />
                            <br />
                            <label>Produce</label>
                            <input
                                className="input-number"
                                type="number"
                                id="produce"
                                name="quantity"
                                min="1"
                                max="5"
                                onChange={(e) => setProduceQuantity(e.target.value)}
                            />
                            <br />
                            <label>Ambient</label>
                            <input
                                className="input-number"
                                type="number"
                                id="ambient"
                                name="quantity"
                                min="1"
                                max="5"
                                onChange={(e) => setAmbientQuantity(e.target.value)}
                            />
                            <br />
                        </div>
                    </div>
                    <br />
                    <label className="ChooseWarehouse">Choose Date:</label>
                    <div>
                        
                    </div>
                    <div className="btn-block">
                      {/* the create order button that is handled by the onClick submit handler */}
                        <input className="time" type="datetime-local" id="dateTime" name="dateTime" onChange={(e) => setDeliveryDateTime(e.target.value)}/>
                        <button type="submit" href="/" className="createOrder-submitBtn"
                            onClick={handleSubmitClick}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default CreateOrder;