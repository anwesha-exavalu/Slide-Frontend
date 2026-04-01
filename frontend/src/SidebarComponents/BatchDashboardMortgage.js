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
    DownloadOutlined,
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

const specialMergeFields = [
    "Current Mortgagee Company",
    "Address of Mortgagee Company",
];
const MAX_BATCH_FILES = 10;
const MAX_PDF_FILE_SIZE_MB = 3;
const MAX_TIFF_FILE_SIZE_MB = 1;
const MAX_PDF_FILE_SIZE_BYTES = MAX_PDF_FILE_SIZE_MB * 1024 * 1024;
const MAX_TIFF_FILE_SIZE_BYTES = MAX_TIFF_FILE_SIZE_MB * 1024 * 1024;

const MyTableComponent = ({ columns, dataSource, loading, selectedKey }) => {
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
                        cell: (props) => <th {...props} style={{ color: "#fff" }} />,
                    },
                }}
            />
        </TableContainer>
    );
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

const cellStyle = () => ({
    alignment: { vertical: "top", wrapText: true },
    border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
    },
});

const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined) return [];
    return [value];
};

const firstDefined = (...values) =>
    values.find((val) => val !== undefined && val !== null && val !== "");

const toDisplayValue = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    try {
        return JSON.stringify(value);
    } catch (error) {
        return "";
    }
};
const getConfidenceValue = (obj) => {
    if (!obj) return null;

    // Prefer confidence_level
    if (obj.confidence_level) {
        const level = obj.confidence_level.toLowerCase();
        return level.charAt(0).toUpperCase() + level.slice(1);
    }

    // Fallback to confidence_score
    if (obj.confidence_score !== undefined && obj.confidence_score !== null) {
        return `${Math.round(obj.confidence_score * 100)}%`;
    }

    return null;
};
const normalizePolicyEntries = (rawPolicies) => {
    const policies = toArray(rawPolicies);
    const normalized = [];

    policies.forEach((policy) => {
        const policyNumberObj = policy?.policy_number || {};
        const policyNumber = policyNumberObj?.value ?? "";
        const borrowers = toArray(policy?.borrowers);

        if (!borrowers.length) {
            normalized.push({
                value: policyNumber ? `Policy Number: ${policyNumber}` : "",

                // ✅ MULTIPLE CONFIDENCE
                confidence_values: [
                    getConfidenceValue(policyNumberObj),
                ].filter(Boolean),

                page: policyNumberObj?.page,
                source: policyNumberObj?.source,
            });
            return;
        }

        borrowers.forEach((borrower) => {
            const nameObj = borrower?.name || {};
            const addressObj = borrower?.address || {};

            const combinedValue = [
                policyNumber ? `Policy Number: ${policyNumber}` : "",
                nameObj?.value ? `Borrower: ${nameObj.value}` : "",
                addressObj?.value ? `Address: ${addressObj.value}` : "",
            ]
                .filter(Boolean)
                .join(" | ");

            normalized.push({
                value: combinedValue,

                // 🔥 KEY CHANGE: ALL CONFIDENCES
                confidence_values: [
                    getConfidenceValue(policyNumberObj),
                    getConfidenceValue(nameObj),
                    getConfidenceValue(addressObj),
                ].filter(Boolean),

                page: firstDefined(
                    nameObj?.page,
                    addressObj?.page,
                    policyNumberObj?.page
                ),
                source: firstDefined(
                    nameObj?.source,
                    addressObj?.source,
                    policyNumberObj?.source
                ),
            });
        });
    });

    return normalized;
};

const normalizeFieldEntries = (fieldName, rawValues) => {
    if (fieldName === "Policies") {
        return normalizePolicyEntries(rawValues);
    }

    return toArray(rawValues).map((entry) => {
        if (entry && typeof entry === "object") {
            if (Object.prototype.hasOwnProperty.call(entry, "value")) {
                return entry;
            }

            return {
                value: toDisplayValue(entry),
            };
        }

        return {
            value: toDisplayValue(entry),
        };
    });
};

const normalizeFields = (rawFields = {}) =>
    Object.fromEntries(
        Object.entries(rawFields).map(([fieldName, rawValues]) => [
            fieldName,
            normalizeFieldEntries(fieldName, rawValues),
        ])
    );

const getMaxRowsForFields = (fields, fieldNames) => {
    if (!fieldNames.length) return 1;
    return Math.max(
        ...fieldNames.map((field) =>
            Array.isArray(fields[field]) ? fields[field].length : 1
        )
    );
};

