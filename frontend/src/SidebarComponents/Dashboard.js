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
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import XLSX from "sheetjs-style";

import "./Dashboard.css";
import "./Table.css";

import { TableContainer } from "../styles/components/TableComponent";
import { Container } from "../styles/components/Layout";
import useMetaData from "../context/metaData";

/* =========================
   Table Wrapper (UNCHANGED)
========================= */
const MyTableComponent = ({
  columns,
  dataSource,
  loading,
  selectedSubmissionId,
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
        tableLayout="fixed"              // ✅ ADD THIS
        scroll={{ x: 1200 }}
        onRow={(record) => ({
          style:
            record.key === selectedSubmissionId
              ? {
                backgroundColor: "#e6f4ff",
                transition: "background-color 0.3s ease",
              }
              : {},
        })}
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
const scrollCellStyle = {
  maxHeight: 55,
  overflowX: "auto",
  whiteSpace: "normal",
  wordBreak: "break-word",
};

const Dashboard = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [selectedJson, setSelectedJson] = useState(null);

  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [selectedExcelData, setSelectedExcelData] = useState(null);

  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
  const [fileList, setFileList] = useState([]);
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
          `${BASE_URL}/api/get_extracted_documents?template=wind_mit`
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
      }, 100);
    }
  }, [selectedSubmissionId]);


  /* =========================
     Excel Helpers
  ========================= */
  const buildExcelRows = (json) => {
    if (!json) return [];

    const rows = [];
    const fields = json.fields || {};

    Object.entries(fields).forEach(([fieldName, data]) => {
      const rawValue = data?.value;
      const confidence =
        data?.confidence_score != null
          ? `${Math.round(data.confidence_score * 100)}%`
          : "—";
      const page = data?.page ?? "—";
      const LLMConfidence= data?.llm_confidence_score != null
        ? `${Math.round(data.llm_confidence_score * 100)}%`
        : "—";
      let combinedValue = "";

      if (Array.isArray(rawValue)) {
        // Combine array values into single multi-line string
        combinedValue = rawValue
          .map((val) => String(val ?? ""))
          .join("\n\n");
      } else {
        combinedValue = String(rawValue ?? "");
      }

      rows.push({
        Field: fieldName,
        Value: combinedValue,
        document: json.metadata?.document_name || "—",
        "Confidence Score": confidence,
        "LLM Confidence": LLMConfidence,
        Page: page,
      });
    });

    return rows;
  };

