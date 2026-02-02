import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = () => {
    const [series] = useState([
        {
            name: "Monthly Transaction",
            data: [70, 95, 77, 86, 71, 98, 83, 70, 96],
        },
        {
            name: "Amount Received",
            data: [158922, 190922, 128922, 118922, 108922, 192922, 108922, 148922, 190122],
        },
    ]);
    
    const options = {
        chart: {
            type: "bar",
            height: 180,
            toolbar: {
                show: false, // Disable the toolbar
              },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: [
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
            ],
        },
        fill: {
            opacity: 1,
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={180}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ColumnChart;
