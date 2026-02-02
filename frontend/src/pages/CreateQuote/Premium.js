import React, { useState } from 'react';
import TableComponent from "components/Table";
import 'antd/dist/reset.css';
import SuccessMessageModal from 'components/PopupModal/SuccessMessageModal';
import SaveApplication from "assets/images/saveApplication.png";
import PremiumTableConfig from './premiumDummyData';

const Premium = ({ open, setOpen }) => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const { columns, data } = PremiumTableConfig(selectedRowKey, setSelectedRowKey);

  return (
    // <Container>
    <div>
      <TableComponent title="Premium by Deductible Combination" columns={columns} data={data} />
      <SuccessMessageModal open={open} setOpen={setOpen} icon={SaveApplication} message={'Your quote is complete and saved'}/>
        
    </div>
    // </Container>
  );
};

export default Premium;