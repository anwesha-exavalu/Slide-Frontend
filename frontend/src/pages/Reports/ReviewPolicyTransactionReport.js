import React from "react";
import { Button, Col, Form, Row } from "antd";
import FormControl from 'components/FormControl/FormInput';

const redirectUrl = () => {
  window.open('/expire-reports', '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
}

const ReviewPolicyTransactionReport = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={8}>
          <FormControl className="form-controls" label="Policy Number" name="policyNumber" type="text" required={true} />
        </Col>
        <Col span={8}>
          <FormControl className="form-controls" label="Version Number" name="versionNumber" type="text" required={true} />
        </Col>
        <Col span={3}>
          <div className="generate-btn-box">
            <Button
              color="default"
              variant="solid"
              className="generate-btn"
              onClick={redirectUrl}
            >
              Generate
            </Button>
          </div>
        </Col>
        <Col span={5}></Col>
      </Row>
    </Form>
  );
};

export default ReviewPolicyTransactionReport;