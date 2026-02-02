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
      title: 'BI Coverage',
      dataIndex: 'building',
      key: 'building',
      align: 'center',
      sorter: (a, b) => a.building.localeCompare(b.building),
    },
    {
      title: 'PD Coverage',
      dataIndex: 'contents',
      key: 'contents',
      align: 'center',
      sorter: (a, b) => a.contents.localeCompare(b.contents),
    },
    {
      title: 'Term Prem',
      dataIndex: 'xxx',
      key: 'xxx',
      align: 'center',
      sorter: (a, b) => a.xxx - b.xxx,
    },
    {
      title: 'Policy Fee',
      dataIndex: 'icc',
      key: 'icc',
      align: 'center',
      sorter: (a, b) => a.icc - b.icc,
    },
    {
      title: 'Agency Fee',
      dataIndex: 'servFee',
      key: 'servFee',
      align: 'center',
      sorter: (a, b) => a.servFee - b.servFee,
    },
    {
      title: 'Total Prem',
      dataIndex: 'totalPrem',
      key: 'totalPrem',
      align: 'center',
      sorter: (a, b) => a.totalPrem - b.totalPrem,
    },
  ];

  const data = [
    { key: '1', building: '$25,000/$50,000', contents: '$25,000', xxx: "$102", icc: "$40", servFee: "$22", totalPrem: "$144" },
    { key: '2', building: '$50,000/$100,000', contents: '$25,000', xxx: "$156", icc: "$40", servFee: "$22", totalPrem: "$218" },
    { key: '3', building: '$50,000/$100,000', contents: '$50,000', xxx: "$156", icc: "$40", servFee: "$22", totalPrem: "$218" },
    { key: '4', building: '$100,000/$300,000', contents: '$25,000', xxx: "$213", icc: "$40", servFee: "$22", totalPrem: "$275" },
    { key: '5', building: '$100,000/$300,000', contents: '$50,000', xxx: "$213", icc: "$40", servFee: "$22", totalPrem: "$275" },
    { key: '6', building: '$100,000/$300,000', contents: '$100,000', xxx: "$213", icc: "$40", servFee: "$22", totalPrem: "$275" },
  ];

  return { columns, data };
};

export default PremiumTableConfig;