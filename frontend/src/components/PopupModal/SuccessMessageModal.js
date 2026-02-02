import React from 'react';
import { Modal} from "antd";
import { CustomModalContent } from 'styles/pages/Payment';

const SuccessMessageModal = ({ open, setOpen, message, icon}) => {
  return (
    <div>
      <div>
      <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
      <CustomModalContent>
        <img src={icon}></img>
        <p className='sigin-title'>{message}</p>
      </CustomModalContent>
      </Modal>
    </div>
    </div>
  );
}

export default SuccessMessageModal;
