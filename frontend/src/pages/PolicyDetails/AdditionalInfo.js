import React, { useEffect, useState } from "react";
import { Card, Form } from "antd";
import BindAdditionalInfoPopUp from "pages/Bind/BindAdditionalInfoPopUp/BindAdditionalInfoPopUp";
import TableComponent from "components/Table";
import { StyledLink, StyledTypographyAdditionalInfo } from "styles/pages/Bind";
import {columns} from 'pages/Bind/bindDummyData'
import { PolicyDashboardDescription } from "styles/pages/PolicyDetails";
import useMetaData from "context/metaData";

const AdditionalInfo = ({ data = [], vehicleData=[], isEditable }) => {
  const {theme}=useMetaData();
    const [modalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
 
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
    <PolicyDashboardDescription theme={theme}>
      <Card className="ant-card-description">
        <h3>Additional Information</h3>
        <Form
          name="coverage"
          layout="horizontal"
          className="form-container form-width policyform"
        >

          {isEditable && <StyledLink underline onClick={handleAdditionalInfoModalOpen}>
            <StyledTypographyAdditionalInfo>
              Add more additional interest
            </StyledTypographyAdditionalInfo>
          </StyledLink>
          }

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
        </Form>
      </Card>
    </PolicyDashboardDescription>
  );
};

export default AdditionalInfo;
