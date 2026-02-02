import React, { useState } from 'react';
import { Card, Col, Row, Modal } from 'antd';
import riskmeter_report from '../../assets/documents/riskmeter_report.pdf'

const LocationCard = () => {
  // Define threshold limits for each score
  const floodScore = 60;
  const wildfireScore = 60;
  const earthquakeScore = 5;
  const stormSurgeScore = 70;
  const sinkholeScore = 20;


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");

  // Define a function to check if a score exceeds a threshold and apply the background color
  const getBackgroundColor = (score, limit = 50) => {
    return score > limit ? '#ffcccc' : '#e4f3f8';
  };

  const openDocument = (url) => {
    setDocumentUrl(url);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setDocumentUrl("");
  };

  // const [iframeSrc, setIframeSrc] = useState('');
  // const[documentUrl,setdocumentUrl]=useState('');

  const handleViewMore = (fileName,pageNo) => {
    setDocumentUrl(`${fileName}#page=${pageNo}`); // Update with the actual path of your PDF file
    setIsModalVisible(true);
    
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title={<div style={{ color: 'black' }}>Flood:</div>}
            headStyle={{ borderBottom: '2px solid gray' }}
            style={{
              width: 310,
              height: 230,
              border: '1px solid grey',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              backgroundColor: getBackgroundColor(floodScore),
              marginBottom: '20px',
            }}
          >
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Flood Risk Score</span> <span>{floodScore}</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Flood Zone</span> <span>AE</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Elevation Variance</span> <span>-1.1ft</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Property Elevation</span> <span>5.9ft</span>
            </p>

            <Row gutter={5} style={{ marginTop: 'auto' }}>
              <Col span={12}>
                <button
                onClick={() => handleViewMore(riskmeter_report, 10)}
                  style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#003f5c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '1px 0',
                    marginTop: '10px',
                  }}
                >

                  <b style={{ fontSize: '12px' }}>View More</b>
                </button>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Additional cards remain unchanged */}

        <Col span={8}>
          <Card
            title={<div style={{ color: 'black' }}>Wildfire:</div>}
            headStyle={{ borderBottom: '2px solid gray' }}
            style={{
              width: 310,
              height: 230,
              border: '1px solid grey',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              backgroundColor: getBackgroundColor(wildfireScore),
            }}
          >
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Wildfire Risk Score</span> <span>{wildfireScore}</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Risk Description</span> <span>Urban</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Number of Past Fires</span> <span>0</span>
            </p>

            <Row gutter={5} style={{ marginTop: 'auto' }}>
              <Col span={12}>
                <button
                  // onClick={() => handleViewMore(riskmeter_report, 4)}
                  style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#003f5c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 0',
                    marginTop: '35px',
                  }}
                >
                  <b style={{ fontSize: '12px' }}>View More</b>
                </button>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title={<div style={{ color: 'black' }}>Earthquake</div>}
            headStyle={{ borderBottom: '2px solid gray' }}
            style={{
              width: 310,
              height: 230,
              border: '1px solid gray',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              backgroundColor: getBackgroundColor(earthquakeScore), // Use a different threshold if needed
            }}
          >
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>USA Earthquake Risk Score</span> <span>{earthquakeScore}</span>
            </p>

            <Row gutter={5} style={{ marginTop: 'auto' }}>
              <Col span={12}>
                <button
                  // onClick={() => handleViewMore(riskmeter_report, 3)}
                  style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#003f5c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 0',
                    marginTop: '80px',
                  }}
                >
                  <b style={{ fontSize: '12px' }}>View More</b>
                </button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={10}>
        {/* Add similar threshold-based background for remaining cards */}
        <Col span={8}>
          <Card
            title={<div style={{ color: 'black' }}>Storm Surge</div>}
            headStyle={{ borderBottom: '2px solid gray' }}
            style={{
              width: 310,
              height: 230,
              border: '1px solid gray',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              backgroundColor: getBackgroundColor(stormSurgeScore), // Custom threshold if needed
            }}
          >
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Storm Surge</span> <span>{stormSurgeScore}</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Hail Probability</span> <span>Very low</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Tornado Exposure</span> <span>5-Very High</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Wind Pool Eligibility</span> <span>Out</span>
            </p>

            <Row gutter={5} style={{ marginTop: 'auto' }}>
              <Col span={12}>
                <button
                  // onClick={() => handleViewMore(riskmeter_report, 2)}

                  style={{
                    width: '100%',
                    height: '30px',
                    backgroundColor: '#003f5c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 0',
                    marginTop: '10px',
                  }}
                >
                  <b style={{ fontSize: '12px' }}>View More</b>
                </button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<div style={{ color: 'black' }}>Sinkhole</div>}
            headStyle={{ borderBottom: '2px solid gray' }}
            style={{
              width: 310,
              height: 230,
              border: '1px solid gray',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              backgroundColor: getBackgroundColor(sinkholeScore), // Custom threshold if needed
            }}
          >
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Sinkhole Risk</span> <span>Extreme</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Sinkhole Score</span> <span>{sinkholeScore}</span>
            </p>



            <Row gutter={5} style={{ marginTop: 'auto' }}>

              <Col span={12}>
                <button
                  // onClick={() => handleViewMore(riskmeter_report, 2)}
                  style={{
                    width: '100%',
                    height: "30px",
                    backgroundColor: '#003f5c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 0',
                    marginTop: "54px"

                  }}
                >
                  <b style={{ fontSize: "12px" }}>View More</b>
                </button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<div style={{ color: 'black' }}>Fire Station</div>}
            headStyle={{ borderBottom: '2px solid gray' }}
            style={{
              width: 310,
              height: 230,
              border: '1px solid gray',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              backgroundColor: '#e4f3f8',
              marginBottom: '20px',
            }}
          >
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Fire Protected Class</span> <span>Fully Protected</span>
            </p>
            <p style={{ color: 'black', margin: 0, fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Distance from Fire Station</span> <span>2.1 Miles</span>
            </p>

            <Row gutter={5} style={{ marginTop: 'auto' }}>

              <Col span={12}>

                <button
                  // onClick={() => handleViewMore(riskmeter_report, 2)}
                  style={{
                    width: '100%',
                    height: "30px",
                    backgroundColor: '#003f5c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 0',
                    marginTop: "55px"

                  }}
                >
                  <b style={{ fontSize: "12px" }}>View More</b>
                </button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>



      {/* Iframe section */}
      <Modal
        title="Document Viewer"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        <iframe
          src={documentUrl}
          title="Document Viewer"
          style={{ width: "100%", height: "80vh", border: "none" }}
        />
      </Modal>
    </>
  );
};

export default LocationCard;
