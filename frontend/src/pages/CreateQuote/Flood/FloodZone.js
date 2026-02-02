import React, { useState } from 'react';
import FormControl from 'components/FormControl/FormInput'; // Ensure this component is correctly implemented
import Floodzonefile from 'assets/images/Floodzonefile.svg';
import Mapgroup from 'assets/images/Mapgroup.svg';
import locsignal from 'assets/images/locsignal.svg';
import yellowmap from 'assets/images/yellowmap.svg';
import greenmap from 'assets/images/greenmap.svg';
import redmap from 'assets/images/redmap.svg';
import { Container,CardStyle } from "styles/pages/CreateQuote";
import { Col,Row,Card } from "antd";
import {initialFormValues,floodmapvalue} from './floodZoneDummyData'

const Floodzone = ({state,theme}) => {
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  console.log("state",state)
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleEditClick = () => {
    if (isEditable) {
      // Handle saving the data if needed
      console.log('Submitting form data:', formValues);
    }
    setIsEditable(!isEditable); // Toggle the editable state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value, // Update the specific field with new value
    }));
  };

  return (
    <>
    <Container theme={theme}>
      <div className='container-wrapper'>
        <div className='container-box-half'>
          <div>
            <div className="step-content-box">
              <img src={Floodzonefile} alt="Exavalu" title="Exavalu" className='logobox' />
              <button type="button" className="stepperbutton-edit" onClick={handleEditClick}>
                {isEditable ? 'Save' : 'Edit'}
              </button>
            </div>
            <Row gutter={16}>
            <Col span={24}>
            <div className='Heading-label'>Flood zone details</div>
            <div className="subheading-label">This information will help the agent better understand your needs and objectives.</div>
            <div className="step-content-box">
              <div className="form-container">
                {Object.entries(formValues).map(([key, value]) => (
                  <div key={key}>
                    <label className='form-heading'>{key.replace(/([A-Z])/g, ' $1')}: </label><br />
                    <FormControl
                      theme={theme}
                      className="form-controls"
                      name={key}
                      type="text"
                      defaultValue={value} 
                      readOnly={!isEditable}
                      style={{ boxShadow: 'none' }}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            </Col>
            </Row>
          </div>
        </div>
        <div className='container-box-rightmain'>
          <div className='container-box-right-map'>
            <CardStyle>
            <Card title='Flood zone details'><img src={Mapgroup} alt="Exavalu" title="Exavalu" className='mapbox' /></Card>
          </CardStyle>
          </div>
          <div className='container-box-right'>
          <Row gutter={16}>
          <Col span={24}>
              <div className="step-content-box">
                <div className='Heading-label'>Legend</div>
                <img src={locsignal} alt="Exavalu" title="Exavalu" className='maplogobox' />
              </div>
              <div className='form-heading'>Flood zone desigination</div>
              </Col>
            <div className='step-content-box-map'>
              <img src={yellowmap} alt="Exavalu" title="Exavalu" className='map-logo' />
              <label className='form-heading'>{floodmapvalue.yellowzone}</label>
              <img src={greenmap} alt="Exavalu" title="Exavalu" className='map-logo' />
              <label className='form-heading'>{floodmapvalue.greenzone}</label>
              <img src={redmap} alt="Exavalu" title="Exavalu" className='map-logo' />
              <label className='form-heading'>{floodmapvalue.redzone}</label>
            </div>
            </Row>
          </div>
        </div>
      </div>
      </Container>
    </>
  );
};

export default Floodzone;
