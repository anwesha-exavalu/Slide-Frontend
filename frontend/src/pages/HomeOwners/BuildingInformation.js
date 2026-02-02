import React from "react";
import { Col, Row } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import DropdownSelect from "components/FormControl/DropdownSelect";
import FormControl from "components/FormControl/FormInput";
import useMetaData from "context/metaData";

const BuildingInformation = () => {
  const {theme}=useMetaData();

  return (
    <>
      <Container theme={theme}>
        <FormSection theme={theme}>
          <div className="container-box">
            <div className="step-content-box">
              <Row gutter={24}>
                <Col span={12}>
                  <FormControl
                    label="Year Built"
                    className="form-controls"
                    name="YearBuilt"
                    type="text"
                    required={true}
                  />
                </Col>
                <Col span={12}>
                  <FormControl
                    label="Square Feet"
                    className="form-controls"
                    name="SquareFeet"
                    type="text"
                    required={true}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Dwelling Type"
                    layout="vertical"
                    name="Dwelling Type"
                    options={[
                      {
                        value: "Single Family",
                        label: <span>Single Family</span>,
                      },
                      {
                        value: "Multi Family",
                        label: <span>Multi Family</span>,
                      },
                      {
                        value: "TownHome",
                        label: <span>TownHome</span>,
                      },
                      {
                        value: "Condo",
                        label: <span>Condo</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <FormControl
                    label="No of Stories"
                    className="form-controls"
                    name="No of Stories"
                    type="text"
                    required={true}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Foundation Type"
                    layout="vertical"
                    name="Foundation Type"
                    options={[
                      {
                        value: "Slab-on-Grade",
                        label: <span>Slab-on-Grade</span>,
                      },
                      {
                        value: "Crawl Space",
                        label: <span>Crawl Space</span>,
                      },
                      {
                        value: "Basement",
                        label: <span>Basement</span>,
                      },
                      {
                        value: "Pier and Beam",
                        label: <span>Pier and Beam</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Roof Type"
                    layout="vertical"
                    name="Roof Type"
                    options={[
                      {
                        value: "Asphalt",
                        label: <span>Asphalt</span>,
                      },
                      {
                        value: "Shingles",
                        label: <span>Shingles</span>,
                      },
                      {
                        value: "Concrete",
                        label: <span>Concrete</span>,
                      },
                      {
                        value: "Slate",
                        label: <span>Slate</span>,
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <DropdownSelect
                    label="Exterior wall Type"
                    layout="vertical"
                    name="Exterior wall Type"
                    options={[
                      {
                        value: "Frame",
                        label: <span>Frame</span>,
                      },
                      {
                        value: "Wood",
                        label: <span>Wood</span>,
                      },
                      {
                        value: "Brick Veneer",
                        label: <span>Brick Veneer</span>,
                      },
                      {
                        value: "Vinyl Siding",
                        label: <span>Vinyl Siding</span>,
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
export default BuildingInformation;
