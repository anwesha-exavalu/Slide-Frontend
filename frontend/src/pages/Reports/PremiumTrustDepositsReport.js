import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "antd";
import Dropdown from "components/FormControl/DropdownSelect";
import FormDatePicker from 'components/FormControl/FormDatePicker'
import driverDetailsDropDown from "assets/files/driverData.csv";
import Papa from "papaparse";
import { setDropdownVals } from "utils/helper";

const PremiumTrustDepositsReport = () => {

  const redirectUrl = () => {
    window.open('/expire-reports', '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
  }

  const commonConfig = { delimiter: "," };
  const filesData = {};
  const [dropDownOpts, setdropDownOpts] = useState([]);

  useEffect(() => {
    Papa.parse(driverDetailsDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={6}>
          <FormDatePicker
            label="Start Date"
            name="StartDate"
            className="form-controls"
            id='DateRange'
            required={true}
          />
        </Col>
        <Col span={6}>
          <FormDatePicker
            label="End Date"
            className="form-controls"
            name="EndDate"
            type="text"
            required={true}
          />
        </Col>
        <Col span={6}>
          <Dropdown
            label="Report Type"
            name={"reportType"}
            options={dropDownOpts?.ReportType || []}
            required={true}
            placeholder="Report Type"
            layout="vertical"
          />
        </Col>
        <Col span={6}>
          <Dropdown
            label="State"
            name={"state"}
            options={dropDownOpts?.State || []}
            required={true}
            placeholder="State"
            layout="vertical"
          />
        </Col>
        <Col span={6}>
          <Dropdown
            label="Report Level"
            name={"reportlevel"}
            options={dropDownOpts?.ReportLevel || []}
            required={true}
            placeholder="Report Level"
            layout="vertical"
          />
        </Col>
        <Col span={18}>
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
      </Row>
    </Form>
  );
};

export default PremiumTrustDepositsReport;