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

const getMaxRowsForFields = (fields, fieldNames) => {
    if (!fieldNames.length) return 1;
    return Math.max(
        ...fieldNames.map((field) =>
            Array.isArray(fields[field]) ? fields[field].length : 1
        )
    );
};

const buildMortgagePreviewRows = (json, documentName) => {
    if (!json) return [];

    const fields = json.fields || {};
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

        rows.push(row);
    }

    return rows;
};

const buildDetailRows = (fields) =>
    Object.entries(fields || {}).flatMap(([fieldName, entries], i) => {
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
            confidence_score: entry?.confidence_score,
            page: entry?.page,
        }));
    });

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
        const fields = json.fields || {};
        const fieldNames = Object.keys(fields);
        const headers = ["Document Name", ...fieldNames];
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
        const headers = ["Document Name", ...allFieldNames];
        let rowIndex = 0;

        headers.forEach((header, colIndex) => {
            const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
            ws[cellRef] = { v: header, s: headerStyle() };
        });
        rowIndex += 1;

        batchData.forEach((item, itemIndex) => {
            const json = item?.data;
            if (!json) return;

            const fields = json.fields || {};
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
                        Upload Batch PDFs
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
                                                {item.confidence_score != null
                                                    ? `${Math.round(item.confidence_score * 100)}%`
                                                    : "-"}
                                            </Tag>
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
                    accept=".pdf"
                    multiple
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={({ fileList: updatedFileList }) =>
                        setFileList(updatedFileList)
                    }
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p>Click or drag multiple PDF files to upload</p>
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

export default BatchDashboardMortgage;
