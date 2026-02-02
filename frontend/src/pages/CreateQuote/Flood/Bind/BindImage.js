import { Col, Image } from "antd";
import React from "react";
import { Space } from "antd";
import { StyledBindImage } from "styles/pages/Bind";

const BindImage = ({ textColSpan, textHeader, subTextArray, textImage }) => {
  return (
    <Col span={textColSpan}>
      <Space direction="vertical">
        <Image src={textImage} />
        <StyledBindImage isHeader={true}>{textHeader}</StyledBindImage>
        {subTextArray.map((item) => (
          <StyledBindImage key={item.id}>{item.value}</StyledBindImage>
        ))}
      </Space>
    </Col>
  );
};

export default BindImage;
