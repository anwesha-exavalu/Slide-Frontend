import styled from "styled-components";
import themes from "../../../constants/theme.json";

export const HeraldProductWrapper = styled.div`
  .ant-card {
    border-color: ${({ theme }) => themes[theme].searchQuoteFormBorder};
    //box-shadow: 0px 5px 13px -5px #0a090b0d;
    box-shadow: 0px 6px 18px -2px #18181c1a;
    background: ${({ theme }) => themes[theme].searchQuoteCardBg} !important;
  }

  .topsection {
    padding: 40px 0px;
    .subtext {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.181px;
      color: ${({ theme }) => themes[theme].searchQuoteSectionHeading};
      font-family: "Inter", sans-serif;
      margin: 12px 0px;
    }
  }

  label {
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => themes[theme].searchQuoteTitle};
    font-family: "Inter", sans-serif;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.181px;
    color: ${({ theme }) => themes[theme].searchQuoteSectionHeading};
    font-family: "Inter", sans-serif;
    margin-bottom: 24px;
  }
  .jtqgXD .ant-checkbox-group label {
    width: 20%;
  }
  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-checkbox-wrapper {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => themes[theme].searchQuoteFormBorder};
    font-family: "Inter", sans-serif;
  }

  .create-application-btn {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    color: #fff;
    font-family: "Inter", sans-serif;
    background-color: ${({ theme }) => themes[theme].searchQuoteBtn};
    border: none;
    height: 48px;
    min-width: 140px;
    margin-top: 20px;
  }
`;
