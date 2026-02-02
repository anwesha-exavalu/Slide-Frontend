import { Card, Col, Row, Space, Typography, Form, Button } from "antd";
import TableComponent from "components/Table";
import React, { useState , useEffect} from "react";
import home from "assets/svg/claims-home.svg";
import { Container } from "styles/components/Layout";
import { Section } from "styles/pages/Login";
import { dataSourceTransactionHistory , columns} from "pages/StartTransaction/dummyDataTransactionHistory";
import FormDatePicker from "components/FormControl/FormDatePicker";
import DropdownSelect from "components/FormControl/DropdownSelect";
import Cancellation from "pages/StartTransaction/CancellationTransaction";
import ReInstatement from "pages/StartTransaction/ReInstatementTransaction";
import { useNavigate } from "react-router-dom";
import {
  CloseButtonTransactionStyle,
  FormStartTransactionStyle,
  TitleTransactionStartStyle,
} from "styles/pages/StartTransaction";
import { CloseCircleOutlined, PoweroffOutlined } from "@ant-design/icons";
import PolicyInfo from "components/PolicyInfo";
import startTransactionDropDown from "assets/files/startTransaction.csv";
import Papa from "papaparse";
import { setDropdownVals } from "utils/helper";
import useMetaData from "context/metaData";

const filesData = {};

const StartTransaction = () => {
  const {theme}=useMetaData();
  const [startTransactionDropDownVal, setStartTransactionDropDownVal] =
    useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };

  useEffect(() => {
    Papa.parse(startTransactionDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);
  const handleOnButtonClick = (e) => {
    var buttonClicked = e.currentTarget.name;
    console.log("The button clicked is ", buttonClicked);
    if (buttonClicked === "cancel") {
      setButtonClicked("cancel");
    } else if (buttonClicked === "start") {
      setButtonClicked("start");
    }
  };

  const handleSubmit = async () => {
    try {
      var values = await form.validateFields();
      console.log(values);
      console.log("Which button clicked ", buttonClicked);
      if (buttonClicked === "start") {
        navigate("/policy-details", { state: { isEditable: true } });
      } else if (buttonClicked === "cancel") {
        navigate("/policy-details");
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handlestartTransactionDropDownChange = (value) => {
    console.log(startTransactionDropDownVal);
    setStartTransactionDropDownVal(value);
  };
  return (
    <Section theme={theme}>
      <Container theme={theme}>
        <PolicyInfo/>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <TitleTransactionStartStyle theme={theme}>
                  <Typography.Title level={5}>
                    Transaction Selection
                  </Typography.Title>
                </TitleTransactionStartStyle>
              </Col>
            </Row>
            <FormStartTransactionStyle>
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Card size="large">
                  <Row>
                    <Col span={10}>
                      <Space direction="vertical">
                        <Col>
                          <img src={home}></img>
                        </Col>
                        <Col>
                          <Typography.Title level={5}>
                            Transaction
                          </Typography.Title>
                        </Col>
                        <Col span={24}>
                          <Typography.Text level={6}>
                            This information will help the agent better
                            understand your needs and objectives.
                          </Typography.Text>
                        </Col>
                      </Space>
                    </Col>
                    <Col span={14}>
                      <Row>
                        <Col offset={2} span={10}>
                          <DropdownSelect
                            label="Start Transaction"
                            name="StartTransaction"
                            layout="vertical"
                            options={dropDownOpts?.StartTransaction || []}
                            onChange={handlestartTransactionDropDownChange}
                            defaultValue="Select"
                          />
                        </Col>
                        {startTransactionDropDownVal !== "Reinstatement" ? (<Col offset={2} span={10}>
                          <FormDatePicker
                            label="Effective Date"
                            name="EffectiveDate"
                            layout="vertical"
                          />
                        </Col>):null}
                      </Row>
                      {startTransactionDropDownVal !== "Reinstatement" ? (
                          <Col offset={2} span={10}>
                            <FormDatePicker
                              label="Effective Date"
                              name="EffectiveDate"
                              layout="vertical"
                            />
                          </Col>
                        ) : null}
                      {startTransactionDropDownVal === "Cancellation" ? (
                        <Cancellation />
                      ) : null}
                      {startTransactionDropDownVal === "Reinstatement" ? (
                        <ReInstatement />
                      ) : null}
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Col span={10}></Col>
                    <CloseButtonTransactionStyle>
                      <Col>
                        <Button
                          size="large"
                          onClick={handleOnButtonClick}
                          type="submit"
                          htmlType="submit"
                          name="start"
                          icon={<PoweroffOutlined />}
                        >
                          Start
                        </Button>
                      </Col>
                    </CloseButtonTransactionStyle>
                    <Col>
                      <Button
                        size="large"
                        htmlType="submit"
                        onClick={handleOnButtonClick}
                        name="cancel"
                        icon={<CloseCircleOutlined />}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Form>
            </FormStartTransactionStyle>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TableComponent
              theme={theme}
              title={"Transaction History"}
              columns={columns}
              data={dataSourceTransactionHistory}
            ></TableComponent>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default StartTransaction;
