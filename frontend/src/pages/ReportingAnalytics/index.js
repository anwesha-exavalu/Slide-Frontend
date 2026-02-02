import React from "react";
import { Row, Col } from "antd";
import { Container } from "styles/pages/Login";
import { useNavigate } from "react-router-dom";

import {
    ReportsAnalyticsTitle,
    ReportsAnalyticsSection,
    FormSection,
} from "styles/pages/ReportingAnalytics";
import useMetaData from "context/metaData";

const ReportingAnalytics = () => {
    const {theme} = useMetaData();
    const navigate = useNavigate()
    const redirectTo = (event, param) => {
        event.preventDefault();
        navigate('/reports', { state: { param } });
    }
    return (
        <ReportsAnalyticsSection theme={theme}>
            <Container>
                <div className="topsection">
                    <div className="search-title">
                        <ReportsAnalyticsTitle theme={theme}>
                            Reports and Analytics
                        </ReportsAnalyticsTitle>
                        <p className="subtext">
                        Dive into insights that can help you make data-driven decisions and better serve
                        your clients
            </p>    
                    </div>
                </div>
                <FormSection >
                    <div className="tableContainer">
                        <div className="tabtitle">List of Reports</div>
                        <div>
                            <Row>
                                <Col span={8}>
                                    <a className="label" href="#" onClick={(e) => redirectTo(e, 'Review Policy Transaction Detail')}>Review Policy Transaction Detail</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" href="#" onClick={(e) => redirectTo(e, 'Review Policy Transaction Detail')}>Review Policy Transaction Detail Report</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <a className="label" onClick={(e) => redirectTo(e, 'All Payments Received')}>All Payments Received</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" onClick={(e) => redirectTo(e, 'All Payments Received')}>Lists all payment types posted, including total Agency Fees collected. Detailed or summary reports available</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <a className="label" onClick={(e) => redirectTo(e, 'Producer Production')}>Producer Production</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" onClick={(e) => redirectTo(e, 'Producer Production')}>Displays Total Net Written, Renewal, Endorsement, and Cancel Premiums. Summary report also include app count</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <a className="label" onClick={(e) => redirectTo(e, 'Premium Trust Deposits')}>Premium Trust Deposits</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" onClick={(e) => redirectTo(e, 'Premium Trust Deposits')}>Detailed Sweep Report. Detailed or summary reports available</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <a className="label" onClick={(e) => redirectTo(e, 'Policies In Force Report')}>Policies In Force Report</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" onClick={(e) => redirectTo(e, 'Policies In Force Report')}>List of in force policies as of a specific date. Total count and in force premium provided</a>
                                </Col>
                            </Row>
                            
                            <Row >
                                <Col span={8}>
                                    <a className="label" onClick={(e) => redirectTo(e, 'ESignature Status Summary')}>ESignature Status Summary</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" onClick={(e) => redirectTo(e, 'ESignature Status Summary')}>ESignature Status Summary Report</a>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={8}>
                                    <a className="label" onClick={(e) => redirectTo(e, 'Unpaid Cancels Report')}>Unpaid Cancels Report</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" onClick={(e) => redirectTo(e, 'Unpaid Cancels Report')}>List of future cancels if payment is not received</a>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={8}>
                                    <a className="label" onClick={(e) => redirectTo(e, 'Producer Loss Ratio By Coverage')}>Producer Loss Ratio By Coverage</a>
                                </Col>
                                <Col span={16}>
                                    <a className="text" onClick={(e) => redirectTo(e, 'Producer Loss Ratio By Coveragey')}>Displays monthly or yearly loss ratio results</a>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </FormSection>
            </Container>
        </ReportsAnalyticsSection>
    );
};

export default ReportingAnalytics;
