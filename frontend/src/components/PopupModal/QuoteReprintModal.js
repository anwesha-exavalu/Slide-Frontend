import React from 'react';
import { Button, Modal} from "antd";
import { CustomModalContent } from 'styles/pages/Payment';
import FormInput from 'components/FormControl/FormInput';
import samplePdf from "assets/files/sample.pdf";
import { downloadPDf } from 'utils/helper';

const QuoteReprintModal = ({ open, setOpen}) => {
  return (
    <div>
      
      <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
      <CustomModalContent>
        <p className='modal-heading'>Reprint Quote</p>
        <FormInput layout='horizontal' label='Quote Number'></FormInput>
        <Button className='printButton'  onClick={() => downloadPDf("policy.pdf", samplePdf)}>Print</Button>
      </CustomModalContent>
      </Modal>
   
    </div>
  );
}

export default QuoteReprintModal;
