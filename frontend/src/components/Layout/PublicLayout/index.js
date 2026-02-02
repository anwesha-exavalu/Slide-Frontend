import React, { useState } from "react";
import { Layout, theme } from "antd";
import PropTypes from "prop-types";

import Navbar from "components/Navbar/PublicNavbar";
import Footer from "components/Footer/PublicFooter";

const { Content } = Layout;

const PublicLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [userDetails, setUserDetails] = useState({});

  const childrenToRender = React.Children.toArray(children);

  return (
    <div style={{ overflow: "hidden" }}>
      <Layout className="handle-sidebar">
        <Layout className="layout-composition" style={{ minHeight: "100vh" }}>
          <Navbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            colorBgContainer={colorBgContainer}
          />
          <Content
            className="mob-layout"
            style={{
              overflow: "auto",
              minHeight: 280,
              background: "#fff",
            }}
          >
            {childrenToRender.map((child) =>
              React.cloneElement(child, {
                userDetails,
                setUserDetails,
              })
            )}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

PublicLayout.prototype = {
  collapsed: PropTypes.bool.isRequired,
};
export default PublicLayout;
