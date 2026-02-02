import React from "react";
import { Col, Row } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import DropdownSelect from "components/FormControl/DropdownSelect";
import useMetaData from "context/metaData"

const Coverages = () => {
    const {theme} = useMetaData();
  return (
    <>
      <Container>
        <FormSection theme={theme}>
          <div className="container-box">
            <div className="step-content-box">
              <Row gutter={24}>
                <Col span={12}>
                  <DropdownSelect
                    label="Other Than Collision Deductible"
                    layout="vertical"
                    name="OtherThanCollisionDeductible"
                    options={[
                      {
                        value: "NoCoverage",
                        label: <span>No Coverage</span>,
                      },
                      {
                        value: "1000",
                        label: <span>1000</span>,
                      },
                      {
                        value: "1500",
                        label: <span>1500</span>,
                      },
                      {
                        value: "2000",
                        label: <span>2000</span>,
                      },
                      {
                        value: "2500",
                        label: <span>2500</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Collision Deductible"
                    layout="vertical"
                    name="Collision Deductible"
                    options={[
                      {
                        value: "NoCoverage",
                        label: <span>No Coverage</span>,
                      },
                      {
                        value: "1000",
                        label: <span>1000</span>,
                      },
                      {
                        value: "1500",
                        label: <span>1500</span>,
                      },
                      {
                        value: "2000",
                        label: <span>2000</span>,
                      },
                      {
                        value: "2500",
                        label: <span>2500</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Rental Reimbursement"
                    layout="vertical"
                    name="Rental Reimbursement"
                    options={[
                      {
                        value: "None",
                        label: <span>None</span>,
                      },
                      {
                        value: "20/420",
                        label: <span>20/420</span>,
                      },
                      {
                        value: "30/900",
                        label: <span>30/900</span>,
                      },
                      {
                        value: "40/1200",
                        label: <span>40/1200</span>,
                      },
                      {
                        value: "2500",
                        label: <span>2500</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Towing and Labor"
                    layout="vertical"
                    name="Towing and Labor"
                    options={[
                      {
                        value: "None",
                        label: <span>None</span>,
                      },
                      {
                        value: "50",
                        label: <span>50</span>,
                      },
                      {
                        value: "75",
                        label: <span>75</span>,
                      },
                      {
                        value: "100",
                        label: <span>100</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Special Equipment"
                    layout="vertical"
                    name="Special Equipment"
                    options={[
                      {
                        value: "None",
                        label: <span>None</span>,
                      },
                      {
                        value: "500",
                        label: <span>500</span>,
                      },
                      {
                        value: "1000",
                        label: <span>1000</span>,
                      },
                      {
                        value: "1500",
                        label: <span>1500</span>,
                      },
                      {
                        value: "2000",
                        label: <span>2000</span>,
                      },
                      {
                        value: "2500",
                        label: <span>2500</span>,
                      },
                      {
                        value: "3000",
                        label: <span>3000</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Special Equipment Type"
                    layout="vertical"
                    name="Special Equipment Type"
                    options={[
                      {
                        value: "Bicycle Racks",
                        label: <span>Bicycle Racks</span>,
                      },
                      {
                        value: "Decals",
                        label: <span>Decals</span>,
                      },
                      {
                        value: "Paint",
                        label: <span>Paint</span>,
                      },
                      {
                        value: "Pickup Bed Liners",
                        label: <span>Pickup Bed Liners</span>,
                      },
                      {
                        value: "Pickup Caps",
                        label: <span>Pickup Caps</span>,
                      },
                      {
                        value: "Running Boards",
                        label: <span>Running Boards</span>,
                      },
                      {
                        value: "Ski Racks",
                        label: <span>Ski Racks</span>,
                      },
                      {
                        value: "Stereo Equipment",
                        label: <span>Stereo Equipment</span>,
                      },
                      {
                        value: "Striping",
                        label: <span>Striping</span>,
                      },
                      {
                        value: "Sun Roof",
                        label: <span>Sun Roof</span>,
                      },
                      {
                        value: "T-top",
                        label: <span>T-top</span>,
                      },
                      {
                        value: "Video Equipment",
                        label: <span>Video Equipment</span>,
                      },
                      {
                        value: "Wheels",
                        label: <span>Wheels</span>,
                      },
                      {
                        value: "Other",
                        label: <span>Other</span>,
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
