import React from "react";
import { Button, Form, Input } from "antd";
import ArrowIcon from "assets/svg/arrow-right.svg";

const VerificationCodeForm = ({ loading, onFinishForm, onFinishFailed, cancel }) => {
  return (
            <Form
                  className="login-form"
                  name="mfa"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishForm}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Verify Code"
                    name="verifyCode"
                    rules={[
                      {
                        required: true,
                        message: "Please input verify code!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <div className="inline">
                      <button className="cancel-btn" onClick={() => cancel()}>
                        Cancel
                      </button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="signin-btn"
                      >
                        Submit <img src={ArrowIcon} width="13px" />
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
    );
};
export default VerificationCodeForm;