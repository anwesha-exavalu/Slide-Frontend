import styled from "styled-components";

export const Settings = styled.div`
  .container-box {
    padding: 50px 0;
    display: flex;
    justify-Content: center
}
  .grid-box{
    //padding: 30px;
    borderRadius: 10px;
    width: 100%;
     //box-shadow: 1.5px 1.5px 2px 1px rgba(0.1, 0.1, 0.1, 0.1);
     box-shadow: 0px 6px 18px -2px #18181C1A;
      border-radius:10px;
}
    .avatar-box-data{
    padding-top: 30px;
    padding-bottom:30px;
    border-radius:10px;
    justify-content: center;
    background-color: #F8F8F8;
    }
     .form-control{
     width:200px;
     display:flex;
     }
     .button-style{
      width:100px;
      box-shadow: 1.5px 1.5px 2px rgba(0.1, 0.1, 0.1, 0.1);
      color:#1677ff;
     }
.ant-tabs-tab {
    color: white;
    padding: 10px 20px;
    border-radius: 4px; 
    margin: 0 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

.ant-tabs-tab:hover {
    color: 1677ff;
}

.ant-tabs-tab-active {
    color: white;
    border-top: 3px solid #1677ff;
}
.ant-tabs-ink-bar {
    display: none !important;
}
.ant-tabs-nav {
    display: flex;
    justify-content: center;
}
    .Quotelabel {
    font-size: 22px;
    font-weight: 600;
    color: #2D2B32;
   justify-content: center;
   margin-top:30px;
}
.setting-heading{
   text-align: center;
   margin-top: 50px;
   margin-bottom: -15px;
}
.uploading-icon{
    position: absolute;
    bottom: 0;
    right: 10px;
    background-color: #36AFFA;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
}
.upload-image{
    width: 24px;
    height: 24px;
    cursor: pointer;
}
.avatar-box-style{
    text-align: center;
    position: relative;
}
.avatar-logo{
    border: 5px solid white;
    background-color:#E5F3FE;
 }
 .account-setting-box{
    justify-content: center;
    padding-top: 20px;
}
.button-box{
    text-align:right;
}
.button-save{
   width:20%;
}

`;
