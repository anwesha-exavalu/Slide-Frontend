import React, { useState } from "react";
import { Layout } from "antd";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom"; 
import Navbar from "components/Navbar/PrivateNavbar";
import Footer from "components/Footer/PrivateFooter";
import { MainSection } from "styles/components/Layout";
import useMetaData from "context/metaData";

const { Content } = Layout;

const PrivateLayout = ({ children }) => {
  const {theme} = useMetaData();
  const [collapsed, setCollapsed] = useState(true);
 
  const childrenToRender = React.Children.toArray(children);
  const location = useLocation();
  const isSpecialRoute = location.pathname === '/expire-reports' || location.pathname === '/issue-policy'; 

  return (
    <MainSection theme={theme}>
    <div style={{overflow: 'hidden'}}>
    <Layout className="handle-sidebar">
      <Layout className="layout-composition">
      {!isSpecialRoute && (
            <Navbar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          )}
        <Content
          className="mob-layout"
          style={{
            overflow: "auto",
            margin: "0px 0px 0px 0px",
            padding: 0,
            minHeight: 280,
          }}
        >
          {childrenToRender.map((child) =>
            React.cloneElement(child, {
              
            })
          )}
        </Content>
        {!isSpecialRoute && <Footer />} 
      </Layout>
    </Layout>
    </div>
    </MainSection>
  );
};

PrivateLayout.prototype = {
  collapsed: PropTypes.bool.isRequired
}
export default PrivateLayout;
