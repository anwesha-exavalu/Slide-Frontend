import React, { useEffect, useState } from "react";
import Bindlosshistoryinfopopup from "./Bindlosshistoryinfopopup/Bindlosshistoryinfopopup";
import TableComponent from "components/Table";
import { StyledLink, StyledTypographyAdditionalInfo } from "styles/pages/Bind";
import { losscolumns } from './bindDummyData'

const Losshistory = (data, driverData = []) => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (data.data.length > 0) {
      console.log("entered")
      var tabData = data.data.map((item, index) => ({
        id: index,
        ...item,
      }));

      setTableData(tabData);
    }
    console.log("entered outside if",data.data.length)
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
    <>
      <StyledLink
        underline
        onClick={handleAdditionalInfoModalOpen}
      >
        <StyledTypographyAdditionalInfo>
          Add Loss History
        </StyledTypographyAdditionalInfo>
      </StyledLink>
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
    </>
  )
}

export default Losshistory
