import React, { useState, useEffect } from "react";
import { CardStyleCars, Container } from "styles/pages/CreateQuote";
import { Col, Row, Card, Form } from "antd";
import locationp from "../../assets/images/locationp.svg";
import VehicleEditPopUp from "pages/CreateQuote/VehicleInfo/VehicleEditPopUp";
import VehicleDetails from "pages/CreateQuote/VehicleInfo/VehicleDetails";
import { FormSection } from "styles/pages/SearchQuote";
import FormCheckBox from "components/FormControl/FormCheckBox";
import useMetaData from "context/metaData";

const options = [
  {
    label: "Add Vehicle",
    value: "addvehicles",
  },
];

const AutomaticVehicleDetails = ({ state }) => {
  const {theme}=useMetaData();
  const [form] = Form.useForm();
  const [cars, setCars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [vehicleCheckBox, setVehicleCheckBox] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  // console.log("state in vehicle", state.data);
  console.log("state in vehicle", vehicleData);
  // console.log("state in vehicle", setCars);

  useEffect(() => {
    if (vehicleData?.length > 0) {
      var vehicles = vehicleData
        ?.filter((item) => item !== undefined)
        .map((item) => ({
          id: item.vin,
          ...item,
        }));
      setCars(vehicles);
    } else {
      setCars([]);
    }
  }, [vehicleData]);

  useEffect(() => {
    if (state && state.data) {
      const vehicles = [];

      state.data.forEach((dataItem) => {
        if (dataItem.tables) {
          const vehicleTable = dataItem.tables.find(
            (table) =>
              table.includes("YEAR") &&
              table.includes("MAKE, MODEL AND BODY TYPE")
          );

          const costNewTable = dataItem.tables.find(
            (table) => table.includes("VEH") && table.includes("COST NEW")
          );

          if (vehicleTable && costNewTable) {
            const vehicleHeaders = vehicleTable;
            const costNewHeaders = costNewTable;

            const yearIndex = vehicleHeaders.indexOf("YEAR");
            const makeModelIndex = vehicleHeaders.indexOf(
              "MAKE, MODEL AND BODY TYPE"
            );
            const vinIndex = vehicleHeaders.indexOf("VIN/REGISTERED STATE");
            const usageIndex = vehicleHeaders.indexOf("USAGE");
            const vehicleIndex = vehicleHeaders.indexOf("VEH");

            const costNewIndex = costNewHeaders.indexOf("COST NEW");
            const odoReadingIndex = costNewHeaders.indexOf("ODOMETER READING");
            const costVehicleIndex = costNewHeaders.indexOf("VEH");

            const vehicleRows = dataItem.tables.slice(
              dataItem.tables.indexOf(vehicleTable) + 1
            );
            const costNewRows = dataItem.tables
              .slice(dataItem.tables.indexOf(costNewTable) + 1)
              .filter((row) => row[costVehicleIndex]);

            vehicleRows.forEach((vehicleRow) => {
              const isValidVehicleRow =
                vehicleRow[vinIndex] &&
                vehicleRow[yearIndex] &&
                !isNaN(vehicleRow[yearIndex]) &&
                vehicleRow[makeModelIndex];

              if (isValidVehicleRow) {
                const makeModel = vehicleRow[makeModelIndex];
                const [make, ...modelParts] = makeModel.split(" ");

                const vehicleData = {
                  vin: vehicleRow[vinIndex] || "",
                  modelyear: vehicleRow[yearIndex] || "",
                  make: make || "",
                  model: modelParts.join(" ") || "",
                  vehicleuse: vehicleRow[usageIndex] || "",
                  costnew: "",
                  odometereading: "",
                };

                const matchingCostRow = costNewRows.find(
                  (costRow) =>
                    costRow[costVehicleIndex] &&
                    vehicleRow[vehicleIndex] === costRow[costVehicleIndex]
                );

                if (matchingCostRow) {
                  vehicleData.costnew = matchingCostRow[costNewIndex] || "";
                  vehicleData.odometereading =
                    matchingCostRow[odoReadingIndex] || "";
                }

                vehicles.push(vehicleData);
              }
            });
          }
        }
      });

      setVehicleData(vehicles);
    }
  }, [state]);

  const handleVehicleAddition = (values) => {
    setVehicleData((prevData) => {
      var newData = [...prevData, values.additionalvehicle];
      return newData;
    });
  };

  const handleVehicleRemoval = (values) => {
    setVehicleData((prevData) => {
      var newData = prevData.filter((item) => {
        return item.vin != values.vin;
      });
      return newData;
    });
  };

  const handleVehicleCheckBoxChange = () => {
    setVehicleCheckBox((prev) => !prev);
  };

  const handleOk = (e) => {
    console.log("The event is ", e);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setCurrentCar(null);
  };

  const handleAdditionalInfoModalOpen = (car) => {
    setCurrentCar(car);
    setModalOpen((prev) => !prev);
  };

  return (
    <Container theme={theme} >
      <Form form={form}>
        <div className="container-box">
          <div className="step-content-box">
            {" "}
            <img
              src={locationp}
              alt="GSIAY"
              title="GSIAY"
              className="logobox"
            />
          </div>
          <Col span={10}>
            <div className="Heading-label">Vehicle Information</div>
            <div className="subheading-label">
              This information will help the agent better understand your needs
              and objectives.
            </div>
          </Col>

          <br></br>
          {cars?.length === 0
            ? null
            : cars?.map((car) => {
                return (
                  <CardStyleCars key={car.vin}>
                    <Card key={car.vin}>
                      <Row>
                        <Col span={20}>
                          <p>
                            {car.make + " " + car.model + " " + car.modelyear}
                          </p>
                        </Col>
                        <Col span={4}>
                          <button
                            type="button"
                            className="stepperbutton-edit"
                            onClick={() => handleAdditionalInfoModalOpen(car)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="stepperbutton-edit"
                            onClick={() => handleVehicleRemoval(car)}
                          >
                            Remove
                          </button>
                        </Col>
                      </Row>
                    </Card>
                  </CardStyleCars>
                );
              })}
          {currentCar && (
            <VehicleEditPopUp
              isModalOpen={modalOpen}
              handleCancel={handleCancel}
              handleOk={handleOk}
              currentCar={currentCar}
            />
          )}
          <FormSection theme={theme}>
            <div className="container-box">
              <FormCheckBox
                name="vehicleadd"
                colon={false}
                options={options}
                onChange={handleVehicleCheckBoxChange}
                value={vehicleCheckBox === true ? ["addvehicles"] : []}
              />
              <VehicleDetails
                handleVehicleCheckBoxChange={handleVehicleCheckBoxChange}
                vehicleCheckBox={vehicleCheckBox}
                handleVehicleAddition={handleVehicleAddition}
              />
            </div>
          </FormSection>
        </div>
      </Form>
    </Container>
  );
};

export default AutomaticVehicleDetails;
