import React from "react";

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
        {headerName: 'Store ID', field: 'storeID', width: 120},
        {headerName: 'Warheouse ID', field: 'warehouseID', width: 120},
        {headerName: 'Product Type', field: 'productType', width: 120},
        {headerName: 'Quantity', field: 'quantity', width: 90},
        {headerName: 'Delivery Date', field: 'deliveryDate', width: 115},
        {headerName: 'Order Date', field: 'orderDate', width: 100},
        {headerName: 'Temperature', field: 'temperature', width: 115},
        {headerName: 'Order Status', field: 'orderStatus', width: 115},
      ],
      rowData: [
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
      ]
    };
  }
// API GET REQUEST WILL BE HERE

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