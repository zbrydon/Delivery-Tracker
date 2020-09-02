import React, {Component} from "react";
import {Bar, Line, Pie} from "react-chartjs-2";
import "./styling.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const StockStore = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('auth-token');
    const history = useHistory();
    const headers = {
        'Authorization': token
    };
    axios.get(
        `${API_URL}/viewStoreSOH`, { headers }
    ).then(response => {
        
        if (response.data.success) {
            const frozen = response.data.SOH.frozen
            const dairy = response.data.SOH.dairy
            const meat = response.data.SOH.meat
            const produce = response.data.SOH.produce
            const ambient = response.data.SOH.ambient
        }
    }).catch(error => {
        if (error.response.status === 406) {
            //Display "Please refresh your session" here
            //return history.push("/refresh");
        } if (error.response.status === 403) {
            //Display "Please login" here
            history.push("/");
        }
    });

class StockStore extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            chartData: {
                labels: ['Frozen', 'Meat', 'Dairy', 'Produce', 'Ambient'],
                datasets:[
                    {
                        label: 'Pallets',
                        data: [12, 19, 5, 3, 8, 5],
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

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render()
    {
        return(
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        title:{
                            display: this.props.displayTitle,
                            text: "The Amount of Pallots per Food Group",
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
}
export default StockStore
