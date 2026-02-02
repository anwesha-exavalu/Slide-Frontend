import { Modal, Button } from "antd";
import React from "react";
import VehicleDetails from "pages/CreateQuote/VehicleInfo/VehicleDetails";

const VehicleEditPopUp = ({
  isModalOpen = false,
  handleOk,
  handleCancel,
  currentCar,
}) => {
  console.log("The car in vehicle edit is ", currentCar);
  return (
    <>
      <Modal
        footer={[
          <Button
            value={"Submit"}
            form="defaultStepper"
            key="submit"
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <VehicleDetails car={currentCar} popUp={true} />
      </Modal>
    </>
  );
};

export default VehicleEditPopUp;
