import React from "react";
import { Col, Table, ConfigProvider } from "antd";
import { dataSource, columns} from "./dummyData";

const FormsTable = () => {
  return (
    <Col span={24}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerSplitColor: "transparent",
            },
          },
        }}
      >
        <Table pagination={false} dataSource={dataSource} columns={columns} />
      </ConfigProvider>
    </Col>
  );
};
export default FormsTable;
