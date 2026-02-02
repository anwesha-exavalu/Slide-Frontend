import React from "react";
import FormControl from "components/FormControl/FormInput";
import locationp from "assets/images/locationp.svg";
import Insureddetails from "assets/images/Insureddetails.svg";
import Insuredaddress from "assets/images/Insuredaddress.svg";
import Mailingaddress from "assets/images/Mailingaddress.svg";
import Floodzonefile from "assets/images/Floodzonefile.svg";
import FormRadio from "components/FormControl/FormRadio";
import { Col, Row } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import {PropertyOptionsval} from 'components/FormControl/radioOption'
import FormPhoneInput from 'components/FormControl/FormPhoneInput'
const PropertyInformation = ({theme}) => {

  

  return (
    <>
      <Container theme={theme}>
        <FormSection theme={theme}>
          <div className="container-box">
            <div>
              <div className="step-content-box">
                {" "}
                <img
                  src={locationp}
                  alt="Exavalu"
                  title="Exavalu"
                  className="logobox"
                />
                {/* <button type="submit" className="stepperbutton-edit">
            Edit
          </button> */}
              </div>
              <Row gutter={16}>
                <Col span={10}>
                  <div className="Heading-label">
                    Property & Business Information
                  </div>
                  <div className="step-content-box">
                    <div className="subheading-label" >
                      Enter your details and a representative will contact you to
                      assist you with your inquiry
                    </div>
                  </div>
                </Col>
                <Col span={14}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <FormControl
                        theme={theme}
                        label="Agency Number"
                        name="agencyNumber"
                        type="number"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                        theme={theme}
                        label="Agency"
                        name="agency"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                        theme={theme}
                        label="Address"
                        name="address"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                        theme={theme}
                        label="City,State,Zip"
                        name="cityStateZip"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <label className="form-heading customlabel">
                        Continue as current agent
                      </label>
                    </Col>
                    <Col span={12}>
                      <FormRadio name='Continueascurrentagent' options={PropertyOptionsval} defaultValue="" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <hr />
            <div>
              <div className="step-content-box">
                {" "}
                <img
                  src={Insureddetails}
                  alt="Exavalu"
                  title="Exavalu"
                  className="logobox"
                />
                {/* <button type="submit" className="stepperbutton-edit">
            Edit
          </button> */}
              </div>
              <Row gutter={16}>
                <Col span={10}>
                  <div className="Heading-label">Insured Information</div>
                  <div className="subheading-label">
                    This information will help the agent better understand your
                    needs and objectives.
                  </div>
                </Col>
                <Col span={14}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <label className="form-heading customlabel">
                        Is the insured a Business?
                      </label>
                    </Col>
                    <Col span={12}>
                      <FormRadio name='IstheinsuredaBusiness' options={PropertyOptionsval} defaultValue="" />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="First Name"
                        className="form-controls"
                        name="firstName"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Last Name"
                        className="form-controls"
                        name="lastName"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Additional Insured First Name"
                        className="form-controls"
                        name="Additionalfirstname"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label=" Additional Insured Last Name"
                        className="form-controls"
                        name="Additionallastname"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                    <FormPhoneInput theme={theme} name="telephoneNumber" label="Telephone Number" required />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <hr />
            <div>
              <div className="step-content-box">
                {" "}
                <img
                  src={Insuredaddress}
                  alt="Exavalu"
                  title="Exavalu"
                  className="logobox"
                />
                {/* <button type="submit" className="stepperbutton-edit">
            Edit
          </button> */}
              </div>
              <Row gutter={16}>
                <Col span={10}>
                  <div className="Heading-label">Insured Address</div>
                  <div className="step-content-box">
                    <div>
                      Enter your details and a representative will contact you to
                      assist you with your inquiry.
                    </div>
                  </div>
                </Col>
                <Col span={14}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Address 1"
                        className="form-controls"
                        name="address1"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Address 2"
                        className="form-controls"
                        name="address2"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="City"
                        className="form-controls"
                        name="city"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="State"
                        className="form-controls"
                        name="state"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Zipcode"
                        className="form-controls"
                        name="zipCode"
                        type="number"
                        required={true}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <hr />
            <div>
              <div className="step-content-box">
                {" "}
                <img
                  src={Mailingaddress}
                  alt="Exavalu"
                  title="Exavalu"
                  className="logobox"
                />
                {/* <button type="submit" className="stepperbutton-edit">
            Edit
          </button> */}
              </div>
              <Row gutter={16}>
                <Col span={10}>
                  <div className="Heading-label">Mailing Address</div>
                  <div className="step-content-box">
                    <div>
                      Enter your details and a representative will contact you to
                      assist you with your inquiry.
                    </div>
                  </div>
                </Col>
                <Col span={14}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Address 1"
                        className="form-controls"
                        name="mailingaddress1"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Address 2"
                        className="form-controls"
                        name="mailingaddress2"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="City"
                        className="form-controls"
                        name="mailingcity"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="State"
                        className="form-controls"
                        name="mailingstate"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                      theme={theme}
                        label="Zipcode"
                        className="form-controls"
                        name="mailingzipCode"
                        type="number"
                        required={true}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          <div className="container-box-floodzone">
            <div>
              <div className="step-content-box">
                {" "}
                <img
                  src={Floodzonefile}
                  alt="Exavalu"
                  title="Exavalu"
                  className="logobox"
                />
                {/* <button type="submit" className="stepperbutton-edit">
            Edit
          </button> */}
              </div>
              <Row>
                <Col span={16}>
                  {" "}
                  <div className="Heading-label">
                    Request Flood Zone Determination?
                  </div>
                  <div className="step-content-box">
                    <div className="subheading-label">
                      This information will help the agent better understand your
                      needs and objectives.
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <FormRadio name="RequestFloodZoneDetermination" options={PropertyOptionsval} defaultValue="" />
                </Col>
              </Row>
            </div>
          </div>
        </FormSection>
      </Container>
    </>
  );
};
export default PropertyInformation;
