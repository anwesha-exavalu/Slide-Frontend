import { Col, Row, Form } from "antd";
import React, { useState, useEffect } from "react";
import DropdownSelect from "components/FormControl/DropdownSelect";
import FormInput from "components/FormControl/FormInput";
import locationp from "../../assets/images/locationp.svg";
import { Container } from "styles/pages/CreateQuote";
import { FormSection } from "styles/pages/SearchQuote";
import { setDropdownVals } from "utils/helper";
import Papa from "papaparse";
import businessSectionDropDown from "assets/files/businessSection.csv";
import useMetaData from "context/metaData";

const filesData = {};

const AutomaticBusinessSection = ({ state }) => {
  const {theme}=useMetaData();
  const [form] = Form.useForm();
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };
  useEffect(() => {
    Papa.parse(businessSectionDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);

  const extractValue = (obj, field) => {
    const value = obj && obj[field] ? obj[field][0] : "";
    return value;
  };

  useEffect(() => {
    if (state && state.data) {
      const fieldsMap = {
        bodilyinjury: "BODILY INJURY LIABILITY",
        medicalpayments: "MEDICAL PAYMENTS",
        propertydamage: "PROPERTY DAMAGE LIABILITY",
        deductible1: "DED[0]",
        deductible2: "DED[1]",
      };

      let formValues = {};

      state.data.forEach((entry) => {
        const { keyValuePairs = {}, fallbackKeyValues = {} } = entry;

        Object.keys(fieldsMap).forEach((field) => {
          const key = fieldsMap[field];
          const [mainKey, index] = key.split("[");
          const value = index
            ? (keyValuePairs[mainKey] &&
                keyValuePairs[mainKey][parseInt(index)]) ||
              fallbackKeyValues[key] ||
              ""
            : extractValue(keyValuePairs, key) || fallbackKeyValues[key] || "";

          if (!formValues[field]) {
            formValues[field] = value;
          }
        });
      });

      form.setFieldsValue(formValues);
    }
  }, [state, form]);

  return (
    <Container theme={theme}>
      <FormSection theme={theme}>
        <Form form={form}>
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
              </div>
              <Row gutter={16}>
                <Col span={10}>
                  <div className="Heading-label">Business Section</div>
                  <div className="subheading-label">
                    This information will help the agent better understand your
                    needs and objectives.
                  </div>
                </Col>
                <Col span={14}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <DropdownSelect
                        label="Bodily Injury Liability $"
                        name="bodilyinjury"
                        options={dropDownOpts?.Liability || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <DropdownSelect
                        label="Medical Payments"
                        name="medicalpayments"
                        options={dropDownOpts?.Ded || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <DropdownSelect
                        label="UM $"
                        name="um"
                        options={dropDownOpts?.UM || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <DropdownSelect
                        label="UIM $"
                        name="uim"
                        options={dropDownOpts?.UIM || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    {/* <Col span={12}>
                    <FormInput
                      type="number"
                      label="Cargo $"
                      name="cargo1"
                      required={true}
                      layout="vertical"
                    />
                  </Col> */}
                    <Col span={12}>
                      <DropdownSelect
                        label="Collison Deductible $"
                        name="deductible1"
                        options={dropDownOpts?.Deductible || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    {/* <Col span={12}>
                    <DropdownSelect
                      label="Referrer Breakdown"
                      name="referrerbreakdown"
                      options={dropDownOpts?.ReferrerBreakdown || []}
                      required={true}
                      layout="vertical"
                    />
                  </Col> */}
                    <Col span={12}>
                      <DropdownSelect
                        label="Comprehensive Deductible $"
                        name="deductible2"
                        options={dropDownOpts?.Deductible2 || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <DropdownSelect
                        label="Towing and Labor"
                        name="towinglimit"
                        options={dropDownOpts?.TowStorageLimit || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    {/* <Col span={12}>
                    <DropdownSelect
                      label="Towing and Storage Deductible"
                      name="towingdeductible"
                      options={dropDownOpts?.TowStorageDeductible || []}
                      required={true}
                      layout="vertical"
                    />
                  </Col> */}
                    <Col span={12}>
                      <FormInput
                        type="number"
                        label="LIA $"
                        required={true}
                        name="lia"
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <DropdownSelect
                        label="Property Damage $"
                        name="propertydamage"
                        options={dropDownOpts?.TowStorageLimit || []}
                        required={true}
                        layout="vertical"
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
  );
};

export default AutomaticBusinessSection;
