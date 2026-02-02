import React, { useState } from 'react'
import { Form, Button, Row, Col, message } from 'antd';
import FormControl from '../../components/FormControl/FormInput';
import { useLocation } from 'react-router-dom';
import SuccessAgentRegModal from "components/PopupModal/SuccessAgentRegModal";
import GreenTick from "assets/svg/greentick.svg";
import FormPhoneInput from '../../components/FormControl/FormPhoneInput'
import { Section, Container } from "styles/pages/Registration";
import Register from "assets/svg/registration.svg";
import usePost from "hooks/usePost";
import { UserSignUp } from "constants/api";

const AgentRegistration = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync: registerUser } = usePost();
    const { state } = useLocation()
    const [open, setOpen] = useState(false);
    const loginUser = state.loginUser;
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const setHandleOpen = () => {
        setOpen(true);
    };
    const onFinish = async (values) => {
        console.log("Form Data:", values);
        try {
            const firstPart = values?.requesterFirstName.slice(-4);
            const lastPart = values?.requesterLastName.slice(-4);
            const phoneNumber = values?.phoneNumber.replace(/[^\d]/g, "");
            let payload = {
                "userName": firstPart + lastPart,
                "email": values.agentEmail,
                "phone": "+1" + phoneNumber,
                "role": loginUser
            }
            const res = await registerUser({
                url: UserSignUp,
                payload: payload,
                token: true,
                customHeaders: { "Content-Type": "application/json" }
            });
            if (res == "Success") {
                setHandleOpen();
                messageApi.open({
                    type: "success",
                    content: "Agent Registered successfully",
                });
            } else {
                messageApi.open({
                    type: "error",
                    content: res,
                });
            }
        } catch (error) {
            console.error("API call failed:", error);
            messageApi.open({
                type: "error",
                content: error?.InvalidParameterException || 'Invalid Request',
            });
        }
    };

    return (
        <Section>
            <Container>
                {contextHolder}
                <Row className="align">
                    <Col span={16}>
                        <div className='title-block'>
                            <h2 className="registertexttitle">Exasure DEP {loginUser == "agent" ? "Agent" : "Customer"} Registration</h2>
                            <h5 className="subtitle">
                                User Registration
                            </h5>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <img src={Register} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form
                            name="registration"
                            onFinishFailed={onFinishFailed}
                            onFinish={onFinish}
                            //initialValues={initialValues}
                            layout="vertical"
                        >
                            <h4 className='sub-label-title'>PRIMARY DETAILS :</h4>
                            <br />
                            <Row gutter={16}>
                                <Col span={12}>
                                    <FormControl label="Agency Name" name="agencyName" required={true} />
                                </Col>
                                <Col span={12}>
                                    <FormControl label="Agent Email" name="agentEmail" required={true} />
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <FormControl label="First Name" name="requesterFirstName" required={true} />
                                </Col>
                                <Col span={12}>
                                    <FormControl label="Last Name" name="requesterLastName" required={true} />
                                </Col>
                            </Row>
                            <hr className='new-line' />
                            <h4 className='sub-label-title'>ADDRESS :</h4>
                            <br />
                            <Row gutter={16}>
                                <Col span={12}>
                                    <FormControl label="Street" name="street" required={true} />
                                </Col>
                                <Col span={12}>
                                    <FormControl label="City" name="city" required={true} />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <FormControl label="State" name="state" required={true} />
                                </Col>
                                <Col span={12}>
                                    <FormControl label="Zip code" name="Zipcode" required={true} />
                                </Col>
                            </Row>
                            <hr className='new-line' />
                            <Row gutter={16}>

                                <Col span={12}>
                                    <FormPhoneInput name="phoneNumber" label="Phone Number" required />
                                </Col>
                                <Col span={12}>
                                    <FormControl label="Fax Number" name="FaxNumber" />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <FormControl label="Primary Agency Email" name="PrimaryAgencyEmail" required={true} />
                                </Col>
                            </Row>
                            <Form.Item className='button-box'>
                                <Button type="primary" htmlType="submit" className='button-save'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <SuccessAgentRegModal
                open={open}
                setOpen={setOpen}
                icon={GreenTick}
                message={"Agent registration is successfully completed"}
            />
        </Section>
    )
}

export default AgentRegistration
