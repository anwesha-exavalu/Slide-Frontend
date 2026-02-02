import React from 'react';
import { Modal} from "antd";
import { CustomModalContent } from 'styles/pages/Payment';
import { useNavigate } from 'react-router-dom';

const SuccessAgentRegModal = ({ open, message, icon}) => {
  const navigate = useNavigate();
const closepopup =()=>{
  navigate('/')
}
  return (
    <div>
      <div>
      <Modal open={open} onCancel={closepopup} footer={null}>
      <CustomModalContent>
        <img src={icon}></img>
        <p className='sigin-title'>{message}</p>
      </CustomModalContent>
      </Modal>
    </div>
    </div>
  );
}

export default SuccessAgentRegModal;
