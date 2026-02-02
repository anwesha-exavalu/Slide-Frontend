import styled from "styled-components";
import themes from "constants/theme.json";

export const FormSection = styled.div`
  .ant-card {
    border-color: #ddd9d9;
    box-shadow: 0px 5px 13px -5px #0a090b0d;
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
`;
export const ReportsAnalyticsSection = styled.div`
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
  .tableContainer {
    background:${({ theme }) => themes[theme].reportAnalyticsTable} ;
    border:${({ theme }) => (theme === 'dark' ? ' 1px solid #373636' : ' 1px solid #F1F1F1')};
    box-shadow: 0px 0px 10px 0.5px rgba(0, 0, 0, 0.02),
      0px 6px 18px -2px rgba(24, 24, 28, 0.1);
    border-radius: 10px;
  }
  .tabtitle {
    background: linear-gradient(161.5deg, #36affb -15.49%, #065281 98.81%);
    border-radius: 6px 6px 0px 0px;
    font-family: "Inter", sans-serif;
    font-size: 24px;
    margin: 0px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.2px;
    text-align: left;
    color: #fff;
    padding: 16px 30px;
  }
  .label {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.05px;
    color: #36affa;
    justify-content: left;
    margin: 15px 0 15px 32px;
    text-decoration: underline;
  }
  .text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.05px;
    color:${({ theme }) => themes[theme].reportAnalyticsTableText} ;
    justify-content: left;
    margin: 15px 0 15px 32px;
  }

  .ant-row {
    line-height: 50px;
  }
  .ant-col {
    border-bottom: ${({ theme }) => themes[theme].reportAnalyticsTableBorder};
   border-right: ${({ theme }) => themes[theme].reportAnalyticsTableBorder};
  }
`;
export const ReportsAnalyticsTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0px;
  line-height: 22px;
  letter-spacing: -0.18px;
  font-family: "Inter", sans-serif;
  color:${({ theme }) => themes[theme].createQuoteLabel};
`;
