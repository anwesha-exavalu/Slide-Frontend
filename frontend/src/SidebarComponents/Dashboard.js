import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Space,
  Input,
  Row,
  Col,
  Modal,
  Upload,
  message,
} from "antd";
import {
  SearchOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
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

  /* =========================
     API CALL (DIRECT)
  ========================= */
  useEffect(() => {
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
     Table Data
  ========================= */
  const tableData = apiData.map((item) => ({
    key: item.submission_id,
    submission: item.submission_id?.slice(0, 8),
    submittedBy:
      item.llm_response?.metadata?.owner_name || "—",
    date: item.last_modified
      ? new Date(item.last_modified).toLocaleDateString()
      : "—",
    source: "PDF",
    json: "Available",
    output: item.submission_id,
  }));

  /* =========================
     Columns
  ========================= */
  const columns = [
    {
      title: "Submission",
      dataIndex: "submission",
      key: "submission",
    },
    {
      title: "Submitted by",
      dataIndex: "submittedBy",
      key: "submittedBy",
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
    },
    {
      title: "Json",
      dataIndex: "json",
      key: "json",
    },
    {
      title: "Output",
      dataIndex: "output",
      key: "output",
      align: "center",
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

      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={<Button onClick={() => setIsModalOpen(false)}>OK</Button>}
        centered
      >
        <Upload.Dragger beforeUpload={() => false} maxCount={1}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p>Click or Drag File to Upload</p>
        </Upload.Dragger>
      </Modal>
    </Container>
  );
};

export default Dashboard;
