import React from "react";
import { Row, Col } from "antd";
import { Container } from "styles/components/Layout";
import { PolicyDashboardSection } from "styles/pages/PolicyDetails";
import { useLocation } from "react-router-dom";
import MenuCard from './MenuCard';
import PolicyTabs from './PolicyTabs';
import useMetaData from "context/metaData";

const PolicyDetails = () => {
    const {theme} = useMetaData();
    const location = useLocation();
    const {isEditable} = location.state || false

  return (
    <>
      <PolicyDashboardSection theme={theme}>
        <Container>
          <Row className="row-top">
            <Col span={24} className="column-position">
              <PolicyTabs theme={theme} isEditable={isEditable} />
              <MenuCard theme={theme} policyNumber='12345'/>
            </Col>
          </Row>
        </Container>
      </PolicyDashboardSection>
    </>
  );
};

export default PolicyDetails;
