import React, { useState } from 'react';
import { Card, Col, Row, Table } from 'antd';
import billingIcon from 'assets/svg/billing-summary-icon.svg';
import invoiceIcon from 'assets/svg/invoice-summary-icon.svg';
import policyIcon from 'assets/svg/policy-history-icon.svg';
import commisionIcon from 'assets/svg/commission-icon.svg';
import FormInput from 'components/FormControl/FormInput';
import PolicyInfo from 'components/PolicyInfo';
import { Section } from 'styles/pages/Login';
import { Container } from "styles/components/Layout";
import { BillingCard, TableContainer } from 'styles/pages/Billing';
import BillingTableConfig from "./dummyData";
import useMetaData from 'context/metaData';

const Billing = () => {
    const {theme}=useMetaData();
    const [isEditable] = useState(false);


    const {dataSource,cdataSource,initialValues,columns,ccolumns} = BillingTableConfig(isEditable)

    return (
        <div>
            <Section theme={theme}>
                <Container theme={theme}>
                    <BillingCard theme={theme}>
                        <h5 className='card-title'>Billing Information</h5>
                        <PolicyInfo  theme={theme}/>
                        <Card className='card-content'>
                            <div className='card-icon'>
                                <img className='icon' src={billingIcon}></img>
                            </div>
                            <Row>
                                <Col span={12}>
                                    <h5 className='card-headings'>Billing Summary</h5>
                                    <div className='card-content'>
                                        <p>This information will help the agent better understand your needs and objectives. </p>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className='card-content'>
                                        <Row gutter={16} >
                                            <Col span={12}>
                                                <FormInput name="totalPremium" className='formFields-border' label='Total Premium' defaultValue={initialValues.totalPremium} readOnly={!isEditable} ></FormInput>
                                            </Col>
                                            <Col span={12}>
                                                <FormInput name="totalFees" className='formFields-border' label='Total Fees' defaultValue={initialValues.totalFees} readOnly={!isEditable} ></FormInput>
                                            </Col>
                                        </Row>
                                        <Row gutter={16} >
                                            <Col span={12}>
                                                <FormInput name="premiumBilled" className='formFields-border' label='Premium Billed' defaultValue={initialValues.premiumBilled} readOnly={!isEditable} ></FormInput>
                                            </Col>
                                            <Col span={12}>
                                                <FormInput name="feesBilled" className='formFields-border' label='Fees Billed' defaultValue={initialValues.feesBilled} readOnly={!isEditable} ></FormInput>
                                            </Col>
                                        </Row>
                                        <Row gutter={16} >
                                            <Col span={12}>
                                                <FormInput name="premiumAdjustments" className='formFields-border' label='Premium Adjustments' defaultValue={initialValues.premiumAdjustments} readOnly={!isEditable}></FormInput>
                                            </Col>
                                            <Col span={12}>
                                                <FormInput name="feesAdjustments" className='formFields-border' label='Fees Adjustments' defaultValue={initialValues.feesAdjustments} readOnly={!isEditable}></FormInput>
                                            </Col>
                                        </Row>
                                        <Row gutter={16} >
                                            <Col span={12}>
                                                <FormInput name="premiumPaid" className='formFields-border' label='Premium Paid' defaultValue={initialValues.premiumPaid} readOnly={!isEditable}></FormInput>
                                            </Col>
                                            <Col span={12}>
                                                <FormInput name="feesPaid" className='formFields-border' label='Fees Paid' defaultValue={initialValues.feesPaid} readOnly={!isEditable}></FormInput>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Card className='card-content'>
                            <div className='card-icon' >
                                <img className='icon' src={invoiceIcon}></img>
                            </div>
                            <Row>
                                <Col span={12}>
                                    <h5 className='card-headings'>Invoice Summary</h5>
                                    <div className='card-content'>
                                        <p>This information will help the agent better understand your needs and objectives. </p>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className='card-content'>
                                        <Row gutter={16} >
                                            <Col span={12}>
                                                <FormInput name="invoiceDate" className='formFields-border' label='Invoice Date' defaultValue={initialValues.invoiceDate} readOnly={!isEditable}></FormInput>
                                            </Col>
                                            <Col span={12}>
                                                <FormInput name="dueDate" className='formFields-border' label='Due Date' defaultValue={initialValues.dueDate} readOnly={!isEditable}></FormInput >
                                            </Col>
                                        </Row>
                                        <Row gutter={16} >
                                            <Col span={12}>
                                                <FormInput name="amountDue" className='formFields-border' label='Amount Due' defaultValue={initialValues.amountDue} readOnly={!isEditable}></FormInput>
                                            </Col>
                                            <Col span={12}>
                                                <FormInput name="payOffAmount" className='formFields-border' label='Payoff Amount' defaultValue={initialValues.payOffAmount} readOnly={!isEditable}></FormInput>
                                            </Col>
                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Card className='card-content'>
                            <div className='card-icon' >
                                <img className='icon' src={policyIcon}></img>
                            </div>
                            <Row>
                                <Col span={12}>
                                    <h5 className='card-headings'>Policy History</h5>
                                    <div className='card-content'>
                                        <p>This information will help the agent better understand your needs and objectives. </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className='card-content'>
                                        <TableContainer theme={theme}>
                                            <Table
                                                columns={columns}
                                                dataSource={dataSource}
                                                pagination={false}
                                                rowKey="key"
                                            />
                                        </TableContainer>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Card className='card-content'>
                            <div className='card-icon' >
                                <img className='icon' src={commisionIcon}></img>
                            </div>
                            <Row>
                                <Col span={12}>
                                    <h5 className='card-headings'>Commission</h5>
                                    <div className='card-content'>
                                        <p>This information will help the agent better understand your needs and objectives. </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className='card-content'>
                                        <TableContainer theme={theme}>
                                            <Table
                                                columns={ccolumns}
                                                dataSource={cdataSource}
                                                pagination={false}
                                                rowKey="key"
                                                summary={() => (
                                                    <Table.Summary.Row className='summary-row' >
                                                        <Table.Summary.Cell index={0} colSpan={6} className='summary-label' textAlign="right" paddingRight="50px">
                                                            Total Commissionable
                                                        </Table.Summary.Cell>
                                                        <Table.Summary.Cell index={1} colSpan={2}>$1,500.00</Table.Summary.Cell>
                                                        <Table.Summary.Cell index={2}>$1,500.00</Table.Summary.Cell>
                                                        <Table.Summary.Cell index={3}>$0.00</Table.Summary.Cell>
                                                        <Table.Summary.Cell index={4}>$0.00</Table.Summary.Cell>
                                                        <Table.Summary.Cell index={5}>$139.73</Table.Summary.Cell>
                                                    </Table.Summary.Row>
                                                )}
                                            />
                                        </TableContainer>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </BillingCard>
                </Container>
            </Section>

        </div>
    );
}

export default Billing;
