import React from "react";
import ReactApexChart from "react-apexcharts";
import "./PortfolioInsights.css";

const PortfolioInsights = () => {
  // Written Premium By Year Chart
  const premiumChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#0066CC", "#FF69B4"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
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
      categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
    },
    yaxis: [
      {
        title: {
          text: "Written Premium",
        },
        labels: {
          formatter: (value) => `$${value.toLocaleString()}`,
        },
      },
      {
        opposite: true,
        title: {
          text: "Margin (%)",
        },
        labels: {
          formatter: (value) => `${value}%`,
        },
      },
    ],
    markers: {
      size: 5,
    },
    stroke: {
      curve: "smooth",
    },
  };

  const premiumChartSeries = [
    {
      name: "Written Premium",
      type: "bar",
      data: [12000000, 13000000, 15000000, 11000000, 19000000, 25000000],
    },
    {
      name: "Margin",
      type: "line",
      data: [34, 44, 30, 14, 24, 19.2],
    },
    {
      name: "Target",
      type: "line",
      data: [30, 30, 30, 30, 30, 30],
    },
  ];

  // Product Distribution Pie Chart
  const productChartOptions = {
    chart: {
      type: "pie",
      background: "transparent",
    },
    colors: ["#0066CC", "#FF69B4"],
    labels: ["Commercial Property", "General Liability"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const productChartSeries = [55, 45];

  // Policy Count Chart
  const policyCountOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#0066CC", "#9966FF", "#FF6666"],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "45%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Marsh Brokers",
        "New York Choice Brokerages",
        "Ariston Brokerage Corp."],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
    },
    yaxis: {
      title: {
        text: "Revenue ($M)",
        style: {
          fontSize: '12px'
        }
      },
      labels: {
        formatter: function(value) {
          return value.toFixed(0);
        }
      }
    },
    grid: {
      borderColor: '#E7E7E7',
      strokeDashArray: 4
    }
  };

  const policyCountSeries = [
    {
      name: "Revenue",
      data: [5, 10, 15]
    },
  ];

  // New Claim History Donut Chart
  const claimHistoryOptions = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    colors: ["#0066CC", "#FF69B4"],
    labels: ["Commercial Property", "General Liability"],
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Claim Amount",
              formatter: () => "$ 500,000",
            },
          },
        },
      },
    },
    legend: {
      position: "right",
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const claimHistorySeries = [60, 40];

  return (
    <div className="dashboard">
      <div className="charts-grid">
        <div className="card business-card">
          <h2 className="card-header">Book Of Business (YTD)</h2>
          <div className="business-stats">
            <div className="stats-row">
              <div className="stat-item">
                <p className="stat-value">$25 M</p>
                <p className="stat-label">Written Premium</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">5000</p>
                <p className="stat-label">Policy Count</p>
              </div>
            </div>
            <div className="stats-row">
              <div className="stat-item">
                <p className="stat-value">$500,000</p>
                <p className="stat-label">Claim Amount</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">5</p>
                <p className="stat-label">Claim Count</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card product-chart">
          <h2 className="card-header">Written Premium By Product (YTD)</h2>
          <div className="chart-container">
            <ReactApexChart
              options={productChartOptions}
              series={productChartSeries}
              type="pie"
              height={250}
            />
          </div>
        </div>

        <div className="card policy-chart">
          <h2 className="card-header">Revenue by Brokerages (YTD)</h2>
          <div className="chart-container">
            <ReactApexChart
              options={policyCountOptions}
              series={policyCountSeries}
              type="bar"
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="charts-grid">
        <div className="card premium-chart">
          <h2 className="card-header">Written Premium By Year</h2>
          <div className="chart-container">
            <ReactApexChart
              options={premiumChartOptions}
              series={premiumChartSeries}
              type="line"
              height={320}
              width={500}
            />
          </div>
        </div>
        <div className="card claim-history">
          <h2 className="card-header">Claim History</h2>
          <div className="chart-container">
            <ReactApexChart
              options={claimHistoryOptions}
              series={claimHistorySeries}
              type="donut"
              height={320}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInsights;
