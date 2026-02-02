import React, { useState, useEffect } from "react";
import Effectivedate from "assets/images/Effectivedate.svg";
import Dropdown from "components/FormControl/DropdownSelect";
import { Col, Row, Button, Form } from "antd";
import FormControl from "components/FormControl/FormInput";
import FormDatePicker from "components/FormControl/FormDatePicker";
import driverDetailsDropDown from "assets/files/driverData.csv";
import { DriverAddButton } from "styles/pages/CreateQuote";
import { setDropdownVals } from "utils/helper";
import Papa from "papaparse";

const filesData = {};
const DriverDetails = ({
  driver,
  driverCheckBox,
  popUp,
  handleDriverAddition,
  handleDriverCheckBoxChange,
}) => {
  const [formDriver] = Form.useForm();
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };

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

  const handleDriverAdd = () => {
    const driver = formDriver.getFieldsValue();
    formDriver.resetFields();
    handleDriverAddition(driver);
    handleDriverCheckBoxChange();
  };

  return driverCheckBox === true || popUp === true ? (
    <>
      <Form
        id="driversForm"
        form={formDriver}
        initialValues={driver}
        layout="vertical"
      >
        <div className="step-content-box">
          {" "}
          <img
            src={Effectivedate}
            alt="Exavalu"
            title="Exavalu"
            className="logobox"
          />
        </div>
        <Row gutter={16}>
          <Col span={10}>
            <div className="Heading-label">Driver Detail</div>
            <div className="subheading-label">
              This information will help the agent better understand your needs
              and objectives.
            </div>
          </Col>
          <Col span={14}>
            <Row gutter={16}>
              <Col span={12}>
                <FormControl
                  label="First Name"
                  name={["drivers", "firstname"]}
                  required={true}
                  defaultValue={driver?.firstname}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <FormControl
                  label="Last Name"
                  name={["drivers", "lastname"]}
                  type="text"
                  required={true}
                  defaultValue={driver?.lastname}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <Dropdown
                  label="Relationship To Insured Use"
                  name={["drivers", "reltoinsured"]}
                  options={dropDownOpts?.RelationshipToInsured || []}
                  required={true}
                  placeholder={driver?.reltoinsured}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <Dropdown
                  label="Gender"
                  name={["drivers", "gender"]}
                  options={dropDownOpts?.Gender || []}
                  required={true}
                  placeholder={driver?.gender}
                  layout="vertical"
                />
              </Col>
              {/* <Col span={12}>
                <Dropdown
                  label="Driver Status"
                  name={["drivers", "driverstatus"]}
                  options={dropDownOpts?.DriverStatus || []}
                  required={true}
                  placeholder={driver?.driverstatus}
                  layout="vertical"
                />
              </Col> */}
              <Col span={12}>
                <Dropdown
                  label="Marital Status"
                  name={["drivers", "maritalstatus"]}
                  options={dropDownOpts?.MaritalStatus || []}
                  required={true}
                  placeholder={driver?.maritalstatus}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <FormDatePicker
                  label="Birth Date"
                  name={["drivers", "birthdate"]}
                  required={true}
                  placeholder={driver?.birthdate}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <Dropdown
                  label="Driver's License Status"
                  name={["drivers", "driverslicensestatus"]}
                  options={dropDownOpts?.DLStatus || []}
                  required={true}
                  placeholder={driver?.driverslicensestatus}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <FormControl
                  label="Driver's License Number"
                  name={["drivers", "licensenumber"]}
                  required={true}
                  defaultValue={driver?.licensenumber}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <Dropdown
                  label="License state"
                  name={["drivers", "licensestate"]}
                  options={dropDownOpts?.State || []}
                  required={true}
                  placeholder={driver?.licensestate}
                  layout="vertical"
                />
              </Col>

              {/* <Col span={12}>
                <Dropdown
                  label="SR22"
                  name={["drivers", "sr22"]}
                  options={dropDownOpts?.SR22 || []}
                  required={true}
                  placeholder={driver?.sr22}
                  layout="vertical"
                />
              </Col> */}
              <Col offset={4} span={6}>
                {popUp === true ? null : (
                  <DriverAddButton>
                    <Button className="stepperbutton" onClick={handleDriverAdd}>
                      Add
                    </Button>
                  </DriverAddButton>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  ) : null;
};

export default DriverDetails;
