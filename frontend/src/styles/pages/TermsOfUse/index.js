import styled from "styled-components";

export const TermsOfUseContent = styled.div`
  .contentlist {
    padding-left: 20px;
    li {
      font-size: 16px;
      font-weight: 400;
      font-family: "Plus-Jakarta-Sans";
      line-height: 20px;
    }
  }
  padding: 51px 20px;
  .heading {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 26px;
    font-family: "Inter", sans-serif;
  }
  .content {
    font-family: "Plus-Jakarta-Sans";
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
    padding-bottom: 16px;
    line-height: 20px;
  }
  .sub-heading {
    text-decoration: underline;
    font-size: 14px;
    font-weight: 600;
  }
`;
export const TermsOfUseContainer = styled.div`
  background: linear-gradient(90deg, #0f6397 0%, #35aef9 100%);
  padding: 0px 20px;
  .title {
    font-size: 36px;
    font-family: "Plus-Jakarta-Sans";
    font-weight: 600;
    max-width: 360px;
    line-height: 45px;
    color: #fff;
  }
  .subtext {
    color: #fff;
    font-family: "Plus-Jakarta-Sans";
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    a {
      color: #fff;
    }
  }
  .privacyimage {
    text-align: right;
    padding-top: 80px;
  }
  .privacy-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
