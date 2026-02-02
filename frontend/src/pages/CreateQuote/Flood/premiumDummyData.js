import React from 'react'
import { Radio } from 'antd';

const PremiumTableConfig = (selectedRowKey, setSelectedRowKey) => {
  const columns = [
    {
      title: '',
      dataIndex: 'radio',
      key: 'radio',
      render: (text, record) => (
        <Radio
          checked={selectedRowKey === record.key}
          onChange={() => setSelectedRowKey(record.key)}
        />
      ),
      width: 50,
    },
    {
      title: 'Building',
      dataIndex: 'building',
      key: 'building',
      align: 'center',
      sorter: (a, b) => a.building.localeCompare(b.building),
    },
    {
      title: 'Contents',
      dataIndex: 'contents',
      key: 'contents',
      align: 'center',
      sorter: (a, b) => a.contents.localeCompare(b.contents),
    },
    {
      title: 'Prem',
      dataIndex: 'xxx',
      key: 'xxx',
      align: 'center',
      sorter: (a, b) => a.xxx - b.xxx,
    },
    {
      title: 'ICC',
      dataIndex: 'icc',
      key: 'icc',
      align: 'center',
      sorter: (a, b) => a.icc - b.icc,
    },
    {
      title: 'ServFee',
      dataIndex: 'servFee',
      key: 'servFee',
      align: 'center',
      sorter: (a, b) => a.servFee - b.servFee,
    },
    {
      title: 'TotalPrem',
      dataIndex: 'totalPrem',
      key: 'totalPrem',
      align: 'center',
      sorter: (a, b) => a.totalPrem - b.totalPrem,
    },
  ];

  const data = [
    { key: '1', building: '20,000', contents: '8,000', xxx: 102, icc: 5, servFee: 22, totalPrem: 129 },
    { key: '2', building: '30,000', contents: '12,000', xxx: 156, icc: 5, servFee: 22, totalPrem: 153 },
    { key: '3', building: '50,000', contents: '20,000', xxx: 213, icc: 5, servFee: 22, totalPrem: 240 },
    { key: '4', building: '70,000', contents: '30,000', xxx: 254, icc: 5, servFee: 22, totalPrem: 281 },
    { key: '5', building: '100,000', contents: '40,000', xxx: 284, icc: 5, servFee: 22, totalPrem: 312 },
    { key: '6', building: '125,000', contents: '50,000', xxx: 307, icc: 5, servFee: 22, totalPrem: 334 },
    { key: '7', building: '150,000', contents: '60,000', xxx: 329, icc: 5, servFee: 22, totalPrem: 356 },
    { key: '8', building: '200,000', contents: '80,000', xxx: 363, icc: 5, servFee: 22, totalPrem: 390 },
    { key: '9', building: '250,000', contents: '100,000', xxx: 387, icc: 5, servFee: 22, totalPrem: 414 },
  ];

  return { columns, data };
};

export default PremiumTableConfig;