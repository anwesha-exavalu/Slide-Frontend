import { Col, Row, Typography } from "antd";
import FormInput from "components/FormControl/FormInput";
import React from "react";
import { ReinstatementHeaderStyle } from "styles/pages/StartTransaction";

const ReInstatement = () => {
  return (
    <>
      <Row>
        <Col offset={2} span={20}>
          <ReinstatementHeaderStyle>
            <Typography.Title level={4}>
              Cancellation Information:
            </Typography.Title>
          </ReinstatementHeaderStyle>
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={10}>
          <FormInput
            label="Effective Date"
            name="effectivedate"
            layout="vertical"
            disabled={true}
            required={false}
            defaultValue={"09/28/2024"}
          />
        </Col>
        <Col offset={2} span={10}>
          <FormInput
            label="Type"
            name="type"
            layout="vertical"
            disabled={true}
            required={false}
            defaultValue={"Flat"}
          />
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={10}>
          <FormInput
            label="Reason"
            name="reason"
            layout="vertical"
            disabled={true}
            required={false}
            defaultValue={"Insured Request"}
          />
        </Col>
        <Col offset={2} span={10}>
          <FormInput
            label="Description"
            name="description"
            layout="vertical"
            disabled={true}
            required={false}
            defaultValue={"Flat Cancellation"}
          />
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={20}>
          <ReinstatementHeaderStyle>
            <Typography.Title level={4}>
              Reinstatement Information:
            </Typography.Title>
          </ReinstatementHeaderStyle>
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={22}>
          <FormInput
            label="Description"
            name="DescriptionReInstatement"
            layout="vertical"
            required={true}
          />
        </Col>
      </Row>
    </>
  );
};

export default ReInstatement;
