import styled from "styled-components";

export const PrivateFooterbox = styled.div`
  
  background-color:${({ theme }) => (theme === 'dark' ? '#656566' : '#054f7d')};
  border-radius: 20px 20px 0px 0px;
  padding: 40px 0px 20px;
  ul {
    list-style: none;
    padding-left: 0px;
    li {
      margin-bottom: 10px;
      padding: 0;
    }
    li a {
      width: 75%;
      display: block;
      font-size: 14px;
      padding: 5px 10px;
      font-weight: 500;
      line-height: 17.64px;
      color: #fff;
      b {
        font-weight: 700;
      }
    }
    li.active {
    }
    li.active a,
    li:hover a {
      background: #fff;
      border-radius: 10px;
      color: #2e2e48;
    }
  }
  .copyright-text {
    text-align: center;
    color: #fff;
    display: block;
    padding: 35px 0px 0px;
  }
`;
export const PublicFooterBox = styled.div`
 background-color:${({ theme }) => (theme === 'dark' ? '#656566' : '#054f7d')};
   .footersection {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .copyrightsection {
    display: flex;
    align-items: center;
    gap: 17px;
    button {
      background-color: #1169a0;
      border: 1px solid #1169a0;
      border-radius: 5px;
      color: #fff;
      padding: 9px 15px;
      cursor: pointer;
    }
    a {
      font-size: 13px;
      color: #fff;
    }
  }
`;

export const Container = styled.div`
  max-width: 1220px;
  padding: 28px 20px;
  margin: 0 auto;
`;
