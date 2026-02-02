import React from "react";
import { useNavigate } from "react-router-dom";
import { PublicFooterBox, Container } from "styles/components/Footer";
import novoLogo from 'assets/images/exavalu_white1.png';

const PublicFooter = () => {
  const navigate = useNavigate();

  const redirectUser = (path) => {
    navigate(`/${path}`);
  }
  return (
    <PublicFooterBox>
      <Container>
        <div className="footersection">
            <img src={novoLogo} style={{height:"50px"}} />
          <div className="copyrightsection">
            <button onClick={() => redirectUser('contact')}>Contact</button>
            <button onClick={() => redirectUser('privacy')}>Privacy</button>
            <button onClick={() => redirectUser('termsofuse')}>Terms Of Use</button>
            <a>&#169; 2024 Exavalu. All Rights Reserved.</a>
          </div>
        </div>
      </Container>
    </PublicFooterBox>
  );
};

export default PublicFooter;
