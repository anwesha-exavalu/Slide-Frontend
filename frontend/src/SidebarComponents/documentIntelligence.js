import React, { useState } from "react";
import {
  Upload,
  Button,
  Card,
  Table,
  List,
  Row,
  Col,
  Input,
  Tag,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const DocumentIntelligence = () => {
  const [loading, setLoading] = useState(false);

  // Always-safe API response shape
  const [apiResponse, setApiResponse] = useState({
    // metadata: {},
    context: {},
    fields: {},
  });

  console.log("Api Response",apiResponse)

  // Controls upload vs result view
  const [hasResult, setHasResult] = useState(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/analyze-document",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setApiResponse(res.data);
      setHasResult(true);

      message.success("Document analyzed successfully");
    } catch (err) {
      console.error(err);
      message.error("Document analysis failed");
    } finally {
      setLoading(false);
    }

    return false; // prevent auto upload
  };

  /* =========================
     UPLOAD VIEW
  ========================= */
  if (!hasResult) {
    return (
      <div className="upload-wrapper">
        <Card
          title="Document Intelligence"
          className="upload-card"
          bordered={false}
        >
          <Upload beforeUpload={handleUpload} showUploadList={false}>
            <div className="upload-dropzone">
              <UploadOutlined className="upload-icon" />

              <div className="upload-title">
                Upload a document to analyze
              </div>

              <div className="upload-subtitle">
                Drag & drop a PDF or image here, or click to browse
              </div>

              <Button
                type="primary"
                size="large"
                loading={loading}
                style={{ marginTop: 24 }}
              >
                Select File
              </Button>
            </div>
          </Upload>
        </Card>
      </div>
    );
  }

  /* =========================
     METADATA TABLE (SAFE)
  ========================= */
  const metaColumns = [
    { title: "", dataIndex: "keyLabel", width: "30%" },
    { title: "", dataIndex: "value" },
  ];

  const metaDataSource = Object.entries(apiResponse?.context || {}).map(
    ([key, value], index) => ({
      key: index,
      keyLabel: key.replace(/_/g, " ").toUpperCase(),
      value,
    })
  );

  /* =========================
     FIELD LIST (SAFE)
  ========================= */
  const fieldList = Object.entries(apiResponse?.fields || {}).map(
    ([fieldName, fieldData], index) => ({
      id: index,
      fieldName,
      ...fieldData,
    })
  );

  return (
    <div className="flex flex-col w-full">
      {/* Reset */}
      <Button
        style={{ marginBottom: 16 }}
        onClick={() => {
          setHasResult(false);
          setApiResponse({ metadata: {}, fields: {} });
        }}
      >
        Analyze another document
      </Button>

      {/* Metadata */}
      {metaDataSource.length > 0 && (
        <Card
          title="Document Metadata"
          headStyle={{ backgroundColor: "#5d9de2", color: "#fff" }}
          style={{ marginBottom: 16 }}
        >
          <Table
            columns={metaColumns}
            dataSource={metaDataSource}
            pagination={false}
            bordered
            size="small"
          />
        </Card>
      )}

      {/* Fields */}
      <Card
        title={`Extracted Fields (${fieldList.length})`}
        headStyle={{ backgroundColor: "#5d9de2", color: "#fff" }}
      >
        {fieldList.length === 0 ? (
          <div>No fields extracted</div>
        ) : (
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
                        style={{ backgroundColor: "#fafafa" }}
                      />
                    ) : (
                      <Input
                        value={item.value}
                        readOnly
                        style={{ backgroundColor: "#fafafa" }}
                      />
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
                      Confidence: {Math.round(item.confidence_score * 100)}%
                    </Tag>
                    <Tag>Page: {item.page}</Tag>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default DocumentIntelligence;
