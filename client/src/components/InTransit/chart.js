import React from "react";
import {Line} from "react-chartjs-2";

function LineChart()
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
    return(
        <div>
            <Line
            data={state}
            options={{
                title:
                {
                display:true,
                text:'Stock Temp',
                fontSize:20
                },
                legend:
                {
                display:true,
                position:'right'
                }
            }}
            />
        </div>
    )
}

export default LineChart