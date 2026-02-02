import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import { Section, Container } from "styles/pages/Login";
import LoginImage from "assets/images/login_highlight.svg";
import agentImg from "assets/svg/agent-icon.svg";
import Customericon from "assets/svg/customer-icon.svg";
import LoginModal from "./loginModal";
import useMetaData from "context/metaData";

const Login = () => {
  const {theme} = useMetaData();
  const [open, setOpen] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  const onSelectUser = (user) => {
    setLoginUser(user);
    setOpen(true);
  };

  return (
    <Section theme={theme}>
      <Container theme={theme}>
        <Row style={{ alignItems: "end" }}>
          <Col span={12}>
            {" "}
            <div>
              <h2 className="logintexttitle">Fast free Auto quotes</h2>
              <h5 className="subtitle">
                How are you planning to use Digital Engagement Portal
              </h5>
              <p className="login-text">
                We will fit the experience to your needs, don’t worry you can
                change it later.
              </p>
              <div className="radiobtncard">
                <Row gutter={60} style={{ marginTop: "80px" }}>
                  <Col span={12} onClick={() => onSelectUser("agent")}>
                    <Card
                      className="selectAgent-type"
                      style={{
                        textAlign: "center",
                        border: "1px solid #054F7D80",
                        borderRadius: "20px",
                      }}
                    >
                      <img src={agentImg} />
                      <p className="agent-text">Agent</p>
                      <p className="text">Companies and group</p>
                    </Card>
                  </Col>
                  <Col span={12} onClick={() => onSelectUser("customer")}>
                    <Card
                      className="selectAgent-type"
                      style={{
                        textAlign: "center",
                        border: "1px solid #054F7D80",
                        borderRadius: "20px",
                      }}
                    >
                      <img src={Customericon} />
                      <p className="agent-text">Customer</p>
                      <p className="text">Individual or freelancer</p>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={4}></Col>
          <Col span={8}>
            <div>
              <img src={LoginImage} width="100%" />
            </div>
          </Col>
        </Row>

        <div></div>
      </Container>
      <LoginModal open={open} setOpen={setOpen} loginUser={loginUser} />
    </Section>
  );
};

export default Login;
