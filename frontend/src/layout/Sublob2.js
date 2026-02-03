import React from "react";
import { useLocation } from "react-router-dom";
import { Table, List, Card, Tag, Row, Col, Input } from "antd";

const Sublob2 = () => {
  const { state } = useLocation();
  const { submissionId, apiData } = state || {};

  const submission = apiData?.find(
    (item) => item.submission_id === submissionId
  );

  if (!submission) {
    return <div>No data available</div>;
  }

  const { metadata, fields } = submission.llm_response;
  const totalExtractedFields = Object.keys(fields).length;

  /* =========================
     Metadata
  ========================= */
  const metaColumns = [
    { title: "", dataIndex: "key", width: "30%" },
    { title: "", dataIndex: "value" },
  ];

  const metaDataSource = Object.entries(metadata).map(
    ([key, value], index) => ({
      key: index,
      key: key.replace(/_/g, " ").toUpperCase(),
      value,
    })
  );

  /* =========================
     Fields
  ========================= */
  const fieldList = Object.entries(fields).map(
    ([fieldName, fieldData], index) => ({
      id: index,
      fieldName,
      ...fieldData,
    })
  );

  return (
    <div className="flex flex-col w-full">
      <Card
        title="Document Metadata"
        headStyle={{
          backgroundColor: "#5d9de2 ",
          color: "#fff",
        }}
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

      <Card
        title={
          <div>
            <div>Extracted Fields</div>
            <div style={{ fontSize: 12, fontWeight: 400 }}>
              Total extracted fields: {totalExtractedFields}
            </div>
          </div>
        }
        headStyle={{
          backgroundColor: "#5d9de2",
          color: "#fff",
        }}
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

                <Col span={14}>
                  {String(item.value).length > 120 ? (
                    <Input.TextArea
                      value={item.value}
                      readOnly
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      style={{
                        backgroundColor: "#fafafa",
                        resize: "none",
                      }}
                    />
                  ) : (
                    <Input
                      value={item.value}
                      readOnly
                      style={{
                        backgroundColor: "#fafafa",
                      }}
                    />
                  )}
                </Col>


                <Col span={10} style={{ textAlign: "right" }}>
                  <Tag color={item.confidence_score > 0.8 ? "green" : item.confidence_score > 0.5 ? "orange" : "red"}>
                    Confidence:{" "}
                    {Math.round(Number(item.confidence_score) * 100)}%
                  </Tag>
                  {/* <Tag>Type: {item.type}</Tag> */}
                  {/* <Tag>Format: {item.format}</Tag> */}
                  {/* {item.source && <Tag>Source: {item.source}</Tag>} */}
                  <Tag>Page: {item.page}</Tag>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Sublob2;
