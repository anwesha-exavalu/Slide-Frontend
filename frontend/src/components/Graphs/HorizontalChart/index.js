import React from "react";
import ReactApexChart from "react-apexcharts";

const HorizontalChart = ({ series, categories}) => {
    
    const options = {
        chart: {
            type: "bar",
            height: 400,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: "55%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories,
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "top",
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default HorizontalChart;
