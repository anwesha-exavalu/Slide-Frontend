import React, { useEffect, useRef, useState } from "react";
import {
    Table,
    Button,
    Modal,
    message,
    Avatar,
    Space,
    Tag,
} from "antd";
import { InfoCircleOutlined, PaperClipOutlined } from "@ant-design/icons";
import { TableContainer } from "../styles/components/TableComponent";
import useMetaData from "../context/metaData";
import { Container } from "../styles/components/Layout";
import { Checkbox } from "antd";


/* =========================
   AZURE CONFIG (UNCHANGED)
========================= */
const ACCOUNT = "strexavalupublic";
const CONTAINER = "mail-processed";

/* Existing SAS – DO NOT TOUCH */
const SAS_TOKEN =
    "sp=rwl&st=2026-02-26T05:46:26Z&se=2026-02-28T14:01:26Z&sv=2024-11-04&sr=c&sig=Xhi%2BQpOAntZ%2FmHxAdI%2B%2FxRxoudjkSI%2F9fw7gXVqWle8%3D";

const POLL_MS = 10000;

/* =========================
   NEW: RAW CONTAINER (ADD ONLY)
========================= */
const RAW_CONTAINER = "mail-storage";

/* Separate SAS for attachments ONLY */
const RAW_SAS = "sp=rwl&st=2026-02-26T05:49:58Z&se=2026-02-28T14:04:58Z&sv=2024-11-04&sr=c&sig=Zb2N4phvH4bhPiwrtda3tbroJBfH0LGj%2FHRaLAC%2FkaU%3D";

/* =========================
   HELPERS (PREVIOUS + NEW)
========================= */
const encodeBlobName = (name) =>
    name.split("/").map(encodeURIComponent).join("/");

/* EXISTING – for output.json */
const buildBlobUrl = (blobName) =>
    `https://${ACCOUNT}.blob.core.windows.net/${CONTAINER}/${encodeBlobName(
        blobName
    )}?${SAS_TOKEN}`;

/* NEW – for attachments ONLY */
const buildAttachmentUrl = (blobPath) =>
    `https://${ACCOUNT}.blob.core.windows.net/${RAW_CONTAINER}/${encodeBlobName(
        blobPath
    )}?${RAW_SAS}`;

const stripDisclaimer = (html = "") => {
    const disclaimer =
        "This message is intended only for the person to whom it is addressed";
    const idx = html.indexOf(disclaimer);
    return idx !== -1 ? html.slice(0, idx) : html;
};

const getSubmissionId = (id = "") =>
    id ? id.replace(/=$/, "").slice(-6) : "—";
const isValidRow = (row) => {
    if (!row) return false;

    return Boolean(
        row.from ||
        row.subject ||
        row.email_body ||
        (row.attachments && row.attachments.length > 0)
    );
};

