import React, { useRef } from 'react';
import { Table, Input, Typography, Button, Collapse, Row, Col } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TableComponent from '../../components/Table';

const { Title } = Typography;
const { Panel } = Collapse;

const QuoteSummary = () => {
  const summaryRef = useRef(); // Create a ref to reference the component for PDF generation

  const generatePDF = () => {
    const input = summaryRef.current;
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Set the width of the image in the PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image to PDF and handle page breaks
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('quote-summary.pdf'); // Save the PDF with the desired name
    });
  };

  // Define table data for each section
  const coverageData = [
    { key: 1, label: 'Property Damage Coverage', coverageAmount: '$15,000,000', deductible: '$5,000', approvedCoverage: '$15,000,000', approvedDeductible: '$5,000' },
    { key: 2, label: 'Business Personal Property', coverageAmount: '$500,000', deductible: '$2,500', approvedCoverage: '$500,000', approvedDeductible: '$2,500' },
    { key: 3, label: 'Business Income Coverage', coverageAmount: '$1,000,000', deductible: '$10,000', approvedCoverage: '$1,000,000', approvedDeductible: '$10,000' },
    { key: 4, label: 'Flood Coverage', coverageAmount: '$500,000', deductible: '$25,000', approvedCoverage: '$500,000', approvedDeductible: '$25,000' },
    { key: 5, label: 'Earthquake Coverage', coverageAmount: '$1,000,000', deductible: '$50,000', approvedCoverage: '$1,000,000', approvedDeductible: '$50,000' },
    { key: 6, label: 'Annual Rental and fees', coverageAmount: '$250,000', deductible: '$1,000', approvedCoverage: '$250,000', approvedDeductible: '$1,000' },
    { key: 7, label: 'Ord/ Law Blanket Limits', coverageAmount: '$100,000', deductible: '$5,000', approvedCoverage: '$100,000', approvedDeductible: '$5,000' }
    // { key: 2, location: '1234 Elm Street', coverage: '$5000,000', limit: '$5000,000', deductible: '$50000', premium: '$50000' },

  ];

  const formData = [
    { key: 1, formNumber: 'CP0010', formName: 'Building and Personal Property Coverage', description: 'Covers buildings, business personal property, and property of others.' },
    { key: 2, formNumber: 'CP1515', formName: 'Business Income Coverage Form', description: 'Covers income loss due to business suspension caused by a covered peril.' },

  ];

  const invoiceData = [
    { key: 1, label: 'Invoice Number', value: '11202556' },
    { key: 2, label: 'Installment No.', value: '11202456' },
    { key: 3, label: 'Total Premium Due', value: '$50000' },
    { key: 4, label: 'Installment Premium Due', value: '$4000' },
  ];

  // Define columns for each table
  // const coverageColumns = [
  //   { title: 'Location (address)/Building', dataIndex: 'location', key: 'location' },
  //   { title: 'Coverage', dataIndex: 'coverage', key: 'coverage' },
  //   { title: 'Coverage Limit', dataIndex: 'limit', key: 'limit' },
  //   { title: 'Deductible', dataIndex: 'deductible', key: 'deductible' },
  //   { title: 'Premium', dataIndex: 'premium', key: 'premium' },
  // ];
  const coverageColumns = [
    { title: '', dataIndex: 'label', key: 'label' },
    { title: 'Coverage Amount', dataIndex: 'coverageAmount', key: 'coverageAmount' },
    { title: 'Deductible', dataIndex: 'deductible', key: 'deductible' },
    { title: 'Approved Coverage', dataIndex: 'approvedCoverage', key: 'approvedCoverage' },
    { title: 'Approved Deductible', dataIndex: 'approvedDeductible', key: 'approvedDeductible' },
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
    <div className="quote-summary" ref={summaryRef}>
      {/* PDF Icon Button */}
      <Row gutter={16}>
        <Col span={21}></Col>
        <Col span={3}>
          <Button
            type="primary"
            icon={<FilePdfOutlined />}
            onClick={generatePDF} // Call the PDF generation function on click
            style={{
              width: '100%',
              color: '#1d4ed8',
              backgroundColor: 'white',
              borderRadius: '5px',
            }}
          >
            Download PDF
          </Button>
        </Col>
      </Row>

      {/* Header Information */}
      <Title level={5}>Quote Summary</Title>
      
      <TableComponent
        title="Quote Summary"
        columns={[
          { title: '', dataIndex: 'label', key: 'label' },
          { title: '', dataIndex: 'value', key: 'value' }
        ]}
        data={[
          { key: 'quoteNumber', label: 'Quote Number', value: 'Q0014562' },
          { key: 'effectiveDate', label: 'Policy Effective Date', value: '12/11/2024' },
          { key: 'endDate', label: 'Policy End Date', value: '12/11/2025' },
          { key: 'insuredName', label: 'Insured Name', value: 'Kew Gardens Property Inc.' },
          { key: 'mailingAddress', label: 'Mailing Address', value: '123-05 84th Avenue, Kew Gardens, NY 11415' }
        ]}
      />

      <Collapse defaultActiveKey={['1', '2', '3']} style={{ marginTop: '20px' }}>
        <Panel header="Coverage Summary" key="1">
          <h6>Location- 123-05 84th Avenue, Kew Gardens, NY 11415</h6>
          <TableComponent title="Coverage Summary" columns={coverageColumns} data={coverageData} />
       
          <TableComponent
            title="Payment Summary"
            data={[
              { key: 'totalPremium', label: 'Total Premium', value: '$47,000' },
              { key: 'feeTaxes', label: 'Fees & Taxes', value: '$2,350,00' },
              { key: 'totalPayable', label: 'Total Payable', value: '$49,350,00' }
            ]}
            columns={[
              { title: '', dataIndex: 'label', key: 'label' },
              { title: '', dataIndex: 'value', key: 'value' }
            ]}
          />
        </Panel>

        <Panel header="Forms" key="2">
        <TableComponent title="Forms" data={formData} columns={formColumns} />
        </Panel>

        <Panel header="Invoice Details" key="3">
        <TableComponent title="Invoice Details" data={invoiceData} columns={invoiceColumns} />
        </Panel>
      </Collapse>

      {/* Underwriter Notes */}
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Title level={4}>Notes:</Title>
        <Input.TextArea
          placeholder="Enter notes here"
          rows={4}
          style={{ marginTop: 10, width: '100%', border: '2px solid gray' }}
        />
      </div>

      <Row gutter={16}>
        <Col span={16}></Col>
        <Col span={8}>
          <div>
            <Button type="primary" onClick={() => alert("Create Quote request sent")} style={{ width: "10rem", marginBottom: "1rem", marginTop: "1rem", marginRight: "3px", backgroundColor: "blue" }}>
              Create Quote
            </Button>
            <Button type="primary" onClick={() => alert("Bind Quote request sent")} style={{ width: "10rem", marginBottom: "1rem", marginTop: "1rem", marginRight: "3px", backgroundColor: "blue" }}>
              Bind Quote
            </Button>


          </div>
        </Col>
      </Row>
    </div>
  );
};

export default QuoteSummary;
