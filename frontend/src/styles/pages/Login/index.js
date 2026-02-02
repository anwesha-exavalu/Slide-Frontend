import styled from "styled-components";
import themes from "constants/theme.json";

export const Section = styled.div`
  padding: 50px 0px;
  .logintexttitle {
    font-family: "Nunito-sans";
    font-size: 50px;
    font-weight: 700;
    margin: 0px 0 13px;
    line-height: 69px;
    color:${({ theme }) => themes[theme].loginSectionColor};
  }
  .subtitle {
    font-weight: 700;
    font-family: "Plus-Jakarta-Sans";
    font-size: 18px;
    margin: 0px 0px 15px;
    color:${({ theme }) => themes[theme].loginSectionSubtitle};
  }
  .login-text {
    font-weight: 400;
    margin: 0px;
    font-size: 14px;
    color:${({ theme }) => themes[theme].loginSectionColor};
  }
  .radiobtncard {
    .agent-text {
      font-size: 20px;
      font-weight: 700;
      margin: 0px 0px 13px;
      color:${({ theme }) => themes[theme].loginSectionSubtitle};
    }

    .text {
      font-size: 14px;
      font-weight: 400;
      margin: 0px 0px 0px;
      color: #6b7180;
      color: ${({ theme }) => themes[theme].loginText};
    }
  }
  .selectAgent-type {
    cursor: pointer;
    &.active,
    &:hover {
      background: #054f7d0d;
    }
    &.box{
      text-align: center;
      border: 1px solid #054F7D80;
      border-radius: 20px;
    } 
  }
  .align{
      align-items:end;  
  }
`;
export const Container = styled.div`
  max-width: 1220px;
  padding: 10px 20px;
  margin: 0 auto;
`;

export const CustomModal = styled.div``;

export const CustomModalContent = styled.div`
  text-align: center;
  .sigin-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0px;
  }
  .sigintext {
    margin: 0px;
    font-size: 16px;
    word-spacing: 1px;
  }
  .setupbtn {
    box-shadow: 5px 5px 16px #0a090b2e;
    border: 1px solid #e6e6e6;
    text-align: center;
    border-radius: 8px;
    display: block;
    width: 100%;
    background-color: #fff;
    padding: 14px 40px;
    margin: 12px 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
  }
  .login-form,.forgot-password-form {
      max-width: 600px,
  }
  .signin-btn:hover,
  .signin-btn {
    background-color: #303030 !important;
    border-radius: 8px;
    padding: 13px 20px;
    width: 100%;
    height: 48px;
    font-size: 13px;
    margin-top: 16px;

    &:disabled {
      color: #fff;
    }

    &.cancel{
      width:40%;
      margin-right:10px;
      height:40px !important; 
    }

    &.email{
      width:45%;
      height:40px !important; 
    }
  }
  .ant-form-item {
    margin-bottom: 12px;
  }
  .orsection {
    position: relative;
  }
  .orsection:after {
    content: "";
    position: absolute;
    width: 40%;
    height: 1px;
    background: #f1f1f1;
    right: 0;
    top: 50%;
  }

  .orsection:before {
    content: "";
    position: absolute;
    width: 40%;
    height: 1px;
    background: #f1f1f1;
    left: 0;
    top: 50%;
  }

  .email-subtext{
    background: #e6f7ff;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 16px;
    color: #0050b3;
    word-wrap: break-word;   
    overflow: hidden;       
    text-overflow: ellipsis; 
    white-space: normal;
    font-family:Inter;
    font-size:13px;    
  }

   .password-box, .cancel-box{
    text-align:right; 
    display:flex;
    justify-content:right;
  }

.cancel-btn:hover,
  .cancel-btn {
    color: #ffffff;
    background-color: #303030;
    border-radius: 8px;
    padding: 13px 20px;
    width: 100%;
    height: 48px;
    font-size: 13px;
    margin-top: 16px;
    margin-right: 5px;
  }
  .error {
      color: #ff4d4f;
      font-size: 14px;
  } 
  .inline {
    display: flex;
  }
  .forgot-password-btn {
    cursor: pointer;
  } 
`;
