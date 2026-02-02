import React, { useState, useEffect } from "react";
// import FormControl from "../../components/FormControl/FormInput";
import locationp from "../../assets/images/locationp.svg";
import Insuredaddress from "../../assets/images/Insuredaddress.svg";
// import Mailingaddress from "../../assets/images/Mailingaddress.svg";
import { Col, Row, Form } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import DropdownSelect from "components/FormControl/DropdownSelect";
import { setDropdownVals } from "utils/helper";
import insuredInfoDropDown from "assets/files/insuredDetails.csv";
import Papa from "papaparse";
import FormInput from "../../components/FormControl/FormInput";
import useMetaData from "context/metaData";

const filesData = {};
const AutomaticInsuredInformation = ({ state }) => {
  const {theme}=useMetaData();
  const [form] = Form.useForm();

  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };

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

  const [insuredName] = useState("");

  const extractValue = (obj, field) => {
    const value = obj && obj[field] ? obj[field][0] : "";

    return value;
  };

  const parseAddress = (addressString) => {
    const [name, street, city, state, zip, country] = addressString.split(",");
    return { name, street, city, state, zip, country };
  };

  useEffect(() => {
    if (state && state.data) {
      let insuredNameExtracted = "";
      let primaryEmail = "";
      let primaryPhone = "";
      let insuredAddress = "";
      let city = "";
      let zip = "";
      let stateName = "";
      let country = "";

      state.data.forEach((entry) => {
        const { keyValuePairs = {}, fallbackKeyValues = {} } = entry;

        const acordValue = extractValue(keyValuePairs, "ACORD");
        const addressFieldName =
          acordValue === "125 (2013/01)"
            ? "NAME (First Named Insured) AND MAILING ADDRESS (including ZIP+4)"
            : "APPLICANT'S NAME AND MAILING ADDRESS (Include county & ZIP+4)";

        if (!insuredNameExtracted) {
          insuredNameExtracted =
            extractValue(keyValuePairs, addressFieldName) ||
            fallbackKeyValues["NAME"] ||
            "";
          const nameMatch = insuredNameExtracted.match(/^[^,]+/);

          insuredNameExtracted = nameMatch ? nameMatch[0] : "";
        }
        if (!primaryEmail) {
          primaryEmail =
            extractValue(keyValuePairs, "PRIMARY E-MAIL ADDRESS:") ||
            fallbackKeyValues["PRIMARY E-MAIL ADDRESS:"] ||
            "";
        }
        if (!primaryPhone) {
          primaryPhone =
            extractValue(keyValuePairs, "PRIMARY PHONE #") ||
            fallbackKeyValues["PRIMARY PHONE #"] ||
            "";
        }

        const addressField = keyValuePairs[addressFieldName];
        if (addressField && addressField[0]) {
          const parsedAddress = parseAddress(addressField[0]);
          insuredAddress =
            insuredAddress ||
            parsedAddress.street ||
            fallbackKeyValues["STREET"] ||
            "";
          city = city || parsedAddress.city || fallbackKeyValues["CITY"] || "";
          stateName =
            stateName ||
            parsedAddress.state ||
            fallbackKeyValues["STATE"] ||
            "";
          zip = zip || parsedAddress.zip || fallbackKeyValues["ZIP"] || "";
          country =
            country ||
            parsedAddress.country ||
            fallbackKeyValues["COUNTRY"] ||
            "";
        }
      });

      // Set form fields
      form.setFieldsValue({
        insuredName: insuredNameExtracted,
        emailaddress: primaryEmail,
        phonenumber: primaryPhone,
        address: insuredAddress,
        city: city,
        zip: zip,
        state: stateName,
        country: country,
      });
    }
  }, [state, form]);

  return (
    <>
      <Container theme={theme}>
        <FormSection theme={theme}>
          <Form form={form}>
            <div className="container-box">
              <div>
                <div className="step-content-box">
                  {" "}
                  <img
                    src={locationp}
                    alt="GSIAY"
                    title="GSIAY"
                    className="logobox"
                  />
                </div>
                <Row gutter={16}>
                  <Col span={10}>
                    <div className="Heading-label">Insured Information</div>
                    <div className="subheading-label">
                      This information will help the agent better understand
                      your needs and objectives.
                    </div>
                  </Col>

                  <Col span={14}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <DropdownSelect
                          label="Insured Type"
                          name={"insuredtype"}
                          options={dropDownOpts?.InsuredType || []}
                          required={true}
                          layout="vertical"
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          label="Insured Name"
                          //className="form-controls"
                          name="insuredName"
                          type="text"
                          required={true}
                          value={insuredName || ""}
                          layout="vertical"
                        />
                      </Col>

                      <Col span={12}>
                        <DropdownSelect
                          label="Years In Business"
                          name={"yearsinbusiness"}
                          options={dropDownOpts?.YearsInBusiness || []}
                          required={true}
                          layout="vertical"
                        />
                      </Col>

                      <Col span={12}>
                        <FormInput
                          label="DBA"
                          name={"dba"}
                          required={true}
                          layout="vertical"
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          name="phonenumber"
                          label="Phone Number#"
                          required={false}
                          layout="vertical"
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          label="Email Address"
                          name="emailaddress"
                          type="email"
                          layout="vertical"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                          ]}
                          required={false}
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
                    alt="GSIAY"
                    title="GSIAY"
                    className="logobox"
                  />
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
                        <FormInput
                          label="Address"
                          className="form-controls"
                          name="address"
                          type="text"
                          required={true}
                          layout={"vertical"}
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          label="City"
                          // className="form-controls"
                          name="city"
                          type="text"
                          required={true}
                          layout={"vertical"}
                        />
                      </Col>
                      <Col span={12}>
                        <DropdownSelect
                          label="State"
                          name={"state"}
                          options={dropDownOpts?.State || []}
                          required={true}
                          showSearch
                          optionFilterProp="label"
                          layout="vertical"
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          label="Zip"
                          className="form-controls"
                          name="zip"
                          type="text"
                          required={true}
                          layout="vertical"
                        />
                      </Col>
                      <Col span={12}>
                        <FormInput
                          label="Country"
                          // className="form-controls"
                          name="country"
                          type="text"
                          required={true}
                          layout={"vertical"}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <hr />
            </div>
          </Form>
        </FormSection>
      </Container>
    </>
  );
};
export default AutomaticInsuredInformation;
