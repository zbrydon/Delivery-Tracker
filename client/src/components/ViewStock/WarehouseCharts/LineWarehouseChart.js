import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "../styling.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

class LineChart extends Component {
    redirectToLogin = () => {
        const { history } = this.props;
        if (history) history.push('/');
    }
    constructor(props) {
        super(props);
        this.state = {
            warehouseTempData: {
                labels: ['Frozen', 'Meat', 'Dairy', 'Produce', 'Ambient'],
                datasets: [
                    {
                        label: 'Temprature',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                        ],
                    }
                ]
            }

        }
    }
    componentDidMount() {

        const API_URL = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('auth-token');
        const headers = {
            'authorization': token
        };
         axios.get(
             `${API_URL}/viewWarehouseTEMP`, { headers }
         ).then(response => {            
             if (response.data.success) {
                 this.setState({
                     warehouseTempData: {
                         labels: ['Frozen', 'Meat', 'Dairy', 'Produce', 'Ambient'],
                         datasets: [
                             {
                                 label: 'Temperature',
                                 data: [response.data.TEMP.frozen, response.data.TEMP.dairy, response.data.TEMP.meat, response.data.TEMP.produce, response.data.TEMP.ambient],
                                 backgroundColor: [
                                     'rgba(100, 79, 150, 0.6)',
                                     'rgba(325, 199, 152, 0.6)',
                                     'rgba(275, 36, 32, 0.6)',
                                     'rgba(80, 258, 225, 0.6)',
                                     'rgba(225, 99, 132, 0.6)',
                                 ],
                             }
                         ]
                     },
                });
             }
         }).catch(error => {
             if (error.response.status === 406) {
                 //display "please refresh your session" here
                 //return history.push("/refresh");
             } if (error.response.status === 403) {
                 //display "please login" here
                 this.redirectToLogin();
             }
         });


    }
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'

    }
    render() {
        return (
            <div>
                <div className="chart">
                    <Line
                        data={this.state.warehouseTempData}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: this.props.displayTitle,
                                text: "Temperature",
                                fontSize: 24
                            },
                            legend: {
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            },
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default withRouter(LineChart);