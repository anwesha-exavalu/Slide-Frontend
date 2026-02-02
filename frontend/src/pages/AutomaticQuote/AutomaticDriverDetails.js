import React, { useState, useEffect } from "react";
import { CardStyleCars, Container } from "styles/pages/CreateQuote";
import { Col, Row, Card, Form } from "antd";
import { FormSection } from "styles/pages/SearchQuote";
import locationp from "../../assets/images/locationp.svg";
import FormCheckBox from "components/FormControl/FormCheckBox";
import DriverDetails from "pages/CreateQuote/DriverInfo/DriverDetails";
import DriverEditPopUp from "pages/CreateQuote/DriverInfo/DriverEditPopUp";
import useMetaData from "context/metaData";

const options = [{ label: "Add Drivers", value: "adddrivers" }];

const AutomaticDriverDetails = ({ state }) => {
  const {theme}=useMetaData();
  const [form] = Form.useForm();
  const [drivers, setDrivers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [driverCheckBox, setDriverCheckBox] = useState(false);

  useEffect(() => {
    if (state && state.data) {
      const drivers = [];

      state.data.forEach((dataItem) => {
        if (dataItem.tables) {
          const driverTable = dataItem.tables.find((table) =>
            table.includes("NAME (AS IT APPEARS ON LICENSE)")
          );

          if (driverTable) {
            const headers = driverTable;
            const driverRows = dataItem.tables.slice(
              dataItem.tables.indexOf(driverTable) + 1
            );

            driverRows.forEach((row) => {
              if (row.length >= headers.length) {
                const fullname =
                  row[headers.indexOf("NAME (AS IT APPEARS ON LICENSE)")];
                const [firstname, ...rest] = fullname.split(" ");
                const lastname = rest.join(" ");
                const gender =
                  row[headers.indexOf("SEX")] === "M"
                    ? "Male"
                    : row[headers.indexOf("SEX")] === "F"
                    ? "Female"
                    : "";

                const driver = {
                  fullname,
                  firstname,
                  lastname,
                  gender,
                  maritalstatus: row[headers.indexOf("MAR STAT")],
                  birthdate: row[headers.indexOf("DATE OF BIRTH")],
                  licensenumber:
                    row[headers.indexOf("DRIVERS LICENSE #/LIC STATE")],
                  reltoinsured: row[headers.indexOf("REL TO APPLIC")],
                };

                drivers.push(driver);
              }
            });
          }
        }
      });

      setDrivers(drivers);
    }
  }, [state]);

  const handleDriverAddition = (values) => {
    setDrivers((prevDrivers) => [...prevDrivers, values.drivers]);
  };

  const handleDriverRemoval = (driver) => {
    setDrivers((prevDrivers) =>
      prevDrivers.filter((item) => item.fullname !== driver.fullname)
    );
  };

  const handleDriverCheckBoxChange = () => {
    setDriverCheckBox((prev) => !prev);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setCurrentDriver(null);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleAdditionalInfoModalOpen = (driver) => {
    setCurrentDriver(driver);
    setModalOpen(true);
  };

  return (
    <Container theme={theme}>
      <FormSection theme={theme}>
        <Form form={form}>
          <div className="container-box">
            <div className="step-content-box">
              <img
                src={locationp}
                alt="GSIAY"
                title="GSIAY"
                className="logobox"
              />
            </div>
            <Col span={10}>
              <div className="Heading-label">Driver Information</div>
              <div className="subheading-label">
                This information will help the agent better understand your
                needs and objectives.
              </div>
            </Col>
            <br />
            {drivers.map((driver) => (
              <CardStyleCars key={driver.licensenumber}>
                <Card>
                  <Row>
                    <Col span={20}>
                      <p>{driver.fullname}</p>
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
            ))}
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
                  value={driverCheckBox ? ["adddrivers"] : []}
                />
                <DriverDetails
                  handleDriverCheckBoxChange={handleDriverCheckBoxChange}
                  driverCheckBox={driverCheckBox}
                  handleDriverAddition={handleDriverAddition}
                />
              </div>
            </FormSection>
          </div>
        </Form>
      </FormSection>
    </Container>
  );
};

export default AutomaticDriverDetails;
