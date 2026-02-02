import React, { useState } from 'react';
import { Radio, Modal, Typography, Row, Col, Checkbox } from 'antd';

const { Text } = Typography;

function Rpa() {
  const [address, setAddress] = useState('');
  const [showRpa, setShowRpa] = useState(false);
  const [zillowIframeError, setZillowIframeError] = useState(false);
  const [streetEasyIframeError, setStreetEasyIframeError] = useState(false);
  const [showZillow, setShowZillow] = useState(false); // Start unchecked
  const [showStreetEasy, setShowStreetEasy] = useState(false); // Start unchecked

  // Sample addresses
  const addresses = {
    nyAddress1: '123-05 84th Avenue, Kew Gardens, NY 11415',
    
  };
  // nyAddress2: '1234 Elm Street',

  // URL generators
  const generateZillowSearchUrl = (address) => `https://www.zillow.com/homes/${encodeURIComponent(address)}`;
  const generateStreetEasyUrl = (address) => {
    const [buildingAddress, cityState] = address.split(',');
    const formattedBuildingAddress = buildingAddress.trim().toLowerCase().replace(/ /g, '-');
    const cityName = cityState ? cityState.trim().split(' ')[0].toLowerCase().replace(/ /g, '-') : 'unknown';
    // return `https://streeteasy.com/building/${formattedBuildingAddress}-${cityName}`;
    return `https://streeteasy.com/building/123_05-84-avenue-kew_gardens`;
  };

  const handleAddressChange = (e) => {
    const selectedAddress = e.target.value;

    // Reset the address briefly to allow re-opening with the same address
    setAddress('');
    setShowRpa(false); // Close modal before reopening

    setTimeout(() => {
      setAddress(selectedAddress);
      setShowRpa(true); // Reopen modal after resetting
      setZillowIframeError(false); // Reset errors for new iframe load
      setStreetEasyIframeError(false);
    }, 100); // A short delay to reset state
  };

  const closeRpa = () => {
    setShowRpa(false);
    setAddress(''); // Reset address to empty after closing
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ fontSize: '16px', marginBottom: '20px' }}>Search Address</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        
        {/* Checkbox Controls for Zillow and StreetEasy */}
        <div style={{ marginBottom: '10px' }}>
          <Checkbox 
            checked={showZillow} 
            onChange={(e) => setShowZillow(e.target.checked)}
          >
            Zillow
          </Checkbox>
          <Checkbox 
            checked={showStreetEasy} 
            onChange={(e) => setShowStreetEasy(e.target.checked)}
          >
            StreetEasy
          </Checkbox>
        </div>

        {/* Radio Buttons for Sample Addresses */}
        <div style={{ marginRight: '20px', minWidth: '200px' }}>
          <Radio.Group onChange={handleAddressChange} value={address}>
            {Object.keys(addresses).map((key) => (
              <Radio.Button key={key} value={addresses[key]} style={{ display: 'block', marginBottom: '10px' }}>
                {addresses[key]}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        <Modal
          title="Address Details"
          visible={showRpa}
          onCancel={closeRpa}
          footer={null}
          width="90%"
          style={{ top: 0, height: '95vh', overflow: 'hidden' }}
          bodyStyle={{ overflowY: 'auto', height: 'calc(90vh - 55px)', padding: 0 }}
        >
          <RpaWindow
            address={address}
            zillowUrl={generateZillowSearchUrl(address)}
            streetEasyUrl={generateStreetEasyUrl(address)}
            zillowIframeError={zillowIframeError}
            streetEasyIframeError={streetEasyIframeError}
            setZillowIframeError={setZillowIframeError}
            setStreetEasyIframeError={setStreetEasyIframeError}
            showZillow={showZillow}
            showStreetEasy={showStreetEasy}
          />
        </Modal>
      </div>
    </div>
  );
}

function RpaWindow({ 
  address, 
  zillowUrl, 
  streetEasyUrl, 
  zillowIframeError, 
  streetEasyIframeError, 
  setZillowIframeError, 
  setStreetEasyIframeError, 
  showZillow, 
  showStreetEasy 
}) {
  const colSpan = (showZillow && showStreetEasy) ? 12 : 24;

  return (
    <div>
      <Text strong>Address:</Text> <Text>{address}</Text>
      <Row gutter={16} style={{ marginTop: '20px', width: '100%' }}>

        {/* Zillow iframe */}
        {showZillow && (
          <Col span={colSpan} style={{ width: '100%' }}>
            <div className="iframe-container" style={{ width: '100%' }}>
              <iframe
                src={zillowIframeError ? null : zillowUrl}
                title="Zillow Search"
                onError={() => setZillowIframeError(true)}
                style={{ width: '100%', height: '100vh', border: '1px solid #ddd' }}
              />
              {zillowIframeError && (
                <Text type="danger">Zillow iframe could not load. Try opening in a new tab.</Text>
              )}
            </div>
          </Col>
        )}

        {/* StreetEasy iframe */}
        {showStreetEasy && !streetEasyIframeError && (
          <Col span={colSpan} style={{ width: '100%' }}>
            <div className="iframe-container" style={{ width: '100%' }}>
              <iframe
                src={streetEasyUrl}
                title="StreetEasy Search"
                onError={() => setStreetEasyIframeError(true)}
                style={{ width: '100%', height: '100vh', border: '1px solid #ddd' }}
              />
            </div>
          </Col>
        )}
        
        {showStreetEasy && streetEasyIframeError && (
          <Col span={colSpan} style={{ width: '100%', textAlign: 'center' }}>
            <Text type="danger">StreetEasy iframe could not load. Try searching directly on their website.</Text>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Rpa;
