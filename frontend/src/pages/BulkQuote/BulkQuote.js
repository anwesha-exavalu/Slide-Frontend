import React, { useState } from 'react';
import { Button, Card, Col, Row } from "antd";
import { Section } from "styles/pages/Login";
import { Container } from "styles/components/Layout";
import { AttachButton } from "styles/pages/Documents";
import { ClaimsCard } from "styles/pages/ViewClaims";
import document from "assets/svg/document.svg";
import useMetaData from "context/metaData";
import useGet from 'hooks/useGet';
import { getBulkData } from 'constants/api';
import { FormSection } from 'styles/pages/SearchPolicy';
import TableComponent from 'components/Table';
import ColumnData from './columnData';
import { useNavigate } from 'react-router-dom';

const BulkQuote = () => {
    const [bulkData, setBulkData] = useState([]);
    const [tableData, setTableData] = useState(false);
    const [selectedRowKey, setSelectedRowKey] = useState([]);
    const { columns } = ColumnData(selectedRowKey, setSelectedRowKey);
    const { theme } = useMetaData();
    const { mutateAsync: getData } = useGet();
    const navigate = useNavigate();

    const defaultProducts = [
        "prd_0050_herald_cyber",
        "prd_la3v_atbay_cyber",
        "prd_jk0g_cowbell_cyber"
    ];

    const handleImportData = async () => {
        try {
            const res = await getData({
                url: getBulkData,
                token: true,
                customHeaders: { "Content-Type": "application/json" }
            });
            
            if (res.length > 0 && tableData === false) {
                const formattedData = res.map(obj => ({
                    ...obj,
                    Action: <a onClick={() => handleShowDetails(obj)}>Show details</a>
                }));
                setBulkData(formattedData);
                setTableData(true);
            }
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const handleShowDetails = (row) => {
        navigate('/quote-page', {
            state: {
                selectedProducts: defaultProducts,
                submissionId: row.submissionId // Pass submissionId instead of applicationId
            }
        });
    };

    const handleSelectedRows = () => {
        setBulkData(bulkData.map((row) => {
            if (selectedRowKey.includes(row.key)) {
                return {
                    ...row,
                    Status: `Quoted`,
                    Action: <a onClick={() => handleShowDetails(row)}>Show details</a>,
                    highlight: true,
                };
            }
            return { ...row, highlight: false };
        }));
    };

    return (
        <div>
            <Section theme={theme}>
                <Container>
                    <ClaimsCard theme={theme}>
                        <h5 className="card-title">Bulk Quote</h5>
                        <Card className="card-content">
                            <img src={document} alt="document" />
                            <Row>
                                <Col span={12}>
                                    <h5 className="card-headings">Bulk Quote</h5>
                                    <div className="card-content">
                                        <p>Import data from AMS.</p>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="card-content">
                                        <Row className="row">
                                            <Col span={24}>
                                                <AttachButton>
                                                    <Button 
                                                        className="attachButton" 
                                                        onClick={handleImportData} 
                                                        type="primary"
                                                    >
                                                        Import
                                                    </Button>
                                                </AttachButton>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </ClaimsCard>
                    
                    {tableData && (
                        <>
                            <FormSection theme={theme}>
                                <TableComponent 
                                    theme={theme} 
                                    title="Customer Details" 
                                    data={bulkData} 
                                    columns={columns} 
                                />
                            </FormSection>
                            <AttachButton>
                                <Button 
                                    className="attachButton" 
                                    onClick={handleSelectedRows} 
                                    type="primary"
                                >
                                    Bulk Quote
                                </Button>
                            </AttachButton>
                        </>
                    )}
                </Container>
            </Section>
        </div>
    );
};

export default BulkQuote;