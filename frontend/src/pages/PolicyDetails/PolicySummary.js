import React from 'react'
import { Card, Form, Row, Col } from 'antd';
import FormDatePicker from 'components/FormControl/FormDatePicker';
import FormControl from 'components/FormControl/FormInput';
import {policySummaryInitialValues} from './dummyData';
import {
    PolicyDashboardDescription,
} from "styles/pages/PolicyDetails";
import useMetaData from "context/metaData";

const PolicySummary = ({ isEditable }) => {
    const {theme}=useMetaData();

    return (
        <PolicyDashboardDescription theme={theme} >
            <Card className="ant-card-description">
                <Form
                    name="policysummary"
                    initialValues={policySummaryInitialValues}
                    layout="horizontal"
                    className='form-width policyform'
                >
                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Policy #/Holder Name" name="policyHolderName" type="text" disabled={!isEditable} required={false} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Payment Plan" name="paymentPlan" type="text" disabled={!isEditable} required={false} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormDatePicker className="form-controls" label="Terms Start Date" name="termsStartDate" id='termsStartDate' disabled={!isEditable} required={false} />
                        </Col>
                        <Col span={12}>
                            <FormDatePicker className="form-controls" label="Terms End Date" name="termsEndDate" id='termsEndDate' disabled={!isEditable} required={false} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormDatePicker className="form-controls" label="Transaction Effective Date" name="transactionEffectiveDate" id='transactionEffectiveDate' disabled={!isEditable} required={false} />
                        </Col>
                        <Col span={12}>
                            <FormDatePicker className="form-controls" label="Transaction Exp. Dt." name="transactionExpiryDate" id='transactionExpiryDate' disabled={!isEditable} required={false} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Transaction Type" name="transactionType" type="text" required={false} disabled={!isEditable} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Bill To" name="billTo" type="text" required={false} disabled={!isEditable} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Total Premium Change" name="totalPremiumChange" type="text" required={false} disabled={!isEditable} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Product Name" name="productName" type="text" required={false} disabled={!isEditable} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Total Premium" name="totalPremium" type="text" required={false} disabled={!isEditable} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls" label="U/writer" name="uwriter" type="text" required={false} disabled={!isEditable} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Total Claim" name="totalClaim" type="text" required={false} disabled={!isEditable} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Transaction Note" name="transactionNote" type="text" required={false} disabled={!isEditable} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Serv Rep" name="servRep" type="text" required={false} disabled={!isEditable} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Member Id" name="memberId" type="text" required={false} disabled={!isEditable} />
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls" label="Rating Method" name="ratingMethod" type="text" required={false} disabled={!isEditable} />
                        </Col>
                    </Row>
                </Form>
            </Card>
        </PolicyDashboardDescription>
    )
}

export default PolicySummary;
