import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import arrow from '../../assets/images/arrow.png';
import { Container } from "styles/pages/CreateQuote";
import moment from 'moment';
import { StyledContainerDiv } from 'styles/components/Stepper';

const DefaultStepper = ({ theme, state, steps, activeStep, handleNextStep, handlePrevStep, handleDataAddition, handleDataloss, children, setOpen, setViewPolicy }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [triggeredBy, setTriggeredBy] = useState('');
    const [initialValues, setInitialValues] = useState({});
    const [newpathName, setNewpathName] = useState('')
    const PathName = location.pathname
    const setHandleOpen = () => {
        setOpen(true)
    }
    useEffect(() => {
        if (state && Object.keys(state)) {
            const defaultValues = {
                "termplan": "sixmonths",
                "effectivedate": moment("2024-10-15T18:30:00.000Z"),
                "firstName": "Vivek",
                "lastName": "Tamrakar",
                "Additionalfirstname": "Vivek",
                "Additionallastname": "Tamrakar",
                "telephoneNumber": "5512078081",
                "residencetype": "owned",
                "address1": "123 William St",
                "address2": "New York",
                "city": "New York",
                "state": "NY",
                "zipCode": "10012",
                "mailingaddress1": "123 William St",
                "mailingaddress2": "New York",
                "mailingcity": "New York",
                "mailingstate": "NY",
                "mailingzipCode": "10012",
                "emailaddress": "test@test.com",
                "vehicleadd": [
                    "addvehicles"
                ],
                "OtherThanCollisionDeductible": "1000",
                "Collision Deductible": "1000",
                "Rental Reimbursement": "20/420",
                "Towing and Labor": "50",
                "Special Equipment": "2500",
                "Special Equipment Type": "Pickup Caps",
                "accidentdate": moment("2024-11-12T18:30:00.000Z"),
                "description": "Auto Doc",
                "accidentvoilationcode": "666",
                "associateddriver": "driver 1",
                "purchasedleased": "owned",
                "estimatedannualmileage": "5665",
                "odometerreading": "233",
               
            }

            setInitialValues(defaultValues);
            form.setFieldsValue(defaultValues);
        }
    }, [state, form])

    useEffect(() => {
        if (PathName.includes('edit-quote')) {
            const match = location.pathname.match(/\/edit-quote\/(\d+)/);
            const quoteNumber = match ? match[1] : null;
            setNewpathName(`Quote - #${quoteNumber}`)
        } else {
            setNewpathName('Create Application')
        }
    }, [PathName])



    const handleButtonClick = (buttonName) => {
        setTriggeredBy(buttonName);
    };

    const handleAdditionalInfo = (values) => {
        if (values.additionalInfo.lendertype !== undefined) {
            var newAddtionalInfo = null;
            if ("additionalInfo" in formData) {
                newAddtionalInfo = [
                    ...formData.additionalInfo,
                    values.additionalInfo,
                ];
            } else {
                newAddtionalInfo = [values.additionalInfo];
            }
            setFormData({
                ...formData,
                ["additionalInfo"]: newAddtionalInfo,
            });
            form.resetFields();
        }

    }
    const handleDatalossinfo = (values) => {
        if (values.losshistoryInfo.CauseofLoss !== undefined) {
            var newAddtionallossInfo = null;
            if ("losshistoryInfo" in formData) {
                newAddtionallossInfo = [
                    ...formData.losshistoryInfo,
                    values.losshistoryInfo,
                ];
            } else {
                newAddtionallossInfo = [values.losshistoryInfo];
            }
            setFormData({
                ...formData,
                ["losshistoryInfo"]: newAddtionallossInfo,
            });
            form.resetFields();
        }

    }


    const handleNext = async (formvalue) => {
        console.log("formvalue", formvalue)
        try {
            var values = await form.validateFields(); // Validate form fields
            if ("additionalInfo" in values) {
                handleAdditionalInfo(values);
            } else if ("losshistoryInfo" in values) {
                handleDatalossinfo(values)
            } else {
                setFormData({ ...formData, ...values });
            }
            if (triggeredBy === 'next') {
                setTriggeredBy('')
                handleNextStep(); // Call the next step handler

            } else {
                setTriggeredBy('')
                handleDataAddition(values);
                handleDataloss(values)
            }
            console.log("formData", formData)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };


    const viewIssuePolicy = () => {
        setViewPolicy(true);
    };
    return (
        // <Container>
        //     <div className="stepper-container">
        //         <label className='Quotelabel'>{activeStep < steps.length - 1 ? newpathName : "Bind Quote"}</label>
        //         <div className="stepper">
        //             {steps.map((step, index) => (
        //                 <div key={index} className={`step ${index <= activeStep ? 'active' : ''}`}>
        //                     <div className="step-bar" />
        //                     <div className="step-content">
        //                         <div className={`circle ${index <= activeStep ? 'filled' : ''}`} />
        //                         <div className="step-label">{step}</div>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>

        //         <Form id="defaultStepper" form={form} initialValues={initialValues} onFinish={handleNext} className="allForm" layout="vertical">
        //             {/* Render the form passed as children */}
        //             {children}

        //             <div className='container-box-stepper' style={{ display: 'flex', justifyContent: 'space-between' }}>
        //                 {/* Back Button aligned to the left */}
        //                 <div>
        //                     {activeStep > 0 && (
        //                         <Button onClick={handlePrevStep} className="stepperbutton">
        //                             <img src={arrow} style={{ transform: 'rotate(180deg)', marginRight: '5px' }} />
        //                             Back
        //                         </Button>
        //                     )}
        //                 </div>

        //                 {/* Next/Submit buttons aligned to the right */}
        //                     {activeStep === steps.length && (

        //                         <StyledContainerDiv>
        //                             <Button type="submit" htmlType="submit" className="stepperbutton" style={{ marginRight: '20px' }} onClick={() => handleButtonClick('next')}>
        //                                 Bind Quote
        //                             </Button>
        //                             <Button type="submit" onClick={() => setHandleOpen()} className="stepperbutton">
        //                                 Complete Quote
        //                             </Button>
        //                             </StyledContainerDiv>

        //                     )}

        //                 <div className="form-element-btn-next">
        //                     {!!subSteps.length && activeStep === steps.length + subSteps.length - 1 && (
        //                         <>
        //                             <Button type="submit" htmlType="submit" className="stepperbutton" onClick={() => viewIssuePolicy()} style={{ marginRight: '20px' }}>
        //                                 Issue Policy
        //                             </Button>
        //                             <Button type="submit" onClick={() => setHandleOpen()} className="stepperbutton">
        //                                 Save Application
        //                             </Button>
        //                         </>
        //                     )}
        //                     {activeStep < 9 && (
        //                         <>
        //                             <Button type="primary" htmlType="submit" className="stepperbutton" onClick={() => handleButtonClick('next')}>
        //                                 Next
        //                                 <img src={arrow} style={{ marginLeft: '5px' }} />
        //                             </Button>
        //                         </>
        //                     )}
        //                 </div>
        //             </div>
        //         </Form>
        //     </div>
        // </Container>
        <Container theme={theme}>
            <div className="stepper-container">
                <label className='Quotelabel'>{activeStep < 4 ? newpathName : "Bind Quote"}</label>
                <div className="stepper">
                    {steps.map((step, index) => (
                        <div key={index} className={`step ${index <= activeStep ? 'active' : ''}`}>
                            <div className="step-bar" />
                            <div className="step-content">
                                <div className={`circle ${index <= activeStep ? 'filled' : ''}`} />
                                <div className="step-label">{step}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <Form id="defaultStepper" form={form} initialValues={initialValues} onFinish={handleNext} className="allForm" layout="vertical">
                    {children}

                    <div className='container-box-stepper' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            {activeStep > 0 && (
                                <Button onClick={handlePrevStep} className="stepperbutton">
                                    <img src={arrow} style={{ transform: 'rotate(180deg)', marginRight: '5px' }} alt="Back" />
                                    Back
                                </Button>
                            )}
                        </div>

                        <div className="form-element-btn-next">
                            {steps[activeStep] === 'Premium' && (
                                <StyledContainerDiv>
                                    <Button type="submit" htmlType="submit" className="stepperbutton" style={{ marginRight: '20px' }} onClick={() => handleButtonClick('next')}>
                                        Bind Quote
                                    </Button>
                                    <Button type="submit" onClick={setHandleOpen} className="stepperbutton">
                                        Complete Quote
                                    </Button>
                                </StyledContainerDiv>
                            )}

                            {steps[activeStep] === 'Payment' && (
                                <>
                                    <Button type="submit" htmlType="submit" className="stepperbutton" onClick={viewIssuePolicy} style={{ marginRight: '20px' }}>
                                        Issue Policy
                                    </Button>
                                    <Button type="submit" onClick={setHandleOpen} className="stepperbutton">
                                        Save Application
                                    </Button>
                                </>
                            )}

                            {steps[activeStep] !== 'Premium' && steps[activeStep] !== 'Payment' && (
                                <Button type="primary" htmlType="submit" className="stepperbutton" onClick={() => handleButtonClick('next')}>
                                    Next
                                    <img src={arrow} style={{ marginLeft: '5px' }} alt="Next" />
                                </Button>
                            )}
                        </div>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default DefaultStepper;
