import React, { useState , useEffect} from "react";
import Navbar from "../Tools/StoreNavbar";
import "../CreateOrder/createOrder.css";
import DatePickers from "../CreateOrder/DatePicker";
import axios from "axios";
 
const CreateOrder = () => {
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

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const body = {
            warehouseId,
            frozenQuantity,
            dairyQuantity,
            meatQuantity,
            produceQuantity,
            ambientQuantity,
            deliveryDateTime
        };
        const updateRes = await axios.post(`${API_URL}/submitOrder`, body, { headers });
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
    localStorage.setItem('thiss', warehouses[0]);
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <br></br>
                <form className="main-block">
                    <h1>Create Order</h1>
                    <label className="ChooseWarehouse">
                        Choose a Warehouse:
            </label>
                    <br></br>
                    <select
                        className="Choices"
                        name="warehouseID"
                    >
                        <option value={useEffect}>Warehouse 1</option>
                        <option value="warehouseID">Warehouse 2</option>
                        <option value="warehouseID">Warehouse 3</option>
                    </select>
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
                        <DatePickers />
                        <input className="time" type="time" id="appt" name="appt" onChange={(e) => setDeliveryDateTime(e.target.value)}/>
                    </div>
                    <div className="btn-block">
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






/*class createOrder extends React.Component {
  state = {
    warehouseID: "",
    frozen: "",
    dairy: "",
    meat: "",
    produce: "",
    ambient: "",
    palletType: "",
    palletQuantity: "",
  };
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <br></br>
          <form className="main-block">
            <h1>Create Order</h1>
            <label className="ChooseWarehouse" for="warehouseID">
              Choose a Warehouse:
            </label>
            <br></br>
            <select
              className="Choices"
              id={this.state.warehouseID}
              name="warehouseID"
            >
              <option value="warehouseID">Warehouse 1</option>
              <option value="warehouseID">Warehouse 2</option>
              <option value="warehouseID">Warehouse 3</option>
            </select>
            <br></br>
            <label className="ChooseWarehouse" for="warehouseID">
              Choose Pallets:{" "}
            </label>
            <div class="multiselect">
              <label className="Quant" for="quantity">
                Choose amount 1-5
              </label>
              <div class="selectBox"></div>
              <div className="pallets" id={this.state.palletType}>
                <label for="one">
                  <label id="one" />
                  Frozen
                </label>
                <input
                  className="input-number"
                  type="number"
                  id={this.state.frozen}
                  name="quantity"
                  min="1"
                  max="8"
                ></input>
                <br />
                <label for="two">
                  <label id="two" />
                  Dairy
                </label>
                <input
                  className="input-number"
                  type="number"
                  id={this.state.dairy}
                  name="quantity"
                  min="1"
                  max="8"
                ></input>
                <br />
                <label for="three">
                  <label id="three" />
                  Meat
                </label>
                <input
                  className="input-number"
                  type="number"
                  id={this.state.meat}
                  name="quantity"
                  min="1"
                  max="8"
                ></input>
                <br />
                <label for="four">
                  <label id="four" />
                  Produce
                </label>
                <input
                  className="input-number"
                  type="number"
                  id={this.state.produce}
                  name="quantity"
                  min="1"
                  max="8"
                ></input>
                <br />
                <label for="five">
                  <label id="five" />
                  Ambient
                </label>
                <input
                  className="input-number"
                  type="number"
                  id={this.state.ambient}
                  name="quantity"
                  min="1"
                  max="8"
                ></input>
                <br />
              </div>
            </div>
            <br />
            <label className="ChooseWarehouse">Choose Date:</label>
            <div>
              <DatePickers />
              <input className="time" type="time" id="appt" name="appt"></input>
            </div>
            <div class="btn-block">
              <button type="submit" href="/" className="createOrder-submitBtn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}*/
export default CreateOrder;
