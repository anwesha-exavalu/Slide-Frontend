import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";

import Dashboard from './SidebarComponents/Dashboard';

import { MenuFoldOutlined, MenuUnfoldOutlined,  FileTextOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import HeaderDesign from './layout/HeaderDesign';

import { Divider } from 'antd';
import Sublob2 from './layout/Sublob2';

import Login from './layout/Login';
import EmailDashboard from './SidebarComponents/EmailDashboard';

const { Sider, Content, Footer } = Layout;

const MyMenu = ({ collapsed }) => {
  const location = useLocation();

  const pathToKey = {
    '/dashboard': '1',
   
    '/email': '2',
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[pathToKey[location.pathname] || '1']}
    >
      <Menu.Item key="1" icon={<FileTextOutlined />} title={"Dashboard"}>
        {!collapsed ? <Link to="/dashboard" style={{ textDecoration: 'none' }}>IDP</Link> : <Link to="/dashboard" style={{ textDecoration: 'none' }}/>}
      </Menu.Item>
      <Menu.Item key="2" icon={<MailOutlined/>} title={"Email"}>
        {!collapsed ? <Link to="/email" style={{ textDecoration: 'none' }}>Email</Link> : <Link to="/email" style={{ textDecoration: 'none' }}/>}
      </Menu.Item>
    </Menu>
  );
};

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  return (
    <Layout>
      {!isLoginPage && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: '#2457d3', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{ color: "white" }} /> : <MenuFoldOutlined style={{ color: "white" }} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '46px',
              width: '50px',
              height: '60px',
            }}
          />
          {!collapsed && <h4 style={{ color: 'white', textAlign: 'center' }}>Intelligent Document Processing</h4>}
          <Divider
            variant="dotted"
            style={{
              borderColor: 'black',
              width: '100%',
            }}
          />
          <div className="demo-logo-vertical" />
          <MyMenu collapsed={collapsed} />
        </Sider>
      )}
      <Layout>
        {!isLoginPage && <HeaderDesign />}
        <Content
          style={{
            margin: '5px 9px',
            padding: 24,
            minHeight: 560,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
             <Route path="email" element={<EmailDashboard/>} />
            <Route path="document-processing" element={<Sublob2 />} />
           
          </Routes>
        </Content>
        {!isLoginPage && (
          <Footer style={{ textAlign: 'center' }}>
            {/* Underwriter Workbench {new Date().getFullYear()} */}
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
