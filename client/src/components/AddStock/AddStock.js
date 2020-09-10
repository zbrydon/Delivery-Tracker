import React from 'react';
import Navbar from "../Tools/WarehouseNavbar";
import "../AddStock/AddStock.css";

// the add stock for the warehouse page
class AddStock extends React.Component
{   
    state = {
        frozen: '',
        dairy: '',
        meat: '',
        produce: '',
        ambient: '',
        palletType: '',
        palletQuantity: '',
    }
    //api will go here
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
                        <label className="Quant" for="quantity">Choose amount 1-5</label>
                            <br/>
                            <div class="selectBox">
                            </div>
                            <div className="pallets" id={this.state.palletType}>
                                <label for="one">
                                    <label id={this.state.frozen} />Frozen</label>
                                    <input className="input-number"type="number" id={this.state.palletQuantity} name="quantity" min="1" max="5"></input>
                                    <br/>
                                <label for="two">
                                    <label id={this.state.dairy} />Dairy</label>
                                    <input className="input-number"type="number" id={this.state.palletQuantity} name="quantity" min="1" max="5"></input>
                                    <br/>
                                <label for="three">
                                    <label id={this.state.meat} />Meat</label>
                                    <input className="input-number"type="number" id={this.state.palletQuantity} name="quantity" min="1" max="5"></input>
                                    <br/>
                                <label for="four">
                                    <label id={this.state.produce} />Produce</label>
                                    <input className="input-number"type="number" id={this.state.palletQuantity} name="quantity" min="1" max="5"></input>
                                    <br/>
                                <label for="five">
                                    <label id={this.state.ambient} />Ambient</label>
                                    <input className="input-number"type="number" id={this.state.palletQuantity} name="quantity" min="1" max="5"></input>
                                    <br/>
                            </div>
                        </div>
                        <br></br>
                        {/* <label className="ChooseWarehouse" for="warehouseID">Choose a Quantity:</label> */}
                        <div class="btn-block">
                            <button type="submit" href="/" onClick="Ordered">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddStock