import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Tools/WarehouseNavbar"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Moment from "react-moment";


const FulfillOrder = () => {
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState();
    const [orderIds, setOrderIds] = useState();

    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = { authorization: token };

    useEffect(() => {
        
        let arr = [];
        let ids = [];
        axios.get(
            `${API_URL}/viewWarehouseOrders2`, { headers })
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

    const handleSubmitClickFulfil = async (e) => {
        e.preventDefault();
        if (!orderId)
            return;
        const body = {
            orderId: orderId.orderId,
            orderStatus: "Fulfilled"
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

/*class fulfillOrder extends React.Component {
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
      rowData: null*//*[
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
      ]*//*
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
                                deliveryDate: response.data.orders[i].deliveryDateTime.toISOString().substring(0, 10),
                                orderDate: response.data.orders[i].orderDateTime.toISOString().substring(0, 10),
                                orderStatus: response.data.orders[i].orderStatus
                            }
                        )
                    }
                    localStorage.setItem('a', JSON.stringify(arr[0]));
                    this.setState.rowData = arr;
                }
            }).catch(error => {
                localStorage.setItem('err', error);
                if (error.response === 406) {
                    //display "please refresh your session" here
                    //return history.push("/refresh");
                } if (error.response  === 403) {
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
          
                  <div className="table-pieChart">
                  <table className="deliver-table">
                      <thead>
                          <tr>
                              <th>Order ID</th>
                              <th>Store ID</th>
                              <th>Warehouse ID</th>
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
                                      <td>{arr.orderID}</td>
                                      <td>{arr.storeID}</td>
                                      <td>{arr.warehouseID}</td>
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
            <br/>
            <button className="button" onClick={this.onButtonClick}><span>Fulfill</span></button>
            <button className="button">In Transit</button>
            <button className="button">Complete</button>
          
        </>
    )
  }
}

export default fulfillOrder;*/

/*
 * 
 * <div
 * className="ag-theme-balham"
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
 *
 *</div>
 * 
 * 
 * 
 */