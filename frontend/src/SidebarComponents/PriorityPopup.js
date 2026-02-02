import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography, Progress, Spin, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const { Title, Text } = Typography;
const claimPropensityAPI = process.env.REACT_APP_CLAIM_PROPENSITY;

const PriorityPopup = ({ priority, record }) => {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const response = await axios.post(`${claimPropensityAPI}/predict`,
          {
            "Location": record?.Location || "Suburban",
            "Building Type": record?.Building_Type || "Office Building",
            "Construction Type": record?.Construction_Type || "Wood",
            "Security Measures": record?.Security_Measures || 1,
            "Policy Deductible": record?.Policy_Deductible || 10000,
            "Policy Tenure": record?.Policy_Tenure || 5,
            "Flood Risk": record?.Flood_Risk || 85,
            "Earthquake Risk": record?.Earthquake_Risk || 78,
            "Wildfire Risk": record?.Wildfire_Risk || 70,
            "Building Age": record?.Building_Age || 90,
            "Sprinkler Coverage": record?.Sprinkler_Coverage || 0,
            "Room Count": record?.Room_Count || 25,
            "Square Footage": record?.Square_Footage || 70000
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            }
          }
        );
        setPredictionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
        message.error('Failed to fetch prediction data');
        setLoading(false);
      }
    };

    fetchPredictionData();
  }, [record]);

  const getDisplayValue = (predictor, value) => {
    switch (predictor) {
      case "Building Age":
        return `${value} years`;
      case "Square Footage":
        return `${value.toLocaleString()} sq ft`;
      case "Security Measures":
        return value === 1 ? "Yes" : "No";
      case "Sprinkler Coverage":
        return value === 1 ? "Yes" : "No";
      case "Room Count":
        return `${value} rooms`;
      default:
        return value;
    }
  };

  const topPredictorsData = predictionData?.["Top SHAP Values"]?.map(([predictor, impact, value]) => ({
    predictor,
    impact: Math.abs(impact) * 100,
    value,
    displayValue: getDisplayValue(predictor, value),
    impactDisplay: `${(Math.abs(impact) * 100).toFixed(1)}`
  })) || [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
          <p className="text-sm font-medium text-gray-700">{data.predictor}</p>
          <p className="text-sm text-gray-600">{data.displayValue}</p>
        </div>
      );
    }
    return null;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (loading) {
    return (
      <Card style={{ width: 480, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Card>
    );
  }

  return (
    <Card
      style={{
        width: 480,
        background: '#f0f2f5',
        border: 'none',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
      styles={{ body: { padding: '8px' } }}
      onClick={handleClick}
      onMouseDown={handleClick}
    >
      <Row gutter={[8, 8]} style={{ width: '100%' }}>
        <Col span={24} style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 12px'
          }}>
            <Text style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a365d'
            }}>
              {record.client}
            </Text>
            <Text type="secondary" style={{
              fontSize: '12px',
              color: '#4b5563'
            }}>
              {record.lob}
            </Text>
          </div>
        </Col>

        <Col span={12}>
          <Card
            styles={{
              body: {
                padding: '12px',
                height: '100%',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
              }
            }}
          >
            <Title level={4} style={{ margin: 0, fontSize: '16px', color: '#1a365d' }}>
              Claim Propensity
            </Title>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {predictionData?.Predicted_Probability?.toFixed(2)}
            </Text>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            styles={{
              body: {
                padding: '12px',
                height: '100%',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
          >
            <Title level={3} style={{ 
              color: 
                predictionData?.["Predicted Class"] === 'High' ? '#dc2626' :
                predictionData?.["Predicted Class"] === 'Medium' ? '#d4b106' :
                '#389e0d', 
              margin: 0, 
              textAlign: 'center', 
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Risk: {predictionData?.["Predicted Class"]}
            </Title>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title={<span style={{ fontSize: '16px', fontWeight: '600', color: '#1a365d' }}>Top Reasons</span>}
            styles={{
              body: { padding: '12px' },
              header: { minHeight: '40px', padding: '12px 16px' }
            }}
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={topPredictorsData}
                layout="vertical"
                margin={{ top: 5, right: 100, left: 5, bottom: 13 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  domain={[0, 50]}
                  label={{ 
                    value: 'Impact Contributing Factor', 
                    position: 'insideBottom', 
                    offset: -10,
                    style: { 
                      fontSize: '12px',
                      fill: '#4b5563'
                    }
                  }}
                  tick={{ fontSize: 12, fill: '#4b5563' }}
                />
                <YAxis
                  dataKey="predictor"
                  type="category"
                  tick={{ 
                    fontSize: 12, 
                    fill: '#4b5563'
                  }}
                  width={100}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(147, 197, 253, 0.1)' }}
                />
                <Bar dataKey="impact" fill="#f59e0b" radius={[0, 4, 4, 0]}>
                  <LabelList 
                    dataKey="impactDisplay" 
                    position="right"
                    style={{ 
                      fontSize: '12px',
                      fill: '#4b5563',
                      fontWeight: '500'
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            styles={{
              body: { padding: '12px' }
            }}
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Title level={4} style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1a365d'
                }}>
                  Model Confidence
                </Title>
              </Col>
              <Col span={24}>
                {/* <Text style={{ fontSize: '12px', color: '#4b5563', display: 'block' }}>Accuracy</Text> */}
                <Progress
                  percent={predictionData?.["Model Accuracy"] * 100}
                  status="active"
                  strokeColor="#0369a1"
                  trailColor="#e5e7eb"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PriorityPopup;