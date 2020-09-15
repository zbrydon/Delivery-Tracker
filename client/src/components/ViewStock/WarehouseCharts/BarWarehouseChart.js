import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import "../styling.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Charts extends Component {
    redirectToLogin = () => {
        const { history } = this.props;
        if (history) history.push('/');
    }
    constructor(props) {
        super(props);
        this.state = {
            warehouseSOHData: {
                labels: ['Frozen', 'Meat', 'Dairy', 'Produce', 'Ambient'],
                datasets: [
                    {
                        label: 'Pallets',
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
            },
        }
    }
    componentDidMount() {

        const API_URL = process.env.REACT_APP_API_URL;
        const token = localStorage.getItem('auth-token');
        const headers = {
            'authorization': token
        };
        axios.get(
            `${API_URL}/viewWarehouseSOH`, { headers }
        ).then(response => {
            if (response.data.success) {
                this.setState({
                    warehouseSOHData: {
                        labels: ['Frozen', 'Meat', 'Dairy', 'Produce', 'Ambient'],
                        datasets: [
                            {
                                label: 'Pallets',
                                data: [response.data.SOH.frozen, response.data.SOH.dairy, response.data.SOH.meat, response.data.SOH.produce, response.data.SOH.ambient],
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
                    <Bar
                        data={this.state.warehouseSOHData}
                        options={{
                            maintainAspectRatio: true,
                            title: {
                                display: this.props.displayTitle,
                                text: "The Amount of Pallets per Food Group",
                                fontSize: 24
                            },
                            legend: {
                                display: this.props.displayLegend,
                                position: this.props.legendPosition
                            },
                            scales : {
                                yAxes:[{
                                    stacked: true
                                }]
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default withRouter(Charts);