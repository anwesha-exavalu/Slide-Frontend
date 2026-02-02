import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row, Table } from "antd";
import Dropdown from "components/FormControl/DropdownSelect";
import FormDatePicker from "components/FormControl/FormDatePicker";
import dashboardreportsDropDown from "assets/files/dashboardreports.csv";
import Papa from "papaparse";
import { setDropdownVals } from "utils/helper";
import { Container } from "styles/pages/Login";
import printlogo from "assets/svg/printer.svg";
import FormControl from "components/FormControl/FormInput";
import exportlogo from "assets/svg/share.svg";
import { dataColumnsallProducerproduction } from "pages/Dashboard/DashboardSubFeatures/dummyData";
import { exportCSV, tableValues } from "utils/helper";
import TableComponent from "components/Table";
import edit from "assets/svg/edit.svg";
import print from "assets/images/print.svg";
import useMetaData from "context/metaData";
import {
  SearchPolicyTitle,
  SearchPolicySection,
  FormSection,
  SearchButtonSection,
} from "styles/pages/SearchPolicy";
import moment from "moment";

const ProducerProduction = () => {
  const { theme } = useMetaData();
  const commonConfig = { delimiter: "," };
  const filesData = {};
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  useEffect(() => {
    const tableObj = tableValues(dataColumnsallProducerproduction);
    setTableData(tableObj.tableData);
    setTableColumns(tableObj.tableColArr);
  }, []);

  useEffect(() => {
    Papa.parse(dashboardreportsDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);
  const handlePrint = () => {
    window.print();
  };
  const uniqueStates = [...new Set(tableData.map((item) => item.statecd))];
  const groupedData = uniqueStates.map((state) => ({
    state,
    data: tableData.filter((item) => item.statecd === state),
  }));
  return (
    <SearchPolicySection theme={theme}>
      <Container theme={theme}>
        <div className="topsection">
          <div>
            <SearchPolicyTitle theme={theme}>
              Producer Production Details
            </SearchPolicyTitle>
          </div>
        </div>
        <div className="container-box">
          <Form
            layout="vertical"
            initialValues={{
              StartDate: moment("2023-01-11"),
              EndDate: moment("2024-11-07"),
              reportType: "Detail",
              reportlevel: "Producer",
              producergroup: "80035-000-001",
            }}
          >
            <Row gutter={16}>
              <Col span={6}>
                <FormDatePicker
                  label="Start Date"
                  name="StartDate"
                  className="form-controls"
                  id="DateRange"
                  required={true}
                />
              </Col>
              <Col span={6}>
                <FormDatePicker
                  label="End Date"
                  className="form-controls"
                  name="EndDate"
                  type="text"
                  required={true}
                />
              </Col>
              <Col span={6}>
                <Dropdown
                  label="Report Type"
                  name={"reportType"}
                  options={dropDownOpts?.ReportLevel || []}
                  required={true}
                  placeholder="Report Type"
                  layout="vertical"
                />
              </Col>
              <Col span={6}>
                <Dropdown
                  label="Company"
                  name={"company"}
                  options={dropDownOpts?.Company || []}
                  required={false}
                  placeholder="Company"
                  layout="vertical"
                />
              </Col>
              <Col span={6}>
                <Dropdown
                  label="State"
                  name={"state"}
                  options={dropDownOpts?.State || []}
                  required={false}
                  placeholder="State"
                  layout="vertical"
                />
              </Col>
              <Col span={6}>
                <Dropdown
                  label="Product"
                  name={"product"}
                  options={dropDownOpts?.Product || []}
                  required={false}
                  placeholder="Product"
                  layout="vertical"
                />
              </Col>
              <Col span={6}>
                <Dropdown
                  label="Report Level"
                  name={"reportlevel"}
                  options={dropDownOpts?.ReportType || []}
                  required={true}
                  placeholder="Report Level"
                  layout="vertical"
                />
              </Col>
              <Col span={6}>
                <FormControl
                  label="Producer Code"
                  className="form-controls"
                  name="producergroup"
                  type="text"
                  required={true}
                />
              </Col>
              <SearchButtonSection>
                <Col span={8}>
                  <div className="generate-btn-box">
                    <Button
                      color="default"
                      variant="solid"
                      className="generate-btn"
                      //onClick={redirectUrl}
                    >
                      Run Report
                    </Button>
                  </div>
                </Col>
              </SearchButtonSection>
            </Row>
          </Form>
        </div>
        {groupedData.map((group) => (
          <FormSection key={group.state} theme={theme}>
            <TableComponent
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Results for state {group.state}</span>
                  <div style={{ display: "flex", gap: "17px" }}>
                    <button
                      type="submit"
                      onClick={handlePrint}
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <img
                        src={printlogo}
                        alt="Insureds Icon"
                        style={{ width: "18px", height: "18px" }}
                      />
                    </button>

                    <button
                      type="submit"
                      style={{ backgroundColor: "transparent", border: "none" }}
                      onClick={() =>
                        exportCSV(tableColumns, tableData, "policyinforce.csv")
                      }
                    >
                      <img
                        src={exportlogo}
                        alt="Insureds Icon"
                        style={{ width: "18px", height: "18px" }}
                      />
                    </button>
                  </div>
                </div>
              }
              //columns={tableColumns}
              columns={[
                ...tableColumns,
                {
                  title: "Actions",
                  key: "actions",
                  render: () => (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <img
                          src={print}
                          alt="Print Icon"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </button>

                      <button
                        type="submit"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <img
                          src={edit}
                          alt="Export Icon"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </button>
                    </div>
                  ),
                },
              ]}
              data={group.data}
            />
            <Table
              columns={[
                { title: "Summary", dataIndex: "label", key: "label" },
                { title: "Value", dataIndex: "value", key: "value" },
              ]}
              dataSource={[
                { key: "1", label: "Total for State", value: group.state },
                {
                  key: "2",
                  label: "Total for Carrier",
                  value: group.data[0]?.carriergroupcd,
                },
                // { key: "3", label: "Total for Producer", value: group.data[0]?.agencycd + " " + group.data[0]?.producername },
                { key: "4", label: "Total for Agency", value: "$10,000" },
                { key: "5", label: "Grand Total", value: "$100,000" },
              ]}
              pagination={false}
              size="small"
              bordered
              style={{
                marginTop: 20,
                boxShadow: "0px 6px 18px -2px #18181C1A",
                borderRadius: "10px",
              }} // Add some spacing between the tables
            />
          </FormSection>
        ))}
      </Container>
    </SearchPolicySection>
  );
};

export default ProducerProduction;
