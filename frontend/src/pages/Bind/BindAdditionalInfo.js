import React, { useEffect, useState } from "react";
import BindAdditionalInfoPopUp from "./BindAdditionalInfoPopUp/BindAdditionalInfoPopUp";
import TableComponent from "components/Table";
import { StyledLink, StyledTypographyAdditionalInfo } from "styles/pages/Bind";
import {columns} from './bindDummyData'

const BindAdditionalInfo = ({ data,vehicleData=[] }) => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
console.log("data",data)
  useEffect(() => {
    if (data.length > 0) {
      var tabData = data.map((item, index) => ({
        id: index,
        ...item,
      }));

      setTableData(tabData);
    }
  }, [data]);

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
          Add more additional interest
        </StyledTypographyAdditionalInfo>
      </StyledLink>
      <TableComponent
        title={"Additional Interest"}
        columns={columns}
        data={tableData}
      />
      <BindAdditionalInfoPopUp
        isModalOpen={modalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        vehicleData={vehicleData}
      />
    </>
  );
};

export default BindAdditionalInfo;