const downloadExcel = (json,filename = `${json?.metadata?.document_name}`) => {
  if (!json) return;

  const wb = XLSX.utils.book_new();
  const ws = {};

  const fields = json.fields || {};
  const fieldNames = Object.keys(fields);

  const maxRows = Math.max(
    ...fieldNames.map((field) =>
      Array.isArray(fields[field]?.value)
        ? fields[field].value.length
        : 1
    )
  );

  const headers = ["Document Name", "Field", "Value"];

  // Header row
  headers.forEach((header, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    ws[cellRef] = {
      v: header,
      s: headerStyle(),
    };
  });

  const merges = [];
  let rowIndex = 1;

  Object.entries(fields).forEach(([fieldName, data]) => {
    const values = Array.isArray(data?.value)
      ? data.value
      : [data?.value];

    const startRow = rowIndex;

    values.forEach((val, index) => {
      ws[XLSX.utils.encode_cell({ r: rowIndex, c: 0 })] = {
        v: index === 0 ? filename : "",
        s: cellStyle(),
      };

      ws[XLSX.utils.encode_cell({ r: rowIndex, c: 1 })] = {
        v: index === 0 ? fieldName : "",
        s: cellStyle(),
      };

      ws[XLSX.utils.encode_cell({ r: rowIndex, c: 2 })] = {
        v: val ?? "",
        s: cellStyle(),
      };

      rowIndex++;
    });

    const endRow = rowIndex - 1;

    if (endRow > startRow) {
      merges.push({
        s: { r: startRow, c: 1 },
        e: { r: endRow, c: 1 },
      });
    }
  });

  // Merge Document Name column
  if (rowIndex > 2) {
    merges.push({
      s: { r: 1, c: 0 },
      e: { r: rowIndex - 1, c: 0 },
    });
  }

  ws["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: rowIndex - 1, c: 2 },
  });

  ws["!merges"] = merges;

  ws["!cols"] = [
    { wch: 28 },
    { wch: 30 },
    { wch: 70 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Extracted Data");
  XLSX.writeFile(wb, `${filename}_extracted.xlsx`);
};

const headerStyle = () => ({
  font: { bold: true, color: { rgb: "FFFFFF" } },
  fill: { fgColor: { rgb: "217346" } },
  alignment: { horizontal: "center", vertical: "center", wrapText: true },
  border: {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  },
});



  // Reusable Cell Style
  const cellStyle = () => ({
    alignment: { vertical: "top", wrapText: true },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  });

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
  const getColumnFilters = (dataIndex) => {
    const uniqueValues = Array.from(
      new Set(tableData.map((r) => r[dataIndex]).filter(Boolean))
    );

    return uniqueValues.map((val) => ({
      text: String(val).length > 40 ? String(val).slice(0, 40) + "..." : val,
      value: val,
    }));
  }
  /* =========================
     Columns
  ========================= */
  const columns = [
    { title: "SubmissionID", dataIndex: "submission", width: 100 },
    {
      title: "Submitted by", dataIndex: "submittedBy", width: 120, filters: getColumnFilters("submittedBy"),
      onFilter: (value, record) => record.submittedBy === value,
      render: (text) => (
        <div style={scrollCellStyle}>{text}</div>
      ),
    },
    {
      title: "Document",
      dataIndex: "document",
      width: 200,
      filters: getColumnFilters("document"),
      onFilter: (value, record) => record.document === value,
      render: (text) => (
        <div style={scrollCellStyle}>{text}</div>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
      width: 100,
      filters: getColumnFilters("date"),
      onFilter: (value, record) => record.date === value,
    },

    {
      title: "Source",
      dataIndex: "source",
      width: 80,
      align: "center",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <FilePdfOutlined style={{ color: "#f84434" }} />
            View
          </a>
        ) : (
          "—"
        ),
    },
    {
      title: "Excel",
      dataIndex: "json",
      width: 80,
      render: (json) =>
        json ? (
          <Button
            type="link"
            icon={<FileExcelOutlined style={{ color: "#217346" }} />}
            onClick={() => {
              setSelectedExcelData(json);
              setExcelModalOpen(true);
            }}
          >
            View
          </Button>
        ) : (
          "—"
        ),
    },
    // {
    //   title: "JSON",
    //   dataIndex: "json",
    //   render: (json) =>
    //     json ? (
    //       <Button
    //         type="link"
    //         onClick={() => {
    //           setSelectedJson(json);
    //           setJsonModalOpen(true);
    //         }}
    //       >
    //         View
    //       </Button>
    //     ) : (
    //       "—"
    //     ),
    // },
    {
      title: "Output",
      dataIndex: "output",
      width: 50,
      align: "center",
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

  const fieldList = Object.entries(fields).map(([name, data], i) => ({
    id: i,
    fieldName: name,
    ...data,
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
        selectedSubmissionId={selectedSubmissionId}
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

                    <Col span={14}>
                      {String(item.value).length > 120 ? (
                        <Input.TextArea
                          value={item.value}
                          readOnly
                          autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                      ) : (
                        <Input value={item.value} readOnly />
                      )}
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
                      <Tag
                        color={
                          item.llm_confidence_score > 0.8
                            ? "green"
                            : item.llm_confidence_score > 0.5
                              ? "orange"
                              : "red"
                        }
                      >
                        LLM Confidence: {" "}
                        {Math.round(item.llm_confidence_score * 100)}%
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
        title="Upload File"
        open={isModalOpen}
        destroyOnClose
        onCancel={() => {
          setIsModalOpen(false);
          setFileList([]);
        }}
        afterClose={() => {
          setFileList([]);
        }}
        footer={null}
      >
        <Upload.Dragger
          accept=".pdf"
          multiple={false}
          maxCount={1}
          fileList={fileList}
          beforeUpload={(file) => {
            // Block if one file already exists
            if (fileList.length >= 1) {
              message.error("Multiple files can't be uploaded");
              return Upload.LIST_IGNORE;
            }

            // Allow only PDF
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
              message.error("Only PDF files are allowed");
              return Upload.LIST_IGNORE;
            }

            return true;
          }}
          onChange={({ fileList }) => {
            // Do NOT auto-replace existing file
            if (fileList.length <= 1) {
              setFileList(fileList);
            }
          }}
          onRemove={() => setFileList([])}
          customRequest={async ({ file, onSuccess, onError }) => {
            try {
              const BASE_URL = process.env.REACT_APP_AI_EXTRACT;
              const formData = new FormData();
              formData.append("file", file);

              const response = await fetch(
                `${BASE_URL}/api/extract_document?template=wind_mit`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              const result = await response.json();

              setApiData((prev) => [...prev, result]);
              setSelectedSubmissionId(result.submission_id);

              setFileList([]);
              setIsModalOpen(false);

              message.success("PDF processed successfully");
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
          <p>Click or drag PDF file to upload</p>
        </Upload.Dragger>
      </Modal>

      {/* Excel Modal */}
      <Modal
        title={
          <Row justify="space-between" align="middle">
            <Col><FileExcelOutlined style={{ color: "#217346", marginRight: 8 }} />Extracted Data (Excel Preview)</Col>
            <Col>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => downloadExcel(selectedExcelData)}
                style={{ marginRight: 24 }}
              >
                Download Excel
              </Button>
            </Col>
          </Row>
        }
        open={excelModalOpen}
        onCancel={() => setExcelModalOpen(false)}
        footer={null}
        width={860}
      >
        {selectedExcelData && (() => {
          const rows = buildExcelRows(selectedExcelData);
          const excelColumns = [
            {
              title: "Field", dataIndex: "Field", key: "Field", width: 220,
              onHeaderCell: () => ({ style: { backgroundColor: "#217346", color: "#fff" } })
            },
            {
              title: "Value", dataIndex: "Value", key: "Value",
              render: (val) => <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{val}</span>,
              onHeaderCell: () => ({ style: { backgroundColor: "#217346", color: "#fff" } })
            },
            // {
            //   title: "Confidence Score", dataIndex: "Confidence Score", key: "conf", width: 140,
            //   render: (val) => {
            //     if (!val) return null;
            //     const num = parseInt(val);
            //     const color = num > 80 ? "green" : num > 50 ? "orange" : "red";
            //     return <Tag color={color}>{val}</Tag>;
            //   },
            //   onHeaderCell: () => ({ style: { backgroundColor: "#217346", color: "#fff" } })
            // },
            // {
            //   title: "Page", dataIndex: "Page", key: "page", width: 70,
            //   render: (val) => val ? <Tag>{val}</Tag> : null,
            //   onHeaderCell: () => ({ style: { backgroundColor: "#217346", color: "#fff" } })
            // },
          ];
          return (
            <Table
              columns={excelColumns}
              dataSource={rows.map((r, i) => ({ ...r, key: i }))}
              pagination={{ pageSize: 15 }}
              size="small"
              bordered
              scroll={{ y: 420 }}
            />
          );
        })()}
      </Modal>

      {/* JSON Modal */}
      {/* <Modal
        title="LLM Response"
        open={jsonModalOpen}
        onCancel={() => setJsonModalOpen(false)}
        footer={null}
        width={900}
      >
        <pre style={{ maxHeight: 500, overflow: "auto" }}>
          {JSON.stringify(selectedJson, null, 2)}
        </pre>
      </Modal> */}
    </Container>
  );
};

export default Dashboard;