import React, { useState, useEffect } from "react";
import Effectivedate from "assets/images/Effectivedate.svg";
import Buildinginfo from "assets/images/Buildinginfo.svg";
import Insureddetails from "assets/images/Insureddetails.svg";
import Floodzonefile from "assets/images/Floodzonefile.svg";
import Dropdown from "components/FormControl/DropdownSelect";
import { Col, Row, Button, Form } from "antd";
import FormControl from "components/FormControl/FormInput";
import { setDropdownVals } from "utils/helper";
import vehicleDataDropDown from "assets/files/vehicleData.csv";
import Papa from "papaparse";
import FormInput from "components/FormControl/FormInput";

const filesData = {};
const VehicleDetails = ({
  car,
  vehicleCheckBox,
  popUp,
  handleVehicleAddition,
  handleVehicleCheckBoxChange,
}) => {
  const [formVehicle] = Form.useForm();
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };

  useEffect(() => {
    Papa.parse(vehicleDataDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);

  const handleVehicleAdd = () => {
    const vehicle = formVehicle.getFieldsValue();
    formVehicle.resetFields();
    handleVehicleAddition(vehicle);
    handleVehicleCheckBoxChange();
  };

  return vehicleCheckBox === true || popUp === true ? (
    <>
      <Form
        id="vehiclesForm"
        form={formVehicle}
        initialValues={car}
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
          {/* <button type="submit" className="stepperbutton-edit">
                      Edit
                    </button> */}
        </div>
        <Row gutter={16}>
          <Col span={10}>
            <div className="Heading-label">Vehicle Number</div>
            <div className="subheading-label">
              This information will help the agent better understand your needs
              and objectives.
            </div>
          </Col>
          <Col span={14}>
            <Row gutter={16}>
              <Col span={12}>
                <FormControl
                  label="VIN"
                  name={["additionalvehicle", "vin"]}
                  required={true}
                  defaultValue={car?.vin}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <FormControl
                  label="Model Year"
                  name={["additionalvehicle", "modelyear"]}
                  type="text"
                  required={true}
                  defaultValue={car?.modelyear}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <FormControl
                  label="Make"
                  name={["additionalvehicle", "make"]}
                  required={true}
                  type="text"
                  defaultValue={car?.make}
                  layout="vertical"
                />
              </Col>
              <Col span={12}>
                <FormControl
                  label="Model"
                  name={["additionalvehicle", "model"]}
                  type="text"
                  required={true}
                  defaultValue={car?.model}
                  layout="vertical"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <div>
          <div className="step-content-box">
            <img
              src={Insureddetails}
              alt="Exavalu"
              title="Exavalu"
              className="logobox"
            />
            {/* <button type="submit" className="stepperbutton-edit">
                    Edit
                   </button> */}
          </div>
          <Row gutter={16}>
            <Col span={10}>
              <div className="Heading-label">Vehicle Information</div>
              <div className="subheading-label">
                This information will help the agent better understand your
                needs and objectives.
              </div>
            </Col>
            <Col span={14}>
              <Row gutter={16}>
                <Col span={12}>
                  <FormControl
                    label="Anti-Theft Device"
                    name={["additionalvehicle", "antitheftdevice"]}
                    type="text"
                    required={true}
                    defaultValue={car?.antitheftdevice}
                    layout="vertical"
                  />
                </Col>
                <Col span={12}>
                  <Dropdown
                    label="Anti-Lock Braking System"
                    name={["additionalvehicle", "antilockbrakingsystem"]}
                    options={dropDownOpts?.ALB || []}
                    required={true}
                    placeholder={car?.antilockbrakingsystem}
                    layout="vertical"
                  />
                </Col>

                <Col span={12}>
                  <FormControl
                    label="Passive Restraint"
                    name={["additionalvehicle", "passiverestraint"]}
                    type="text"
                    required={true}
                    defaultValue={car?.passiverestraint}
                    layout="vertical"
                  />
                </Col>
                <Col span={12}>
                  <FormInput
                    label="Cost New"
                    name={["additionalvehicle", "costnew"]}
                    type="text"
                    required={true}
                    defaultValue={car?.costnew}
                    layout="vertical"
                  />
                </Col>
                <Col span={12}>
                  <FormControl
                    label="Vehicle Age"
                    className="form-controls"
                    name={["additionalvehicle", "vehicleage"]}
                    type="text"
                    required={true}
                    defaultValue={car?.vehicleage}
                    layout="vertical"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <div className="step-content-box">
            {" "}
            <img
              src={Floodzonefile}
              alt="Exavalu"
              title="Exavalu"
              className="logobox"
            />
          </div>
          <Row gutter={16}>
            <Col span={10}>
              <div className="Heading-label">Vehicle Use</div>
              <div className="subheading-label">
                This information will help the agent better understand your
                needs and objectives.
              </div>
            </Col>
            <Col span={14}>
              <Row gutter={16}>
                <Col span={12}>
                  <Dropdown
                    label="Vehicle Use"
                    name={["additionalvehicle", "vehicleuse"]}
                    options={dropDownOpts?.VehicleUse || []}
                    required={true}
                    placeholder={car?.vehicleuse}
                    layout="vertical"
                  />
                </Col>
                {/* {/* <Col span={12}>
                  <Dropdown
                    label="Unacceptable Vehicle"
                    name={["additionalvehicle", "inacceptablevehicle"]}
                    options={dropDownOpts?.UnacceptableVehicle || []}
                    required={true}
                    placeholder={car?.inacceptablevehicle}
                    layout="vertical"
                  />
                </Col> */}
                <Col span={12}>
                  <FormInput
                    label="Odometer Reading"
                    name={["additionalvehicle", "odometereading"]}
                    type="text"
                    required={true}
                    defaultValue={car?.odometereading}
                    layout="vertical"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <div className="step-content-box">
            {" "}
            <img
              src={Buildinginfo}
              alt="Exavalu"
              title="Exavalu"
              className="logobox"
            />
          </div>
          <Row gutter={16}>
            <Col span={10}>
              <div className="Heading-label">Garaging Address</div>
              <div className="subheading-label">
                This information will help the agent better understand your
                needs and objectives.
              </div>
            </Col>
            <Col span={14}>
              <Row gutter={16}>
                <Col span={24}>
                  <Dropdown
                    label="Is Garaging Address Different than Mailing Address?"
                    name={["additionalvehicle", "garageaddressdiff"]}
                    options={dropDownOpts?.GarageAddress || []}
                    required={true}
                    placeholder={car?.garageaddressdiff}
                    layout="vertical"
                  />
                </Col>
                <Col span={18} />
                <Col span={6}>
                  {popUp === true ? null : (
                    <Button
                      className="stepperbutton"
                      onClick={handleVehicleAdd}
                    >
                      Add
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  ) : null;
};

export default VehicleDetails;
