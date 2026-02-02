import React, { useState } from "react";
import { Button } from "antd";
import { Container } from "styles/pages/Login";
import { CommissionStatementsSection,CommissionStatementsWapper } from "styles/pages/CommissionStatements";
import TableComponent from "components/Table";
import CommissionTableConfig from "./dummyData";
import { exportCSV } from 'utils/helper';

const CommissionStatements = () => {
    const [searchInput, setSearchInput] = useState({});
    const [sortedInfo, setSortedInfo] = useState({ order: null, columnKey: null });
    
    
    const { csDataSource,csdDataSource,csColumns,csdColumns } = CommissionTableConfig(searchInput, setSearchInput,sortedInfo, setSortedInfo);
    return (
        <CommissionStatementsSection>
            <Container>
                <CommissionStatementsWapper>
                    <TableComponent title='Commission Statement' columns={csColumns} data={csDataSource} />
                </CommissionStatementsWapper>
                <div>
                    <TableComponent title='Commission Statement Details' columns={csdColumns} data={csdDataSource} isPagination={false} extraContentAfter={
                        <Button type="primary" className="btn-export" onClick={() => exportCSV(csdColumns, csdDataSource, "commission_statements.csv")}>
                            Export
                        </Button>
                    } />
                </div>
            </Container>
        </CommissionStatementsSection>
    );
};

export default CommissionStatements;
