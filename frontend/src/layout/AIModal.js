import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Insights from './Insights';
import Inferences from './Inferences';
 const AIModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} justify="center">
        Click here!
      </Button>
      <Modal
        title=""
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
         <Insights  id="980d35d0-5f48-467b-54e5-90fb5bd3fb7d"/>
         <Inferences id="980d35d0-5f48-467b-54e5-90fb5bd3fb7d" />
      </Modal>
    </>
  );
};

export default AIModal;
