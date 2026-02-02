import { Col, ConfigProvider, Table } from 'antd';
import React from 'react';
import {dataSource,columns} from './notificationDummyData';
import useMetaData from "context/metaData";

const NotificationTable = () => {
  const {theme} = useMetaData();
  return (
    <div>
      <Col span={24}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerSplitColor: "transparent",
              headerBg:`${theme === 'dark'? '#5A5A5A':'transparent'}`,
              colorBgContainer:`${theme === 'dark'? '#373636':'transparent'}`,
              colorText:`${theme === 'dark'? '#D1CFCF':'black'}`,
              headerColor:`${theme === 'dark'? '#D1CFCF':'black'}`
            },
          },
        }}
      >
        <Table theme={theme} pagination={false} dataSource={dataSource} size="small" columns={columns} scroll={{y: 55 * 5,}} />
      </ConfigProvider>
    </Col>
    </div>
  );
}

export default NotificationTable;
