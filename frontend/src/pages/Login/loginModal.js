import React, { useState } from "react";
import { Modal } from "antd";
import { CustomModalContent, CustomModal } from "styles/pages/Login";
import useMetaData from 'context/metaData';
import ForgotPassword from "pages/ForgotPassword";
import { onSubmit, onFinish, handleNewPassword } from "utils/services";
import LoginForm from "./LoginForm";
import NewPasswordForm from "./NewPasswordChangeForm";
import VerificationCodeForm from "./VerificationCodeForm";
import { useNavigate } from "react-router-dom";
import novoLogo from 'assets/images/exavalu.png';

const LoginModal = ({ open, setOpen, loginUser }) => {
  const navigate = useNavigate();
  const { setCustmerDetails } = useMetaData();
  const [loading, setLoading] = useState(false);
  const [verifyCodeForm, setVerifyCodeForm] = useState(false);
  const [newPasswordStep, setNewPasswordStep] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  
  const onSubmitForm = (data) => {
    var role = "";
    var status = "";

    setLoading(true);
    setErrorMessage("");
    setMessageText("");
    setUser(data.userName);
    setPassword(data.password);
    onSubmit(data)
      .then((resp) => {
        setLoading(false);
        if (resp.newPasswordForm != undefined) {
          setNewPasswordStep(true);
          return;
        }
        if (resp.verifyCodeForm != undefined) {
          setVerifyCodeForm(true);
          return;
        }
        if (resp.err != undefined) {
          console.log(resp.err);
          return;
        }
        const accessToken = resp.session.getAccessToken().getJwtToken();
        const refreshToken = resp.session.getRefreshToken().getToken();
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("account_type", loginUser+"_login");
        setCustmerDetails({ account_type: loginUser+"_login"});
        sessionStorage.setItem("userName", data.userName);
        for (var i = 0; i < resp.result.length; i++) {
          if (resp.result[i].getName() == "custom:role") {
            role = resp.result[i].getValue();
            sessionStorage.setItem("roleType", role);
          }
          if (resp.result[i].getName() === "email") {
            sessionStorage.setItem("email", resp.result[i].getValue());
          }
          if (resp.result[i].getName() === "custom:status") {
            status = resp.result[i].getValue();
            sessionStorage.setItem("status", resp.result[i].getValue());
          }
        }
        if (role === "customer" || role === "agent" || role === "admin") {
          if (status === "active") {
            setOpen(false);
            window.location.reload();
          }
        } else {
          setErrorMessage("Invalid user or password.");
          setVerifyCodeForm(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Catch block error:", error);
        if (error.message === "Network Error") {
          setErrorMessage("System is under maintenance. Please try again.");
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const onFinishForm = (data) => {
    var role = "";
    var status = "";
    setLoading(true);
    setErrorMessage("");
    data = { ...data, userName: user, password: password };
    console.log(data);
    onFinish(data)
      .then((resp) => {
        if (resp.err != undefined) {
          console.log(resp.err);
          return;
        }
        const accessToken = resp.session.getAccessToken().getJwtToken();
        const refreshToken = resp.session.getRefreshToken().getToken();
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("account_type", loginUser+"_login");
        setCustmerDetails({ account_type: loginUser+"_login"});
        sessionStorage.setItem("userName", data.userName);
        for (var i = 0; i < resp.result.length; i++) {
          if (resp.result[i].getName() == "custom:role") {
            role = resp.result[i].getValue();
            sessionStorage.setItem("roleType", role);
          }
          if (resp.result[i].getName() === "email") {
            sessionStorage.setItem("email", resp.result[i].getValue());
          }
          if (resp.result[i].getName() === "custom:status") {
            status = resp.result[i].getValue();
            sessionStorage.setItem("status", resp.result[i].getValue());
          }
        }
        if (role === "customer" || role === "agent" || role === "admin") {
          if (status === "active") {
            setOpen(false);
            window.location.reload();
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("account_type");
          setErrorMessage("Invalid Verification Code.");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error == "Error: Network Error") {
          setErrorMessage("System is under maintenance.Please try again.");
        } else {
          setErrorMessage(error.message);
        }
        setLoading(false);
      });
  };

  const onNewPasswordForm = (data) => {
    setLoading(true);
    setErrorMessage("");
    data = { ...data, userName: user, password: password };
    if(data.newPassword != data.confirmPassword) {
      setLoading(false);
      setErrorMessage("The new password does not match the confirm password.");
      return;
    }
    handleNewPassword(data)
      .then(() => {
        setLoading(false);
        setNewPasswordStep(false);
        setMessageText("Password changed successfully");
      })
      .catch((error) => {
        if (error == "Error: Network Error") {
          setErrorMessage("System is under maintenance.Please try again.");
        } else {
          setErrorMessage(error.message);
        }
        setLoading(false);
      });
  };

  const onFinishFailed = () => {};

  const onCancel = () => {
    setErrorMessage("");
    setLoading(false);
    setVerifyCodeForm(false);
  };

  const onModalClosed = () => {
    setErrorMessage("");
    setLoading(false);
    setOpen(false);
  };

  const agentRedirect=()=>{
    navigate('/agentregistration',{state:{loginUser}})
  }
  return (
    <>
      <CustomModal>
        <Modal open={open} onCancel={onModalClosed} footer={null}>
          <CustomModalContent>
          <br/><img  src={novoLogo} />
            <p className="sigin-title">
            <br/> Signup as {" "}
              {loginUser == "agent" ? (
                <span>agent</span>
              ) : (
                <span>customer</span>
              )}
            </p>
            <p className="sigintext">
              Get started today by entering just a few details
            </p>
            <button className="setupbtn" onClick={agentRedirect}>
              {loginUser == "agent" ? (
                <span>Agent</span>
              ) : (
                <span>Customer</span>
              )} {" "}
              Registration
            </button>
            <p className="orsection">or</p>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {messageText && <p className="email-subtext">{messageText}</p>}
            <div>
              {!verifyCodeForm ? (
                newPasswordStep ? (
                  <NewPasswordForm
                    loading={loading}
                    onNewPasswordForm={onNewPasswordForm}
                    onFinishFailed={onFinishFailed}
                  />
                ) : (
                  <LoginForm
                    loading={loading}
                    onSubmitForm={onSubmitForm}
                    onFinishFailed={onFinishFailed}
                  />
                )
              ) : (
                <VerificationCodeForm
                  loading={loading}
                  onFinishForm={onFinishForm}
                  onFinishFailed={onFinishFailed}
                  cancel={onCancel}
                ></VerificationCodeForm>
              )}
              <p
                className="forgot-password-btn"
                onClick={() => {
                  setOpen(false);
                  setForgotPasswordOpen(true);
                }}
              >
                Forgot password
              </p>
            </div>
          </CustomModalContent>
        </Modal>
      </CustomModal>
      <ForgotPassword
        open={forgotPasswordOpen}
        setPassword={setForgotPasswordOpen}
        setOpen={setOpen}
        setMsgText = {setMessageText}
      />
    </>
  );
};
export default LoginModal;
