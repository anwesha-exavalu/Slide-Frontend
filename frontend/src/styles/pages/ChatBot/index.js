import styled from "styled-components";
import { Card } from 'antd';

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 1px;
  right: 1px;
  z-index: 1000;
`;

export const StyledCard = styled(Card)`
  width: 365px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .ant-card-head {
    background: linear-gradient(161.5deg, #36affb -15.49%, #065281 98.81%);
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    border-radius: 10px 10px 0 0;
  }

  .ant-card-head-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .title-container {
    display: flex;
    align-items: center;
  }

  .icon-title {
    margin-right: 10px;
  }

  .close-icon {
    margin-left: auto;
    cursor: pointer;
  }

  .chat-body {
    display: flex;
    flex-direction: column;
    height: 300px;
    overflow-y: auto;
    padding: 10px;

    .message {
      max-width: 80%;
      padding: 10px;
      border-radius: 10px;
      font-size: 12px;
      font-family: "Inter";
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      margin: 5px 0;
    }

    .left {
      background-color: #fff;
      align-self: flex-start;
      font-weight: 450;
      border: 1.5px solid #eaeaea;
    }

    .right {
      background-color: #1890ff;
      color: white;
      align-self: flex-end;
    }
  }

  .input-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: #fff;
    border-top: 1px solid #eaeaea;

    input {
      flex-grow: 1;
      padding: 10px;
      font-size: 12px;
      border: none;
    }

    .icon {
      margin-left: 15px;
      cursor: pointer;
    }
  }
`;
