import styled from "styled-components";
export const NavbarHeader = styled.div`
  border-bottom: 1px solid #f0efef;
  box-shadow: 0px 4px 10px 0px #0000000f;
  .search-box {
    display: flex;
    align-items: center;
    gap: 14px;
    &.search{
      justify-content:flex;
      padding:15px 0px;
    }
    .search-feild {
      position: relative;
      .search-icons {
        position: absolute;
        top: 12px;
        left: 7px;
      }
    }
    .usericon {
      width: 30px !important;
      height: 30px !important;
      display: inline-block;
      img {
        object-fit: cover;
        width: 100%;
        object-fit: cover;
        height: auto;
        border-radius: 50%;
      }
    }
   input {
      border-radius: 25px;
      border: ${({ theme }) => (theme === 'dark' ? '1px solid #A2A1A1' : '1px solid #f3f2f2')};
      padding: 13px 20px 13px 45px;
      outline: none;
      box-shadow: 13.49px 22.77px 27.83px 0px #0000000d;
      background-color: ${({ theme }) => (theme === 'dark' ? '#3F3F3F' : '')};
    }
  }
  .ant-menu-title-content {
    color: #9c9c9f;
    font-size: 14px;
    font-weight: 500;
    font-family:Plus-Jakarta-Sans;
  }
  .ant-menu-item {
    padding: 0 10px;
  }
  .ant-menu-submenu,
  .ant-menu-item,
  .ant-menu-item-selected {
    &:hover:after {
      content: none !important;
    }
    &:after {
      content: none !important;
    }
  }
`;
export const PublicHeader = styled.div`
  // background-color: #fff;
  border-bottom: 1px solid #f0efef;
  box-shadow: 0px 4px 10px 0px #0000000f;

  .home-button{
  margin-left:20px;
 padding:10px;
  }
  .search-box {
    display: flex;
    align-items: center;
    gap: 14px;
    .search-feild {
      position: relative;
      .search-icons {
        position: absolute;
        top: 12px;
        left: 7px;
      }
    }
    .login {
      font-size: 14px;
      font-weight: 700;
      color: ${({ theme }) => (theme === 'dark' ? '#FFFFFF' : '#e1473d')};
    }
    input {
    border-radius: 25px;
      border: ${({ theme }) => (theme === 'dark' ? '1px solid #A2A1A1' : '1px solid #f3f2f2')};
      padding: 13px 20px 13px 45px;
      outline: none;
      box-shadow: 13.49px 22.77px 27.83px 0px #0000000d;
      background-color: ${({ theme }) => (theme === 'dark' ? '#3F3F3F' : '')};
      border-radius: 25px;
    }
  }
  z-index: 99;
`;

export const Container = styled.div`
  max-width: 1220px;
  padding: 0px 20px;
  margin: 0 auto;
`;

export const PopoverStyle = styled.div`
  .ant-popover {
    background-color: #054f7d !important;
  }
`;

export const CloseButtonStyle = styled.div`
.ant-btn.ant-btn-icon-only{
background-color:${({ theme }) => (theme === 'dark' ? '#121212' : '#054f7d')};
border-color: ${({ theme }) => (theme === 'dark' ? '#121212' : '#054f7d')};
}
.ant-btn .ant-btn-icon span{
color:white;
font-size:175%
}
.ant-btn{
margin-bottom:0px;
padding-bottom:0px;
border-bottom-width:0px;
margin-left:350px;
bottom:310px;
position:absolute
}
.ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover {
    color: #4096ff;
    background-color:${({ theme }) => (theme === 'dark' ? '#121212' : '#054f7d')};
    border-color: ${({ theme }) => (theme === 'dark' ? '#121212' : '#054f7d')};
}
.ant-btn-default:not(:disabled):not(.ant-btn-disabled):active {
    color: #4096ff;
    background-color:${({ theme }) => (theme === 'dark' ? '#121212' : '#054f7d')};
    border-color: ${({ theme }) => (theme === 'dark' ? '#121212' : '#054f7d')};
}
}
`;

export const AccountManagementButtonStyle = styled.div`
  .ant-btn.ant-btn-round.ant-btn {
    border-color: #bbbbbb;
    margin-bottom: 50px;
    margin-top: 20px;
    width: 55%;
    .ant-typography {
      font-family: "Inter";
      color: ${({ theme }) => (theme === 'dark' ? '#121212' : '#36affa')};
      font-weight: 600;
      font-size: 14px;
    }
  }
`;

export const UserNameStyle = styled.div`
  .ant-typography {
    color:${({ theme }) => (theme === 'dark' ? '#FFFFFF' : ' #2e2e48')};
    font-family: "Plus-Jakarta-Sans";
    margin-bottom: 20px;
    padding-top: 0px;
    font-weight: 700;
    text-align: center;
    margin: 10px;
    font-size: 18px;
  }
`;

const BaseButtonPopOverStyle = styled.div`
  button {
    width: 100%;
    margin-bottom: 0px;
    border-color:${({ theme }) => (theme === 'dark' ? '#656566' : 'white')}; ;
    border-top-color: #929495;
    border-radius: 0px;
    height: 65px;

    img {
      padding-right: 7.5px;
      margin-top: -3px;
    }

    .ant-typography {
      font-family: "Inter";
      font-weight: 400;
      font-size: 14px;
      color:${({ theme }) => (theme === 'dark' ? '#FFFFFF' : '#121212')};
    }
  }
`;

export const PopOverButtonStyleSignOut = styled(BaseButtonPopOverStyle)`
  button {
    padding-left: 0px;
    margin-left: 0px;
    border-right-color: #929495;
    border-bottom-left-radius: 20px;
    background: ${({ theme }) => (theme === 'dark' ? '#656566 !important' : '')};
  }
`;

export const PopOverButtonStyleTheme = styled(BaseButtonPopOverStyle)`
  button {
    padding-right: 0px;
    margin-right: 0px;
    border-bottom-right-radius: 20px;
    background: ${({ theme }) => (theme === 'dark' ? '#656566 !important' : '')};
  }
`;

export const AvatarStyle = styled.div`
  .ant-avatar {
    border-width: 3px;
    border-color: #ffffff;
    margin-top: 20px;
    .ant-avatar-string {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export const NotificationStyle = styled.div`
  .ant-btn.ant-btn-circle.ant-btn {
    border-color: white;
    margin-left: 5px;
    min-width: 32px;
    padding-inline-start: 0;
    padding-inline-end: 0;
    border-radius: 50%;
    .ant-btn-icon {
      color: grey;
    }
  }
`;

export const NotificationAlertStyle = styled(NotificationStyle)`
  .ant-btn.ant-btn-circle.ant-btn {
    transform: rotate(30deg);
  }
`;
