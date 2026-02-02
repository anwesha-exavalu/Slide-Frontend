import React, { useState, useEffect } from "react";
import { CardStyleCars, Container } from "styles/pages/CreateQuote";
import { Col, Row, Card } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import FormCheckBox from "components/FormControl/FormCheckBox";
import DriverDetails from "./DriverInfo/DriverDetails";
import DriverEditPopUp from "pages/CreateQuote/DriverInfo/DriverEditPopUp";
import useMetaData from "context/metaData"

const options = [
  {
    label: "Add Drivers",
    value: "adddrivers",
  },
];

const Driver = ({
  driverData,
  driverCheckBox,
  handleDriverCheckBoxChange,
  handleDriverRemoval,
  handleDriverAddition,
}) => {
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
    const {theme} = useMetaData();

  useEffect(() => {
    console.log("The vehicle data in useEffect is ", driverData);
    if (driverData?.length > 0) {
      var drivers = driverData?.map((item) => ({
        id: item.vin,
        ...item,
      }));
      setDrivers(drivers);
    } else {
      setDrivers([]);
    }
  }, [driverData]);

  const handleOk = (e) => {
    console.log("The event is ", e);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setCurrentDriver(null);
  };

  const handleAdditionalInfoModalOpen = (driver) => {
    console.log("The current driver is ", driver);
    setCurrentDriver(driver);
    setModalOpen((prev) => !prev);
  };

  return (
    <Container>
      {drivers?.length === 0
        ? null
        : drivers?.map((driver) => {
            return (
              <CardStyleCars key={driver.lcensenumber}>
                <Card key={driver.lcensenumber}>
                  <Row>
                    <Col span={20}>
                      <p>{driver.firstname + " " + driver.lastname}</p>
                    </Col>
                    <Col span={4}>
                      <button
                        type="button"
                        className="stepperbutton-edit"
                        onClick={() => handleAdditionalInfoModalOpen(driver)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="stepperbutton-edit"
                        onClick={() => handleDriverRemoval(driver)}
                      >
                        Remove
                      </button>
                    </Col>
                  </Row>
                </Card>
              </CardStyleCars>
            );
          })}
      {currentDriver && (
        <DriverEditPopUp
          isModalOpen={modalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          currentDriver={currentDriver}
        />
      )}
      <FormSection theme={theme}>
        <div className="container-box">
          <FormCheckBox
            name="driveradd"
            colon={false}
            options={options}
            onChange={handleDriverCheckBoxChange}
            value={driverCheckBox === true ? ["adddrivers"] : []}
          />
          <DriverDetails
            handleDriverCheckBoxChange={handleDriverCheckBoxChange}
            driverCheckBox={driverCheckBox}
            handleDriverAddition={handleDriverAddition}
          />
        </div>
      </FormSection>
    </Container>
  );
};

export default Driver;
