import React, { useState } from 'react';
import { Layout, Form, Button, Avatar, Row, Col, Upload, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Settings } from 'styles/pages/Settings/index';
import { Container } from "styles/pages/CreateQuote";
import FormControl from '../../components/FormControl/FormInput';
import { FormSection } from "styles/pages/SearchQuote";
import editlogo from '../../assets/images/Editlogo.svg';
import ProfileIcon from "assets/images/profile_img.png";
import { initialValues } from './dummyData';
import ChangePassword from './ChangePassword';

const Accountsetting = () => {
    const { Content } = Layout;
    const [openChangePassModal, setOpenChangePassModal] = useState(false)

    // State to manage uploaded image
    const [avatarImage, setAvatarImage] = useState(ProfileIcon);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleImageUpload = (file) => {
        // Create a URL for the uploaded file and update the state
        const imageUrl = URL.createObjectURL(file);
        setAvatarImage(imageUrl);
        return false; // Prevents the automatic upload
    };



    return (
        <Container>
            <FormSection>
                <Settings>
                    <div className='setting-heading'>
                        <label className='Quotelabel'>Profile Settings</label>
                    </div>
                    <Content className='container-box'>
                        <div className='grid-box'>
                            <div className='avatar-box'>
                                <Row className='avatar-box-data'>
                                    <Col className='avatar-box-style'>
                                        <Avatar
                                            size={140}
                                            icon={!avatarImage && <UserOutlined />}
                                            src={avatarImage} // Use the uploaded image as src
                                            className='avatar-logo'
                                        />
                                        {/* Edit icon for uploading */}
                                        <div className='uploading-icon'>
                                            <Upload
                                                showUploadList={false}
                                                beforeUpload={handleImageUpload}  // Custom upload handler
                                            >
                                                <img
                                                    src={editlogo}
                                                    alt="Upload"
                                                    className='upload-image'
                                                />
                                            </Upload>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16} className='account-setting-box'>
                                    <Form
                                        name="accountSettings"
                                        onFinishFailed={onFinishFailed}
                                        initialValues={initialValues}
                                        layout="vertical"
                                    >
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <FormControl label="Name" name="name" />
                                            </Col>
                                            <Col span={12}>
                                                <FormControl label="Email" name="email" />
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <FormControl label="Phone" name="phone" />
                                            </Col>
                                            <Col span={12}>
                                                <FormControl label="Website" name="website" />
                                            </Col>
                                        </Row>

                                        <Flex wrap gap="large" justify='space-between'>
                                            <Form.Item className='button-box'>
                                                <a onClick={() => setOpenChangePassModal(true)} style={{textDecoration:"underline"}}> Update Password</a>
                                            </Form.Item>
                                            <Form.Item className='button-box'>
                                                <Button type="primary" htmlType="submit">
                                                    Save
                                                </Button>
                                            </Form.Item>
                                        </Flex>
                                    </Form>
                                </Row>
                            </div>
                        </div>
                    </Content>
                </Settings>
            </FormSection>
            <ChangePassword open={openChangePassModal} setOpen={setOpenChangePassModal} />
        </Container>
    );
};

export default Accountsetting;
