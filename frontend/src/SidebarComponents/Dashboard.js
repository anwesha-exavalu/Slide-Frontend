import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Upload,
  message,
} from "antd";
import {
  UploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import "./Table.css";
import { TableContainer } from "../styles/components/TableComponent";
import useMetaData from "../context/metaData";
import { Container } from "../styles/components/Layout";

/* =========================
   Table Wrapper
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
        pagination
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
   Dashboard
========================= */
const Dashboard = () => {
  const navigate = useNavigate();
  const searchInput = useRef(null);

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // JSON modal state
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [selectedJson, setSelectedJson] = useState(null);

  /* =========================
     API CALL (UNCHANGED)
  ========================= */
  const hasFetchedRef = useRef(false);

useEffect(() => {
  if (hasFetchedRef.current) return; 

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const BASE_URL = process.env.REACT_APP_AI_EXTRACT;
      const response = await fetch(
        `${BASE_URL}/api/get_extracted_documents`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      setApiData(result.submission_list || []);

      hasFetchedRef.current = true; 
    } catch (error) {
      console.error("API fetch failed:", error);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  fetchDocuments();
}, []);



  /* =========================
     Table Data (FIXED)
  ========================= */
  const tableData = apiData.map((item) => ({
    key: item.submission_id,
    submission: item.submission_id?.slice(0, 8),
    submittedBy: item.llm_response?.metadata?.owner_name || "—",
    document: item.llm_response?.metadata?.document_name || "—",
    date: item.last_modified
      ? new Date(item.last_modified).toLocaleDateString()
      : "—",

    // ✅ presigned S3 URL
    source: item.pdf_s3_uri,

    // ✅ full LLM response
    json: item.llm_response,

    output: item.submission_id,
  }));

  /* =========================
     Columns (FIXED)
  ========================= */
  const columns = [
    {
      title: "Submission ID",
      dataIndex: "submission",
      key: "submission",
    },
    {
      title: "Submitted by",
      dataIndex: "submittedBy",
      key: "submittedBy",
      width: 100
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
      width: 250,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: 100,
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
      key: "json",
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
      key: "output",
      // align: "center",
      render: (submissionId) => (
        <InfoCircleOutlined
          style={{ fontSize: 18, color: "#1677ff", cursor: "pointer" }}
          onClick={() =>
            navigate("/document-processing", {
              state: { submissionId, apiData },
            })
          }
        />
      ),
    },
  ];

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

      {/* Upload Modal */}
      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={<Button onClick={() => setIsModalOpen(false)}>OK</Button>}
        centered
      >
        <Upload.Dragger
          name="file"
          multiple={false}
          // showUploadList={false}
          customRequest={async ({ file, onSuccess, onError }) => {
            try {
              const BASE_URL = process.env.REACT_APP_AI_EXTRACT;

              const formData = new FormData();
              formData.append("file", file);

              // 🔥 Call extract API
              const response = await fetch(
                `${BASE_URL}/api/extract_document`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              if (!response.ok) {
                throw new Error(`Upload failed: ${response.status}`);
              }

              const extractedResult = await response.json();

              message.success("File uploaded and processed successfully");
              setIsModalOpen(false);

              /**
               * ✅ IMPORTANT PART
               * We pass the SAME structure Sublob2 already expects
               */
              navigate("/document-processing", {
                state: {
                  submissionId: extractedResult.submission_id,
                  apiData: [extractedResult], // 👈 wrap in array
                },
              });

              onSuccess();
            } catch (err) {
              console.error("Upload failed:", err);
              message.error("File upload failed");
              onError(err);
            }
          }}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Click or Drag File to Upload</p>
        </Upload.Dragger>
      </Modal>

      {/* JSON Viewer Modal */}
      <Modal
        title="LLM Response"
        open={jsonModalOpen}
        onCancel={() => setJsonModalOpen(false)}
        footer={null}
        width={900}
      >
        {/* Copy Button */}
        <div style={{ textAlign: "right", marginBottom: 8 }}>
          <Button
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(selectedJson, null, 2)
              );
              message.success("JSON copied to clipboard");
            }}
          >
            Copy JSON
          </Button>
        </div>

        <pre
          style={{
            maxHeight: 500,
            overflow: "auto",
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 6,
          }}
        >
          {JSON.stringify(selectedJson, null, 2)}
        </pre>
      </Modal>

    </Container>
  );
};

export default Dashboard;