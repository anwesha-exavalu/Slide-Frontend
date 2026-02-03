import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, message, Divider } from "antd";
import { InfoCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { TableContainer } from "../styles/components/TableComponent";
import useMetaData from "../context/metaData";

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
            width: 120,
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
            width: 150,
            render: (value) =>
                value ? value.replace(/_/g, " ") : "—",
        },
        ,
        {
            title: "Source",
            key: "source",
            width: 120,
            align: "center",
            ellipsis: false, 
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        size="small"
                        type="default"
                        style={{
                            borderRadius: 6,
                            borderColor: "#1677ff",
                            color: "#1677ff",
                        }}
                        onClick={() => loadProcessedJson(record, "mail")}
                    >
                        View
                    </Button>
                </div>
            ),
        },

        {
            title: "Summary",
            key: "summary",
            width: 80,
            align: "left",
            render: (_, record) => (
                <Button
                    size="small"
                    type="default"
                    onClick={() => loadProcessedJson(record, "summary")}
                >
                    View
                </Button>
            ),
        },
        {
            title: "JSON",
            key: "json",
            width: 20,
            align: "left",
            render: (_, record) => (
                <InfoCircleOutlined
                    style={{ fontSize: 18, color: "#1677ff", cursor: "pointer" }}
                    onClick={() => loadProcessedJson(record, "json")}
                />
            ),
        },
        ,
    ];


    return (
        <>
            <MyTableComponent
                columns={columns}
                dataSource={rows}
                loading={loading}
            />

            {/* JSON Modal */}
            <Modal
                title="Processed JSON"
                open={jsonModalOpen}
                onCancel={() => setJsonModalOpen(false)}
                footer={null}
                width={900}
            >
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
            {/* Outlook-style Email Preview */}
            <Modal
                title="Email Preview"
                open={mailModalOpen}
                onCancel={() => setMailModalOpen(false)}
                footer={null}
                width={900}
            >
                <div
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        padding: 16,
                        background: "#ffffff",
                    }}
                >
                    {/* Header Section */}
                    <div style={{ marginBottom: 12, lineHeight: 1.8 }}>
                        <div>
                            <strong>From:</strong>{" "}
                            {selectedMail?.headers?.from || "—"}
                        </div>
                        <div>
                            <strong>To:</strong>{" "}
                            {selectedMail?.headers?.to || "—"}
                        </div>
                        <div>
                            <strong>Subject:</strong>{" "}
                            {selectedMail?.headers?.subject || "—"}
                        </div>
                        <div>
                            <strong>Date:</strong>{" "}
                            {selectedMail?.headers?.date || "—"}
                        </div>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    {/* Body Section */}
                    <div
                        style={{
                            whiteSpace: "pre-wrap",
                            background: "#fafafa",
                            padding: 16,
                            borderRadius: 6,
                            minHeight: 220,
                            fontSize: 14,
                        }}
                    >
                        {selectedMail?.body_text || "No email body available"}
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



        </>
    );
};

export default EmailDashboard;
