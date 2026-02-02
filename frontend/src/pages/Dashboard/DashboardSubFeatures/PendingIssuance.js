import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "styles/pages/Login";
import TableComponent from "components/Table";
import { columns,dataSource } from "pages/Dashboard/DashboardSubFeatures/newDummyData";
import useMetaData from "context/metaData";
import {
  SearchPolicyTitle,
  SearchPolicySection,
  FormSection,
} from "styles/pages/SearchPolicy";

const PendingIssuance = () => {
  const {theme}=useMetaData();
  const navigate = useNavigate();
  const editQuote = (route, data) => {
    navigate(route, {
        state: data
    })
}
  return (
    <SearchPolicySection theme={theme}>
      <Container theme={theme}>
        <div className="topsection">
          <div>
            <SearchPolicyTitle theme={theme}>
              Policy Transactions <br />
            </SearchPolicyTitle>
          </div>
        </div>
        <FormSection theme={theme}>
           <TableComponent theme={theme} title="Results" columns={columns(editQuote)} data={dataSource} />
        </FormSection>
      </Container>
    </SearchPolicySection>
  );
};

export default PendingIssuance;