/* =========================
   TABLE WRAPPER (UNCHANGED)
========================= */
const MyTableComponent = ({ columns, dataSource, loading }) => {
    const { theme } = useMetaData();

    return (
        <TableContainer theme={theme}>
            <Table
                rowKey="blobName"
                className="custom-table-header"
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination
                tableLayout="fixed"
                scroll={{ x: 1200 }}
            />
        </TableContainer>
    );
};
const scrollCellStyle = {
    maxHeight: 60,
    overflowX: "auto",
    whiteSpace: "normal",
    wordBreak: "break-word",
};
const formatDateTime = (value) => {
    if (!value) return "";

    const date = new Date(value);

    return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
};
/* =========================
   EMAIL DASHBOARD
========================= */
const EmailDashboard = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const [jsonModalOpen, setJsonModalOpen] = useState(false);
    const [mailModalOpen, setMailModalOpen] = useState(false);
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);

    const [selectedJson, setSelectedJson] = useState(null);
    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedSummary, setSelectedSummary] = useState("");
    const [reviewMap, setReviewMap] = useState({});

    const knownRef = useRef(new Map());
    const pollingRef = useRef(false);

    /* =========================
       LIST BLOBS (UNCHANGED)
    ========================= */
    const listAllOutputJsonBlobs = async () => {
        const out = [];
        let marker = "";

        while (true) {
            const url =
                `https://${ACCOUNT}.blob.core.windows.net/${CONTAINER}` +
                `?${SAS_TOKEN}&restype=container&comp=list&maxresults=5000` +
                (marker ? `&marker=${encodeURIComponent(marker)}` : "");

            const res = await fetch(url);
            if (!res.ok) throw new Error("Azure list failed");

            const xmlText = await res.text();
            const xml = new DOMParser().parseFromString(xmlText, "application/xml");

            const blobs = Array.from(xml.getElementsByTagName("Blob"));
            blobs.forEach((b) => {
                const name = b.getElementsByTagName("Name")[0]?.textContent || "";
                const props = b.getElementsByTagName("Properties")[0];
                const lastModified =
                    props?.getElementsByTagName("Last-Modified")[0]?.textContent || "";
                const etag =
                    props?.getElementsByTagName("Etag")[0]?.textContent || "";

                if (name.toLowerCase().endsWith("/output.json")) {
                    out.push({ name, lastModified, etag });
                }
            });

            const nextMarker =
                xml.getElementsByTagName("NextMarker")[0]?.textContent || "";
            if (!nextMarker) break;
            marker = nextMarker;
        }

        return out;
    };

    /* =========================
       POLL (UNCHANGED CORE)
    ========================= */
    const poll = async () => {
        if (pollingRef.current) return;
        pollingRef.current = true;

        try {
            const blobs = await listAllOutputJsonBlobs();
            const toFetch = blobs.filter((b) => {
                const stamp = b.etag || b.lastModified;
                return knownRef.current.get(b.name) !== stamp;
            });

            if (!toFetch.length) return;

            setLoading(true);

            const loaded = await Promise.all(
                toFetch.map(async (b) => {
                    const res = await fetch(buildBlobUrl(b.name));
                    if (!res.ok) return null;

                    const json = await res.json();
                    const email = json.email || {};
                    const ui = json.ui || {};
                    const model = json.model || {};


                    return {
                        blobName: b.name,
                        email_id: email.email_id,
                        received_at: email.received_at,
                        from: email.from,
                        to: email.to,
                        subject: email.subject,
                        classification: ui.emailCategory,
                        lob: ui.lob,
                        claim_number: ui.claimNumber,
                        summary: ui.detailedSummary,
                        email_body: email.email_body,
                        signature: ui.email_signature || model.email_signature,

                        /* ✅ NEW (NON-BREAKING) */
                        attachments: ui.attachments || [],

                        __full: json,
                    };
                })
            );

            toFetch.forEach((b) =>
                knownRef.current.set(b.name, b.etag || b.lastModified)
            );

            setRows((prev) => {
                const map = new Map(prev.map((r) => [r.blobName, r]));

                loaded
                    .filter(Boolean)
                    .filter(isValidRow) // ✅ hide empty rows
                    .forEach((r) => map.set(r.blobName, r));

                return Array.from(map.values())
                    .filter(isValidRow) // ✅ safety filter
                    .sort(
                        (a, b) =>
                            new Date(b.received_at || 0) -
                            new Date(a.received_at || 0)
                    );
            });

        } catch (e) {
            console.error(e);
            message.error("Failed to load emails");
        } finally {
            pollingRef.current = false;
            setLoading(false);
        }
    };

    useEffect(() => {
        poll();
        const t = setInterval(poll, POLL_MS);
        return () => clearInterval(t);
    }, []);
    const getColumnFilters = (dataIndex) => {
        const uniqueValues = Array.from(
            new Set(rows.map((r) => r[dataIndex]).filter(Boolean))
        );

        return uniqueValues.map((val) => ({
            text: val,
            value: val,
        }));
    };
    /* =========================
       COLUMNS (UNCHANGED)
    ========================= */
    const columns = [
        {
            title: "Email Type",
            dataIndex: "classification",
            width: 260,
            filters: getColumnFilters("classification"),
            onFilter: (value, record) =>
                record.classification === value,
            render: (text) => (
                <div style={scrollCellStyle}>{text}</div>
            ),
        },
        {
            title: "Sender Email ID",
            dataIndex: "from",
            width: 280,
            filters: getColumnFilters("from"),
            onFilter: (value, record) =>
                record.from === value,
            render: (text) => (
                <div style={scrollCellStyle}>{text}</div>
            ),
        },
        {
            title: "Sender Name",
            dataIndex: "signature",
            width: 200,
            filters: getColumnFilters("signature"),
            onFilter: (value, record) =>
                record.signature === value,
            render: (text) => (
                <div style={scrollCellStyle}>{text}</div>
            ),
        },
        {
            title: "Date and Time",
            dataIndex: "received_at",
            width: 250,
            sorter: (a, b) =>
                new Date(a.received_at) - new Date(b.received_at),
            render: (text) => (
                <div style={scrollCellStyle}>
                    {formatDateTime(text)}
                </div>
            ),
        },
        {
            title: "Subject",
            dataIndex: "subject",
            width: 400,
            filters: getColumnFilters("subject"),
            onFilter: (value, record) =>
                record.subject === value,
            render: (text) => (
                <div style={scrollCellStyle}>{text}</div>
            ),
        },
        {
            title: "Claim Number",
            dataIndex: "claim_number",
            width: 150,
            filters: getColumnFilters("claim_number"),
            onFilter: (value, record) =>
                record.claim_number === value,
            render: (text) => (
                <div style={scrollCellStyle}>{text}</div>
            ),
        },
        {
            title: "Summary",
            width: 120,
            render: (_, r) => (
                <Button
                    size="small"
                    onClick={() => {
                        setSelectedSummary(r.summary);
                        setSummaryModalOpen(true);
                    }}
                >
                    View
                </Button>
            ),
        },
        {
            title: "Source",
            width: 120,
            render: (_, r) => (
                <Button
                    size="small"
                    type="link"
                    onClick={() => {
                        setSelectedMail(r);
                        setMailModalOpen(true);
                    }}
                >
                    View
                </Button>
            ),
        },
            {
            title: "JSON",
            render: (_, r) => (
                <InfoCircleOutlined
                    style={{ cursor: "pointer", color: "#1677ff" }}
                    onClick={() => {
                        setSelectedJson(r.__full);
                        setJsonModalOpen(true);
                    }}
                />
            ),
            width: 80,
        },
               {
            title: "Attachments",
            dataIndex: "attachments",
            width: 350,
            render: (attachments = []) =>
                attachments.length ? (
                    <div style={scrollCellStyle}>
                    <Space direction="vertical" size={0}>
                        {attachments.map((a) => (
                            <span key={a.blobPath} style={{ fontSize: 14 }}>
                                <a
                                    href="#!"
                                    style={{ color: "#1677ff" }}
                                    onClick={(e) => {
                                        e.preventDefault();
 
                                        const url = buildAttachmentUrl(a.blobPath);
 
                                        // Same behavior as email modal
                                        const link = document.createElement("a");
                                        link.href = url;
                                        link.download = a.name;
                                        link.target = "_blank";
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    {a.name}
                                </a>
                                {a.type ? ` (${a.type})` : ""}
                            </span>
                        ))}
                    </Space>
                    </div>
                ) : (
                    "-"
                ),
        },
        {
            title: "Review",
            width: 80,
            render: (_, r) => (
                <Checkbox
                    checked={!!reviewMap[r.blobName]}
                    onChange={(e) => {
                        setReviewMap((prev) => ({
                            ...prev,
                            [r.blobName]: e.target.checked,
                        }));
                    }}
                />
            ),
        },
    ];
    return (
        <Container>
            <MyTableComponent columns={columns} dataSource={rows} loading={loading} />

            {/* ================= EMAIL MODAL ================= */}
            <Modal
                open={mailModalOpen}
                onCancel={() => setMailModalOpen(false)}
                footer={null}
                width={980}


            >
                <div
                    style={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                >

                    <div
                        style={{
                            padding: "16px 20px",
                            borderBottom: "1px solid #f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <Avatar size={40}>
                            {selectedMail?.from?.[0]}
                        </Avatar>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>
                                {selectedMail?.from}
                            </div>
                            <div style={{ fontSize: 12, color: "#666" }}>
                                To: {selectedMail?.to}
                            </div>
                        </div>

                        <div style={{ fontSize: 12, color: "#666" }}>
                            {selectedMail?.received_at}
                        </div>
                    </div>


                    <div
                        style={{
                            padding: "14px 20px",
                            fontWeight: 600,
                            fontSize: 16,
                            borderBottom: "1px solid #f0f0f0",
                            marginBottom: 12,
                        }}
                    >
                        {selectedMail?.subject}
                    </div>


                    {/* ✅ NEW: ATTACHMENTS (SAFE ADDITION) */}
                    {selectedMail?.attachments?.length > 0 && (
                        <div style={{ padding: "0 16px 12px" }}>
                            <Space wrap>
                                {selectedMail.attachments.map((a) => (
                                    <Tag
                                        key={a.blobPath}
                                        icon={<PaperClipOutlined />}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            const url = buildAttachmentUrl(a.blobPath);
                                            const link = document.createElement("a");
                                            link.href = url;
                                            link.download = a.name;
                                            link.target = "_blank";
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                    >
                                        {a.name}
                                    </Tag>
                                ))}
                            </Space>
                        </div>
                    )}

                    <div
                        style={{
                            padding: "20px",
                            fontSize: 14,
                            lineHeight: 1.6,
                        }}
                        dangerouslySetInnerHTML={{
                            __html: stripDisclaimer(selectedMail?.email_body || ""),
                        }}
                    />


                    <div style={{ padding: 16, display: "flex", gap: 8 }}>
                        {/* <Button>Reply</Button>
                        <Button>Forward</Button> */}
                    </div>
                </div>
            </Modal>

            {/* ================= JSON MODAL ================= */}
            {/* ================= JSON MODAL ================= */}
            <Modal
                title="Processed JSON"
                open={jsonModalOpen}
                onCancel={() => setJsonModalOpen(false)}
                footer={null}
                width={900}
            >
                {/* Copy button */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 8,
                    }}
                >
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

                {/* JSON content */}
                <pre
                    style={{
                        maxHeight: "500px",
                        overflow: "auto",
                        whiteSpace: "pre-wrap",     // ✅ wrap long lines
                        wordBreak: "break-word",    // ✅ prevent overflow
                        background: "#f5f5f5",
                        padding: 12,
                        borderRadius: 6,
                        fontSize: 12,
                    }}
                >
                    {JSON.stringify(selectedJson, null, 2)}
                </pre>
            </Modal>


            {/* ================= SUMMARY MODAL ================= */}
            <Modal
                open={summaryModalOpen}
                onCancel={() => setSummaryModalOpen(false)}
                footer={null}
            >
                {selectedSummary}
            </Modal>
        </Container>
    );
};

export default EmailDashboard;
