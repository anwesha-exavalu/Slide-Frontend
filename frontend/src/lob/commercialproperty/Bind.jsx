import React, { useState } from 'react';
import { Table, Input, Typography, Button, Row, Col, Tooltip } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import { EditOutlined } from "@ant-design/icons";
import TableComponent from '../../components/Table';
import { TableContainer } from '../../styles/components/TableComponent';

const { Title, Text } = Typography;

const Bind = () => {
  // Define table data for each section
  const coverageData = [
    { key: 1, location: 'Location 1', coverage: '', limit: '', deductible: '', premium: '' },
    { key: 2, location: 'Location 2', coverage: '', limit: '', deductible: '', premium: '' },
    { key: 3, location: 'Location 3', coverage: '', limit: '', deductible: '', premium: '' },
    { key: 4, location: 'Location 4', coverage: '', limit: '', deductible: '', premium: '' },
  ];

  const formData = [
    { key: 1, formNumber: '1', formName: '', description: '' },
    { key: 2, formNumber: '2', formName: '', description: '' },
    { key: 3, formNumber: '3', formName: '', description: '' },
    { key: 4, formNumber: '4', formName: '', description: '' },
  ];

  const invoiceData = [
    { key: 1, label: 'Invoice Number', value: '' },
    { key: 2, label: 'Installment No.', value: '' },
    { key: 3, label: 'Total Premium Due', value: '' },
    { key: 4, label: 'Installment Premium Due', value: '' },
  ];

  // Define columns for each table
  const coverageColumns = [
    { title: 'Location (address)/Building', dataIndex: 'location', key: 'location' },
    { title: 'Coverage', dataIndex: 'coverage', key: 'coverage' },
    { title: 'Coverage Limit', dataIndex: 'limit', key: 'limit' },
    { title: 'Deductible', dataIndex: 'deductible', key: 'deductible' },
    { title: 'Premium', dataIndex: 'premium', key: 'premium' },
  ];

  const formColumns = [
    { title: 'Form Number', dataIndex: 'formNumber', key: 'formNumber' },
    { title: 'Form Name', dataIndex: 'formName', key: 'formName' },
    { title: 'Form Description', dataIndex: 'description', key: 'description' },
  ];

  const invoiceColumns = [
    { title: 'Label', dataIndex: 'label', key: 'label' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  return (
    <div className="quote-summary">
    
      <Row gutter={16}>
                        <Col span={22}></Col>
                        <Col span={2}>
                        <div style={{ justifyContent: "right",}}>
                        <Tooltip title="Edit">
                            <Button shape="circle"  icon={<EditOutlined style={{ fontSize: "20px" }} />} style={{ fontSize: "20px" }} />
                        </Tooltip>
                      

                        
                    </div>
                       </Col>
                       
                    </Row>

      {/* Header Information */}

      <TableComponent
                    title={"Coverages"}
                    columns={[
                      { title: '', dataIndex: 'label', key: 'label' },
                      { title: '', dataIndex: 'value', key: 'value' },
                    ]}
                    data={[
                      { key: 'quoteNumber', label: 'Quote Number', value: '' },
                      { key: 'effectiveDate', label: 'Policy Effective Date', value: '' },
                      { key: 'endDate', label: 'Policy End Date', value: '' },
                      { key: 'insuredName', label: 'Insured Name', value: '' },
                      { key: 'mailingAddress', label: 'Mailing Address', value: '' },
                    ]}
                    style={{ marginTop: 2 }}
                  />
     
      

      {/* Coverage Summary Table */}
      <Title level={5} style={{ textAlign: 'center', backgroundColor: '#1d4ed8', color: 'white', padding: '5px', borderRadius: '5px', marginTop: '20px' }}>Coverage Summary</Title>
      
      <TableContainer >
                                                  <Table
                                                      columns={coverageColumns}
                                                      dataSource={coverageData}
                                                      pagination={false}
                                                      rowKey="key"
                                                      summary={() => (
                                                        <>
                                                          <Table.Summary.Row>
                                                            <Table.Summary.Cell colSpan={4}>Total</Table.Summary.Cell>
                                                            <Table.Summary.Cell>100000</Table.Summary.Cell>
                                                          </Table.Summary.Row>
                                                          <Table.Summary.Row>
                                                            <Table.Summary.Cell colSpan={4}>Fees & Taxes</Table.Summary.Cell>
                                                            <Table.Summary.Cell>1000</Table.Summary.Cell>
                                                          </Table.Summary.Row>
                                                          <Table.Summary.Row>
                                                            <Table.Summary.Cell colSpan={4}>Total Payable</Table.Summary.Cell>
                                                            <Table.Summary.Cell>101000</Table.Summary.Cell>
                                                          </Table.Summary.Row>
                                                        </>
                                                      )}
                                                  />
                                              </TableContainer>
     

      {/* Forms Table */}
      <Title level={5} style={{ textAlign: 'center', backgroundColor: '#1d4ed8', color: 'white', padding: '5px', borderRadius: '5px', marginTop: '20px' }}>Forms</Title>
      <Table
        dataSource={formData}
        columns={formColumns}
        pagination={false}
        size="small"
        className="custom-table-header"
        bordered
      />

      {/* Invoice Details Table */}
      <Title level={5} style={{ textAlign: 'center', backgroundColor: '#1d4ed8', color: 'white', padding: '5px', borderRadius: '5px', marginTop: '20px' }}>Invoice Details</Title>
      <TableComponent
                    title={"Coverages"}
                    columns={invoiceColumns}
                    data={invoiceData}
                    style={{ marginTop: 2 }}
                  />
      
      {/* Underwriter Notes */}
     


                    <Row gutter={16}>
                        <Col span={20}></Col>
                        <Col span={4}>
                            <div >
                                <button type="submit" style={{ width: "10rem", marginBottom: "1rem", marginTop: "1rem" }}><b>Bind</b></button></div></Col>
                        {/*} <Col span={4}>
            <div >
            <button type="account" style={{width: "10rem"}} onClick={() => handleClick()}><b>Go To Account</b></button>
          </div></Col>*/}
                    </Row>
    </div>
  );
};

export default Bind;
