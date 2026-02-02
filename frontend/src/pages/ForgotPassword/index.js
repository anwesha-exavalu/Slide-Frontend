import React, { useState } from "react";
import { Modal, Form, Button, Input } from "antd";
import { CustomModalContent } from "styles/pages/Login";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "pages/Login/UserPool";

const ForgotPassword = ({ open, setPassword, setOpen, setMsgText }) => {
  const [requestForm] = Form.useForm();
  const [confirmForm] = Form.useForm();
  const [messageText, setMessageText] = useState("An email will be sent to the email address associated with the Username.");
  const [userName, setUserName] = useState('');
  const [verifyCodeForm, setVerifyCodeForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (data) => {
    setErrorMessage("");
    const userData = {
      Username: data.userName,
      Pool: UserPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: function (result) {
        console.log('Call result: ', result);
      },
      onFailure: function (err) {
        console.log(err);
        setErrorMessage(err.message);
      },
      inputVerificationCode() {
        confirmForm.resetFields();
        setVerifyCodeForm(true);
        setMessageText("If a valid username is provided, a verification code will be sent to the corresponding email address.");
      }
    });
  };

  const confirmNewPassword = (data) => {
    setMessageText("If a valid username is provided, a verification code will be sent to the corresponding email address.");
    setErrorMessage("");
    if(data.newPassword != data.confirmPassword) {
      setErrorMessage("The new password does not match the confirm password.");
      return;
    }
    const userData = {
      Username: userName,
      Pool: UserPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmPassword(data.verifyCode, data.newPassword, {
      onSuccess() {
        confirmForm.resetFields();
        requestForm.resetFields();
        setVerifyCodeForm(false);
        handleModalClose();
        setOpen(true);
        setMsgText('Password changed successfully');
      },
      onFailure(err) {
        setErrorMessage(err.message);
      }
    });
  };

  const handleModalClose = () => {
    setPassword(false);
    setMessageText("An email will be sent to the email address associated with the Username.");
  };

  const handleCancel = () => {
    handleModalClose();
    setOpen(true);
    setErrorMessage("");
    setUserName("");
    confirmForm.resetFields();
    requestForm.resetFields();
  };

  const handleAnotherCancel = () => {
    setVerifyCodeForm(false);
    setErrorMessage("");
    setUserName("");
    confirmForm.resetFields();
    requestForm.resetFields();
    setMessageText("An email will be sent to the email address associated with the Username.");
  };

  return (
    <Modal
      open={open}
      onCancel={handleModalClose}
      footer={null}
      className="forgot-password-modal"
    >
      <CustomModalContent>
        <p className="sigin-title">Forgot Password  </p>
        <br></br>
        <div className="email-subtext">{messageText}</div>
        <p className="error">{errorMessage}</p>
        {!verifyCodeForm ? <Form
          form={requestForm}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="forgot-password-form"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="User Name"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            onChange={(e) => setUserName(e.target.value)}
          >
            <Input />
          </Form.Item>

          <Form.Item className="cancel-box" wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="button"
              className="signin-btn cancel"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="signin-btn email"
            >
              Send Email
            </Button>
          </Form.Item>
        </Form> : <Form
          form={confirmForm}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="forgot-password-form"
          onFinish={confirmNewPassword}
          autoComplete="off"
        >
          <Form.Item
            label="Verification Code"
            name="verifyCode"
            rules={[
              {
                required: true,
                message: "Enter verification code",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Enter new password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Enter confirm password",
              },
            ]}
          >
           <Input.Password />
          </Form.Item>
          <Form.Item className="cancel-box" wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="button"
              className="signin-btn cancel"
              onClick={handleAnotherCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="signin-btn email"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        }
      </CustomModalContent>
    </Modal>
  );
};

export default ForgotPassword;
