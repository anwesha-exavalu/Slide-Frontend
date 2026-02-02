import React, { useState } from 'react'
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import { Claims } from "styles/pages/Claims"
import { Col, Row, Button, Input } from "antd";
import claimadditionaldetails from '../../assets/images/claimadditionaldetails.svg';
import claimflood from '../../assets/images/claimflood.svg';
import claimnoticeflood from '../../assets/images/claimnoticeflood.svg';
import FormDatePicker from '../../components/FormControl/FormDatePicker';
import FormControl from "../../components/FormControl/FormInput";
import SuccessMessageModal from 'components/PopupModal/SuccessMessageModal';
import GreenTick from "assets/svg/greentick.svg";
import PolicyInfo from "components/PolicyInfo";
import { useLocation } from 'react-router-dom';
import useMetaData from "context/metaData"
const Claim = () => {
    const { TextArea } = Input;
    const [open, setOpen] = useState(false)
     const {theme} = useMetaData();
    const setHandleOpen = () => {
        setOpen(true)
    }
    const location = useLocation()
    const policyNumber = location.state
    return (
        <Claims>
            <Container>
                <FormSection theme={theme}>
                    <div className='fileclaim-label'>
                        <Row>
                            <Col span={7}>
                                <label className='Quotelabel'>File Claim/Notice Of Loss</label>
                            </Col>
                        </Row>
                    </div>
                    {policyNumber && <PolicyInfo />}
                    <div className="container-box">
                        <div className="step-content-box"> <img src={claimflood} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                          Edit
                        </button> */}
                        </div>
                        <Row gutter={10}>
                            <Col span={12}>
                                <div className='Heading-label'>Choose your loss cause</div>
                                <div className='subheading-input-label'>Select the cause of the loss or damage, such as collision, theft, weather-related, etc.</div>
                            </Col>
                            <Col span={12}>
                                <FormControl
                                    label="Nature of Loss"
                                    name="NatureOfLoss"
                                    required={true}
                                    layout="vertical"
                                />

                            </Col>

                        </Row>
                        {!policyNumber && 
                        <Row gutter={10}>
                            <Col span={12}>
                                <div className='Heading-label'>Insurance Policy needed for Loss</div>
                                <div className='subheading-input-label'>Provide the policy number for the insurance covering this incident.</div>
                            </Col>
                            
                            <Col span={12}>
                                <FormControl
                                    label="Policy Number"
                                    name="PolicyNumber"
                                    required={true}
                                    layout="vertical"
                                />

                            </Col>
                        </Row>
                        
                        }
                        

                        <hr />
                        <div className="step-content-box"> <img src={claimnoticeflood} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                          Edit
                        </button> */}
                        </div>
                        <Row gutter={10}>
                            <Col span={12}>
                                <div className='Heading-label'>Provide the exact date of the event causing the loss</div>
                                <div className='subheading-input-label'>We need a bit more information to move forward.</div>
                            </Col>
                            <Col span={12}>
                                <FormDatePicker
                                    label="Date Loss Occurred"
                                    name="DateOfLoss"
                                    required={true}
                                    layout="vertical"
                                />
                            </Col>

                        </Row>
                        <Row gutter={10}>
                            <Col span={12}>
                                <div className='Heading-label'>Details of Vehicle in Loss Incident</div>
                                <div className='subheading-input-label'>Enter the make, model, year, and other details of the vehicle involved.</div>
                            </Col>
                            
                            <Col span={12}>
                                <FormControl
                                    label="Affected Vehicle"
                                    name="VehicleDetail"
                                    required={true}
                                    layout="vertical"
                                />

                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={12}>
                                <div className='Heading-label'>Auto Loss Driver Information</div>
                                <div className='subheading-input-label'>Specify full name of the driver associated.</div>
                            </Col>
                            
                            <Col span={12}>
                                <FormControl
                                    label="Driver Info (Involved in Loss)"
                                    name="DriverDetail"
                                    required={true}
                                    layout="vertical"
                                />

                            </Col>
                        </Row>
                        <hr />
                        <div className="step-content-box"> <img src={claimadditionaldetails} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                          Edit
                        </button> */}
                        </div>
                        <Row gutter={10}>
                            <Col span={12}>
                                <div className='Heading-label'>Additional Detail about the loss</div>
                                <div className='subheading-input-label'>This information will help the agent better understand your needs and objectives.</div>
                            </Col>
                            <Col span={12}>
                                <TextArea
                                    label="Additional Detail about the loss"
                                    name="AdditionalDetailabouttheloss"
                                    rows={3}
                                    required={true}
                                    layout="vertical"
                                />

                            </Col>

                        </Row>

                    </div>
                    <div className='form-element-btn-next'>
                        <Button className='stepperbutton' type="submit" onClick={() => setHandleOpen()}>Submit</Button>
                    </div>
                </FormSection>
                <SuccessMessageModal open={open} setOpen={setOpen} icon={GreenTick} message={'Loss notice #12345 is successfully created'} />
            </Container>
        </Claims>
    )
}

export default Claim
