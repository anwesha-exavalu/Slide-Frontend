import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "styles/pages/Login";
import TableComponent from "components/Table";
import { columns,dataSource } from "pages/Dashboard/DashboardSubFeatures/newDummyData";
import {
  SearchPolicyTitle,
  SearchPolicySection,
  FormSection,
} from "styles/pages/SearchPolicy";
import useMetaData from "context/metaData";


const ExpiringPolicies = () => {
  const {theme}=useMetaData();
  const navigate = useNavigate();
  const editQuote = (route, data, pageType) => {
    const newRoute = pageType === "expiringPolicies" ? "/start-transaction" : route;
    navigate(newRoute, {
      state: data,
    });
  };

  return (
    <SearchPolicySection theme={theme}>
      <Container>
        <div className="topsection">
          <div>
            <SearchPolicyTitle theme={theme}>
            Policies In Force <br />
            </SearchPolicyTitle>
          </div>
        </div>
        <FormSection theme={theme}>
           <TableComponent  theme={theme} title="Results" columns={columns(editQuote,"expiringPolicies")} data={dataSource} />
        </FormSection>
      </Container>
    </SearchPolicySection>
  );
};

export default ExpiringPolicies;