const getPageNumberForRow = (fields, fieldNames, rowIndex) =>
    firstDefined(
        ...fieldNames.map((field) => {
            const valueArray = Array.isArray(fields[field]) ? fields[field] : [];
            return valueArray[rowIndex]?.page;
        })
    ) ?? "";

const buildMortgagePreviewRows = (json, documentName) => {
    if (!json) return [];

    const fields = normalizeFields(json.fields || {});
    const fieldNames = Object.keys(fields);
    const maxRows = getMaxRowsForFields(fields, fieldNames);
    const rows = [];

    for (let r = 0; r < maxRows; r++) {
        const row = {};
        row["Document Name"] = r === 0 ? documentName : "";

        fieldNames.forEach((field) => {
            const valueArray = Array.isArray(fields[field]) ? fields[field] : [];
            row[field] = valueArray[r]?.value ?? "";
        });
        row["Page Number"] = getPageNumberForRow(fields, fieldNames, r);

        rows.push(row);
    }

    return rows;
};

const buildDetailRows = (fields) =>
    Object.entries(normalizeFields(fields || {})).flatMap(
        ([fieldName, entries], i) => {
            const data = Array.isArray(entries) ? entries : [];

            if (!data.length) {
                return [
                    {
                        id: `${i}-0`,
                        fieldName,
                        value: "",
                        confidence_score: null,
                        page: null,
                    },
                ];
            }

            return data.map((entry, j) => ({
                id: `${i}-${j}`,
                fieldName: j === 0 ? fieldName : "",
                value: entry?.value ?? "",

                confidence_values: entry?.confidence_values,

                confidence_level: entry?.confidence_level,
                confidence_score: entry?.confidence_score,
                page: entry?.page,
            }));
        }
    );
const getMaxConfidence = (values = []) => {
    if (!values.length) return null;

    let maxLevelScore = -1;
    let maxPercent = -1;
    let bestValue = null;

    values.forEach((val) => {
        if (!val) return;

        if (!val.includes("%")) {
            const level = val.toLowerCase();

            const score =
                level === "high" ? 3 :
                    level === "medium" ? 2 :
                        level === "low" ? 1 : 0;

            if (score > maxLevelScore) {
                maxLevelScore = score;
                bestValue = val;
            }
        }

        // Case 2: Percentage
        if (val.includes("%")) {
            const num = parseInt(val);
            if (num > maxPercent) {
                maxPercent = num;
            }
        }
    });


    if (bestValue) return bestValue;
    if (maxPercent !== -1) return `${maxPercent}%`;

    return null;
};

const getConfidenceDisplay = (item = {}) => {
    const rawLevel = item?.confidence_level;
    if (typeof rawLevel === "string" && rawLevel.trim()) {
        const normalizedLevel = rawLevel.trim().toLowerCase();
        const formattedLevel =
            normalizedLevel.charAt(0).toUpperCase() + normalizedLevel.slice(1);
        const color =
            normalizedLevel === "high"
                ? "green"
                : normalizedLevel === "medium"
                    ? "orange"
                    : normalizedLevel === "low"
                        ? "red"
                        : "blue";

        return { value: formattedLevel, color };
    }

    const rawScore = item?.confidence_score;
    const score =
        typeof rawScore === "number" ? rawScore : Number.parseFloat(rawScore);

    if (!Number.isNaN(score)) {
        return {
            value: `${Math.round(score * 100)}%`,
            color: score > 0.8 ? "green" : score > 0.5 ? "orange" : "red",
        };
    }

    return null;
};

