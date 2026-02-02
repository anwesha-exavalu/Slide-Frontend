import React, { useState, useEffect } from "react";
import { CardStyleCars, Container } from "styles/pages/CreateQuote";
import { Col, Row, Card } from "antd";
import VehicleEditPopUp from "pages/CreateQuote/VehicleInfo/VehicleEditPopUp";
import VehicleDetails from "pages/CreateQuote/VehicleInfo/VehicleDetails";
import { FormSection } from "styles/pages/SearchQuote";
import FormCheckBox from "components/FormControl/FormCheckBox";
import useMetaData from "context/metaData"

const options = [
  {
    label: "Add Vehicle",
    value: "addvehicles",
  },
];

const Vehicle = ({
  vehicleData,
  vehicleCheckBox,
  handleVehicleCheckBoxChange,
  handleVehicleRemoval,
  handleVehicleAddition,
}) => {
  const [cars, setCars] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
const {theme} = useMetaData();
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
    <Container>
      {cars?.length === 0
        ? null
        : cars?.map((car) => {
            return (
              <CardStyleCars key={car.vin}>
                <Card key={car.vin}>
                  <Row>
                    <Col span={20}>
                      <p>{car.make + " " + car.model + " " + car.modelyear}</p>
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
    </Container>
  );
};

export default Vehicle;
