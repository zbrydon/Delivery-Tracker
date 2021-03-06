import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./maps.css"

class LineChart extends Component {
  redirectToLogin = () => {
    const { history } = this.props;
    if (history) history.push("/");
  };
  constructor(props) {
    super(props);
    this.state = {
      orderTempData: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "Frozen Temprature",
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
            ],
          },
          {
            label: "Dairy Temprature",
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
            ],
          },
          {
            label: "Meat Temprature",
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
            ],
          },
          {
            label: "Produce Temprature",
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
            ],
          },
          {
            label: "Ambient Temprature",
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
              "rgba(225, 99, 132, 0.6)",
            ],
          },
        ],
      },
    };
  }
  componentDidMount() {
    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = {
      authorization: token,
    };
    const params = { orderId: 1000 };
    //variables for the pallet type and theri corresponding background colour
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
    axios
      .get(`${API_URL}/viewOrder`, { headers, params }) //get request for the temperature for each pallet type
      .then((response) => {
        if (response.data.success) {
          for (let i = 0; i < response.data.order.temperature.length; i++) {
            f.push(response.data.order.temperature[i].frozen);
            d.push(response.data.order.temperature[i].dairy);
            m.push(response.data.order.temperature[i].meat);
            p.push(response.data.order.temperature[i].produce);
            a.push(response.data.order.temperature[i].ambient);
            count.push(i);
            fc.push("rgba(100, 79, 150, 0.6)");
            dc.push("rgba(325, 199, 152, 0.6)");
            mc.push("rgba(275, 36, 32, 0.6)");
            pc.push("rgba(80, 258, 225, 0.6)");
            ac.push("rgba(225, 99, 132, 0.6)");
          }
          this.setState({
            //setting the state of the graph to the variables
            orderTempData: {
              labels: count,
              datasets: [
                {
                  label: "Frozen Temprature",
                  data: f,
                  fill: false,
                  backgroundColor: fc,
                },
                {
                  label: "Dairy Temprature",
                  data: d,
                  fill: false,
                  backgroundColor: dc,
                },
                {
                  label: "Meat Temprature",
                  data: m,
                  fill: false,
                  backgroundColor: mc,
                },
                {
                  label: "Produce Temprature",
                  data: p,
                  fill: false,
                  backgroundColor: pc,
                },
                {
                  label: "Ambient Temprature",
                  data: a,
                  fill: false,
                  backgroundColor: ac,
                },
              ],
            },
          });
        }
      })
      .catch((error) => {
        localStorage.setItem("err", error);
        if (error.response.status === 406) {
          //display "please refresh your session" here
          //return history.push("/refresh");
        }
        if (error.response.status === 403) {
          //display "please login" here
          this.redirectToLogin();
        }
      });
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };
  render() {
    return (
      <div>
        <div className="Temp">
          <Line //creating the line chart
            data={this.state.orderTempData}
            options={{
              maintainAspectRatio: true,
              title: {
                display: this.props.displayTitle,
                text: "Temperature",
                fontSize: 24,
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
              },
            }}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(LineChart);