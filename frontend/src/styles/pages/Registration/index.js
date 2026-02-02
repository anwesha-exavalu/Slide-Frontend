import styled from "styled-components";

export const Section = styled.div`
  padding: 50px 0px;
  .title-block {
    margin-bottom: 161px;
  }
  .registertexttitle {
    font-family: "Nunito-sans";
    font-size: 40px;
    font-weight: 700;
    margin: 0px 0 13px;
    line-height: 50px;
  }
  .subtitle {
    font-weight: 700;
    font-family: "Plus-Jakarta-Sans";
    font-size: 18px;
    margin: 0px 0px 15px;
    line-light: 18.94px;
  }
  .align{
      align-items:end;  
  }
  .sub-label-title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 5px;
    color: #4F4D55;
  }
 .button-box{
    text-align:right;
 }
 .new-line {
    border: 1px solid #F1F1F1;
    transform: rotate(180deg);
    margin-bottom: 15px;
 }          
`;

export const Container = styled.div`
  max-width: 1220px;
  padding: 10px 20px;
  margin: 0 auto;
`;
