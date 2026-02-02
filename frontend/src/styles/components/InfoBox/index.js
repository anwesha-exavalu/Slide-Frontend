import styled from "styled-components";

export const PreviousLink = styled.span`
  font-family: "Inter";
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #054f7d;
  cursor: pointer;
  text-decoration: underline;
  float: right;
  margin-bottom: 15px;
`;
export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 25px;
  height: 114px;
  border: ${({ theme }) => (theme === 'dark' ? '1px solid #373636' : '1px solid rgb(255, 255, 255)')};
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 6px 18px -2px rgba(24, 24, 28, 0.1);
  background-color:${({ theme }) => (theme === 'dark' ? '#373636' : 'white')};
  align-items: center;
  .title {
    font-weight: 600;
    font-size: 16px;
    color:${({ theme }) => (theme === 'dark' ? '#ffffff' : '#121212')} ;
  }
`;

export const SubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  p {
    color:${({ theme }) => (theme === 'dark' ? '#ADACB0' : '#adacb0')} ;
    font-weight: 500;
    font-size: 13px;
  }
  .box-value {
    font-weight: 500;
    font-size: 14px;
    color:${({ theme }) => (theme === 'dark' ? '#ffffff' : '#121212')} ;
  }
`;
