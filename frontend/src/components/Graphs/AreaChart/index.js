import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ data,theme }) => {
  // const months = data.map(item => item.month);
  const months = data.map((item) => item.month);
  const converted = data.map((item) => item.converted);
  const submitted = data.map((item) => parseFloat(item.submitted));
  const options = {
    chart: {
      type: 'area',
      height: 180,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors:theme === 'dark' ? ['#36AFFA', '#9DC8BE'] : ['#008FFB', '#00E396'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'monotoneCubic'
    },
    markers: {
      size: 5, // Size of the markers
      colors: ['#fff'], // Background color of markers
      strokeColors: theme === 'dark' ? ['#36AFFA', '#9DC8BE'] :['#008FFB', '#00E396', '#CED4DC'], // Border color of markers
      strokeWidth: 2,
      hover: {
        size: 7 // Size of markers on hover
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        fillColors: theme === 'dark' ?['#36AFFA', '#9DC8BE']:['#008FFB','#00E396'],
        strokeWidth: 0, 

      },
      labels:{
          colors: theme === 'dark' ?'#999999':''
      }
    },grid: {
      yaxis: {
        lines: {
          show: true, 
        },
      },
      borderColor: theme === 'dark' ?'#999999':'',
    },
    xaxis: {
      categories: months,
      labels: {
        show: true,
        style: {
          colors: theme === 'dark' ?'#999999':'',
        },
      },
      tooltip: {
        enabled: false, // Optionally hide tooltip
      },
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: function (value) {
          return Math.round(value);
        },
        style: {
          colors: theme === 'dark' ?'#999999':'',
        },
      }
    },
  };

  // Chart series
  const series = [
    {
      name: "Submitted",
      data: submitted,
    },
    {
      name: "Converted",
      data: converted,
    }
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={180} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AreaChart
