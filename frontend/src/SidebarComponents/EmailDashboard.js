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
const ACCOUNT = "mailstorage1";
const CONTAINER = "mailstorageprocessed";

/* Existing SAS – DO NOT TOUCH */
const SAS_TOKEN =
    "sp=rl&st=2026-02-09T17:17:20Z&se=2026-03-13T01:32:20Z&sv=2024-11-04&sr=c&sig=VDsjk%2BnJRa5WnNo7zPFOwV0yJ8lHwcbIpgV5LNIr0eQ%3D";

const POLL_MS = 10000;

/* =========================
   NEW: RAW CONTAINER (ADD ONLY)
========================= */
const RAW_CONTAINER = "mailstorage1";

/* Separate SAS for attachments ONLY */
const RAW_SAS = "sp=r&st=2026-02-09T17:14:12Z&se=2026-03-13T01:29:12Z&sv=2024-11-04&sr=c&sig=9CIGWlOc%2Fm%2FsQgGmoGC45n%2FHtTQLu4jKxKGUtBsYUvg%3D";

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

    /* =========================
       COLUMNS (UNCHANGED)
    ========================= */
    const columns = [
        {
            title: "Email Type",
            width: 260,
            render: (_, r) => (
                <div>
                    <div style={{ fontWeight: 400 }}>
                        {r.lob || " "}
                    </div>
                    <div style={{ fontSize: 14}}>
                        {r.classification || " "}
                    </div>
                </div>
            ),
        },

        // {
        //     title: "Submission ID",
        //     dataIndex: "email_id",
        //     render: getSubmissionId,
        //     width: 120,
        // },
        { title: "Sender Email ID", dataIndex: "from", ellipsis: true, width: 280 },
        { title: "Date and Time", dataIndex: "received_at", ellipsis: true, width: 220 },
        { title: "Subject", dataIndex: "subject", ellipsis: true, width: 550 },

        { title: "Claim Number", dataIndex: "claim_number", width: 150 },
        // {
        //     title: "JSON",
        //     render: (_, r) => (
        //         <InfoCircleOutlined
        //             style={{ cursor: "pointer", color: "#1677ff" }}
        //             onClick={() => {
        //                 setSelectedJson(r.__full);
        //                 setJsonModalOpen(true);
        //             }}
        //         />
        //     ),
        //     width: 80,
        // },
        {
            title: "Summary",
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
            width: 120,
        },
        {
            title: "Source",
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
            width: 120,
        },
        {
            title: "Attachments",
            dataIndex: "attachments",
            width: 350,
            render: (attachments = []) =>
                attachments.length ? (
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
                ) : (
                    "-"
                ),
        },


        {
            title: "Review",
            dataIndex: "review",
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
