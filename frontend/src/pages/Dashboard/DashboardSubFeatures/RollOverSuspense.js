import React from "react";
import { Container } from "styles/pages/Login";
import { useNavigate } from "react-router-dom";
import TableComponent from "components/Table";
import { columns,dataSource } from "pages/Dashboard/DashboardSubFeatures/newDummyData";

import {
  SearchPolicyTitle,
  SearchPolicySection,
  FormSection,
} from "styles/pages/SearchPolicy";
import useMetaData from "context/metaData";

const RollOverSuspense = () => {
  const {theme}=useMetaData();
  const navigate = useNavigate();
  const editQuote = (route, data, pageType) => {
    const newRoute = pageType === "rolloverSuspense" ? "/start-transaction" : route;
    navigate(newRoute, {
      state: data,
    });
  };

  return (
    <SearchPolicySection theme={theme}>
      <Container theme={theme}>
        <div className="topsection">
          <div>
            <SearchPolicyTitle theme={theme}>
            Unpaid Cancels <br />
            </SearchPolicyTitle>
          </div>
        </div>
        <FormSection theme={theme}>
           <TableComponent theme={theme} title="Results" columns={columns(editQuote,"rolloverSuspense")} data={dataSource} />
        </FormSection>
      </Container>
    </SearchPolicySection>
  );
};

export default RollOverSuspense;
