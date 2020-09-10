import React from 'react';
import Navbar from "../Tools/StoreNavbar";
import "../CreateOrder/createOrder.css";
import DatePickers from "../CreateOrder/DatePicker"

class createOrder extends React.Component
{   
    state = {
        warehouseID: '',
        frozen: '',
        dairy: '',
        meat: '',
        produce: '',
        ambient: '',
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
                        <label className="Quant" for="quantity">Choose amount 1-5</label>
                            <div class="selectBox">
                            </div>
                            <div className="pallets" id={this.state.palletType}>
                                <label for="one">
                                    <label id="one" />Frozen</label>
                                    <input className="input-number"type="number" id={this.state.frozen} name="quantity" min="1" max="8"></input>
                                    <br/>
                                <label for="two">
                                    <label id="two" />Dairy</label>
                                    <input className="input-number"type="number" id={this.state.dairy} name="quantity" min="1" max="8"></input>
                                    <br/>
                                <label for="three">
                                    <label id="three" />Meat</label>
                                    <input className="input-number"type="number" id={this.state.meat} name="quantity" min="1" max="8"></input>
                                    <br/>
                                <label for="four">
                                    <label id="four" />Produce</label>
                                    <input className="input-number"type="number" id={this.state.produce} name="quantity" min="1" max="8"></input>
                                    <br/>
                                <label for="five">
                                    <label id="five" />Ambient</label>
                                    <input className="input-number"type="number" id={this.state.ambient} name="quantity" min="1" max="8"></input>
                                    <br/>
                            </div>
                        </div>
                        <br/>
                        <label className="ChooseWarehouse">Choose Date:</label>
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