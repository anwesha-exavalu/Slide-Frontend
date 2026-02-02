import React, { useState, useEffect } from "react";
import FormControl from "../../components/FormControl/FormInput";
import locationp from "../../assets/images/locationp.svg";
import Insuredaddress from "../../assets/images/Insuredaddress.svg";
import Mailingaddress from "../../assets/images/Mailingaddress.svg";
import { Col, Row } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import FormDatePicker from "components/FormControl/FormDatePicker";
import FormRadio from "components/FormControl/FormRadio";
import { RadioSpan } from "styles/pages/Bind";
import DropdownSelect from "components/FormControl/DropdownSelect";
import { setDropdownVals } from "utils/helper";
import insuredInfoDropDown from "assets/files/insuredInfo.csv";
import Papa from "papaparse";
import FormPhoneInput from "components/FormControl/FormPhoneInput";
import mail from 'assets/images/mail.png';
import useMetaData from "context/metaData"
const termPlanOpts = [
  {
    label: <RadioSpan>6 months</RadioSpan>,
    value: "sixmonths",
  },
  {
    label: <RadioSpan>1 year</RadioSpan>,
    value: "oneyear",
  },
];

const filesData = {};
const InsuredInformation = () => {
  const [valueRadio, setValueRadio] = useState("");
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };
 const {theme} = useMetaData();
  useEffect(() => {
    Papa.parse(insuredInfoDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };

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
                  <div className="Heading-label">Insured Information</div>
                  <div className="subheading-label">
                    This information will help the agent better understand your
                    needs and objectives.
                  </div>
                </Col>
                <Col span={14}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <FormRadio
                       theme={theme}
                        onChange={onChangeRadio}
                        value={valueRadio}
                        label={<RadioSpan>Term Plan:</RadioSpan>}
                        name={"termplan"}
                        options={termPlanOpts}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <FormDatePicker
                        label="Effective Date"
                        name={"effectivedate"}
                        required={true}
                        layout="vertical"
                      />
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
                        <FormPhoneInput    theme={theme} name="telephoneNumber" label="Telephone Number" required />
                    </Col>
                    <Col span={12}>
                      <label className="label-text">
                        <span className="required-star">*</span>Email Address
                        <a><img className='suffix' title="Email to" src={mail} onClick={()=>{window.location = `mailto:79/Agomes@gmail.com`}}/></a>
                      </label>
                      <input
                      
                        label="Email Address"
                        className="form-controls1"
                        name="emailaddress"
                        type="text"
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
                      Enter your details and a representative will contact you
                      to assist you with your inquiry.
                    </div>
                  </div>
                </Col>
                <Col span={14}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <DropdownSelect
                       theme={theme}
                        label="Residence Type"
                        name={"residencetype"}
                        options={dropDownOpts?.ResidenceType || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
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
                      Enter your details and a representative will contact you
                      to assist you with your inquiry.
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
        </FormSection>
      </Container>
    </>
  );
};
export default InsuredInformation;
