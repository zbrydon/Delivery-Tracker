import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import axios from "axios";

const WarehouseChart = () => {
  const [chartData, setChartData] = useState({});
  const query = useQuery();

  const chart = () => {
    // let productType = [];

    // let productQuantity = [];

    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("auth-token");
    const headers = { authorization: token };
    const param = { storeId: 11111, warehouseId: 1111 };

    axios
      .get(`${API_URL}/viewPopularOrders`, {
        headers: headers,
        params: param,
      })
      .then(function (response) {
        let data = response.data;

        console.log(data.totals);
        // for (const resData of data.totals) {
        //   productType.push(resData.totals);
        //   productQuantity.push(parseInt(resData.quantity));
        // }

        setChartData({
          labels: ["Frozen", "Dairy", "Meat", "Produce", "Ambient"],
          datasets: [
            {
              labels: "Most Popular Orders",
              data: [
                data.totals.frozen,
                data.totals.dairy,
                data.totals.meat,
                data.totals.produce,
                data.totals.ambient,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(217, 152, 82, 0.6)",
                "rgba(227, 127, 116, 0.6)",
                "rgba(218, 149, 240, 0.6)",
                "rgba(82, 217, 118, 0.6)",
              ],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  return (
    <>
      <Doughnut data={chartData} />
    </>
  );
};

export default WarehouseChart;
