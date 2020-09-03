import React, {Component} from "react";
import {Line} from "react-chartjs-2";
import "../styling.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

class LineChart extends Component
{
    redirectToLogin = () => {
        const { history } = this.props;
        if (history) history.push('/');
    }
    constructor(props)
    {
        super(props);
        this.state = {
            chartData: {
                labels: ['Frozen', 'Meat', 'Dairy', 'Produce', 'Ambient'],
                datasets:[
                    {
                        label: 'Temprature',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor:[
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
            `${API_URL}/viewWarehouseSOH`, { headers }
        ).then(response => {            
            if (response.data.success) {
                this.setState({
                    chartData: {
                        labels: ['Frozen', 'Meat', 'Dairy', 'Produce', 'Ambient'],
                        datasets: [
                            {
                                label: 'Temprature',
                                data: [response.data.SOH.frozen, response.data.SOH.dairy, response.data.SOH.meat, response.data.SOH.produce, response.data.SOH.ambient],
                                backgroundColor: [
                                    'rgba(145, 99, 12, 0.6)',
                                    'rgba(309, 105, 152, 0.6)',
                                    'rgba(25, 74, 172, 0.6)',
                                    'rgba(123, 210, 192, 0.6)',
                                    'rgba(231, 118, 90, 0.6)',
                                ],
                            }
                        ]
                    }
                    
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
    render()
    {
        return(
            <div className="chart">
                <Line
                    
                    data={this.state.chartData}
                    options={{ maintainAspectRatio: true,
                        title:{
                            display: this.props.displayTitle,
                            text: "Temprature of food groups",
                            fontSize: 24
                        },
                        legend:{
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                        
                    }}
                />  
            </div>
        )
    }
}
export default withRouter(LineChart);