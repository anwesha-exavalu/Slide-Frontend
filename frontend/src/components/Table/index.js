import React, { useState } from "react";
import { Table } from "antd";
import {
  TableContainer,
  Tabletitle,
} from "../../styles/components/TableComponent";
import useMetaData from "../../context/metaData";
const TableComponent = ({
  title,
  columns,
  data,
  isPagination = true,
  extraContentBefore,
  extraContentAfter,
}) => {
  const { theme } = useMetaData();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  return (
    <>
      <TableContainer theme={theme}>
        <Tabletitle>{title}</Tabletitle>
        {extraContentBefore && (
          <div className="extra-content-before">{extraContentBefore}</div>
        )}
        <Table
          columns={columns}
          dataSource={data}
          pagination={isPagination ? tableParams.pagination : false}
          onChange={handleTableChange}
          rowKey="key"
          onRow={(record) => ({
            style: {
              backgroundColor: record.highlight ? "#eef6ff" : "transparent",
              transition: "background-color 0.3s ease",
            },
          })}
        />
        {extraContentAfter && (
          <div className="extra-content-after">{extraContentAfter}</div>
        )}
      </TableContainer>
    </>
  );
};
export default TableComponent;
