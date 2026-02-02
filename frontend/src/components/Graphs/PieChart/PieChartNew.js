import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
const PieChartNew = () => {
  const chartRef = useRef(null);
  const [legendItems, setLegendItems] = useState([]);
  const data = {
    labels: [
      "Total premium",
      "Loss Recovery",
      "Loss Paid",
      "Loss Ratio",
      "LAE Paid",
    ],
    datasets: [
      {
        // label: ["Total premium", "Loss Recovery", "Loss Paid", "Loss Ratio", "LAE Paid"],
        data: [44, 55, 13, 43, 22],
        backgroundColor: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the Pie Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      datalabels: {
        formatter: (value, ctx) => {
          const total = ctx.chart.data.datasets[0].data.reduce(
            (acc, val) => acc + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      // Get the chart instance and retrieve legend items
      const chart = chartRef.current;
      setLegendItems(chart.legend?.legendItems || []);
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div
        style={{
          width: "200px",
          height: "180px",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        <Pie ref={chartRef} data={data} options={options} />
      </div>
      <div style={{ marginTop: "20px", paddingLeft: "15px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {legendItems.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  backgroundColor: item.fillStyle,
                  marginRight: "8px",
                }}
              ></span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChartNew;
