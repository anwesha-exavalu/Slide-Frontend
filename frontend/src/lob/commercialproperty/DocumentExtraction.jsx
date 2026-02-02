import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Alert, Spin, List, Button } from 'antd';
import { CiCircleFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

function  DocumentExtraction({ id = "980d35d0-5f48-467b-54e5-90fb5bd3fb7d" }) {
  const [insights, setInsights] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAllHigh, setShowAllHigh] = useState(false);
  const [showAllMedium, setShowAllMedium] = useState(false);
  const [showAllLow, setShowAllLow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://underwriting-assessment.onrender.com/api/v1/insights?submission_id=${id}`);

        if (response.status === 200) {
          setInsights(response.data);
        } else {
          setErrorMessage("No insights available at this moment.");
        }
      } catch (err) {
        setErrorMessage("Unable to fetch insights: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Prepare data for each priority
  const highPriorityData = insights
    ? insights.flatMap(insight =>
      insight.key_insights
        .filter(keyInsight => keyInsight.priority.toLowerCase() === 'high')
        .map(keyInsight => keyInsight.insight)
    )
    : [];

  const mediumPriorityData = insights
    ? insights.flatMap(insight =>
      insight.key_insights
        .filter(keyInsight => keyInsight.priority.toLowerCase() === 'medium')
        .map(keyInsight => keyInsight.insight)
    )
    : [];

  const lowPriorityData = insights
    ? insights.flatMap(insight =>
      insight.key_insights
        .filter(keyInsight => keyInsight.priority.toLowerCase() === 'low')
        .map(keyInsight => keyInsight.insight)
    )
    : [];

  // Limit data shown per priority and add "See More" button if needed
  const limitedHighPriorityData = showAllHigh ? highPriorityData : highPriorityData.slice(0, 5);
  const limitedMediumPriorityData = showAllMedium ? mediumPriorityData : mediumPriorityData.slice(0, 5);
  const limitedLowPriorityData = showAllLow ? lowPriorityData : lowPriorityData.slice(0, 5);

  return (
    <Card className="max-w-screen-lg mx-auto" title={<Title level={2}>Insights</Title>} bordered>
      {loading ? (
        <Spin tip="Loading insights..." />
      ) : (
        <>
          {errorMessage && (
            <Alert message={errorMessage} type="error" showIcon className="mb-4" />
          )}

          {/* High Priority Section */}
          <Card
            title={<Title level={3} style={{ color: 'red' }}>High Priority</Title>}
            bordered={false}
            style={{ backgroundColor: 'transparent', marginBottom: '16px' }}
          >
            {limitedHighPriorityData.length > 0 ? (
              <>
                <List
                  dataSource={limitedHighPriorityData}
                  renderItem={item =>
                    <List.Item>
                      <Text>
                        <CiCircleFilled style={{ color: 'red', marginRight: '8px' }} />{item}</Text>
                    </List.Item>}
                />
                {highPriorityData.length > 5 && (
                  <Button
                    type="link"
                    onClick={() => setShowAllHigh(!showAllHigh)}
                    style={{ color: 'red' }}
                  >
                    {showAllHigh ? 'Show Less' : 'See More'}
                  </Button>
                )}
              </>
            ) : (
              <Text type="secondary">No high priority insights available.</Text>
            )}
          </Card>

          {/* Medium Priority Section */}
          <Card
            title={<Title level={3} style={{ color: 'orange' }}>Medium Priority</Title>}
            bordered={false}
            style={{ backgroundColor: 'transparent', marginBottom: '16px' }}
          >
            {limitedMediumPriorityData.length > 0 ? (
              <>
                <List
                  dataSource={limitedMediumPriorityData}
                  renderItem={item => <List.Item><Text><CiCircleFilled style={{ color: 'orange', marginRight: '8px' }} />{item}</Text></List.Item>}
                />
                {mediumPriorityData.length > 5 && (
                  <Button
                    type="link"
                    onClick={() => setShowAllMedium(!showAllMedium)}
                    style={{ color: 'orange' }}
                  >
                    {showAllMedium ? 'Show Less' : 'See More'}
                  </Button>
                )}
              </>
            ) : (
              <Text type="secondary">No medium priority insights available.</Text>
            )}
          </Card>

          {/* Low Priority Section */}
          <Card
            title={<Title level={3} style={{ color: 'green' }}>Low Priority</Title>}
            bordered={false}
            style={{ backgroundColor: 'transparent' }}
          >
            {limitedLowPriorityData.length > 0 ? (
              <>
                <List
                  dataSource={limitedLowPriorityData}
                  renderItem={item => <List.Item><Text><CiCircleFilled style={{ color: 'green', marginRight: '8px' }} />{item}</Text></List.Item>}
                />
                {lowPriorityData.length > 5 && (
                  <Button
                    type="link"
                    onClick={() => setShowAllLow(!showAllLow)}
                    style={{ color: 'green' }}
                  >
                    {showAllLow ? 'Show Less' : 'See More'}
                  </Button>
                )}
              </>
            ) : (
              <Text type="secondary" style={{ color: 'black' }}>No low priority insights available.</Text>
            )}
          </Card>
        </>
      )}
    </Card>
  );
}

export default DocumentExtraction;