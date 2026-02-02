import React from "react";
import { Button } from "antd";
import { Container } from "styles/pages/Login";
import TableComponent from "components/Table";
import { columns, dataSource } from "./dummyData";
import { AttachButton } from "styles/pages/Documents";
import useMetaData from "context/metaData"

import { SearchPolicySection,SearchPolicyTitle, FormSection } from "styles/pages/SearchPolicy";
import { useNavigate } from "react-router-dom";

const SearchClaims = () => {
  const {theme} = useMetaData();
  const navigate = useNavigate()
  const redirectFileClaim=()=>{
    navigate('/claim')
  }
  return (
    <SearchPolicySection theme={theme}>
      <Container>
        <div className="topsection">
          <div className="search-title">
            <SearchPolicyTitle theme={theme}>
              Claims
            </SearchPolicyTitle>
            
            <AttachButton >
            <Button className='attachButton' style={{marginTop:'10px'}} onClick={redirectFileClaim}>File Claim</Button>
          </AttachButton>
          </div>
          <p className="subtext">
          Track your claim status here and stay up-to-date every step of the way.
                        </p>
        </div>
        <FormSection theme={theme}>
          <TableComponent theme={theme} title="List Of All Open And Closed Claims" columns={columns} data={dataSource}/>
        </FormSection>
      </Container>
    </SearchPolicySection>
  );
};

export default SearchClaims;
