import React from "react";
import { Card, Row, Col, Table, ConfigProvider } from "antd";
import { PolicyDashboardDescription } from 'styles/pages/PolicyDetails';
import {dataSource,columns} from './formsDummyData'
import useMetaData from "context/metaData";

const FormsTable = () => {
	const {theme}=useMetaData();
  
  return (
    <PolicyDashboardDescription theme={theme}>
      <Card className="ant-card-description forms-tab">
        <h3>Forms</h3>
        <Row>
          <Col span={24} className='form-container'>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerSplitColor: "transparent",
                  },
                },
              }}
            >
              <Table pagination={false} dataSource={dataSource} columns={columns} className="form-width" />
            </ConfigProvider>
          </Col>
        </Row>
      </Card>
    </PolicyDashboardDescription>
  );
};
export default FormsTable;
