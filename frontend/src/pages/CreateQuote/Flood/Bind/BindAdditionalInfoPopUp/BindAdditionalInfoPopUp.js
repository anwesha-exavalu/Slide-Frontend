import { Modal, Button, Col } from "antd";
import React from "react";
import BindAdditionalInfoForm from "../BindAdditionalInfoForm";
import {StyledRowAdditionalInfoPopup } from "styles/pages/Bind";
import BindImage from "../BindImage";
import AddressInfo from "../AddressInfo";
import lenderDetails from "assets/images/LenderDetails.png"

const BindAdditionalInfoPopUp = ({
  isModalOpen = false,
  handleOk,
  handleCancel,
}) => {
  return (
    <>
      <Modal
        footer={[
            <Button
              value={"Submit"}
              form="defaultStepper"
              key="submit"
              htmlType="submit"
              onClick={handleOk}
            >
              Submit
            </Button>
          ,
        ]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
            <StyledRowAdditionalInfoPopup
              justify="space-between"
              gutter={{ xs: 4, sm: 18, md: 12, lg: 24 }}
            >
              <BindImage
                textColSpan={24}
                textHeader={"Lender Details"}
                subTextArray={[
                  {
                    id: 1,
                    value:
                      "This information will help the agent better understand your needs and objectives",
                  },
                ]}
                textImage={lenderDetails}
              />
              <Col>
                <BindAdditionalInfoForm />
              </Col>
              <Col></Col>
            </StyledRowAdditionalInfoPopup>

            <Col>
              <AddressInfo />
            </Col>
      </Modal>
    </>
  );
};

export default BindAdditionalInfoPopUp;
