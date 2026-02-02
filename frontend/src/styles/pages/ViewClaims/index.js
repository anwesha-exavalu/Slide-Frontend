import styled from "styled-components";
import themes from "../../../constants/theme.json";

export const ClaimsCard = styled.div`
  .ant-card {
    box-shadow: 0px 6px 18px -2px #18181c1a;
    border-radius: 10px;
    background: ${({ theme }) => themes[theme].searchQuoteCardBg};
    border-color: ${({ theme }) => themes[theme].searchQuoteFormBorder};
  }
  .card-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 22px;
    margin: 0px;
    letter-spacing: -0.03em;
    padding-top: 20px;
    padding-bottom: 20px;
    color: ${({ theme }) => themes[theme].searchQuoteTitle};
  }
  .card-content {
    margin: 18px 0 0px;
    color: ${({ theme }) => themes[theme].searchQuoteTitle};
    p {
      font-size: 13px;
      font-weight: 400;
      line-height: 19.5px;
      font-family: "Inter";
      name: Text xs/Regular;
    }
  }

  .card-headings {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    margin-top: 20px;
    color: ${({ theme }) => themes[theme].searchQuoteTitle};
  }

  .column-headings {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.4em;
    line-height: 20px;
    color: #4f4d55;
    margin-top: 35px;
  }

  .formFields {
    box-shadow: none;
  }

  .formFields-border {
    border-radius: 8px;
    border: ${({ theme }) => (theme === "dark" ? "" : "1px solid #F1F1F1")};
    box-shadow: 0px 1.5px 4px -1px #0a090b12;
  }

  .formFields-upload {
    border-radius: 8px;
    border: ${({ theme }) => (theme === "dark" ? "" : "1px solid #F1F1F1")};
    box-shadow: 0px 1.5px 4px -1px #0a090b12;
    width: 565px;
  }

  a {
    font-weight: 700;
    color: #36affa;
    font-size: 18px;
  }

  .p-label {
    color: #adacb0;
  }
  .ant-upload-wrapper
    .ant-upload-list
    .ant-upload-list-item-error
    .ant-upload-list-item-name,
  .ant-upload-icon .anticon {
    color: #1677ff;
  }
  .anticon svg {
    color: #1677ff;
  }
  .ant-upload-wrapper .ant-upload-list .ant-upload-list-item-container {
    margin-top: -55px;
    padding-left: 8px;
  }

  // .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
  //     border: 1px solid #F1F1F1;
  //     background: #ffffff;

  // }
  .row {
    margin-top: 30px;
  }

  .row-button {
    margin-top: 30px;
    margin-left: 1040px;
  }
  .button {
    width: 140px;
    height: 41px;
    background-color: #e4f0ff;
    border-radius: 10px;
    color: #1169a0;
    font-weight: bold;
    border-top: 1px solid #1169a0;
    margin-left: 400px;
  }

  .edit-button {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.05000000074505806px;
    text-align: left;
    padding: 15px;
    margin-left: 950px;
    border: 1px solid #f1f1f1;
  }
`;
