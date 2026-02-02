import React, { useEffect, useState } from "react";
import Bindlosshistoryinfopopup from "pages/Bind/Bindlosshistoryinfopopup/Bindlosshistoryinfopopup";
import TableComponent from "components/Table";
import { StyledLink, StyledTypographyAdditionalInfo } from "styles/pages/Bind";
import { losscolumns } from 'pages/Bind/bindDummyData'
import { PolicyDashboardDescription } from "styles/pages/PolicyDetails";
import { Card, Form } from "antd";
import useMetaData from "context/metaData";

const LossHistory = ({data=[], driverData=[], isEditable}) => {
  const {theme}=useMetaData();
    const [modalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      console.log("entered")
      var tabData = data.data.map((item, index) => ({
        id: index,
        ...item,
      }));

      setTableData(tabData);
    }
    console.log("entered outside if", data.length)
  }, [data]);
console.log("data",data)
  const handleOk = (e) => {
    console.log("The event is ", e);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAdditionalInfoModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <PolicyDashboardDescription theme={theme}>
      <Card className="ant-card-description">
        <h3>Loss History</h3>
        <Form
          name="coverage"
          layout="horizontal"
          className="form-container form-width policyform"
        >
        {isEditable && <StyledLink underline onClick={handleAdditionalInfoModalOpen}>
          <StyledTypographyAdditionalInfo>
            Add Loss History
          </StyledTypographyAdditionalInfo>
        </StyledLink>
        }

      <TableComponent
        title={"Loss History"}
        columns={losscolumns}
        data={tableData}
      />
      <Bindlosshistoryinfopopup
        isModalOpen={modalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        driverData={driverData}
      />
        </Form>
      </Card>
    </PolicyDashboardDescription>
  )
}

export default LossHistory