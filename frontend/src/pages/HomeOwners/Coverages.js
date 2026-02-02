import React from "react";
import { Col, Row } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import DropdownSelect from "components/FormControl/DropdownSelect";
import useMetaData from "context/metaData";

const Coverages = () => {
  const {theme}=useMetaData();

  return (
    <>
      <Container theme={theme}>
        <FormSection theme={theme}>
          <div className="container-box">
            <div className="step-content-box">
              <Row gutter={24}>
                <Col span={12}>
                  <DropdownSelect
                    label="Other Structures"
                    layout="vertical"
                    name="Other Structures"
                    options={[
                      {
                        value: "$100,000",
                        label: <span>$100,000</span>,
                      },
                      {
                        value: "$250,000",
                        label: <span>$250,000</span>,
                      },
                      {
                        value: "$500,000",
                        label: <span>$500,000</span>,
                      },
                      {
                        value: "$1000,000",
                        label: <span>$1000,000</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Personal Property"
                    layout="vertical"
                    name="Personal Property"
                    options={[
                      {
                        value: "$100,000",
                        label: <span>$100,000</span>,
                      },
                      {
                        value: "$500,000",
                        label: <span>$500,000</span>,
                      },
                      {
                        value: "$1000,000",
                        label: <span>$1000,000</span>,
                      },
                      {
                        value: "$2,500,000",
                        label: <span>$2,500,000</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Liability Protection"
                    layout="vertical"
                    name="Liability Protection"
                    options={[
                      {
                        value: "$1,000,000",
                        label: <span>$1,000,000</span>,
                      },
                      {
                        value: "$2,000,000",
                        label: <span>$2,000,000</span>,
                      },
                      {
                        value: "$3,000,000",
                        label: <span>$3,000,000</span>,
                      },
                      {
                        value: "$5,000,000",
                        label: <span>$5,000,000</span>,
                      },
                      {
                        value: "$10,000,000",
                        label: <span>$10,000,000</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Medical Payments"
                    layout="vertical"
                    name="Medical Payments"
                    options={[
                      {
                        value: "$1000",
                        label: <span>$1000</span>,
                      },
                      {
                        value: "$2000",
                        label: <span>$2000</span>,
                      },
                      {
                        value: "$3000",
                        label: <span>$3000</span>,
                      },
                      {
                        value: "$5000",
                        label: <span>$5000</span>,
                      },
                      {
                        value: "$10000",
                        label: <span>$10000</span>,
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
export default Coverages;
