import { Row, Col } from "antd";
import React from "react";
import addressInfo from "assets/images/AddressInfo.png";
import BindImage from "./BindImage";
import AddressInfoForm from "./AddressInfoForm";
import { StyledAddressInfoCard } from "styles/pages/Bind";

const AddressInfo = () => {
  return (
    <StyledAddressInfoCard gutter={{ xs: 4, sm: 18, md: 12, lg: 24 }}>
      <Row justify="space-between">
        <BindImage
          textColSpan={10}
          textHeader={"Address Info"}
          subTextArray={[
            {
              id: 1,
              value:
                "This information will help the agent better understand your needs and objectives",
            },
          ]}
          textImage={addressInfo}
        />
      </Row>
      <Row>
        <Col span={24}>
          <AddressInfoForm />
        </Col>
      </Row>
    </StyledAddressInfoCard>
  );
};

export default AddressInfo;
