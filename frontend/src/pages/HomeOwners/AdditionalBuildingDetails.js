import React from "react";
import { Col, Row } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import FormCheckBox from "components/FormControl/FormCheckBox";
import useMetaData from "context/metaData";

const AdditionalBuildingInformation = () => {
  const { theme } = useMetaData();

  return (
    <>
      <Container theme={theme}>
        <FormSection theme={theme}>
          <div className="container-box">
            <div className="step-content-box">
              <Row gutter={24}>
                <Col span={12}>
                  <FormCheckBox
                    name="Smoke Detector"
                    colon={false}
                    options={[
                      {
                        label: "Smoke Detector",
                        value: "Smoke Detector",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <FormCheckBox
                    name="Indoor sprinkler system"
                    colon={false}
                    options={[
                      {
                        label: "Indoor sprinkler system",
                        value: "Indoor sprinkler system",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <FormCheckBox
                    name="Fire extinguishers"
                    colon={false}
                    options={[
                      {
                        label: "Fire extinguishers",
                        value: "Fire extinguishers",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <FormCheckBox
                    name="Fire alarm system"
                    colon={false}
                    options={[
                      {
                        label: "Fire alarm system",
                        value: "Fire alarm system",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <FormCheckBox
                    name="Heating System"
                    colon={false}
                    options={[
                      {
                        label: "Heating System",
                        value: "Heating System",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <FormCheckBox
                    name="Cooling System"
                    colon={false}
                    options={[
                      {
                        label: "Cooling System",
                        value: "Cooling System",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <FormCheckBox
                    name="Security alarm system"
                    colon={false}
                    options={[
                      {
                        label: "Security alarm system",
                        value: "Security alarm system",
                      },
                    ]}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </FormSection>
      </Container>
    </>
  );
};
export default AdditionalBuildingInformation;
