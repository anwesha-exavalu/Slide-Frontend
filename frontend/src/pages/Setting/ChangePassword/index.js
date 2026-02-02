import React, {useState} from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { handleUpdatePassword } from "utils/services";
import { CustomModalContent } from "styles/pages/Login";

const ChangePassword = ({ open, setOpen }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [messageText, setMessageText] = useState('')

  const onClickCancel = () => {
    setOpen(false);
  };

  const onPassKeyChange = (e) => {
    if(form.getFieldValue('newPass') == e.target.value && !!form.getFieldValue('oldPass')) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }

  const updatePassword = () => {
    setLoading(true);
    const oldPass = form.getFieldValue('oldPass');
    const newPass = form.getFieldValue('newPass');
    const confirmPass = form.getFieldValue('confirmPass');
    if(newPass != confirmPass) {
      messageApi.open({
        type: "error",
        content: "The new password does not match the confirm password."
      });
      return;
    }
    handleUpdatePassword(oldPass, newPass).then(() => {
        messageApi.open({
          type: "success",
          content: "Password updated successfully",
        });
        setLoading(false);
        setMessageText('Password updated successfully')
    }).catch((err) => {
        messageApi.open({
          type: "error",
          content: err?. InvalidParameterException || 'Invalid Password',
        });
        setLoading(false);
        setMessageText('Error in updating password!')
    })
  }

  const [form] = Form.useForm();

  return (
    <div className="login-shortcut-modal">
      {contextHolder}
      <Modal
        title="Change Password"
        footer={false}
        open={open}
        onCancel={onClickCancel}
        
      >
        <CustomModalContent>
        {messageText != '' && <div className="email-subtext">{messageText}</div>}
        <Form form={form} layout="vertical" className="login-form " 
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}>
          <Row gutter={12} style={{paddingTop:"20px"}}>
            <Col span={24}>
            <Form.Item
              label="Old Password"
              name="oldPass"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="New Password"
                name="newPass"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Confirm Password"
                name="confirmPass"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                ]}
              >
                <Input.Password onChange={(e) => onPassKeyChange(e)} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button
              type="primary"
              disabled={disabledBtn}
              onClick={() => {
                updatePassword();
              }}
              loading={loading}
              className="sigin-btn"
              style={{ width: "100%" }}
            >
              Change Password
            </Button>
          </Form.Item>
          {/* <div style={{ textAlign: "right" }}>
            <Button
            //   disabled={!(form.isFieldsValidating() && form.getFieldValue()['newPass'] == form.getFieldValue()['confirmPass'])}
              type="primary"
              onClick={() => {
                updatePassword();
              }}
            >
              Change Password
            </Button>
          </div> */}
        </Form>
        </CustomModalContent>
      </Modal>
    </div>
  );
};

export default ChangePassword;
