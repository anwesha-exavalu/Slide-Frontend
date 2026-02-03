import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, message, Divider , Row, Col, Avatar, Space} from "antd";
import { InfoCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { TableContainer } from "../styles/components/TableComponent";
import useMetaData from "../context/metaData";
import { Container } from "../styles/components/Layout";

/* =========================
   S3 Config
========================= */
const BUCKET = "exavalu-ai-mails";
const REGION = "us-east-1";
const INDEX_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com/processed/index.json`;

const processedUrl = (key) =>
    `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

/* =========================
   Table Wrapper
========================= */
const MyTableComponent = ({ columns, dataSource, loading }) => {
    const { theme } = useMetaData();

    return (
        <TableContainer theme={theme}>
            <Table
                rowKey="submissionId"
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
   Email Dashboard
========================= */
const EmailDashboard = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const [jsonModalOpen, setJsonModalOpen] = useState(false);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const [processedCache, setProcessedCache] = useState({});

    const [selectedJson, setSelectedJson] = useState(null);
    const [selectedMail, setSelectedMail] = useState(null);
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);
    const [selectedSummary, setSelectedSummary] = useState("");

    const etagRef = useRef(null);

    /* =========================
       Poll index.json
    ========================= */
    const pollIndex = async () => {
        try {
            const headers = {};
            if (etagRef.current) headers["If-None-Match"] = etagRef.current;

            const res = await fetch(INDEX_URL, { headers });
            if (res.status === 304) return;

            const etag = res.headers.get("ETag");
            if (etag) etagRef.current = etag;

            const data = await res.json();
            setRows(Array.isArray(data.items) ? data.items : []);
        } catch {
            message.error("Failed to load email dashboard");
        }
    };

    /* =========================
       Load processed JSON
    ========================= */
    const loadProcessedJson = async (row, mode) => {
        try {
            setLoading(true);

            let json = processedCache[row.processedKey];

            // ✅ Fetch only once
            if (!json) {
                const res = await fetch(processedUrl(row.processedKey));
                if (!res.ok) throw new Error("Failed");

                json = await res.json();

                setProcessedCache((prev) => ({
                    ...prev,
                    [row.processedKey]: json,
                }));
            }

            // ✅ Reuse same JSON
            if (mode === "json") {
                setSelectedJson(json);
                setJsonModalOpen(true);
            } else if (mode === "mail") {
                setSelectedMail(json);
                setMailModalOpen(true);
            } else if (mode === "summary") {
                setSelectedSummary(json?.ai?.summary || "No summary available");
                setSummaryModalOpen(true);
            }
        } catch {
            message.error("Unable to load data");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        pollIndex();
        const timer = setInterval(pollIndex, 12000);
        return () => clearInterval(timer);
    }, []);

    /* =========================
       Columns
    ========================= */
    const columns = [
        {
            title: "Submission ID",
            dataIndex: "submissionId",
            key: "submissionId",
            width: 110,
            render: (id) => id?.slice(0, 8),
        },
        {
            title: "From",
            dataIndex: "from",
            key: "from",
            width: 400,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 120,
            render: (value) =>
                value ? value.replace(/_/g, " ") : "—",
        },

        {
            title: "JSON",
            key: "json",
            width: 80,
            align: "left",
            render: (_, record) => (
                <InfoCircleOutlined
                    style={{ fontSize: 18, color: "#1677ff", cursor: "pointer" }}
                    onClick={() => loadProcessedJson(record, "json")}
                />
            ),
        },

        {
            title: "Summary",
            key: "summary",
            width: 40,
            align: "left",
            render: (_, record) => (
                <Button
                    size="small"
                    type="default"
                    onClick={() => loadProcessedJson(record, "summary")}
                    style={{ width: '80px' }}
                >
                    View
                </Button>
            ),
        },
        {
            title: "Source",
            key: "source",
            width: 40,
            align: "left",
            ellipsis: false,
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "left", }}>
                    <Button
                        size="small"
                        type="default"
                        style={{
                            borderRadius: 6,
                            borderColor: "#1677ff",
                            color: "#1677ff",
                            width: '80px'
                        }}
                        onClick={() => loadProcessedJson(record, "mail")}
                    >
                        View
                    </Button>
                </div>
            ),
        },
    ];


    return (
        <Container>
            <MyTableComponent
                columns={columns}
                dataSource={rows}
                loading={loading}
            />

            {/* JSON Modal */}
            {/* JSON Modal */}
            <Modal
                title="Processed JSON"
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

            {/* Outlook-style Email Preview */}
          <Modal
  title={null}
  open={mailModalOpen}
  onCancel={() => setMailModalOpen(false)}
  footer={null}
  width={950}
>
  <div
    style={{
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      background: "#fff",
    }}
  >
    {/* Header */}
    <div style={{ padding: 16 }}>
      <Row align="middle" justify="space-between">
        <Col>
          <Space align="start">
            <Avatar size={40}>
              {selectedMail?.headers?.from?.[0] || "U"}
            </Avatar>

            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>
                {selectedMail?.headers?.from || "—"}
              </div>

              <div style={{ color: "#555", fontSize: 13 }}>
                To: {selectedMail?.headers?.to || "—"}
              </div>
            </div>
          </Space>
        </Col>

        <Col>
          <div style={{ color: "#666", fontSize: 13 }}>
            {selectedMail?.headers?.date || "—"}
          </div>
        </Col>
      </Row>
    </div>

    <Divider style={{ margin: 0 }} />

    {/* Subject */}
    <div style={{ padding: "12px 16px", fontSize: 16, fontWeight: 500 }}>
      {selectedMail?.headers?.subject || "—"}
    </div>

    <Divider style={{ margin: 0 }} />

    {/* Body */}
    <div
      style={{
        padding: 16,
        minHeight: 220,
        whiteSpace: "pre-wrap",
        lineHeight: 1.6,
        fontSize: 14,
      }}
    >
      {selectedMail?.body_text || "No email content available"}
    </div>

    <Divider style={{ margin: 0 }} />

    {/* Footer Actions */}
    <div style={{ padding: 12 }}>
      <Space>
        <Button>Reply</Button>
        <Button>Forward</Button>
      </Space>
    </div>
  </div>
</Modal>

            <Modal
                title="Summary"
                open={summaryModalOpen}
                onCancel={() => setSummaryModalOpen(false)}
                footer={null}
                width={600}
            >
                <div
                    style={{
                        background: "#fafafa",
                        padding: 16,
                        borderRadius: 6,
                        fontSize: 14,
                        lineHeight: 1.6,
                    }}
                >
                    {selectedSummary}
                </div>
            </Modal>



        </Container>
    );
};

export default EmailDashboard;
