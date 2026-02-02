import React from "react";
import { Button, Form, Input } from "antd";
import ArrowIcon from "assets/svg/arrow-right.svg";

const NewPasswordChangeForm = ({ loading, onNewPasswordForm, onFinishFailed }) => {
  return (
    <Form
      className="login-form"
      name="change-password"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onNewPasswordForm}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
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
            message: "Please input your confirm password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="signin-btn"
        >
          Submit <img src={ArrowIcon} width="13px" />
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewPasswordChangeForm;
