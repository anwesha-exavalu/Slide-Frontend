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
    FilePdfOutlined,
    FileExcelOutlined,
    DownloadOutlined
} from "@ant-design/icons";

import { TableContainer } from "../styles/components/TableComponent";
import { Container } from "../styles/components/Layout";
import useMetaData from "../context/metaData";
import XLSX from "sheetjs-style";
const scrollCellStyle = {
    maxHeight: 55,
    overflowX: "auto",
    whiteSpace: "normal",
    wordBreak: "break-word",
};

/* =========================
   SAME TABLE WRAPPER
========================= */
const MyTableComponent = ({
    columns,
    dataSource,
    loading,
    selectedKey,
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
                tableLayout="fixed"
                scroll={{ x: 1200 }}
                onRow={(record) => ({
                    style:
                        record.key === selectedKey
                            ? {
                                backgroundColor: "#e6f4ff",
                                transition: "background-color 0.3s ease",
                            }
                            : {},
                })}
                components={{
                    header: {
                        cell: (props) => (
                            <th {...props} style={{ color: "#fff" }} />
                        ),
                    },
                }}
            />
        </TableContainer>
    );
};

const BatchDashboard = () => {
    const [batchData, setBatchData] = useState([]);
    const [selectedKey, setSelectedKey] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [excelModalOpen, setExcelModalOpen] = useState(false);
    const [selectedExcelData, setSelectedExcelData] = useState(null);
    const detailsRef = useRef(null);

    /* =========================
       SCROLL TO DETAILS
    ========================= */
    useEffect(() => {
        if (selectedKey !== null && detailsRef.current) {
            setTimeout(() => {
                detailsRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    }, [selectedKey]);

    /* =========================
       BATCH UPLOAD
    ========================= */
    const handleBatchUpload = async () => {
        try {
            setLoading(true);
            const BASE_URL = process.env.REACT_APP_AI_EXTRACT;
            const formData = new FormData();

            fileList.forEach((file) => {
                formData.append("files", file.originFileObj);
            });

            const response = await fetch(
                `${BASE_URL}/api/extract_document_batch?template=wind_mit`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await response.json();

            setBatchData((prev) => [...prev, ...(result.results || [])]);
            setIsModalOpen(false);
            setFileList([]);

            message.success("Batch processed successfully");
        } catch (err) {
            message.error("Batch upload failed");
        } finally {
            setLoading(false);
        }
    };
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
            const LLMConfidence = data?.llm_confidence_score != null
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

    const downloadExcel = (json, filename = `${json?.metadata?.document_name}`) => {
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

    const downloadConsolidatedExcel = () => {
        if (!batchData.length) {
            message.warning("No batch data available to download");
            return;
        }

        const wb = XLSX.utils.book_new();
        const ws = {};
        const headers = ["Document Name", "Field", "Value"];
        const merges = [];
        let rowIndex = 0;

        headers.forEach((header, colIndex) => {
            const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
            ws[cellRef] = {
                v: header,
                s: headerStyle(),
            };
        });

        rowIndex += 1;

        batchData.forEach((item, batchIndex) => {
            const json = item?.data;
            if (!json) return;

            const fields = json.fields || {};
            const documentName = json?.metadata?.document_name || "—";
            const docStartRow = rowIndex;

            Object.entries(fields).forEach(([fieldName, data]) => {
                const values = Array.isArray(data?.value)
                    ? data.value
                    : [data?.value];
                const fieldStartRow = rowIndex;

                values.forEach((val, valueIndex) => {
                    ws[XLSX.utils.encode_cell({ r: rowIndex, c: 0 })] = {
                        v: valueIndex === 0 ? documentName : "",
                        s: cellStyle(),
                    };

                    ws[XLSX.utils.encode_cell({ r: rowIndex, c: 1 })] = {
                        v: valueIndex === 0 ? fieldName : "",
                        s: cellStyle(),
                    };

                    ws[XLSX.utils.encode_cell({ r: rowIndex, c: 2 })] = {
                        v: val ?? "",
                        s: cellStyle(),
                    };

                    rowIndex += 1;
                });

                const fieldEndRow = rowIndex - 1;
                if (fieldEndRow > fieldStartRow) {
                    merges.push({
                        s: { r: fieldStartRow, c: 1 },
                        e: { r: fieldEndRow, c: 1 },
                    });
                }
            });

            const docEndRow = rowIndex - 1;
            if (docEndRow > docStartRow) {
                merges.push({
                    s: { r: docStartRow, c: 0 },
                    e: { r: docEndRow, c: 0 },
                });
            }

            if (batchIndex < batchData.length - 1) {
                rowIndex += 1;
            }
        });

        ws["!ref"] = XLSX.utils.encode_range({
            s: { r: 0, c: 0 },
            e: { r: Math.max(rowIndex - 1, 0), c: 2 },
        });

        ws["!merges"] = merges;
        ws["!cols"] = [
            { wch: 28 },
            { wch: 30 },
            { wch: 70 },
        ];

        XLSX.utils.book_append_sheet(wb, ws, "Consolidated Data");
        XLSX.writeFile(wb, "consolidated_extracted_data.xlsx");
    };
    /* =========================
       TABLE DATA (Like Dashboard)
    ========================= */
    const tableData = batchData.map((item, index) => ({
        key: index,
        file: item.file_name,
        document: item.data?.metadata?.document_name || "—",
        owner: item.data?.metadata?.owner_name || "—",
        pdf: item.pdf_url || null,
        json: item.data,
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
    const cellStyle = () => ({
        alignment: { vertical: "top", wrapText: true },
        border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
        },
    });
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

    const columns = [
        {
            title: "File",
            dataIndex: "file",
            width: 160,
            render: (text) => <div style={scrollCellStyle}>{text}</div>,
        },
        {
            title: "Document",
            dataIndex: "document",
            width: 200,
            filters: getColumnFilters("document"),
            onFilter: (value, record) => record.document === value,
            render: (text) => <div style={scrollCellStyle}>{text}</div>,
        },
        {
            title: "Owner",
            dataIndex: "owner",
            width: 160,
            filters: getColumnFilters("owner"),
            onFilter: (value, record) => record.owner === value,
            render: (text) => <div style={scrollCellStyle}>{text}</div>,
        },
        {
            title: "PDF",
            dataIndex: "pdf",
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
        {
            title: "Output",
            dataIndex: "key",
            width: 60,
            align: "center",
            render: (key) => (
                <InfoCircleOutlined
                    style={{ fontSize: 18, color: "#1677ff", cursor: "pointer" }}
                    onClick={() => setSelectedKey(key)}
                />
            ),
        },
    ];

    const selectedItem =
        selectedKey !== null ? batchData[selectedKey] : null;

    /* =========================
       RENDER
    ========================= */
    return (
        <Container>
            <MyTableComponent
                columns={columns}
                dataSource={tableData}
                loading={loading}
                selectedKey={selectedKey}
            />

            <Row>
                <Col span={24} style={{ textAlign: "right", marginTop: 16 }}>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={downloadConsolidatedExcel}
                        disabled={!batchData.length}
                        style={{ marginRight: 8 }}
                    >
                        Download Excel
                    </Button>
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Upload Batch PDFs
                    </Button>
                </Col>
            </Row>

            {/* DETAILS VIEW (Same Layout as Dashboard) */}
            {selectedItem && (
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
                            dataSource={Object.entries(
                                selectedItem.data.metadata
                            ).map(([key, value], i) => ({
                                key: i,
                                keyName: key.replace(/_/g, " ").toUpperCase(),
                                value,
                            }))}
                            pagination={false}
                            bordered
                            size="small"
                        />
                    </Card>

                    <Card
                        style={{ marginTop: 16 }}
                        title={`Extracted Fields (${Object.keys(
                            selectedItem.data.fields
                        ).length})`}
                        headStyle={{ backgroundColor: "#5d9de2", color: "#fff" }}
                    >
                        <List
                            itemLayout="vertical"
                            dataSource={Object.entries(
                                selectedItem.data.fields
                            ).map(([name, data], i) => ({
                                id: i,
                                fieldName: name,
                                ...data,
                            }))}
                            renderItem={(item) => (
                                <List.Item>
                                    <Row gutter={[16, 8]}>
                                        <Col span={24}>
                                            <strong>{item.fieldName}</strong>
                                        </Col>

                                        <Col span={14}>
                                            <Input.TextArea
                                                value={
                                                    Array.isArray(item.value)
                                                        ? item.value.join("\n\n")
                                                        : item.value
                                                }
                                                readOnly
                                                autoSize={{ minRows: 2, maxRows: 6 }}
                                            />
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
                title="Upload Multiple PDFs"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setFileList([]);
                }}
                onOk={handleBatchUpload}
                okText="Process Batch"
                confirmLoading={loading}
            >
                <Upload.Dragger
                    accept=".pdf"
                    multiple
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={({ fileList }) => setFileList(fileList)}
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p>Click or drag multiple PDF files to upload</p>
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
        </Container>
    );
};

export default BatchDashboard;
