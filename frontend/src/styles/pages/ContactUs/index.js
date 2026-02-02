import styled from "styled-components";

export const Container = styled.div`
  max-width: 1220px;
  padding: 0px 20px;
  margin: 0 auto;
`;
export const ContactDetails = styled.div`
  margin-bottom: 30px;
`;
export const ContactUSPage = styled.div`
  .ant-card {
    box-shadow: 0px 6px 18px -2px #18181c1a;
    border-color: #f1f1f1;
    border-radius: 10px;
  }
  .ant-card-body {
    border-radius: 10px;
  }
  .formtextlabel{
  height:100px;
  margin-left:-10px;
  margin-bottom:30px;
  box-shadow: 0px 1.5px 4px -1px #9c9c9f;
  }
  .label-text {
  color: #ADACB0;
  display: block;
  font-size:13px;
  font-weight:500;
  margin-left:-5px;
  margin-bottom:10px;
}
`;
export const PrivacyContent = styled.div`
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
export const ContentCard = styled.div`
  color: #2d2b32;
  padding: 25px 0px;
  p {
    font-family: "Inter";
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;
    margin: 0px;
    a {
      color: #36affa;
      font-family: "Inter";
      font-weight: 700;
    }
  }
`;
export const Subtitle = styled.h4`
  a {
    color: #36affa;
  }
  font-family: "Inter";
  color: #2d2b32;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  line-height: 20px;
`;
export const ContactUsContainer = styled.div`
  margin-bottom: 50px;
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
