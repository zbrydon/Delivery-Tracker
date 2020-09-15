import React from "react";
import axios from "axios";
import Navbar from "../Tools/WarehouseNavbar"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


class fulfillOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coloumnDefs: [
        {headerName: 'Order ID', field: 'orderID', checkboxSelection: true, width: 100},
        {headerName: 'Store ID', field: 'storeID', width: 90},
        {headerName: 'Warheouse ID', field: 'warehouseID', width: 120},
        { headerName: 'Frozen Quantity', field: 'frozenQuantity', width: 140 },
        { headerName: 'Dairy Quantity', field: 'dairyQuantity', width: 120 },
        { headerName: 'Meat Quantity', field: 'meatQuantity', width: 120 },
        { headerName: 'Produce Quantity', field: 'produceQuantity', width: 140 },
        {headerName: 'Ambient Quantity', field: 'ambientQuantity', width: 140},
        {headerName: 'Delivery Date', field: 'deliveryDate', width: 115},
        {headerName: 'Order Date', field: 'orderDate', width: 100},
        {headerName: 'Temperature', field: 'temperature', width: 115},
        {headerName: 'Order Status', field: 'orderStatus', width: 115},
      ],
      rowData: null/*[
        {
          orderID: '101', 
          storeID: '1111', 
          warehouseID: '100',
          productType: 'Frozen',
          quantity: 12,
          deliveryDate: '08/09/2020',
          orderDate: '08/09/2020',
          temperature: 17,
          orderStatus: 'fulfilled'
        },
        {
          orderID: '101', 
          storeID: '1111', 
          warehouseID: '100',
          productType: 'Frozen',
          quantity: 12,
          deliveryDate: '08/09/2020',
          orderDate: '08/09/2020',
          temperature: 17,
          orderStatus: 'fulfilled'
        },
        {
          orderID: '101', 
          storeID: '1111', 
          warehouseID: '100',
          productType: 'Frozen',
          quantity: 12,
          deliveryDate: '08/09/2020',
          orderDate: '08/09/2020',
          temperature: 17,
          orderStatus: 'fulfilled'
        },
        {
          orderID: '101', 
          storeID: '1111', 
          warehouseID: '100',
          productType: 'Frozen',
          quantity: 12,
          deliveryDate: '08/09/2020',
          orderDate: '08/09/2020',
          temperature: 17,
          orderStatus: 'fulfilled'
        },
        {
          orderID: '101', 
          storeID: '1111', 
          warehouseID: '100',
          productType: 'Frozen',
          quantity: 12,
          deliveryDate: '08/09/2020',
          orderDate: '08/09/2020',
          temperature: 17,
          orderStatus: 'fulfilled'
        },
      ]*/
    };
  }
// API GET REQUEST WILL BE HERE

    componentDidMount() {
        const API_URL = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('auth-token');
        const headers = {
            'authorization': token
        };
        let arr = [];
        axios.get(
            `${API_URL}/viewWarehouseOrders`, { headers })
            .then(response => {
                if (response.data.success) {
                    for (let i = 0; i < response.data.count - 2; i++) {
                        arr.push(
                            {
                                orderID: response.data.orders[i].orderId,
                                storeID: response.data.orders[i].storeId,
                                warehouseID: response.data.orders[i].warehouseId,
                                frozenQuantity: response.data.orders[i].frozenQuantity,
                                dairyQuantity: response.data.orders[i].dairyQuantity,
                                meatQuantity: response.data.orders[i].meatQuantity,
                                produceQuantity: response.data.orders[i].produceQuantity,
                                ambientQuantity: response.data.orders[i].ambientQuantity,
                                deliveryDate: response.data.orders[i].deliveryDateTime,
                                orderDate: response.data.orders[i].orderDateTime,
                                temperature: 17,
                                orderStatus: response.data.orders[i].orderStatus
                            }
                        )
                    }
                    localStorage.setItem('a', JSON.stringify(arr[0]));
                    this.setState.rowData = arr;
                }
            }).catch(error => {
                localStorage.setItem('err', error);
                if (error.response.status === 406) {
                    //display "please refresh your session" here
                    //return history.push("/refresh");
                } if (error.response.status === 403) {
                    //display "please login" here
                    this.redirectToLogin();
                }
            });
        //localStorage.setItem('c', this.state.rowData[0]);
    }
    

  onButtonClick = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected Nodes: ${selectedDataStringPresentation}`);
  }
    render(){
      return (
        <>
        <Navbar />
        <br/>
          <div
            className="ag-theme-balham"
            style={{
              width: 1300, 
              height: 400,
              paddingLeft: 300,
              paddingTop: 20
            }}
            >
            <h1>Fulfill Store Order</h1>
            <br/>
            <AgGridReact 
              columnDefs={this.state.coloumnDefs}
              rowData={this.state.rowData}
              rowSelection="multiple"
              onGridReady={params => this.gridApi = params.api}
            />
            <br/>
            <button className="button" onClick={this.onButtonClick}>Fulfill</button>
            <button className="button">In Transit</button>
          </div>
        </>
    )
  }
}

export default fulfillOrder;