import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Input } from "antd";
import {
  ContactUsContainer,
  Subtitle,
  ContactUSPage,
  ContentCard,
  ContactDetails,
  Container
} from "styles/pages/ContactUs";
import ContactUsImg from "assets/svg/contact-us.svg";
import FormControl from '../../components/FormControl/FormInput';
import Dropdown from '../../components/FormControl/DropdownSelect';
import SuccessMessageModal from 'components/PopupModal/SuccessMessageModal';
import GreenTick from "assets/svg/greentick.svg";
import FormPhoneInput from '../../components/FormControl/FormPhoneInput';
import contactDropDown from "assets/files/contact.csv";
import Papa from "papaparse";
import { setDropdownVals } from 'utils/helper';
import usePost from "hooks/usePost";
import { ContactUsMail } from "constants/api";

const filesData = {};

const ContactUs = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false)
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };
  const { mutateAsync: sendMail } = usePost();
  useEffect(() => {
    Papa.parse(contactDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);
  const setHandleOpen = () => {
    setOpen(true)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = async (values) => {

    try {
      let payload = {
        "firstName": values.firstName,
        "lastName": values.lastName,
        "email": values.email,
        "phone": values.Telephone,
        "state": values.state,
        "help": values.help,
        "message": values.comments
      }
      const res = await sendMail({
        url: ContactUsMail,
        payload: payload,
        token: true,
        customHeaders: { "Content-Type": "application/json" }
      });
      if (res == "Success") {
        setHandleOpen()
      }

    } catch (error) {
      console.error("API call failed:", error);
    }


    // message.success('Form data sent! Check console for details.');
  };
  const handleClear = () => {
    form.resetFields(); // Reset all fields in the form
  };
  const statelist = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  }
  const stateOptions = Object.entries(statelist).map(([value, label]) => ({
    value,
    label,
  }));
  return (
    <ContactUSPage>
      <ContactUsContainer>
        <Container>
          <Row>
            <Col span={12} className="privacy-card">
              <h4 className="title">Contact Us</h4>
              <p className="subtext">
                {`Let’s`} talk. LiveChat, call, email... or use the form below to give us a shout out.
              </p>
            </Col>
            <Col span={12}>
              <div className="privacyimage">
                <img src={ContactUsImg} />
              </div>
            </Col>
          </Row>
        </Container>
      </ContactUsContainer>
      <ContactDetails>
        <Container>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <ContentCard>
                  <Subtitle>
                    <Subtitle>Exavalu Inc </Subtitle>
                    <p>Phone: <a>+1-888-EXAVALU (888-392-8258) </a> </p>
                    <p>Email: <a onClick={() => { window.location = `mailto:info@exavalu.com` }}>info@exavalu.com</a></p>
                  </Subtitle>
                </ContentCard>
              </Col>
              <Col span={16}>
                <ContentCard>
                  {/* <Subtitle>Customer Service and Policy Information</Subtitle> */}
                  <Form
                    name=""
                    onFinishFailed={onFinishFailed}
                    form={form}
                    //initialValues={initialValues}
                    onFinish={onFinish}
                    layout="vertical"
                  >
                    <Row gutter={20}>
                      <Col span={12}>
                        <FormControl label="First Name" name="firstName" required />
                      </Col>
                      <Col span={12}>
                        <FormControl label="Last Name" name="lastName" required />
                      </Col>
                      <Col span={12}>
                        <FormControl label="Email" name="email" required />
                      </Col>
                      <Col span={12}>
                        <FormPhoneInput name="Telephone" label="Phone Number" required />
                      </Col>

                      <Col span={12}>
                        <Dropdown label="State" name="state" options={stateOptions} required />
                      </Col>
                      <Col span={12}>
                        <Dropdown label="What Can We Help You With" name="help" options={dropDownOpts?.Help || []} required />
                      </Col>
                    </Row>
                    <Col span={24}>
                      <label className="label-text">Contact Message</label>
                      <Form.Item name="comments">
                        <TextArea className="formtextlabel" />
                      </Form.Item>
                    </Col>
                    <Form.Item className='button-box'>
                      <Row gutter={6}>
                        <Col span={3}>
                          <Button type="primary" htmlType="submit" className='button-save'>
                            Send
                          </Button>
                        </Col>
                        <Col span={3}>
                          <Button type="primary" onClick={handleClear} className='button-save'>
                            Clear Form
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form>
                </ContentCard>
              </Col>
            </Row>
          </Card>
        </Container>
        <SuccessMessageModal open={open} setOpen={setOpen} icon={GreenTick} message={'Message submitted successfully'} />
      </ContactDetails>
    </ContactUSPage>
  );
};

export default ContactUs;