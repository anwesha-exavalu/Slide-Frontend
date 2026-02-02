import { Modal, Button } from "antd";
import React from "react";
import DriverDetails from "pages/CreateQuote/DriverInfo/DriverDetails";

const DriverEditPopUp = ({
  isModalOpen = false,
  handleOk,
  handleCancel,
  currentDriver,
}) => {
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
        <DriverDetails driver={currentDriver} popUp={true} />
      </Modal>
    </>
  );
};

export default DriverEditPopUp;
