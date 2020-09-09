import React from 'react';
import Navbar from "../Tools/WarehouseNavbar";
import "../AddStock/AddStock.css";

class AddStock extends React.Component
{   
    state = {
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
                        <h1>Add Stock</h1>
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
                        <input className="input-number"type="number" id={this.state.palletQuantity} name="quantity" min="1" max="8"></input>
                        <div class="btn-block">
                            <button type="submit" href="/">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddStock
