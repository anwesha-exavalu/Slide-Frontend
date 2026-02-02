import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  Menu,
  Popover,
  Space,
  theme,
  Typography,
  Badge,
  Card,
  Modal,
  Radio
} from "antd";
import {
  MenuOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import SearchIcon from "assets/images/search-icon.png";
import SearchIconDark from "assets/images/search-dark.png";
import ProfileIcon from "assets/images/profile_img.png";
import novoLogo from 'assets/images/exavalu.png';
import {
  NavbarHeader,
  Container,
  UserNameStyle,
  AccountManagementButtonStyle,
  CloseButtonStyle,
  AvatarStyle
} from "styles/components/Navbar";
import { useNavigate } from "react-router-dom";
import HomeIcon from "assets/svg/home";
import PopOverButtons from "components/Navbar/NavBarComponents/PopOverButtons";
import {
  NotificationAlertStyle,
  NotificationStyle,
} from "styles/components/Navbar";
import useMetaData from "context/metaData";
import { BellFilled } from "@ant-design/icons";
import NotificationTable from "./NavBarComponents/NotificationTable";
import notificationImage from 'assets/images/notification_popup.png';
import redirect from 'assets/images/share.png';
const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function PrivateNavbar() {
  const {theme} = useMetaData();
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(ProfileIcon);
  const [popOverOpen, setPopOverOpen] = useState(false);
  const [open, setOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState("light");
  const notifications = 1;

  useEffect(() => {
    setUserImage(ProfileIcon);
  }, []);
  const redirectURL = () => {
    handlePopoverClose();
    navigate("/account-settings");
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const handlePopoverClose = () => {
    setPopOverOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setPopOverOpen(newOpen);
  };

  const onThemeChange = () => {
    setIsModalOpen(true);
  }

  const content = (
    <div className="user-profile-Modal">
      <div className="profile-iamge">
        <CloseButtonStyle theme={theme}>
          <Button icon={<CloseCircleOutlined />} onClick={handlePopoverClose} />
        </CloseButtonStyle>
        {userImage.length > 0 ? (
          <span className="usericon">
            {" "}
            <img src={userImage} />
          </span>
        ) : (
          <AvatarStyle>
            <Avatar size={90}>MD</Avatar>
          </AvatarStyle>
        )}
      </div>
      <UserNameStyle theme={theme}>
        <Typography.Title level={4}>Michael Doe</Typography.Title>
      </UserNameStyle>
      <AccountManagementButtonStyle theme={theme}>
        <Button shape="round" onClick={redirectURL}>
          <Text>Manage your Account</Text>
        </Button>
      </AccountManagementButtonStyle>
      <PopOverButtons theme={theme} onThemeChange={onThemeChange} logout={logout} />
    </div>
  );

  const handleRedirection = () => {
    navigate('/notificationDetails')
    setOpen(false)
  }

  const handleNotificationOpen = (newOpen) => {
    setOpen(newOpen)
  }
  
  const notificationContent = (
   
    <div>
      <img className="image" src={notificationImage}></img>
      <p className={`${theme==='dark'?'sigin-title-dark':'sigin-title'}`}>Tasks/Notifications <a onClick={() => handleRedirection()}><img src={redirect} /></a></p>   
      <Card className="notification-card">
        <NotificationTable theme={theme}/>
      </Card>
    </div>
  )

  const menuItems = [
    {
      key: "home",
      icon: <HomeIcon />,
    },
    {
      label: "Dashboard",
      key: "dashboard",
    },
    {
      label: "Quote",
      key: "SubMenu",
      children: [
        {
          label: "Search quote",
          key: "searchquote",
        },
        {
          label: "Create quote",
          key: "submenu",
          children: [
            {
              label: "Commercial Auto",
              key: "commauto",
            },
            {
              label: "Flood",
              key: "flood",
            },
            {
              label: "HomeOwners",
              key: "homeowners",
            },
            {
              label: "Cyber",
              key: "cyber",
            }
          ],
        },
        {
          label: "Automatic quote",
          key: "automaticquote",
        },
        {
          label: "Bulk Quote",
          key: "bulkquote",
        },
      ],
    },
    {
      label: "Policy",
      key: "searchpolicy",
    },
    {
      label: "Customer",
      key: "customer"
    },
    {
      label: "Documents",
      key: "documents",
    },
    {
      label: "Claim",
      key: "claim",
    },
    {
      label: "Reporting & analytics",
      key: "reportingAnalytics",
    },
    {
      label: "Commissions",
      key: "commissions"
    },
    {
      label: "Admin",
      key: "admin"
    },
    // {
    //   label: "Home Owners",
    //   key: "homeowners"
    // },
  ];

  const [current, setCurrent] = useState("projects");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    if (e.key == 'dashboard' || e.key == 'home') {
      navigate('/');
    } else if (e.key == 'searchquote') {
      navigate('/search-quote');
    }
      else if (e.key == 'commauto') {
        navigate('/commercial-auto');
      } else if (e.key == 'flood') {
        navigate('/flood');
    } else if (e.key == 'documents') {
      navigate('/uploadDocuments');
    } else if (e.key == 'searchpolicy') {
      navigate('/search-policy')
    } else if (e.key == 'reportingAnalytics') {
      navigate('/reporting-analytics')
    } else if (e.key == 'customer') {
      navigate('/customer-details')
    } else if (e.key == 'claim') {
      navigate('/search-claim')
    } else if (e.key == 'commissions') {
      navigate('/commissions')
    } else if (e.key == 'admin') {
      navigate('/admin')
    } else if (e.key == 'homeowners') {
      navigate('/home-owners')
    } else if (e.key == 'cyber') {
      navigate('/upload-file')
    } else if (e.key == 'automaticquote') {
      navigate('/automatic-quote');
    }else if (e.key == 'bulkquote') {
      navigate('/bulk-quote');
    }
  };

  const styles = {
    headercard: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      maxWidth: token.screenXL,
      // padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      marginLeft: screens.md ? "0px" : `-${token.size}px`,
      width: screens.lg ? "inherit" : token.sizeXXL,
    },
    menuContainer: {
      alignItems: "center",
      display: "flex",
      gap: token.size,
      width: "100%",
    },
  };

  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.setItem('theme', selectedMode);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setSelectedMode(e.target.value);
  };

  return (
    <NavbarHeader theme={theme}>
      <Container>
        <nav>
          <div style={styles.headercard}>
            <div style={styles.menuContainer}>
              <a href="#">
                {
                  theme === 'dark'? <img src={novoLogo} />:<img src={novoLogo} />
                }
                
              </a>
              <Menu
                style={styles.menu}
                mode="horizontal"
                items={menuItems}
                onClick={onClick}
                selectedKeys={screens.md ? [current] : ""}
                overflowedIndicator={
                  <Button color="#fff" type="text" icon={<MenuOutlined style={{color: theme == 'dark' ? "#fff" : "#000"}} />}></Button>
                }
              />
            </div>
            <Space>
              <div
                className="search-box search"

              >
                <div className="search-feild">
                  <span className="search-icons">
                    {
                      theme === 'dark'?<img src={SearchIconDark} />:<img src={SearchIcon} />
                    }
                    
                  </span>

                  <input type="text" placeholder="Search" />
                </div>
                <Popover theme={theme}
                  onOpenChange={handleOpenChange}
                  open={popOverOpen}
                  placement="bottom"
                  content={content}
                  trigger="click"
                  // overlayClassName="custom-pophover-dark"
                  overlayClassName={theme === 'dark' ? 'custom-pophover-dark' : 'custom-pophover'}
                >
                  <span style={{ cursor: "pointer" }}>
                    {userImage.length > 0 ? (
                      <span className="usericon">
                        {" "}
                        <img src={userImage} />
                      </span>
                    ) : (
                      <Avatar size={30}>MD</Avatar>
                    )}
                  </span>
                </Popover>
              </div>
            </Space>
            <Popover
              onOpenChange={handleNotificationOpen}
              open={open}
              placement="bottom"
              content={notificationContent}
              trigger="click"
              overlayStyle={{
                height:150,
                maxWidth: 450, 
                padding: 0, 
              }}
              overlayClassName={theme === 'dark' ? 'custom-pophover-dark-notification' : ''}
            >
              {
                notifications == 0 ? (
                  <NotificationStyle>
                    <Button shape="circle" icon={<BellFilled />} />
                  </NotificationStyle>
                ) : <>

                  <NotificationAlertStyle>
                    <Badge count={notifications} size="small" offset={[-6, 7]}>
                      <Button shape="circle" icon={<BellFilled />} />
                    </Badge>
                  </NotificationAlertStyle>
                </>
              }
            </Popover>
          </div>
        </nav>
      </Container>
      <Modal
        title="Dark mode"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Radio.Group onChange={handleChange} value={selectedMode}>
          <Radio.Button value="light">
            <span role="img" aria-label="Light">
              ☀️
            </span>{" "}
            Light
          </Radio.Button>
          <Radio.Button value="dark">
            <span role="img" aria-label="Dark">
              🌙
            </span>{" "}
            Dark
          </Radio.Button>
        </Radio.Group>
      </Modal>
    </NavbarHeader>
  );
}