import { Col } from "antd";
import React from "react";
import { Typography, Button, ConfigProvider } from "antd";
const BindButton = ({ buttonTxt }) => {
  return (
    <Col>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimaryBorderHover: "#36AFFA",
              colorPrimaryHover: "#36AFFA",
            },
          },
        }}
      >
        <Button>
          <Typography
            style={{
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
              letterSpacing: "-0.05000000074505806px",
              textAlign: "left",
              padding: "5px",
            }}
          >
            {buttonTxt}
          </Typography>
        </Button>
      </ConfigProvider>
    </Col>
  );
};

export default BindButton;
