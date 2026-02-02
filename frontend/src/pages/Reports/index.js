import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Col, Row } from "antd";
import { Container } from "styles/pages/Login";
import ReviewPolicyTransactionReport from './ReviewPolicyTransactionReport';
import AllPaymentsReceivedReport from './AllPaymentsReceivedReport';
import ProducerProductionReport from './ProducerProductionReport';
import PremiumTrustDepositsReport from './PremiumTrustDepositsReport';
import PolicyInforceReport from "./PolicyInForceReport";
import ESignatureStatusSummaryReport from './ESignatureStatusSummaryReport';
import UnpaidCancelsReport from './UnpaidCancelsReport';
import ProducerLossRatioByCoverageReport from './ProducerLossRatioByCoverageReport';

import {
  ReportTitle,
  ReportSection,
  FormSection,
} from "styles/pages/Reports";

const Report = () => {
  const location = useLocation();
  const param = location.state?.param;
  const navigate = useNavigate()
  const redirectTo = (event) => {
    event.preventDefault();
    navigate('/reporting-analytics');
  }

  return (
    <ReportSection>
      <Container>
        <div className="topsection">
          <div>
            <Row gutter={16}>
              <Col span={21}>
                <ReportTitle>
                  {param}
                </ReportTitle>
              </Col>
              <Col span={3}>
                <a className="back-btn" href="#" onClick={(e) => redirectTo(e)}>Previous page</a>
              </Col>
            </Row>
          </div>
        </div>
        <FormSection>
          <Card>
            {param === 'Review Policy Transaction Detail' && <ReviewPolicyTransactionReport /> }
            {param === 'All Payments Received' && <AllPaymentsReceivedReport /> }
            {param === 'Producer Production' && <ProducerProductionReport /> }
            {param === 'Premium Trust Deposits' && <PremiumTrustDepositsReport /> }
            {param === 'Policies In Force Report' && <PolicyInforceReport /> }
            {param === 'ESignature Status Summary' && <ESignatureStatusSummaryReport /> }
            {param === 'Unpaid Cancels Report' && <UnpaidCancelsReport /> }
            {param === 'Producer Loss Ratio By Coverage' && <ProducerLossRatioByCoverageReport /> }
          </Card>
        </FormSection>
        <br/>
      </Container>
    </ReportSection>
  );
};

export default Report;
