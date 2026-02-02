import styled from "styled-components";
export const FormSection = styled.div`
  .ant-card {
    border-color: #ddd9d9;
    box-shadow: 0px 6px 18px -2px #18181C1A;;
  }
  label {
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
  input {
    //box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    border: none;
  }
  .generate-btn-box {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
  }
  .generate-btn {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.051px;
    text-align: center;
    color: #fff !important;
    font-family: "Inter", sans-serif;
    background-color: #000000 !important;
    border: 1px solid #000 !important;
    height: 48px;
    min-width: 110px;
  }
  .resetbtn {
    font-size: 14px;
    font-weight: 475;
    line-height: 20px;
    letter-spacing: -0.05000000074505806px;
    text-align: left;
    margin-left: 16px;
    color: #000 !important;
    font-family: "Inter", sans-serif;
    height: 48px;
    min-width: 110px;
    background-color: #fff;
    border: 1px solid #ececed !important;
  }
  .back-btn {
    color: #054F7D;
    text-decoration:underline; 
    font-weight:500
    font-size: 14px; 
  }  
`;
export const ReportSection = styled.div`
  .topsection {
    padding: 40px 0px;
    .subtext {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.181px;
      color: #4f4d55;
      font-family: "Inter", sans-serif;
      margin: 12px 0px;
    }
  }
  .back-btn {
    font-family: "Inter";
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: #054f7d;
    cursor: pointer;
    text-decoration: underline;
    float: right;
  }    
`;
export const ReportTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0px;
  line-height: 22px;
  letter-spacing: -0.18px;
  font-family: "Inter", sans-serif;
  color: #0a090b;
`;

