import React from 'react';
import { Card, Form, Row, Col } from 'antd';
import FormDatePicker from 'components/FormControl/FormDatePicker';
import FormControl from 'components/FormControl/FormInput';
import FormRadio from 'components/FormControl/FormRadio';
import {paymentInitialValues} from './dummyData';
import { PolicyDashboardDescription } from 'styles/pages/PolicyDetails';
import {PaymentOptionsVal} from 'components/FormControl/radioOption';
import useMetaData from 'context/metaData';

const Payment = ({ isEditable }) => {
    const {theme}=useMetaData();

    return (
        <PolicyDashboardDescription theme={theme}>
          <Card className="ant-card-description">
            <h3>Payment</h3>
        <Form
            name="policysummary"
            initialValues={paymentInitialValues}
            layout="horizontal"
            className='form-container form-width policyform'
        >
            <Row gutter={20}>
                <Col span={5}>
                    <label className="form-label form-text-wrap">Party responsible for  <br /> paying renewal bil:</label>
                </Col>
                <Col className="pl30">
                    <FormControl className="form-controls" name="partyResponsibleToPayingBill" type="text" disabled={!isEditable} required={false} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <FormControl className="form-controls" label="Pay to" name="payTo" type="text" disabled={!isEditable} required={false} />
                </Col>
                <Col span={10}>
                    <FormControl className="form-controls" label="Transaction Amount" name="transactionAmount" type="text" disabled={!isEditable} required={false} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <FormDatePicker className="form-controls" label="Transaction Date" name="transactionDate" id='transactionDate' disabled={!isEditable} type="text" required={false} />
                </Col>
                <Col span={10}>
                    <FormControl className="form-controls" label="Transaction Description" name="transactionDescription" type="text" disabled={!isEditable} required={false} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={24}>
                    <FormRadio label="Please select a payment method" name="paymentMethod" options={PaymentOptionsVal} disabled={!isEditable} />
                </Col>
            </Row>
        </Form>
        </Card>
        </PolicyDashboardDescription>
    )
}
export default Payment