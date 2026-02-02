import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    
   SettingFilled, HomeOutlined , AuditOutlined, InfoCircleOutlined, SearchOutlined,
  
  } from '@ant-design/icons';
  import { Divider } from 'antd';
  import { Button, Layout, Menu, theme } from 'antd';
  const { Header, Sider } = Layout;
  const Siders = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
    <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: '#2457d3', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: '46px',
        width: '50px', height: '60px'
      }}
    />
    {!collapsed && <h4 style={{color: 'white', textAlign: 'center'}}>Underwriting Workbench</h4>}
    
    <img 
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c6ccf97ba0270962e77c546c4769ceb9568acdf197d37473c8380510eab3531?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa" 
      alt="User avatar" 
      style={{
        borderRadius: '10px', 
        height: collapsed ? '50px' : '100px', // Dynamic size based on collapsed state
        display: 'block', 
        margin: '20px auto',
        transition: 'height 0.3s ease' // Smooth transition for size change
      }}
    />
    
    {!collapsed && <h4 style={{color: 'white', textAlign: 'center'}}>Wilson Properties</h4>}
    
    {!collapsed && (
      <address style={{display: 'flex', justifyContent: 'center'}}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/400be7cb3efa8c57f2495018b33cfff53bce52364b7b7798751d7c5f5c7d1dac?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa"
          alt="Location icon"
          style={{margin: '0 auto'}}
        />
      </address>
    )}
    
    <Divider
      variant="dotted"
      style={{
        borderColor: 'black',
        width: '100%',
      }}
    />
    
    <div className="demo-logo-vertical" />
    
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <SettingFilled />,
          label: !collapsed ? 'Submission' : '', // Hide label when collapsed
        },
        {
          key: '2',
          icon: <HomeOutlined />,
          label: !collapsed ? 'Dashboard' : '', // Hide label when collapsed
        },
        {
          key: '3',
          icon: <AuditOutlined />,
          label: !collapsed ? 'Audit Trail' : '', // Hide label when collapsed
        },
        {
          key: '4',
          icon: <InfoCircleOutlined />,
          label: !collapsed ? 'Account Info' : '', // Hide label when collapsed
        },
      ]}
    />
  </Sider>
  
  </Layout>
       
          
    );
  };
  export default Siders;