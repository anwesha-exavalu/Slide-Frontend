import React, { useEffect, useRef, useState } from "react";
import {
    Table,
    Button,
    Modal,
    message,
    Divider,
    Avatar,
    Space,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { TableContainer } from "../styles/components/TableComponent";
import useMetaData from "../context/metaData";
import { Container } from "../styles/components/Layout";

/* =========================
   Azure Blob Config
========================= */
const ACCOUNT = "mailstorage1";
const CONTAINER = "mailstorage1";

const SAS_TOKEN =
    "sp=racwli&st=2026-02-05T07:01:05Z&se=2026-02-07T15:16:05Z&sv=2024-11-04&sr=c&sig=9k9W7AacvZoCkSiIZBHGObw0CJgI9iL3N3fz5InoJ90%3D";

const POLL_MS = 10000;

/* =========================
   Helpers
========================= */
const encodeBlobName = (name) =>
    name.split("/").map(encodeURIComponent).join("/");

const blobUrl = (blobName) =>
    `https://${ACCOUNT}.blob.core.windows.net/${CONTAINER}/${encodeBlobName(
        blobName
    )}?${SAS_TOKEN}`;

const toCamelCase = (str = "") =>
    str
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const stripDisclaimer = (html = "") => {
    const disclaimer =
        "This message is intended only for the person to whom it is addressed";
    const idx = html.indexOf(disclaimer);
    return idx !== -1 ? html.slice(0, idx) : html;
};
const getSubmissionId = (id = "") => {
    if (!id) return "—";

    const cleanId = id.endsWith("=") ? id.slice(0, -1) : id;
    return cleanId.slice(-6);
};

/* =========================
   Table Wrapper
========================= */
const MyTableComponent = ({ columns, dataSource, loading }) => {
    const { theme } = useMetaData();

    return (
        <TableContainer theme={theme}>
            <Table
                rowKey="email_id"
                className="custom-table-header"
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination
                tableLayout="fixed"
                scroll={{ x: 1200 }}
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
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);

    const [selectedJson, setSelectedJson] = useState(null);
    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedSummary, setSelectedSummary] = useState("");

    const knownRef = useRef(new Map());
    const pollingRef = useRef(false);

    /* =========================
       List Azure JSON blobs
    ========================= */
    const listAllJsonBlobs = async () => {
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
            for (const b of blobs) {
                const name = b.getElementsByTagName("Name")[0]?.textContent || "";
                const props = b.getElementsByTagName("Properties")[0];
                const lastModified =
                    props?.getElementsByTagName("Last-Modified")[0]?.textContent || "";
                const etag = props?.getElementsByTagName("Etag")[0]?.textContent || "";

                if (name.toLowerCase().endsWith(".json")) {
                    out.push({ name, lastModified, etag });
                }
            }

            const nextMarker =
                xml.getElementsByTagName("NextMarker")?.[0]?.textContent || "";
            if (!nextMarker) break;
            marker = nextMarker;
        }

        return out;
    };

    /* =========================
       Poll Azure
    ========================= */
    const poll = async () => {
        if (pollingRef.current) return;
        pollingRef.current = true;

        try {
            const blobs = await listAllJsonBlobs();
            const toFetch = [];

            for (const b of blobs) {
                const stamp = b.etag || b.lastModified;
                const prev = knownRef.current.get(b.name);
                if (!prev || prev !== stamp) toFetch.push(b);
            }

            if (toFetch.length === 0) return;

            setLoading(true);

            const loaded = await Promise.all(
                toFetch.map(async (b) => {
                    const res = await fetch(blobUrl(b.name));
                    if (!res.ok) return null;
                    const json = await res.json();
                    return { blobName: b.name, ...json, __full: json };
                })
            );

            for (const b of toFetch) {
                knownRef.current.set(b.name, b.etag || b.lastModified);
            }

            setRows((prev) => {
                const map = new Map(prev.map((x) => [x.blobName, x]));
                loaded.filter(Boolean).forEach((x) => map.set(x.blobName, x));
                return Array.from(map.values()).sort(
                    (a, b) =>
                        new Date(b.received_at || 0) - new Date(a.received_at || 0)
                );
            });
        } catch {
            message.error("Failed to load email dashboard");
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
       Columns
    ========================= */
    const columns = [
        {
            title: "Submission ID",
            dataIndex: "email_id",
            key: "email_id",
            width: 20,
            render: (id) => getSubmissionId(id),
        }
        ,
        {
            title: "From",
            dataIndex: "from",
            width: 40,
            ellipsis: true,
        },
        // {
        //     title: "Subject",
        //     dataIndex: "subject",
        //     width: 350,
        //     ellipsis: true,
        // },
        {
            title: "Category",
            dataIndex: "classification",
            width: 30,
            render: (v) => toCamelCase(v),
        },
        {
            title: "JSON",
            width: 20,
            render: (_, r) => (
                <InfoCircleOutlined
                    style={{ fontSize: 18, color: "#1677ff", cursor: "pointer" }}
                    onClick={() => {
                        setSelectedJson(r.__full);
                        setJsonModalOpen(true);
                    }}
                />
            ),
        },
        {
            title: "Summary",
            width: 20,
            render: (_, r) => (
                <Button size="small" onClick={() => {
                    setSelectedSummary(r.summary || "No summary available");
                    setSummaryModalOpen(true);
                }}>
                    View
                </Button>
            ),
        },
        {
            title: "Source",
            width: 20,
            render: (_, r) => (
                <Button size="small" type="link" onClick={() => {
                    setSelectedMail(r.__full);
                    setMailModalOpen(true);
                }}>
                    View
                </Button>
            ),
        },
    ];

    return (
        <Container>
            <MyTableComponent columns={columns} dataSource={rows} loading={loading} />

            {/* JSON Modal */}
            <Modal
                title="Processed JSON"
                open={jsonModalOpen}
                onCancel={() => setJsonModalOpen(false)}
                footer={null}
                width={900}
            >
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
                <pre style={{ maxHeight: 500, overflow: "auto" }}>
                    {JSON.stringify(selectedJson, null, 2)}
                </pre>
            </Modal>

            {/* Email Preview Modal (UNCHANGED STRUCTURE) */}
            <Modal
                open={mailModalOpen}
                onCancel={() => setMailModalOpen(false)}
                footer={null}
                width={980}
                closable={true}
                bodyStyle={{ padding: 0 }}
            >
                <div
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        background: "#fff",
                    }}
                >
                    {/* ===== Header ===== */}
                    <div
                        style={{
                            padding: "16px 20px",
                            borderBottom: "1px solid #f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >

                        <Avatar
                            size={40}
                            style={{ backgroundColor: "#d9d9d9", color: "#555" }}
                        >
                            {selectedMail?.from?.[0]?.toUpperCase() || "U"}
                        </Avatar>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>
                                {selectedMail?.from}
                            </div>
                            <div style={{ fontSize: 12, color: "#666" }}>
                                To: {selectedMail?.to || "—"}
                            </div>
                        </div>

                        <div style={{ fontSize: 12, color: "#666" }}>
                            {selectedMail?.received_at
                                ? new Date(selectedMail.received_at).toLocaleString()
                                : "—"}
                        </div>
                    </div>

                    {/* ===== Subject ===== */}
                    <div
                        style={{
                            padding: "16px 20px",
                            fontWeight: 600,
                            fontSize: 16,
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    >
                        {selectedMail?.subject || "—"}
                    </div>

                    {/* ===== Body ===== */}
                    <div
                        style={{
                            padding: "20px",
                            fontSize: 14,
                            lineHeight: 1.6,
                            minHeight: 200,
                        }}
                        dangerouslySetInnerHTML={{
                            __html: stripDisclaimer(selectedMail?.email_body || ""),
                            
                        }}

                       
                    />

                    {/* ===== Footer ===== */}
                    <div
                        style={{
                            padding: "14px 20px",
                            borderTop: "1px solid #f0f0f0",
                            display: "flex",
                            gap: 10,
                        }}
                    >
                        <Button>Reply</Button>
                        <Button>Forward</Button>
                    </div>
                </div>
            </Modal>


            {/* Summary Modal */}
            <Modal
                title="Summary"
                open={summaryModalOpen}
                onCancel={() => setSummaryModalOpen(false)}
                footer={null}
                width={600}
            >
                <div style={{ padding: 16, background: "#fafafa" }}>
                    {selectedSummary}
                </div>
            </Modal>
        </Container>
    );
};

export default EmailDashboard;
