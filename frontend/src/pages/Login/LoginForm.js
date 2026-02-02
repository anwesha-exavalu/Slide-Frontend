import React from "react";
import { Button, Form, Input } from "antd";
import ArrowIcon from "assets/svg/arrow-right.svg";

const LoginForm = ({ loading, onSubmitForm, onFinishFailed }) => {
  return (
    <Form
      className="login-form"
      name="basic"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmitForm}
      onFinishFailed={onFinishFailed}
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
      >
        <Input />
      </Form.Item>
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
          Sign in <img src={ArrowIcon} width="13px" />
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
