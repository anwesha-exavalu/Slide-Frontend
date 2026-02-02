import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'styles/pages/Login';
import novoLogo from 'assets/images/exavalu_white1.png';
import { PrivateFooterbox } from 'styles/components/Footer';
import ChatBot from 'pages/ChatBot';
import useMetaData from "context/metaData";
const PrivateFooter = () => {
  const {theme} = useMetaData();
  const location = useLocation();
  const [openChat, setOpenChat] = useState(false);

  const toggleChat = () => {
    setOpenChat(!openChat); 
  };

  return (
    <PrivateFooterbox theme={theme}>
      <div>
        <Container>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
            <img src={novoLogo} style={{height:"50px"}}/>
            </Col>
            <Col className="gutter-row" span={5}>
              <ul>
                <li><a>Marketing</a></li>
                
                <li><a>Materials/Resources</a></li>
                <li className={location.pathname == '/privacy' ? 'active' : ''}><Link to="/privacy">Privacy</Link></li>
              </ul>
            </Col>
            <Col className="gutter-row" span={5}>
              <ul>
                <li><a>HelpDesk / How to?</a></li>
                <li><a>Personal Auto Training</a></li>
                <li>
                  <a onClick={toggleChat} style={{ cursor: 'pointer' }}>Chat</a>
                </li>
                {/* <li><a>Flood Training</a></li> */}
                
              </ul>
            </Col>
            <Col className="gutter-row" span={6}>
              <ul>
                <li><a>Click here for Webinars</a></li>
                
                <li className={location.pathname == '/contact' ? 'active' : ''}><Link to="/contact">Contact</Link></li>
                <li className={location.pathname == '/termsofuse' ? 'active' : ''}><Link to="/termsofuse">Terms Of Use</Link></li>
              </ul>
            </Col>
          </Row>
          <hr />
          <a className='copyright-text'> &#169; 2024 Exavalu. All Rights Reserved.</a>
        </Container>
      </div>
      {openChat && <ChatBot toggleChat={toggleChat} />}
    </PrivateFooterbox>
  );
}

export default PrivateFooter;
