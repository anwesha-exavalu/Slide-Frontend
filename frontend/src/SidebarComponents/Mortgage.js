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
  FilePdfOutlined
} from "@ant-design/icons";
import XLSX from "sheetjs-style";

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

const DashboardMortgage = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // JSON modal state (kept but commented out from column — preserved below)
  const [jsonModalOpen, setJsonModalOpen] = useState(false);
  const [selectedJson, setSelectedJson] = useState(null);

  // Excel modal state
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [selectedExcelData, setSelectedExcelData] = useState(null); // { json, documentName }

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
      }, 100);
    }
  }, [selectedSubmissionId]);

  /* =========================
     Excel Helper: Build flat rows from llm_response
  ========================= */
  const buildExcelRows = (json) => {
    if (!json) return [];
    const fields = json.fields || {};
    const rows = [];

    Object.entries(fields).forEach(([fieldName, values]) => {
      const valueArray = Array.isArray(values) ? values : [];
      if (valueArray.length === 0) {
        rows.push({
          "Field Name": fieldName,
          Value: "",
          "Confidence Score": "",
          "LLM Confidence Score": "",
          "Page Number": "",
        });
      } else {
        valueArray.forEach((item, idx) => {
          rows.push({
            "Field Name": idx === 0 ? fieldName : "",
            Value: item.value ?? "",
            "Confidence Score":
              item.confidence_score !== undefined
                ? `${Math.round(item.confidence_score * 100)}%`
                : "",
            "LLM Confidence Score": item.llm_confidence_score !== undefined ? `${Math.round(item.llm_confidence_score * 100)}%` : "",
            "Page Number": item.page ?? "",
          });
        })
      }
    });

    return rows;
  };

  /* =========================
     Excel Helper: Download xlsx file
  ========================= */
  const handleDownloadExcel = (json, documentName) => {
    if (!json) return;

    const wb = XLSX.utils.book_new();
    const ws = {};

    const fields = json.fields || {};

    const specialMergeFields = [
      "Current Mortgagee Company",
      "Address of Mortgagee Company",
    ];

    const fieldNames = Object.keys(fields);

    const maxRows = Math.max(
      ...fieldNames.map((field) =>
        Array.isArray(fields[field]) ? fields[field].length : 1
      )
    );

    const headers = ["Document Name", ...fieldNames];

    // Header Row
    headers.forEach((header, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
      ws[cellRef] = {
        v: header,
        s: headerStyle(),
      };
    });

    const merges = [];

    for (let r = 0; r < maxRows; r++) {
      const rowIndex = r + 1;

      // Document Name column
      ws[XLSX.utils.encode_cell({ r: rowIndex, c: 0 })] = {
        v: r === 0 ? documentName : "",
        s: cellStyle(),
      };

      fieldNames.forEach((field, colIndex) => {
        const valueArray = Array.isArray(fields[field])
          ? fields[field]
          : [fields[field]];

        const value = valueArray[r]?.value ?? "";

        ws[XLSX.utils.encode_cell({ r: rowIndex, c: colIndex + 1 })] = {
          v: value,
          s: cellStyle(),
        };
      });
    }

    // Merge Document Name vertically
    if (maxRows > 1) {
      merges.push({
        s: { r: 1, c: 0 },
        e: { r: maxRows, c: 0 },
      });
    }

    // Merge special fields vertically if single value
    specialMergeFields.forEach((field) => {
      const fieldIndex = headers.indexOf(field);
      const values = fields[field];

      if (
        fieldIndex !== -1 &&
        (!Array.isArray(values) || values.length <= 1) &&
        maxRows > 1
      ) {
        merges.push({
          s: { r: 1, c: fieldIndex },
          e: { r: maxRows, c: fieldIndex },
        });
      }
    });

    ws["!ref"] = XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: maxRows, c: headers.length - 1 },
    });

    ws["!merges"] = merges;

    ws["!cols"] = headers.map(() => ({ wch: 28 }));

    XLSX.utils.book_append_sheet(wb, ws, "Mortgage Extracted Data");
    XLSX.writeFile(wb, `${documentName}_extracted.xlsx`);
  };


  // Header Style
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

  // Normal Cell Style
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
    excelJson: item.llm_response,
    documentName: item.llm_response?.metadata?.document_name || "extracted",
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
  };
  const buildMortgagePreviewRows = (json, documentName) => {
    if (!json) return [];

    const fields = json.fields || {};
    const fieldNames = Object.keys(fields);

    const maxRows = Math.max(
      ...fieldNames.map((field) =>
        Array.isArray(fields[field]) ? fields[field].length : 1
      )
    );

    const rows = [];

    for (let r = 0; r < maxRows; r++) {
      const row = {};

      row["Document Name"] = r === 0 ? documentName : "";

      fieldNames.forEach((field) => {
        const valueArray = Array.isArray(fields[field])
          ? fields[field]
          : [fields[field]];

        row[field] = valueArray[r]?.value ?? "";
      });

      rows.push(row);
    }

    return rows;
  };
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
    /* ── JSON column (kept, commented out) ──────────────────────────
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
    ─────────────────────────────────────────────────────────────── */
    {
      title: "Excel",
      dataIndex: "excelJson",
      width: 80,
      render: (json, record) =>
        json ? (
          <Button
            type="link"
            icon={<FileExcelOutlined style={{ color: "#217346" }} />}
            onClick={() => {
              setSelectedExcelData({
                json,
                documentName: record.documentName,
              });
              setExcelModalOpen(true);
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

  const fieldList = Object.entries(fields).map(([name, values], i) => ({
    id: i,
    fieldName: name,
    values: Array.isArray(values) ? values : [],
  }));

  /* =========================
     Excel Modal Preview Data
  ========================= */
  const excelPreviewRows = selectedExcelData
    ? buildExcelRows(selectedExcelData.json)
    : [];

  const excelPreviewColumns = [
    {
      title: "Field Name",
      dataIndex: "Field Name",
      width: 200,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Value",
      dataIndex: "Value",
      width: 320,
    },
    {
      title: "Confidence Score",
      dataIndex: "Confidence Score",
      width: 140,
      render: (score) => {
        if (!score) return "—";
        const num = parseInt(score, 10);
        const color = num > 80 ? "green" : num > 50 ? "orange" : "red";
        return <Tag color={color}>{score}</Tag>;
      },
    },
    {
      title: "LLM Confidence Score",
      dataIndex: "LLM Confidence Score",
      width: 140,
      render: (score) => {
        if (!score) return "—";
        const num = parseInt(score, 10);
        const color = num > 80 ? "green" : num > 50 ? "orange" : "red";
        return <Tag color={color}>{score}</Tag>;
      },
    },
    {
      title: "Page Number",
      dataIndex: "Page Number",
      width: 110,
      render: (page) => (page !== "" && page !== undefined ? page : "—"),
    },
  ];

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

                    <Col span={24}>
                      <div
                        style={{
                          maxHeight: item.values.length > 4 ? 260 : "auto",
                          overflowY:
                            item.values.length > 4 ? "auto" : "visible",
                          paddingRight: item.values.length > 4 ? 8 : 0,
                        }}
                      >
                        {item.values.map((fieldItem, index) => (
                          <Row
                            key={index}
                            gutter={[16, 8]}
                            style={{ marginBottom: 12 }}
                          >
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
                                Confidence:{" "}
                                {Math.round(
                                  (fieldItem.confidence_score || 0) * 100
                                )}
                                %
                              </Tag>
                              <Tag
                                color={
                                  fieldItem.llm_confidence_score > 0.8
                                    ? "green"
                                    : fieldItem.llm_confidence_score > 0.5
                                      ? "orange"
                                      : "red"
                                }
                              >
                                LLM Confidence:{" "}
                                {Math.round(
                                  (fieldItem.llm_confidence_score || 0) * 100
                                )}
                                %
                              </Tag>
                              <Tag>Page: {fieldItem.page ?? "—"}</Tag>
                            </Col>
                          </Row>
                        ))}
                      </div>
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
                `${BASE_URL}/api/extract_document?template=mortgage`,
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

      {/* JSON Modal (kept, not triggered from table column) */}
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

      {/* Excel Preview Modal */}
      {/* Excel Modal — EXACT SAME DESIGN AS DASHBOARD */}
      <Modal
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <FileExcelOutlined
                style={{ color: "#217346", marginRight: 8 }}
              />
              Extracted Data (Excel Preview)
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() =>
                  handleDownloadExcel(
                    selectedExcelData?.json,
                    selectedExcelData?.documentName
                  )
                }
                style={{ marginRight: 24 }}
              >
                Download Excel
              </Button>
            </Col>
          </Row>
        }
        open={excelModalOpen}
        onCancel={() => {
          setExcelModalOpen(false);
          setSelectedExcelData(null);
        }}
        footer={null}
        width={860}
      >
        <Table
          rowKey={(_, index) => index}
          columns={[
            {
              title: "Document Name",
              dataIndex: "Document Name",
              onHeaderCell: () => ({
                style: { backgroundColor: "#217346", color: "#fff" },
              }),
            },
            ...Object.keys(selectedExcelData?.json?.fields || {}).map((field) => ({
              title: field,
              dataIndex: field,
              onHeaderCell: () => ({
                style: { backgroundColor: "#217346", color: "#fff" },
              }),
              render: (val) => (
                <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {val}
                </span>
              ),
            })),
          ]}
          dataSource={buildMortgagePreviewRows(
            selectedExcelData?.json,
            selectedExcelData?.documentName
          )}
          pagination={{ pageSize: 10 }}
          bordered
          size="small"
          scroll={{ x: true }}
        />
      </Modal>
    </Container>
  );
};

export default DashboardMortgage;