const BatchDashboardMortgage = () => {
    const [batchData, setBatchData] = useState([]);
    const [selectedKey, setSelectedKey] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [excelModalOpen, setExcelModalOpen] = useState(false);
    const [selectedExcelData, setSelectedExcelData] = useState(null);
    const detailsRef = useRef(null);

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

    const handleBatchUpload = async () => {
        if (!fileList.length) {
            message.warning("Please select at least one file");
            return;
        }

        if (fileList.length > MAX_BATCH_FILES) {
            message.error(`You can upload up to ${MAX_BATCH_FILES} files at a time`);
            return;
        }

        const oversizedFile = fileList.find((file) => {
            const fileSize = file?.originFileObj?.size ?? file?.size ?? 0;
            const fileName = (file?.name || "").toLowerCase();
            const isTiffFile =
                file?.type === "image/tiff" ||
                fileName.endsWith(".tif") ||
                fileName.endsWith(".tiff");
            const maxAllowedSize = isTiffFile
                ? MAX_TIFF_FILE_SIZE_BYTES
                : MAX_PDF_FILE_SIZE_BYTES;
            return fileSize > maxAllowedSize;
        });

        if (oversizedFile) {
            const fileName = (oversizedFile?.name || "").toLowerCase();
            const isTiffFile =
                oversizedFile?.type === "image/tiff" ||
                fileName.endsWith(".tif") ||
                fileName.endsWith(".tiff");
            const typeLabel = isTiffFile ? "TIF/TIFF" : "PDF";
            const maxSizeLabel = isTiffFile
                ? MAX_TIFF_FILE_SIZE_MB
                : MAX_PDF_FILE_SIZE_MB;
            message.error(`${typeLabel} files must be ${maxSizeLabel} MB or smaller`);
            return;
        }

        try {
            setLoading(true);
            const BASE_URL = process.env.REACT_APP_AI_EXTRACT;
            const formData = new FormData();

            fileList.forEach((file) => {
                formData.append("files", file.originFileObj);
            });

            const response = await fetch(
                `${BASE_URL}/api/extract_document_batch?template=mortgage`,
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

    const handleDownloadExcel = (json, documentName) => {
        if (!json) return;

        const wb = XLSX.utils.book_new();
        const ws = {};
        const fields = normalizeFields(json.fields || {});
        const fieldNames = Object.keys(fields);
        const headers = ["Document Name", ...fieldNames, "Page Number"];
        const maxRows = getMaxRowsForFields(fields, fieldNames);
        const merges = [];

        headers.forEach((header, colIndex) => {
            const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
            ws[cellRef] = { v: header, s: headerStyle() };
        });

        for (let r = 0; r < maxRows; r++) {
            const rowIndex = r + 1;

            ws[XLSX.utils.encode_cell({ r: rowIndex, c: 0 })] = {
                v: r === 0 ? documentName : "",
                s: cellStyle(),
            };

            fieldNames.forEach((field, colIndex) => {
                const valueArray = Array.isArray(fields[field]) ? fields[field] : [];
                const value = valueArray[r]?.value ?? "";

                ws[XLSX.utils.encode_cell({ r: rowIndex, c: colIndex + 1 })] = {
                    v: value,
                    s: cellStyle(),
                };
            });

            ws[XLSX.utils.encode_cell({ r: rowIndex, c: fieldNames.length + 1 })] = {
                v: getPageNumberForRow(fields, fieldNames, r),
                s: cellStyle(),
            };
        }

        if (maxRows > 1) {
            merges.push({
                s: { r: 1, c: 0 },
                e: { r: maxRows, c: 0 },
            });
        }

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
        XLSX.writeFile(
            wb,
            `${(documentName || "mortgage_document").replace(/[\\/:*?"<>|]/g, "_")}_extracted.xlsx`
        );
    };

    const handleDownloadConsolidatedExcel = () => {
        if (!batchData.length) {
            message.warning("No batch data available to download");
            return;
        }

        const wb = XLSX.utils.book_new();
        const ws = {};
        const merges = [];
        const allFieldNames = Array.from(
            new Set(
                batchData.flatMap((item) => Object.keys(item?.data?.fields || {}))
            )
        );
        const headers = ["Document Name", ...allFieldNames, "Page Number"];
        let rowIndex = 0;

        headers.forEach((header, colIndex) => {
            const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
            ws[cellRef] = { v: header, s: headerStyle() };
        });
        rowIndex += 1;

        batchData.forEach((item, itemIndex) => {
            const json = item?.data;
            if (!json) return;

            const fields = normalizeFields(json.fields || {});
            const documentName =
                json?.metadata?.document_name || item?.file_name || "Unknown Document";
            const maxRows = getMaxRowsForFields(fields, allFieldNames);
            const docStartRow = rowIndex;

            for (let r = 0; r < maxRows; r++) {
                ws[XLSX.utils.encode_cell({ r: rowIndex, c: 0 })] = {
                    v: r === 0 ? documentName : "",
                    s: cellStyle(),
                };

                allFieldNames.forEach((field, colIndex) => {
                    const valueArray = Array.isArray(fields[field]) ? fields[field] : [];
                    const value = valueArray[r]?.value ?? "";

                    ws[XLSX.utils.encode_cell({ r: rowIndex, c: colIndex + 1 })] = {
                        v: value,
                        s: cellStyle(),
                    };
                });

                ws[XLSX.utils.encode_cell({ r: rowIndex, c: allFieldNames.length + 1 })] = {
                    v: getPageNumberForRow(fields, allFieldNames, r),
                    s: cellStyle(),
                };

                rowIndex += 1;
            }

            if (maxRows > 1) {
                merges.push({
                    s: { r: docStartRow, c: 0 },
                    e: { r: rowIndex - 1, c: 0 },
                });
            }

            specialMergeFields.forEach((field) => {
                const fieldIndex = headers.indexOf(field);
                const values = fields[field];
                if (
                    fieldIndex !== -1 &&
                    (!Array.isArray(values) || values.length <= 1) &&
                    maxRows > 1
                ) {
                    merges.push({
                        s: { r: docStartRow, c: fieldIndex },
                        e: { r: rowIndex - 1, c: fieldIndex },
                    });
                }
            });

            if (itemIndex < batchData.length - 1) rowIndex += 1;
        });

        ws["!ref"] = XLSX.utils.encode_range({
            s: { r: 0, c: 0 },
            e: { r: Math.max(rowIndex - 1, 0), c: headers.length - 1 },
        });
        ws["!merges"] = merges;
        ws["!cols"] = headers.map(() => ({ wch: 28 }));

        XLSX.utils.book_append_sheet(wb, ws, "Mortgage Consolidated Data");
        XLSX.writeFile(wb, "mortgage_consolidated_extracted.xlsx");
    };

    const tableData = batchData.map((item, index) => ({
        key: index,
        file: item.file_name,
        document: item.data?.metadata?.document_name || "-",
        owner: item.data?.metadata?.owner_name || "-",
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
                    "-"
                ),
        },
        {
            title: "Excel",
            dataIndex: "json",
            width: 80,
            render: (json, record) =>
                json ? (
                    <Button
                        type="link"
                        icon={<FileExcelOutlined style={{ color: "#217346" }} />}
                        onClick={() => {
                            setSelectedExcelData({
                                json,
                                documentName: record.document || record.file,
                            });
                            setExcelModalOpen(true);
                        }}
                    >
                        View
                    </Button>
                ) : (
                    "-"
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

    const selectedItem = selectedKey !== null ? batchData[selectedKey] : null;

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
                        onClick={handleDownloadConsolidatedExcel}
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
                        Upload Batch PDF / TIF / TIFF 
                    </Button>
                </Col>
            </Row>

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
                                selectedItem.data?.metadata || {}
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
                            selectedItem.data?.fields || {}
                        ).length})`}
                        headStyle={{ backgroundColor: "#5d9de2", color: "#fff" }}
                    >
                        <List
                            itemLayout="vertical"
                            dataSource={buildDetailRows(selectedItem.data?.fields || {})}
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <Row gutter={[16, 8]}>
                                        <Col span={24}>
                                            <strong>{item.fieldName || " "}</strong>
                                        </Col>

                                        <Col span={14}>
                                            <Input.TextArea
                                                value={String(item.value ?? "")}
                                                readOnly
                                                autoSize={{ minRows: 2, maxRows: 6 }}
                                            />
                                        </Col>

                                        <Col span={10} style={{ textAlign: "right" }}>
                                            {(() => {

                                                if (item.confidence_values && item.confidence_values.length) {
                                                    const maxConfidence = getMaxConfidence(item.confidence_values);

                                                    const color =
                                                        maxConfidence?.toLowerCase?.() === "high"
                                                            ? "green"
                                                            : maxConfidence?.toLowerCase?.() === "medium"
                                                                ? "orange"
                                                                : maxConfidence?.toLowerCase?.() === "low"
                                                                    ? "red"
                                                                    : maxConfidence?.includes("%")
                                                                        ? parseInt(maxConfidence) > 80
                                                                            ? "green"
                                                                            : parseInt(maxConfidence) > 50
                                                                                ? "orange"
                                                                                : "red"
                                                                        : "blue";

                                                    return (
                                                        <Tag color={color}>
                                                            Confidence: {maxConfidence}
                                                        </Tag>
                                                    );
                                                }
                                             
                                                const confidenceDisplay = getConfidenceDisplay(item);
                                                if (!confidenceDisplay) return null;

                                                return (
                                                    <Tag color={confidenceDisplay.color}>
                                                        Confidence: {confidenceDisplay.value}
                                                    </Tag>
                                                );
                                            })()}
                                            <Tag>Page: {item.page ?? "-"}</Tag>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            )}

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
                    accept=".pdf,.tif,.tiff"
                    multiple
                    maxCount={MAX_BATCH_FILES}
                    fileList={fileList}
                    beforeUpload={(file) => {
                        const fileName = file.name.toLowerCase();

                        const isValid =
                            file.type === "application/pdf" ||
                            file.type === "image/tiff" ||
                            fileName.endsWith(".pdf") ||
                            fileName.endsWith(".tif") ||
                            fileName.endsWith(".tiff");

                        if (!isValid) {
                            message.error("Only PDF, TIF, TIFF files are allowed");
                            return Upload.LIST_IGNORE;
                        }

                        const isTiffFile =
                            file.type === "image/tiff" ||
                            fileName.endsWith(".tif") ||
                            fileName.endsWith(".tiff");
                        const maxAllowedSize = isTiffFile
                            ? MAX_TIFF_FILE_SIZE_BYTES
                            : MAX_PDF_FILE_SIZE_BYTES;
                        const maxAllowedSizeMb = isTiffFile
                            ? MAX_TIFF_FILE_SIZE_MB
                            : MAX_PDF_FILE_SIZE_MB;
                        const typeLabel = isTiffFile ? "TIF/TIFF" : "PDF";

                        if (file.size > maxAllowedSize) {
                            message.error(
                                `${file.name} exceeds ${maxAllowedSizeMb} MB limit for ${typeLabel} files`
                            );
                            return Upload.LIST_IGNORE;
                        }

                        return false; // prevent auto upload (keep your existing behavior)
                    }}
                    onChange={({ fileList: updatedFileList }) => {
                        if (updatedFileList.length > MAX_BATCH_FILES) {
                            message.error(
                                `You can upload up to ${MAX_BATCH_FILES} files at a time`
                            );
                        }
                        const limitedFileList = updatedFileList.slice(
                            0,
                            MAX_BATCH_FILES
                        );
                        const sizeValidatedFileList = limitedFileList.filter((file) => {
                            const fileSize = file?.originFileObj?.size ?? file?.size ?? 0;
                            const fileName = (file?.name || "").toLowerCase();
                            const isTiffFile =
                                file?.type === "image/tiff" ||
                                fileName.endsWith(".tif") ||
                                fileName.endsWith(".tiff");
                            const maxAllowedSize = isTiffFile
                                ? MAX_TIFF_FILE_SIZE_BYTES
                                : MAX_PDF_FILE_SIZE_BYTES;
                            return fileSize <= maxAllowedSize;
                        });
                        setFileList(sizeValidatedFileList);
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p>
                        Click or drag PDF / TIF / TIFF files to upload (max{" "}
                        {MAX_BATCH_FILES}, PDF {MAX_PDF_FILE_SIZE_MB} MB, TIF/TIFF{" "}
                        {MAX_TIFF_FILE_SIZE_MB} MB)
                    </p>
                </Upload.Dragger>
            </Modal>

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
                            render: (value, _row, index) => {
                                const rowCount = buildMortgagePreviewRows(
                                    selectedExcelData?.json,
                                    selectedExcelData?.documentName
                                ).length;

                                return {
                                    children: value,
                                    props: {
                                        rowSpan: index === 0 ? rowCount : 0,
                                    },
                                };
                            },
                        },
                        ...Object.keys(selectedExcelData?.json?.fields || {}).map(
                            (field) => ({
                                title: field,
                                dataIndex: field,
                                onHeaderCell: () => ({
                                    style: { backgroundColor: "#217346", color: "#fff" },
                                }),
                                render: (value, _row, index) => {
                                    const rows = buildMortgagePreviewRows(
                                        selectedExcelData?.json,
                                        selectedExcelData?.documentName
                                    );

                                    if (specialMergeFields.includes(field)) {
                                        const rowCount = rows.length;
                                        return {
                                            children: value,
                                            props: {
                                                rowSpan: index === 0 ? rowCount : 0,
                                            },
                                        };
                                    }

                                    return {
                                        children: (
                                            <span
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {value}
                                            </span>
                                        ),
                                        props: { rowSpan: 1 },
                                    };
                                },
                            })
                        ),
                        {
                            title: "Page Number",
                            dataIndex: "Page Number",
                            width: 110,
                            onHeaderCell: () => ({
                                style: { backgroundColor: "#217346", color: "#fff" },
                            }),
                            render: (page) =>
                                page !== "" && page !== undefined && page !== null
                                    ? page
                                    : "—",
                        },
                    ]}
                    dataSource={buildMortgagePreviewRows(
                        selectedExcelData?.json,
                        selectedExcelData?.documentName
                    )}
                    pagination={{ pageSize: 100 }}
                    bordered
                    size="small"
                    scroll={{ x: true }}
                />
            </Modal>
        </Container>
    );
};

export default BatchDashboardMortgage;
