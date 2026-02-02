import { Button, Col, Form, Modal, Row, message } from "antd";
import FormInput from "components/FormControl/FormInput";
import React, { useState } from "react";
import {
  DetailPragrap,
  DetailsModalTitle,
  EditButton,
} from "styles/components/Modal/detailsModal";
import mail from 'assets/images/mail.png';

const DetailsModal = ({ selectedInsured, open, setOpen }) => {
  const [editDetails, setEditDetails] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onClickCancel = () => {
    setEditDetails(false);
    setOpen(false);
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Customer details are updated',
    });
  };
  return (
    <div>
      {contextHolder}
      <Modal footer={false} open={open} onCancel={onClickCancel} width={900}>
        <Form layout="vertical">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              margin: "35px 0",
            }}
          >
            <div>
              <svg
                width="34"
                height="35"
                viewBox="0 0 34 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width="34" height="34" rx="6" fill="#EEF6FF" />
                <path
                  d="M16.3144 9.01399C16.6217 8.96713 16.7804 9.04618 17.0552 9.12974C19.5278 9.87902 21.9886 11.0145 24.4588 11.8056C24.6292 11.8806 24.7773 12.0241 24.8545 12.1878C25.1601 12.8354 24.907 15.1595 24.7961 15.9505C24.1839 20.3315 21.9614 24.367 17.812 26.5092C16.5427 27.1648 16.4613 27.1648 15.192 26.5092C11.1328 24.4127 8.93097 20.523 8.25384 16.2447C8.08692 15.1883 7.94124 13.8027 8.02381 12.7423C8.05389 12.3538 8.14591 12.0241 8.51632 11.8191L16.3144 9.01399ZM20.0227 14.4232C19.913 14.4447 19.7466 14.5519 19.6582 14.6236L16.2153 18.0476C16.1251 18.0476 15.1448 16.972 14.9348 16.8229C14.0524 16.1967 12.8922 17.2356 13.6755 18.1554C14.0064 18.5445 15.2687 19.7816 15.6674 20.0526C16.4477 20.5839 16.9691 19.9143 17.4752 19.4236C18.6873 18.2475 19.8339 17.003 21.0431 15.8229C21.5155 15.1025 20.9198 14.2476 20.0227 14.4232Z"
                  fill="#36AFFA"
                />
              </svg>

              <DetailsModalTitle>Insured</DetailsModalTitle>
              <DetailPragrap>
              Make sure your client information is up-to-date to offer the best coverage
              possible.
              </DetailPragrap>
            </div>
            <div>
              <EditButton onClick={() => setEditDetails(true)}>Edit</EditButton>
            </div>
          </div>

          <Row gutter={12}>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="Name"
                defaultValue={selectedInsured?.name}
              />{" "}
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="DBA"
                defaultValue={selectedInsured?.dba}
              />{" "}
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="Principal Name:"
                defaultValue="John Smith (1/28/1961)"
              />{" "}
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="Insured ID"
                defaultValue={selectedInsured?.insuredID}
              />{" "}
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="Customer ID:"
                defaultValue="n/a"
              />{" "}
            </Col>
          </Row>
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "#F1F1F1",
            }}
          />
          <div
            style={{
              margin: "35px 0",
            }}
          >
            <div>
              <svg
                width="34"
                height="35"
                viewBox="0 0 34 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="0.5" width="34" height="34" rx="6" fill="#EEF6FF" />
                <g>
                  <g>
                    <path
                      d="M19.958 10C20.9851 10.1926 21.6791 10.9709 21.7509 12.0201L21.7448 15.6908L19.4527 16.4648C19.3143 16.2347 19.1322 16.0459 18.8521 16.0121L11.8298 16.0144C11.2109 16.1783 11.0181 16.9867 11.5666 17.3638C11.6032 17.3887 11.8045 17.4892 11.828 17.4892H16.903C16.4666 17.919 16.1428 18.4784 16.1297 19.1064C16.0162 19.0402 15.8932 19.0106 15.7623 18.9998C14.5302 18.8946 13.1483 19.0782 11.9007 19.004C10.9993 19.1778 11.0416 20.4079 11.9725 20.5084C13.1798 20.445 14.4983 20.6075 15.6924 20.5141C15.8491 20.5018 15.9843 20.4572 16.1302 20.4074C16.1438 21.8193 15.9969 23.2345 16.56 24.5651L17.1488 25.7511H10.8088C10.7206 25.7511 10.3438 25.6243 10.2406 25.5816C9.564 25.3002 9.13889 24.6628 9 23.9578V11.7933C9.17126 10.8469 9.8474 10.1743 10.7915 10H19.9585H19.958ZM11.9424 12.9985C11.0523 13.1103 11.0096 14.3024 11.8707 14.4921C12.8724 14.4151 14.1163 14.6255 15.0904 14.4978C15.9542 14.3841 16.0058 13.0704 14.9543 12.9877C13.9896 12.9121 12.9179 13.0384 11.9424 12.999V12.9985Z"
                      fill="#36AFFA"
                    />
                    <path
                      d="M22.1264 17.1454C22.332 17.1125 22.4629 17.1506 22.6543 17.198C23.9287 17.5132 25.2716 18.1773 26.5502 18.5366C26.804 18.6526 26.9753 18.9082 26.9842 19.1923C26.9073 21.1087 27.2995 22.947 26.3339 24.6966C25.6568 25.9235 23.9967 27.3974 22.6867 27.9018C22.2878 28.0554 22.1851 28.0202 21.8074 27.8553C20.0971 27.1094 18.2714 25.3523 17.7839 23.5154C17.5202 22.5215 17.5206 20.321 17.6041 19.2628C17.6318 18.9086 17.7557 18.6663 18.0874 18.516L22.1269 17.1454H22.1264ZM22.0645 22.7272C22.0134 22.7413 22.0063 22.7136 21.9768 22.6929C21.6652 22.4773 21.1974 21.7639 20.8614 21.6648C20.136 21.4511 19.5833 22.2143 20.0131 22.8306C20.1834 23.0748 21.3992 24.2861 21.6469 24.4646C21.9894 24.7112 22.3535 24.6675 22.6618 24.397L25.0163 21.2341C25.3978 20.4924 24.5312 19.7879 23.8747 20.3022L22.0645 22.7272Z"
                      fill="#36AFFA"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_5_2728">
                    <rect
                      width="21"
                      height="20"
                      fill="white"
                      transform="translate(6 7.5)"
                    />
                  </clipPath>
                  <clipPath id="clip1_5_2728">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(9 10)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <DetailsModalTitle>Insured details</DetailsModalTitle>
              <DetailPragrap>
                This information will help the agent better understand your
                needs and objectives.
              </DetailPragrap>
            </div>
          </div>

          <Row gutter={12}>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="Address"
                defaultValue={selectedInsured?.location}
              />{" "}
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="City/ Zip"
                defaultValue="charlipola , North California"
              />{" "}
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label={<span>Email <img src={mail} className='suffix' title="Email to" onClick={()=>{window.location = `mailto:79/Agomes@gmail.com`}}/></span>}
                defaultValue="79/Agomes@gmail.com"
                
              />{" "}
              
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="Phone"
                defaultValue={selectedInsured?.phone}
              />{" "}
            </Col>
            <Col span={12}>
              <FormInput
                disabled={!editDetails}
                label="Fax"
                defaultValue="n/a"
              />{" "}
            </Col>
          </Row>
          <div style={{ textAlign: "right" }}>
            {" "}
            <Button
              type="primary"
              disabled={!editDetails}
              onClick={() => {
                onClickCancel();
                success();
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailsModal;
