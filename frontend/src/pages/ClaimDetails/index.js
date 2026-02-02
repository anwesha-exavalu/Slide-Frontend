import React from 'react';
import { Container } from "styles/components/Layout";
import { Button, Card, Col, Row } from 'antd';
import { ClaimsCard } from 'styles/pages/ViewClaims';
import loss from 'assets/images/loss.svg';
import info from 'assets/svg/info.svg'
import FormInput from 'components/FormControl/FormInput';
import TableComponent from 'components/Table';
import { columns, dataSource } from "./paymentDummyData";

const ClaimDetails = ({theme}) => {
    return (
        <Container>
            <ClaimsCard  theme={theme}>
                <h5 className='card-title'> Claim Information</h5>
                <Card className='card-content'>
                    <Row>
                        <img src={loss}></img>
                        <Button className='edit-button'>Edit</Button>
                    </Row>
                    <h5 className='card-headings'>Claim Details</h5>
                    <div className='card-content'>
                        <p>This information will help the agent better understand your needs and objectives. </p>
                        <Row className='row' >
                            <Col span={12}>
                                <FormInput  theme={theme} className='formFields' layout='vertical' label='Claim Number' defaultValue='CLM-00000014	'></FormInput>
                            </Col>
                            <Col span={12}>
                                <FormInput  theme={theme} className='formFields' layout='vertical' label='Claim Status' defaultValue='Opened'></FormInput>
                            </Col>
                        </Row>
                        <Row className='row' >
                            <Col span={12}>
                                <FormInput  theme={theme} className='formFields' layout='vertical' label='Loss Date' defaultValue='04/03/24'></FormInput>
                            </Col>
                            <Col span={12}>
                                <FormInput  theme={theme} className='formFields' layout='vertical' label='Loss Cause' defaultValue='Vandalism'></FormInput>
                            </Col>
                        </Row>
                        <Row className='row' >
                            <Col span={12}>
                                <FormInput  theme={theme} className='formFields' layout='vertical' label='Open Date' defaultValue='04/04/24'></FormInput>
                            </Col>
                            <Col span={12}>
                                <FormInput  theme={theme} className='formFields' layout='vertical' label='Reported By' defaultValue='Agent'></FormInput>
                            </Col>
                           
                        </Row>	
                    </div>
                </Card>
                <Card className='card-content'>
                    <img src={info}></img>
                    <Row>
                        <Col span={12}>
                            <h5 className='card-headings'>Contact Information</h5>
                            <div className='card-content'>
                                <p>This information will help the agent better understand your needs and objectives. </p>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className='card-content'>
                                <Row className='row' gutter={16}>
                                    <Col span={12}>
                                        <FormInput  theme={theme} className='formFields-border' layout='vertical' label='Insured Name' defaultValue='Samantha'></FormInput>
                                    </Col>
                                   
                                </Row>
                                <Row className='row' gutter={16}>

                                    <Col span={12}>
                                        <FormInput  theme={theme} className='formFields-border' layout='vertical' label='Home Phone' defaultValue='408-111-1111'></FormInput>
                                    </Col>
                                    <Col span={12}>
                                        <FormInput  theme={theme} className='formFields-border' layout='vertical' label='Work Phone' defaultValue='408-222-1111'></FormInput>
                                    </Col>
                                </Row>
                                <Row className='row' gutter={16}>
                                    <Col span={12}>
                                        <FormInput  theme={theme} className='formFields-border' layout='vertical' label='Cell Phone' defaultValue='408-333-1111'></FormInput>
                                    </Col>
                                    <Col span={12}>
                                        <FormInput  theme={theme} className='formFields-border' layout='vertical' label='Email' defaultValue='test@abc.com'></FormInput>
                                    </Col>
                                </Row>
                                
                                <Row className='row' >
                                    <Button className='button' type='primary'>Update Contact</Button>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card className='card-content'>
                    <Row>
                        <img src={loss}></img>
                        <Button className='edit-button'>Edit</Button>
                    </Row>
                    <h5 className='card-headings'>Claim Financial Summary </h5>
                    <div className='card-content'>
                        <p>As of 10/23/2024, the total incurred for this claim is <b>$0.00</b></p>
                        <br />
                        <Row >
                            <Col span={6}>
                                <p className='p-label'>Adjuster Information</p>
                                <a >View Assignments</a>
                            </Col>
                            <Col span={9}>
                                <h5 className='column-headings'>INTERNAL</h5>
                            </Col>
                            <Col span={9}>
                                <h5 className='column-headings'>EXTERNAL</h5>
                            </Col>
                        </Row>
                        <br />
                        <Row >
                            <Col span={6}></Col>
                            <Col span={9}>
                                <FormInput className='formFields' layout='vertical' label='Name' defaultValue='Shama Mittal'></FormInput>
                            </Col>
                            <Col span={9}>
                                <FormInput className='formFields' layout='vertical' label='Name' defaultValue='Colonial Claims'></FormInput>
                            </Col>
                        </Row>
                        <br />
                        <Row >
                            <Col span={6}></Col>
                            <Col span={9}>
                                <FormInput className='formFields' layout='vertical' label='Phone' defaultValue='123456789'></FormInput>
                            </Col>
                            <Col span={9}>
                                <FormInput className='formFields' layout='vertical' label='Address' defaultValue='51394 Albert Haven,New Chaseside,DE 32050'></FormInput>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={6}></Col>
                            <Col span={9}></Col>
                            <Col span={9}>
                                <FormInput className='formFields' layout='vertical' label='Phone' defaultValue='123456789'></FormInput>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <TableComponent title="Payment Information" columns={columns} data={dataSource} />
            </ClaimsCard>
        </Container>
    );
}

export default ClaimDetails;
