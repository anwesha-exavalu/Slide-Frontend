import React from "react";
import { Col, Table, ConfigProvider } from "antd";
import { dataSource, columns} from "./dummyData";

const FormsTable = ({theme}) => {
  return (
    <Col span={24}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerSplitColor: "transparent",
              headerBg:`${theme === 'dark'? '#121212':'transparent'}`,
              colorBgContainer:`${theme === 'dark'? '#373636':'transparent'}`,
              colorText:`${theme === 'dark'? '#D1CFCF':'black'}`,
              headerColor:`${theme === 'dark'? '#D1CFCF':'black'}`
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
