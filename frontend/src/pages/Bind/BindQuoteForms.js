import { Row } from "antd";
import React from "react";
import FormsTable from "./BindQuoteForms/FormsTable";
import { StyledCardBindQuoteForms, StyledTypography } from "styles/pages/Bind";
const BindForms = ({theme}) => {
  return (
    <StyledCardBindQuoteForms theme={theme}>
      <Row>
        <StyledTypography theme={theme}>Forms List:</StyledTypography>
      </Row>
      <Row>
        <FormsTable />
      </Row>
    </StyledCardBindQuoteForms>
  );
};
export default BindForms;
