import React, {Component} from "react";
import {Bar, Line, Pie} from "react-chartjs-2";
import "./styling.css";

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
export default StockStore
