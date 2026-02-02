import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "antd";
import Dropdown from "components/FormControl/DropdownSelect";
import FormDatePicker from 'components/FormControl/FormDatePicker'
import driverDetailsDropDown from "assets/files/driverData.csv";
import Papa from "papaparse";
import { setDropdownVals } from "utils/helper";

const ESignatureStatusSummaryReport = () => {

  const redirectUrl = (e) => {
    e.preventDefault();
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
            label="As Of"
            name="asOf"
            className="form-controls"
            id='DateRange'
            required={true}
            placeholder="As Of"
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
        <Col span={12}>
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

export default ESignatureStatusSummaryReport;