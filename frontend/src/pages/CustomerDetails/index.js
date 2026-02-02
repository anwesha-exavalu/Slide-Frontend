import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row } from "antd";
import { Container } from "styles/pages/Login";
import TableComponent from "components/Table";
import { columns, dataSource } from "./dummyData";
import editIcon from "assets/svg/edit-white.svg";
import filterIcon from "assets/svg/filter.svg";
import FormControl from "components/FormControl/FormInput";
import useMetaData from "context/metaData";

import {
  SearchPolicySection,
  SearchPolicyTitle,
  FormSection,
} from "styles/pages/SearchPolicy";
import DetailsModal from "./detailsModal";

const CustomerDetails = () => {
  const {theme}=useMetaData();
  const [open, setOpen] = useState(false);
  const [selectedInsured, setSelectedInsured] = useState(null);

  const detailsModalOpen = (insuredData) => {
    setSelectedInsured(insuredData);
    setOpen(true);
  };
  return (
    <SearchPolicySection theme={theme}>
      <Container>
        <div className="topsection">
          <div>
            <SearchPolicyTitle theme={theme}>Customer Details</SearchPolicyTitle>
            <p className="subtext">
            Update contact, address or vehicle details here. Keeping things current
helps us serve customers better!
                        </p>
          </div>
        </div>
        <FormSection theme={theme} className="ant-card-body">
          <Card>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={6}>
                  <FormControl label="Name/Email:" name="nameEmail" placeholder="" />
                </Col>
                <Col span={6}>
                  <FormControl label="Policy Number:" name="policyNumber" placeholder="" />
                </Col>
                <Col span={6}>
                  <FormControl label="Type:" name="type" placeholder="" />
                </Col>
                <Col span={6}>
                  <FormControl label="XXX:" name="XXX" placeholder="" />
                </Col>
                <Col span={6}>
                  <FormControl label="Agent/CSR:" name="Agent/CSR" placeholder="" />
                </Col>
                <Col span={6}>
                  <FormControl label="Phones:" name="Phones" placeholder="" />
                </Col>
                <Col span={12}>
                  <div className="search-btn-box">
                    <Button
                      color="default"
                      variant="solid"
                      className="search-btn"
                    >
                      <SearchOutlined /> Search
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card>
        </FormSection>
        <FormSection theme={theme}>
          <TableComponent 
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>List of Insureds</span>
                <div style={{ display: "flex", gap: "17px" }}>
                  <img
                    src={editIcon}
                    alt="Insureds Icon"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <img
                    src={filterIcon}
                    alt="Insureds Icon"
                    style={{ width: "18px", height: "18px" }}
                  />
                </div>
              </div>
            }
            onClickOpenmodal={detailsModalOpen}
            columns={columns(detailsModalOpen)}
            data={dataSource}
          />
        </FormSection>
        <DetailsModal selectedInsured={selectedInsured} setOpen={setOpen} open={open} />
      </Container>
    </SearchPolicySection>
  );
};

export default CustomerDetails;
