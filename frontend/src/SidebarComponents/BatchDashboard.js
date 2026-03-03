import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Upload,
  message,
  Card,
  List,
  Tag,
  Input,
} from "antd";
import {
  UploadOutlined,
  InfoCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

import { TableContainer } from "../styles/components/TableComponent";
import { Container } from "../styles/components/Layout";
import useMetaData from "../context/metaData";

const scrollCellStyle = {
  maxHeight: 55,
  overflowX: "auto",
  whiteSpace: "normal",
  wordBreak: "break-word",
};

/* =========================
   SAME TABLE WRAPPER
========================= */
const MyTableComponent = ({
  columns,
  dataSource,
  loading,
  selectedKey,
}) => {
  const { theme } = useMetaData();

  return (
    <TableContainer theme={theme}>
      <Table
        rowKey="key"
        className="custom-table-header"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ pageSize: 5 }}
        tableLayout="fixed"
        scroll={{ x: 1200 }}
        onRow={(record) => ({
          style:
            record.key === selectedKey
              ? {
                  backgroundColor: "#e6f4ff",
                  transition: "background-color 0.3s ease",
                }
              : {},
        })}
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{ color: "#fff" }} />
            ),
          },
        }}
      />
    </TableContainer>
  );
};

const BatchDashboard = () => {
  const [batchData, setBatchData] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const detailsRef = useRef(null);

  /* =========================
     SCROLL TO DETAILS
  ========================= */
  useEffect(() => {
    if (selectedKey !== null && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [selectedKey]);

  /* =========================
     BATCH UPLOAD
  ========================= */
  const handleBatchUpload = async () => {
    try {
      setLoading(true);
      const BASE_URL = process.env.REACT_APP_AI_EXTRACT;
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      const response = await fetch(
        `${BASE_URL}/api/extract_document_batch?template=wind_mit`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      setBatchData(result.results || []);
      setIsModalOpen(false);
      setFileList([]);

      message.success("Batch processed successfully");
    } catch (err) {
      message.error("Batch upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     TABLE DATA (Like Dashboard)
  ========================= */
  const tableData = batchData.map((item, index) => ({
    key: index,
    submission: item.file_name?.slice(0, 15),
    document: item.data?.metadata?.document_name || "—",
    owner: item.data?.metadata?.owner_name || "—",
    type: item.data?.metadata?.document_type || "—",
    address: item.data?.metadata?.property_address || "—",
    json: item.data,
  }));

  const getColumnFilters = (dataIndex) => {
    const uniqueValues = Array.from(
      new Set(tableData.map((r) => r[dataIndex]).filter(Boolean))
    );

    return uniqueValues.map((val) => ({
      text: String(val).length > 40 ? String(val).slice(0, 40) + "..." : val,
      value: val,
    }));
  };

  const columns = [
    {
      title: "File",
      dataIndex: "submission",
      width: 120,
      render: (text) => <div style={scrollCellStyle}>{text}</div>,
    },
    {
      title: "Document",
      dataIndex: "document",
      width: 200,
      filters: getColumnFilters("document"),
      onFilter: (value, record) => record.document === value,
      render: (text) => <div style={scrollCellStyle}>{text}</div>,
    },
    {
      title: "Owner",
      dataIndex: "owner",
      width: 160,
      filters: getColumnFilters("owner"),
      onFilter: (value, record) => record.owner === value,
      render: (text) => <div style={scrollCellStyle}>{text}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: 120,
    },
    {
      title: "Output",
      dataIndex: "key",
      width: 60,
      align: "center",
      render: (key) => (
        <InfoCircleOutlined
          style={{ fontSize: 18, color: "#1677ff", cursor: "pointer" }}
          onClick={() => setSelectedKey(key)}
        />
      ),
    },
  ];

  const selectedItem =
    selectedKey !== null ? batchData[selectedKey] : null;

  /* =========================
     RENDER
  ========================= */
  return (
    <Container>
      <MyTableComponent
        columns={columns}
        dataSource={tableData}
        loading={loading}
        selectedKey={selectedKey}
      />

      <Row>
        <Col span={24} style={{ textAlign: "right", marginTop: 16 }}>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Upload Batch PDFs
          </Button>
        </Col>
      </Row>

      {/* DETAILS VIEW (Same Layout as Dashboard) */}
      {selectedItem && (
        <div ref={detailsRef} style={{ marginTop: 24 }}>
          <Card
            title="Document Metadata"
            headStyle={{ backgroundColor: "#5d9de2", color: "#fff" }}
          >
            <Table
              columns={[
                { title: "", dataIndex: "keyName", width: "30%" },
                { title: "", dataIndex: "value" },
              ]}
              dataSource={Object.entries(
                selectedItem.data.metadata
              ).map(([key, value], i) => ({
                key: i,
                keyName: key.replace(/_/g, " ").toUpperCase(),
                value,
              }))}
              pagination={false}
              bordered
              size="small"
            />
          </Card>

          <Card
            style={{ marginTop: 16 }}
            title={`Extracted Fields (${Object.keys(
              selectedItem.data.fields
            ).length})`}
            headStyle={{ backgroundColor: "#5d9de2", color: "#fff" }}
          >
            <List
              itemLayout="vertical"
              dataSource={Object.entries(
                selectedItem.data.fields
              ).map(([name, data], i) => ({
                id: i,
                fieldName: name,
                ...data,
              }))}
              renderItem={(item) => (
                <List.Item>
                  <Row gutter={[16, 8]}>
                    <Col span={24}>
                      <strong>{item.fieldName}</strong>
                    </Col>

                    <Col span={14}>
                      <Input.TextArea
                        value={
                          Array.isArray(item.value)
                            ? item.value.join("\n\n")
                            : item.value
                        }
                        readOnly
                        autoSize={{ minRows: 2, maxRows: 6 }}
                      />
                    </Col>

                    <Col span={10} style={{ textAlign: "right" }}>
                      <Tag
                        color={
                          item.confidence_score > 0.8
                            ? "green"
                            : item.confidence_score > 0.5
                            ? "orange"
                            : "red"
                        }
                      >
                        Confidence:{" "}
                        {Math.round(item.confidence_score * 100)}%
                      </Tag>
                      <Tag>Page: {item.page}</Tag>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Card>
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        title="Upload Multiple PDFs"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setFileList([]);
        }}
        onOk={handleBatchUpload}
        okText="Process Batch"
        confirmLoading={loading}
      >
        <Upload.Dragger
          accept=".pdf"
          multiple
          fileList={fileList}
          beforeUpload={() => false}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Click or drag multiple PDF files to upload</p>
        </Upload.Dragger>
      </Modal>
    </Container>
  );
};

export default BatchDashboard;