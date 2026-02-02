import React, { useState } from "react";
import { ChatContainer, StyledCard } from "styles/pages/ChatBot";
import attachIcon from "assets/svg/attach.svg";
import sendIcon from "assets/svg/send.svg";
import ellipseIcon from "assets/svg/Ellipse.svg";

const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(true);

  const closeChatbox = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <ChatContainer>
          <StyledCard
            title={
              <div className="ant-card-head-title">
                <div className="title-container">
                  <img src={ellipseIcon} alt="Ellipse icon" className="icon-title" />
                  <span>Virtual Assistant</span>
                </div>
                <span className="close-icon" onClick={closeChatbox}>
                  X
                </span>
              </div>
            }
          >
            <div className="chat-body">
              <div className="message right">
              Welcome to our support chat! Let us know how we can make your insurance
              experience easier.
              </div>
              <div className="message left">
                Hello
              </div>
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="Type your message..." />
              <img src={attachIcon} alt="Attach icon" className="icon" />
              <img src={sendIcon} alt="Send icon" className="icon" />
            </div>
          </StyledCard>
        </ChatContainer>
      )}
    </>
  );
};

export default ChatBot;
