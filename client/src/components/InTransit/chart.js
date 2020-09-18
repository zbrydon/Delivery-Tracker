import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "../DisplayWarehouses/maps.css"
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
            orderTempData: {
                labels: [1, 2, 3, 4, 5,6,7,8,9],
                datasets: [
                    {
                        label: 'Frozen Temprature',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                        ],
                    },
                    {
                        label: 'Dairy Temprature',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                        ],
                    },
                    {
                        label: 'Meat Temprature',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                        ],
                    },
                    {
                        label: 'Produce Temprature',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                            'rgba(225, 99, 132, 0.6)',
                        ],
                    },
                    {
                        label: 'Ambient Temprature',
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
        const params = { orderId: 1000 };
        let f = [];
        let d = [];
        let m = [];
        let p = [];
        let a = [];
        let count = [];
        let fc = [];
        let dc = [];
        let mc = [];
        let pc = [];
        let ac = [];
        axios.get(
            `${API_URL}/viewOrder`, { headers , params}
        ).then(response => {
            if (response.data.success) {
                for (let i = 0; i < response.data.order.temperature.length; i++) {
                    f.push(response.data.order.temperature[i].frozen);
                    d.push(response.data.order.temperature[i].dairy);
                    m.push(response.data.order.temperature[i].meat);
                    p.push(response.data.order.temperature[i].produce);
                    a.push(response.data.order.temperature[i].ambient);
                    count.push(i);
                    fc.push('rgba(100, 79, 150, 0.6)');
                    dc.push('rgba(325, 199, 152, 0.6)');
                    mc.push('rgba(275, 36, 32, 0.6)');
                    pc.push('rgba(80, 258, 225, 0.6)');
                    ac.push('rgba(225, 99, 132, 0.6)');
                }
                this.setState({
                    orderTempData: {
                        labels: count,
                        datasets: [
                            {
                                label: 'Frozen Temprature',
                                data: f,
                                fill: false,
                                backgroundColor: fc
                            },
                            {
                                label: 'Dairy Temprature',
                                data: d,
                                fill: false,
                                backgroundColor: dc
                            },
                            {
                                label: 'Meat Temprature',
                                data: m,
                                fill: false,
                                backgroundColor: mc
                            },
                            {
                                label: 'Produce Temprature',
                                data: p,
                                fill: false,
                                backgroundColor: pc
                            },
                            {
                                label: 'Ambient Temprature',
                                data: a,
                                fill: false,
                                backgroundColor: ac
                            }
                        ]
                        
                    },
                });
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


    }
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',


    }
    render() {
        return (
            <div>
                <div className="Temp">
                    <Line
                        data={this.state.orderTempData}
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



/*import React, { Component } from "react";
import {Line} from "react-chartjs-2";

class LineChart extends Component
{
    
    const state = 
    {
        labels: [1, 2, 3, 4, 5],
        datasets: [
            {
                data:[-2, 5, 10, 20, 33],
                label: 'Temperature',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
            }
        ]
        }
    render{
    return (
        <div>
            <Line
                data={state}
                options={{
                    title:
                    {
                        display: true,
                        text: 'Stock Temp',
                        fontSize: 20
                    },
                    legend:
                    {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    )
};
}

export default LineChart*/