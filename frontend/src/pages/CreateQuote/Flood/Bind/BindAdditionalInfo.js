import React, { useEffect, useState } from "react";
import BindAdditionalInfoPopUp from "./BindAdditionalInfoPopUp/BindAdditionalInfoPopUp";
import TableComponent from "components/Table";
import { StyledLink, StyledTypographyAdditionalInfo } from "styles/pages/Bind";
import {columns} from './bindDummyData'

const BindAdditionalInfo = ({ data,theme }) => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([{
    "lendertype": "firstmortgage",
    "nameone": "Tanmay",
    "nametwo": "sardar",
    "loanno": "889877877",
    "lenderclause": [
        "ATIMA"
    ],
    "billtolender": "No",
    "additionalinfo": "Payee",
    "financialinterest": "select",
    "address1": "123 william st",
    "country": "USA",
    "citystatezip": "61606",
    "phone": "78377373",
    "fax": "2983883"
}]);

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
      theme={theme}
        title={"Additional Interest"}
        columns={columns}
        data={tableData}
      />
      <BindAdditionalInfoPopUp
        isModalOpen={modalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  );
};

export default BindAdditionalInfo;
