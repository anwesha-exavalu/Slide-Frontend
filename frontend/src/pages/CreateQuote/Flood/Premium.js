import React, {useState} from 'react';
import TableComponent from "components/Table";
import 'antd/dist/reset.css';
// import { Container } from "styles/pages/CreateQuote";
import SuccessMessageModal from 'components/PopupModal/SuccessMessageModal';
import SaveApplication from "assets/svg/saveApplication.svg";
import PremiumTableConfig from './premiumDummyData';

const Premium = ({ open, setOpen, theme }) => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const { columns, data } = PremiumTableConfig(selectedRowKey, setSelectedRowKey);

  return (
    // <Container>
    <div>
      <TableComponent theme={theme} title="Premium by Deductible Combination" columns={columns} data={data} />
      <SuccessMessageModal open={open} setOpen={setOpen} icon={SaveApplication} message={'Your quote is complete and saved'}/>
        
    </div>
    // </Container>
  );
};

export default Premium;