import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import { Card, Select, Spin, Alert, Tabs, message } from "antd";
import { CameraOutlined, LoadingOutlined, DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";

const { Option } = Select;
const { TabPane } = Tabs;

const PublicData = ({ onCaptureComplete }) => {
  const [fireData, setFireData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all');
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const contentRef = useRef(null);
  const years = Array.from({ length: 9 }, (_, i) => 2024 - i);

  // Clear localStorage when the component mounts for the first time
  useEffect(() => {
    const clearLocalStorage = () => {
      try {
        localStorage.clear();
        console.log('localStorage cleared on server start');
      } catch (err) {
        console.error('Failed to clear localStorage:', err);
      }
    };

    // Using sessionStorage to track if this is the first load
    const isFirstLoad = !sessionStorage.getItem('hasLoaded');
    if (isFirstLoad) {
      clearLocalStorage();
      sessionStorage.setItem('hasLoaded', 'true');
    }
  }, []);

  useEffect(() => {
    const fetchAllYearsData = async () => {
      setLoading(true);
      try {
        const promises = years.map((year) =>
          axios.get(
            `https://data.cityofnewyork.us/resource/ii3r-svjz.json?case_year=${year}`
          )
        );

        const responses = await Promise.all(promises);
        const allData = responses.flatMap((response) => response.data);
        setFireData(allData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch fire incident data");
        setLoading(false);
      }
    };

    fetchAllYearsData();
  }, []);

  const handleCapture = async () => {
    if (capturing) return;
    
    setCapturing(true);
    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imageData = canvas.toDataURL('image/png');
      
      const captureData = {
        image: imageData,
        timestamp: new Date().toISOString(),
        year: selectedYear,
        borough: selectedBorough || 'All Boroughs',
      };

      // Save to localStorage
      const existingDocs = JSON.parse(localStorage.getItem('capturedVisualizations') || '[]');
      localStorage.setItem('capturedVisualizations', JSON.stringify([...existingDocs, captureData]));
      
      message.success('Visualization saved to Documents!');
      
    } catch (err) {
      console.error('Failed to capture content:', err);
      message.error('Failed to capture visualization');
    } finally {
      setCapturing(false);
    }
  };

  const handleDownload = () => {
    if (!capturedImage) {
      message.warning("Please capture the visualization first");
      return;
    }

    try {
      // Create a link element
      const link = document.createElement("a");
      link.href = capturedImage.image;

      // Generate filename with timestamp and filters
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const yearText =
        capturedImage.year === "all" ? "2016-2024" : capturedImage.year;
      const filename = `nyc-fire-data-${yearText}-${capturedImage.borough}-${timestamp}.png`;

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success("Download started!");
    } catch (err) {
      console.error("Failed to download:", err);
      message.error("Failed to download image");
    }
  };

  const filterDataByYear = (data, year) => {
    if (year === "all") return data;
    return data.filter((incident) => incident.case_year === year.toString());
  };

  const getIncidentCounts = (filterKey, filterValue = null, year = "all") => {
    let filteredData = filterDataByYear(fireData, year);
    if (filterValue) {
      filteredData = filteredData.filter(
        (incident) => incident.borough === filterValue
      );
    }
    return filteredData.reduce((acc, incident) => {
      const key = incident[filterKey] || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  const getTopFireCauses = (filterValue = null, year = "all") => {
    const causeCounts = getIncidentCounts(
      "cause_fire_description",
      filterValue,
      year
    );

    return Object.entries(causeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  };

  const getBoroughs = () => {
    return [...new Set(fireData.map((incident) => incident.borough))];
  };

  const getFireCausesChartOptions = (topCauses, title) => ({
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    title: {
      text: title,
      align: "left",
    },
    xaxis: {
      title: {
        text: "Number of Fire Incidents",
      },
    },
    yaxis: {
      title: {
        text: "Cause of Fire",
      },
    },
  });

  const getYearRangeText = (year) => {
    return year === "all" ? "2016-2024" : year;
  };

  const topAllBoroughCauses = getTopFireCauses(null, selectedYear);
  const allBoroughChartOptions = getFireCausesChartOptions(
    topAllBoroughCauses,
    `Top 10 Causes of Fire (All Boroughs) in ${getYearRangeText(selectedYear)}`
  );
  const allBoroughChartSeries = [
    {
      name: "Fire Incidents",
      data: Object.values(topAllBoroughCauses),
    },
  ];
  const allBoroughCategories = Object.keys(topAllBoroughCauses);

  if (loading) {
    return (
      <Card>
        <div className="flex justify-center items-center p-12">
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Alert message="Error" description={error} type="error" showIcon />
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span>Fire Incidents in New York City</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCapture}
              disabled={capturing}
              className="p-2 hover:bg-gray-100 transition-colors rounded-full"
              style={{
                border: "none",
                background: "transparent",
                cursor: capturing ? "not-allowed" : "pointer",
              }}
            >
              {capturing ? (
                <LoadingOutlined
                  style={{ fontSize: "24px", color: "#1890ff" }}
                />
              ) : (
                <CameraOutlined style={{ fontSize: "24px", color: "#666" }} />
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={!capturedImage}
              className="p-2 hover:bg-gray-100 transition-colors rounded-full"
              style={{
                border: "none",
                background: "transparent",
                cursor: !capturedImage ? "not-allowed" : "pointer",
                opacity: !capturedImage ? 0.5 : 1,
              }}
            >
              <DownloadOutlined
                style={{
                  fontSize: "24px",
                  color: !capturedImage ? "#999" : "#666",
                }}
              />
            </button>
          </div>
        </div>
      }
    >
      <div ref={contentRef}>
        <div className="mb-4">
          <Select
            className="w-48 mr-4"
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Select Year"
          >
            <Option value="all">All Years (2016-2024)</Option>
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>

        <Tabs defaultActiveKey="1">
          <TabPane tab="All Boroughs Fire Causes" key="1">
            <ApexCharts
              options={{
                ...allBoroughChartOptions,
                xaxis: {
                  ...allBoroughChartOptions.xaxis,
                  categories: allBoroughCategories,
                },
              }}
              series={allBoroughChartSeries}
              type="bar"
              height={350}
            />
          </TabPane>
          <TabPane tab="Borough-Specific Fire Causes" key="2">
            <Select
              className="w-48 mb-4"
              placeholder="Select Borough"
              onChange={(value) => setSelectedBorough(value)}
            >
              {getBoroughs().map((borough) => (
                <Option key={borough} value={borough}>
                  {borough}
                </Option>
              ))}
            </Select>
            {selectedBorough && (
              <ApexCharts
                options={{
                  ...getFireCausesChartOptions(
                    getTopFireCauses(selectedBorough, selectedYear),
                    `Top 10 Causes of Fire in ${selectedBorough} (${getYearRangeText(
                      selectedYear
                    )})`
                  ),
                  xaxis: {
                    title: { text: "Number of Fire Incidents" },
                    categories: Object.keys(
                      getTopFireCauses(selectedBorough, selectedYear)
                    ),
                  },
                }}
                series={[
                  {
                    name: "Fire Incidents",
                    data: Object.values(
                      getTopFireCauses(selectedBorough, selectedYear)
                    ),
                  },
                ]}
                type="bar"
                height={350}
              />
            )}
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

export default PublicData;