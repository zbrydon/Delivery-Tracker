import React from 'react';
import Navbar from "../Tools/StoreNavbar";
import "../CreateOrder/createOrder.css";
import DatePickers from "../CreateOrder/DatePicker"

class createOrder extends React.Component
{   
    state = {
        warehouseID: '',
        palletType: '',
        palletQuantity: '',
    }
    render()
{
        return(
            <div>
                <div>
                    <Navbar />  
                </div>
                <div>
                    <br></br>
                    <form className='main-block'>
                        <h1>Create Order</h1>
                        <label className="ChooseWarehouse" for="warehouseID">Choose a Warehouse:</label>
                        <br></br>
                        <select className="Choices" id={this.state.warehouseID} name="warehouseID">
                            <option value="warehouseID">Warehouse 1</option>
                            <option value="warehouseID">Warehouse 2</option>
                            <option value="warehouseID">Warehouse 3</option>
                        </select>
                        <br></br>
                        <label className="ChooseWarehouse" for="warehouseID">Choose Pallets: </label>
                        <div class="multiselect">
                            <div class="selectBox">
                            </div>
                            <div className="pallets" id={this.state.palletType}>
                                <label for="one">
                                    <input type="checkbox" id="one" />Frozen</label>
                                    <br></br>
                                <label for="two">
                                    <input type="checkbox" id="two" />Dairy</label>
                                    <br></br>
                                <label for="three">
                                    <input type="checkbox" id="three" />Meat</label>
                                    <br></br>
                                <label for="four">
                                    <input type="checkbox" id="four" />Produce</label>
                                    <br></br>
                                <label for="five">
                                    <input type="checkbox" id="five" />Ambient</label>
                            </div>
                        </div>
                        <br></br>
                        <label className="ChooseWarehouse" for="warehouseID">Choose a Quantity:</label>
                        <label className="Quant" for="quantity">Choose amount 1-8</label>
                        <br></br>
                        <input className="input-number"type="number" id="quantity" name="quantity" min="1" max="8"></input>
                        <br></br>
                        <label className="ChooseWarehouse">Choose Date:</label>
                        <br></br>
                        <div>
                           <DatePickers /> 
                        </div>
                        <div class="btn-block">
                            <button type="submit" href="/">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default createOrder