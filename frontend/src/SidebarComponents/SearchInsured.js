import React, { useState } from 'react';
import { Layout, Button, Table, Checkbox, Typography, message, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FormInput from '../components/FormInput';
import DropdownSelect from '../components/FormDropdown';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const SearchInsured = () => {
    // const [insuredType, setInsuredType] = useState('Individual');
    const [searchCriteria, setSearchCriteria] = useState({
        name: '',
    });
    const [results, setResults] = useState([]);
    const [submissionDetails, setSubmissionDetails] = useState({
        programName: null,
        productName: null,
        occupancyType: null,
        agencyName: '',
        primaryRisk: null,
        primaryRiskState: null,
        lob: null
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSearchCriteria((prev) => ({ ...prev, [id]: value }));
    };
    const performSearch = () => {
        // Sample data for testing
        const sampleData = [
            {
                account: '7657676757',
                name: 'John Doe',
                type: 'Individual',
                address: '123 Main St',
                lobs: 'CP, GL',
                effective: '01/01/2024',
                expiry: '12/31/2024',
                status: 'Bound',
                city: 'New York',
                state: 'NY',
                programName: 'ayspre',
                productName: 'habitational_risk',
                occupancyType: 'office',
                primaryRiskState: 'new york',
                primaryRisk: 'commercial property'
            },
            {
                account: '98675676765',
                name: 'John H',
                type: 'Individual',
                address: '123 Main St',
                lobs: 'CP, GL',
                effective: '01/01/2024',
                expiry: '12/31/2024',
                status: 'Bound',
                city: 'New York',
                state: 'NY',
                programName: 'pentium',
                productName: 'habitational_risk',
                occupancyType: 'office',
                primaryRiskState: 'new york',
                primaryRisk: 'commercial property'
            },
            {
                account: '234646758',
                name: 'Exavalu',
                type: 'Entity',
                address: '123 Main St',
                lobs: 'CP, GL',
                effective: '01/01/2024',
                expiry: '12/31/2024',
                status: 'Bound',
                city: 'New York',
                state: 'NY',
                programName: 'ayspre',
                productName: 'builders_risk',
                occupancyType: 'office',
                primaryRiskState: 'new york',
                primaryRisk: 'commercial property'
            },
            {
                account: '123456789',
                name: 'Skyline Property Inc.',
                type: 'Individual',
                address: '123-05 84th Avenue ',
                lobs: 'CP, GL, PL',
                effective: '01/01/2024',
                expiry: '12/31/2024',
                status: 'Open',
                city: 'New York',
                state: 'NY',
                programName: 'ayspre',
                productName: 'habitational_risk',
                occupancyType: 'office',
                primaryRiskState: 'new york',
                primaryRisk: 'commercial property'
            }
        ];

        const filteredData = sampleData.filter((item) => {
            const nameMatch = !searchCriteria.name || item.name.toLowerCase().includes(searchCriteria.name.trim().toLowerCase());
           
            return nameMatch;
        });

        setResults(filteredData);
        if (filteredData.length === 0) {
            message.warning('No results found. Please try again.');
        }
    };

    const columns = [
        { title: 'Select', dataIndex: 'select', key: 'select', render: () => <Checkbox /> },
        { title: 'Account', dataIndex: 'account', key: 'account' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Current LOBs', dataIndex: 'lobs', key: 'lobs' },
        { title: 'Effective Date', dataIndex: 'effective', key: 'effective' },
        { title: 'Expiry Date', dataIndex: 'expiry', key: 'expiry' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Action', key: 'action', render: () => <Button type="link" onClick={() => navigate('/accountinfo')}>View Account</Button> }
    ];

    return (
        <Layout>
            <Header style={{ background: '#fff', padding: '16px 0' }}>
                <Title level={2}>Search Insured</Title>
            </Header>
            <Content style={{ margin: '16px', }}>
               

                <Row gutter={16} style={{ marginBottom: 2 }}>
                    <Col span={8}>
                        <FormInput
                            id="name"
                            label="Insured Name *"
                            value={searchCriteria.name}
                            onChange={handleInputChange}
                            placeholder="Enter Insured Name"
                            required={true}
                        />
                      
                    </Col>
                </Row>
               

                <Button type="primary" icon={<SearchOutlined />} onClick={performSearch} style={{ marginTop: 16, marginBottom: 16 }}>
                    Search
                </Button>

                <Table
                    columns={columns}
                    dataSource={results}
                    rowKey={(record) => record.account}
                    pagination={{ pageSize: 5 }}
                    rowHoverable
                    components={{
                        header: {
                            cell: ({ className, ...restProps }) => (
                                <th
                                    {...restProps}
                                    style={{
                                        backgroundColor: '#5d9de2', // Set header background color here
                                        color: '#fff', // Set header text color here
                                    }}
                                />
                            ),
                        },
                    }}

                />
            </Content>
            <Header style={{ background: '#fff', padding: '16px 0' }}>
                <Title level={2}>Add LOB</Title>
            </Header>
            <Content>
                <Row gutter={16}>
                    <Col span={6}>
                        <label style={{ marginBottom: '17px' }}>Program Name</label>
                        <DropdownSelect
                            // label="Program Name"
                            id='programName'
                            value={submissionDetails.programName}
                            onChange={(value) => setSubmissionDetails((prev) => ({ ...prev, programName: value }))}
                            placeholder="Select Program"
                            options={[
                                { label: "Ayspre", value: "ayspre" },
                                { label: "Pentium", value: "pentium" },
                                { label: "Impulse", value: "impulse" },
                                { label: "Archer", value: "archer" }
                            ]}
                        />
                    </Col>
                    <Col span={6}>
                        <label style={{ marginBottom: '17px' }}>Product Name</label>
                        <DropdownSelect
                            // label="Product Name"
                            id="productName"
                            value={submissionDetails.productName}
                            onChange={(value) => setSubmissionDetails((prev) => ({ ...prev, productName: value }))}
                            placeholder="Select Product"
                            options={[
                                { label: "Habitational Risk", value: "habitational_risk" },
                                { label: "Builder's Risk", value: "builders_risk" },
                                { label: "Fine Arts", value: "fine_arts" },
                                { label: "Commercial Property", value: "commercial_property" }
                            ]}
                        />
                    </Col>
                    <Col span={6}>
                        <label style={{ marginBottom: '17px' }}>Occupancy Type</label>
                        <DropdownSelect
                            // label="Occupancy Type"
                            id="occupancyType"
                            value={submissionDetails.occupancyType}
                            onChange={(value) => setSubmissionDetails((prev) => ({ ...prev, occupancyType: value }))}
                            placeholder="Select Occupancy Type"
                            options={[
                                { label: "Office", value: "office" },
                                { label: "Retail", value: "retail" },
                                { label: "Residential", value: "residential" },
                                { label: "Industrial/Manufacturing", value: "industrial/manufacturing" },
                                { label: "Warehouse/Storage", value: "warehouse/storage" },
                                { label: "Hospitality", value: "hospitality" },
                                { label: "Healthcare", value: "healthcare" },
                                { label: "Educational", value: "educational" },
                                { label: "Mixed-use", value: "mixed-use" },
                                { label: "Vacant or Unoccupied", value: "vacant or unoccupied" }
                            ]}
                        />
                    </Col>
                    <Col span={6}>
                        <FormInput
                            id="agencyName"
                            label="Agency Name"
                            value={submissionDetails.agencyName}
                            onChange={handleInputChange}
                            placeholder="Enter Agency Name"
                        />
                    </Col>
                    <Col span={6}>
                        <label style={{ marginBottom: '17px' }}>Primary Risk State</label>
                        <DropdownSelect
                            // label="Primary Risk State"
                            id="primaryRiskState"
                            value={submissionDetails.primaryRiskState}
                            onChange={(value) => setSubmissionDetails((prev) => ({ ...prev, primaryRiskState: value }))}
                            placeholder="Select State"
                            options={[
                                { label: "New York", value: "new york" },
                                { label: "New Jersey", value: "new jersey" },
                                { label: "Texas", value: "texas" },
                                { label: "California", value: "california" }
                            ]}
                        />
                    </Col>
                    <Col span={6}>
                        <label style={{ marginBottom: '17px' }}>Primary Risk</label>
                        <DropdownSelect
                            // label="Primary Risk"
                            id="primaryRisk"
                            value={submissionDetails.primaryRisk}
                            onChange={(value) => setSubmissionDetails((prev) => ({ ...prev, primaryRisk: value }))}
                            placeholder="Select Primary Risk"
                            options={[
                                { label: "Commercial Property", value: "commercial property" },
                                { label: "Commercial Auto", value: "commercial auto" },
                                { label: "Inland Marine", value: "inland marine" }
                            ]}
                        />
                    </Col>
                    <Col span={6}>
                        <label style={{ marginBottom: '17px' }}>LOB</label>
                        <DropdownSelect
                            // label="LOB"
                            id="lob"
                            value={submissionDetails.lob}
                            onChange={(value) => setSubmissionDetails((prev) => ({ ...prev, lob: value }))}
                            placeholder='select LOB'
                            options={[{ label: 'Commercial Property', value: 'cp' }, { label: 'Commercial Auto', value: 'ca' }, { label: 'General Liability', value: 'gl' }]}
                        />
                    </Col>
                </Row>

                <Button type="primary" onClick={() => navigate('/createsubmission')} style={{ padding: '25px 75px', margin: '10px' }} >
                    Create Submission
                </Button>
                <Button type="primary" onClick={() => navigate('/accountinfo')} style={{ padding: '25px 75px', margin: '10px' }}>
                    Clearance Information
                </Button>
            </Content>
        </Layout >
    );
};

export default SearchInsured;
