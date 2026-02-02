import styled from "styled-components";
export const FormSection = styled.div`
 .container-box {
    border: 1px solid #f1f1f1;
    padding: 20px;
    margin-top:30px;
    border-radius: 10px;
    box-shadow: 0px 6px 18px -2px #18181C1A;
    background-color: #FFFFFF;
}
    .step-content-box {
    display: flex;
    gap:30px;
    justify-content: space-between;
}
    .Heading-label {
    color: #2D2B32;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    padding-top:10px;

}
   .logo-button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.logobox {
  width: 18px; /* Adjust the width as needed */
  height: 18px;
  margin-right:40px;
}
.logobox-date {
    width: 34px;
    height: 34px;
    padding: 8px 10px 8px 9px;
    gap: 10px;
    border-radius: 5px;
    background-color: #EEF6FF;


}
  .ant-table-wrapper { 
  padding:0px 0px 0px 0px;
  }
  .ant-container-box{
  background-color:none;}
  ant-picker ant-picker-outlined form-controls{
  }
  .mt5{
    margin-top: 5px;
  }
  .subtext {
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.181px;
    color: #4f4d55;
    font-family: "Inter",sans-serif;
  }    
`;

export const ExpireTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.18px;
  font-family: "Inter", sans-serif;
  color: #0a090b;
`;

