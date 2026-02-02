import styled from "styled-components";
import { Row, Card, Typography } from "antd";
import Link from "antd/es/typography/Link";
export const BindHeader = styled.div`
  padding-top: 25px;
  span.ant-typography {
    font-family: "Inter";
    font-size: 24px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.18000000715255737px;
    text-align: left;
  }
  a.ant-typography {
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.18000000715255737px;
    text-align: left;
    color: #054f7d;
  }
`;

export const RadioColour = styled.div`
  .ant-radio-wrapper:hover .ant-radio-inner {
    border-color: #36affa;
  }
  .ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
    border-color: #36affa;
    background-color: #36affa;
  }
`;

export const FormLabelStyle = styled.div`
  label {
    position: relative;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    font-size: 14px;
    color: #adacb0 !important;
  }
`;

export const CardStyle = styled.div`
  .ant-card .ant-card-body {
    padding: 0px;
  }
`;

export const StyledRowAdditionalInfoPopup = styled(Row)`
  background: #ffffff;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 6px 18px -2px rgba(24, 24, 28, 0.1);
  padding: 20px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  border-radius: 5px;
`;

export const StyledAddressInfoCard = styled(Card)`
  border: 1px solid #f1f1f1;
  box-shadow: 0px 6px 18px -2px rgba(24, 24, 28, 0.1);
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  margin-top: 40px;
`;

export const StyledCardBindQuoteForms = styled(StyledAddressInfoCard)`
  padding-bottom: 50px;
  margin-bottom: 50px;
`;

export const StyledBindImage = styled.div`
  font-size: ${(props) => (props.isHeader ? "16px" : "13px")};
  font-weight: ${(props) => (props.isHeader ? 600 : 400)};
  line-height: ${(props) => (props.isHeader ? "22px" : "19.5px")};
  letter-spacing: ${(props) => (props.isHeader ? "-0.18px" : "normal")};
  text-align: left;
`;

export const StyledTypography = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.18px;
  text-align: left;
  padding-bottom: 40px;
`;

export const StyledTypographyAdditionalInfo = styled(StyledTypography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.05px;
  color: #36affa !important;
  padding-bottom: 0;
`;

export const StyledLink = styled(Link)`
  color: #36affa !important;
`;

export const StyledRowBind = styled(Row)`
  margin-bottom: 20px;
`;

export const StyledRowCheckbox = styled(Row)`
  width: 470px;
`;

export const StyledRadioBind = styled.div`
  .ant-form-item-control-input {
    padding-top: 1px !important;
    padding-left: 10px !important;
    label {
      margin-right: -10px;
    }
  }
`;

export const StyledRowBindTop = styled(StyledRowBind)`
  padding-top: 30px;
`;

export const LabelPadding = styled.div`
  .ant-col {
    padding-bottom: 1px !important;
  }
`;

export const RadioSpan = styled.span`
  color: black;
`;
export const RadioLabelSpan = styled.span`
  color: #adacb0;
`;

export const StyledFormLabel = styled.label`
  color: #adacb0;
  font-size: 13px;
  padding-left: 6px;
`;