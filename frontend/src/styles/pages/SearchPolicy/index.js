import styled from "styled-components";
import themes from "../../../constants/theme.json";

export const FormSection = styled.div`
  .ant-card {
    border-color: ${({ theme }) => themes[theme].searchQuoteFormBorder};
    //box-shadow: 0px 5px 13px -5px #0a090b0d;
    box-shadow: 0px 6px 18px -2px #18181c1a;
    background: ${({ theme }) => themes[theme].searchQuoteCardBg} !important;
  }

  label {
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
  input {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    // height: 48px;
    border: none;
  }
  .search-btn-box {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
  }
  .search-btn {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.051px;
    text-align: center;
    color: #fff !important;
    font-family: "Inter", sans-serif;
    background-color: ${({ theme }) =>
      `${themes[theme].searchQuoteBtn} !important`};
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
  img {
    cursor: pointer;
  }
`;
export const SearchPolicySection = styled.div`
  // background-color:#fff;
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
    .search-title {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const SearchButtonSection = styled.div`
  .generate-btn-box {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .generate-btn {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-top: 30px;
    margin-left: 30px;
    letter-spacing: -0.051px;
    text-align: center;
    color: #fff !important;
    font-family: "Inter", sans-serif;
    background-color: #000000 !important;
    border: 1px solid #000 !important;
    height: 48px;
    min-width: 110px;
  }
`;

export const SearchPolicyTitle = styled.h3`
  font-size: 48px;
  font-weight: 600;
  margin: 0px;
  line-height: 57.6px;
  letter-spacing: -0.03em;
  font-family: "Inter", sans-serif;
  color: ${({ theme }) => themes[theme].searchQuoteTitle};
`;
