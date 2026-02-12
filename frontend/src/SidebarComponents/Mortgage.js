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
} from "@ant-design/icons";

import "./Dashboard.css";
import "./Table.css";

import { TableContainer } from "../styles/components/TableComponent";
import { Container } from "../styles/components/Layout";
import useMetaData from "../context/metaData";

/* =========================
   CONSTANT TEMPLATE
========================= */

/* =========================
   Table Wrapper (UNCHANGED)
========================= */
const MyTableComponent = ({ columns, dataSource, loading }) => {
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
        components={{
          header: {
            cell: (props) => (
              <th {...props} style={{ color: "#fff", fontFamily: "inherit" }} />
            ),
          },
        }}
      />
    </TableContainer>
  );
};

/* =========================
   COMBINED COMPONENT
========================= */
const DashboardMortgage = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [selectedJson, setSelectedJson] = useState(null);

  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  const hasFetchedRef = useRef(false);
  const detailsRef = useRef(null);

  /* =========================
     API CALL (UNCHANGED)
  ========================= */
  useEffect(() => {
    if (hasFetchedRef.current) return;

    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const BASE_URL = process.env.REACT_APP_AI_EXTRACT;

        const response = await fetch(
          `${BASE_URL}/api/get_extracted_documents?template=mortgage`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        setApiData(result.submission_list || []);
        hasFetchedRef.current = true;
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);
  useEffect(() => {
    if (selectedSubmissionId && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100); // small delay ensures render completes
    }
  }, [selectedSubmissionId]);

  /* =========================
     Table Data
  ========================= */
  const tableData = apiData.map((item) => ({
    key: item.submission_id,
    submission: item.submission_id?.slice(0, 8),
    submittedBy: item.llm_response?.metadata?.owner_name || "—",
    document: item.llm_response?.metadata?.document_name || "—",
    date: item.last_modified
      ? new Date(item.last_modified).toLocaleDateString()
      : "—",
    source: item.pdf_s3_uri,
    json: item.llm_response,
    output: item.submission_id,
  }));

  /* =========================
     Columns
  ========================= */
  const columns = [
    { title: "Submission ID", dataIndex: "submission" },
    { title: "Submitted by", dataIndex: "submittedBy", width: 120 },
    { title: "Document", dataIndex: "document", width: 250 },
    { title: "Date", dataIndex: "date" },
    {
      title: "Source",
      dataIndex: "source",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        ) : (
          "—"
        ),
    },
    {
      title: "JSON",
      dataIndex: "json",
      render: (json) =>
        json ? (
          <Button
            type="link"
            onClick={() => {
              setSelectedJson(json);
              setJsonModalOpen(true);
            }}
          >
            View
          </Button>
        ) : (
          "—"
        ),
    },
    {
      title: "Output",
      dataIndex: "output",
      render: (submissionId) => (
        <InfoCircleOutlined
          style={{ fontSize: 18, color: "#1677ff", cursor: "pointer" }}
          onClick={() => setSelectedSubmissionId(submissionId)}
        />
      ),
    },
  ];

  /* =========================
     Selected Submission
  ========================= */
  const submission = apiData.find(
    (item) => item.submission_id === selectedSubmissionId
  );

  const metadata = submission?.llm_response?.metadata || {};
  const fields = submission?.llm_response?.fields || {};

  const metaDataSource = Object.entries(metadata).map(([key, value], i) => ({
    key: i,
    keyName: key.replace(/_/g, " ").toUpperCase(),
    value,
  }));

  const fieldList = Object.entries(fields).map(([name, values], i) => ({
    id: i,
    fieldName: name,
    values: Array.isArray(values) ? values : [],
  }));


  /* =========================
     RENDER
  ========================= */
  return (
    <Container>
      <MyTableComponent
        columns={columns}
        dataSource={tableData}
        loading={loading}
      />

      <Row>
        <Col span={24} style={{ textAlign: "right", marginTop: 16 }}>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Upload
          </Button>
        </Col>
      </Row>

      {/* =========================
          DETAILS VIEW (Sublob2)
      ========================= */}
      {submission && (
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
              dataSource={metaDataSource}
              pagination={false}
              bordered
              size="small"
            />
          </Card>

          <Card
            style={{ marginTop: 16 }}
            title={`Extracted Fields (${fieldList.length})`}
            headStyle={{ backgroundColor: "#5d9de2", color: "#fff" }}
          >
            <List
              itemLayout="vertical"
              dataSource={fieldList}
              renderItem={(item) => (
                <List.Item>
                  <Row gutter={[16, 8]}>
                    <Col span={24}>
                      <strong>{item.fieldName}</strong>
                    </Col>

                    <Col span={24}>
                      {item.values.map((fieldItem, index) => (
                        <Row key={index} gutter={[16, 8]} style={{ marginBottom: 12 }}>

                          <Col span={14}>
                            {String(fieldItem.value || "").length > 120 ? (
                              <Input.TextArea
                                value={fieldItem.value}
                                readOnly
                                autoSize={{ minRows: 2, maxRows: 6 }}
                              />
                            ) : (
                              <Input value={fieldItem.value} readOnly />
                            )}
                          </Col>

                          <Col span={10} style={{ textAlign: "right" }}>
                            <Tag
                              color={
                                fieldItem.confidence_score > 0.8
                                  ? "green"
                                  : fieldItem.confidence_score > 0.5
                                    ? "orange"
                                    : "red"
                              }
                            >
                              Confidence: {Math.round((fieldItem.confidence_score || 0) * 100)}%
                            </Tag>

                            <Tag>
                              Page: {fieldItem.page ?? "—"}
                            </Tag>
                          </Col>

                        </Row>
                      ))}
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
        title="Upload File"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Upload.Dragger
          customRequest={async ({ file, onSuccess, onError }) => {
            try {
              const BASE_URL = process.env.REACT_APP_AI_EXTRACT;
              const formData = new FormData();
              formData.append("file", file);

              const response = await fetch(
                `${BASE_URL}/api/extract_document?template=mortgage`,
                { method: "POST", body: formData }
              );

              const result = await response.json();
              setApiData((prev) => [...prev, result]);
              setSelectedSubmissionId(result.submission_id);
              setIsModalOpen(false);
              message.success("File processed successfully");
              onSuccess();
            } catch (err) {
              message.error("Upload failed");
              onError(err);
            }
          }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Click or drag file to upload</p>
        </Upload.Dragger>
      </Modal>

      {/* JSON Modal */}
      <Modal
        title="LLM Response"
        open={jsonModalOpen}
        onCancel={() => setJsonModalOpen(false)}
        footer={null}
        width={900}
      >
        <pre style={{ maxHeight: 500, overflow: "auto" }}>
          {JSON.stringify(selectedJson, null, 2)}
        </pre>
      </Modal>
    </Container>
  );
};

export default DashboardMortgage;
