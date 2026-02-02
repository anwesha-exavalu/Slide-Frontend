import React, { useState } from "react";
import { PublicHeader, Container } from "styles/components/Navbar";
import novoLogo from 'assets/images/exavalu.png';
import SearchIcon from "assets/images/search-icon.png"
import LoginShortcut from "pages/Login/loginShortcut";
import HomeIcon from "assets/svg/home";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  const [loginShort, setLoginShort] = useState(false);

  const openLogin = () => {
    setLoginShort(true);
  }
  return (
    <PublicHeader>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          
         
          <div>
          <img src={novoLogo} style={{height:"50px"}}/>
            <Link className='home-button' to='/'><HomeIcon/></Link>
          </div>
          <div
            className="search-box"
            style={{ display: "flex", padding: "25px 0" }}
          >
            <span className="login" style={{cursor: 'pointer'}} onClick={openLogin}>Log in</span>
            <div className="search-feild">
              <span className="search-icons"><img src={SearchIcon} /></span>

              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <LoginShortcut open={loginShort} setOpen={setLoginShort} />
      </Container>
    </PublicHeader>
  );
};

export default PublicNavbar;
