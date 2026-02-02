import React, { useState } from 'react'
import { FormSection } from "styles/pages/Expirereport";
import { Container } from "styles/pages/CreateQuote";
import { Col, Row, Table } from "antd";
import FormControl from "../../components/FormControl/FormInput";
import print from '../../assets/images/print.svg';
import Effectivedate from '../../assets/images/Effectivedate.svg';
import exportfile from '../../assets/images/exportfile.svg';
import { TableContainer } from 'styles/components/TableComponent';
import { exportCSV } from 'utils/helper';
import {initialValues,dataSource,columns} from './dummyData';
import useMetaData from "context/metaData";

const Expiringreport = () => {
    const {isEditable} = false
    const {theme} = useMetaData();

    const handlePrint = () => {
        window.print();
    };

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter);
        setTableParams({
            pagination,
            filters,
            sorter
        })
    }
    return (
        <Container theme={theme}>
            <FormSection theme={theme}>
                <div className="container-box">
                    <div className="step-content-box"> <img src={Effectivedate} alt="Exavalu" title="Exavalu" className='logobox-date' />
                        <div>
                            <button type="submit" className="logo-button" onClick={handlePrint}>
                                <img src={print} alt="Exavalu" title="Exavalu" className="logobox" />
                            </button>
                            <button type="submit" className="logo-button" onClick={() => exportCSV(columns, dataSource, "expiring_report.csv")}>
                                <img src={exportfile} alt="Exavalu" title="Exavalu" className="logobox" />
                            </button>
                        </div>
                    </div>
                    <Row gutter={16}>
                        <Col span={10}>
                            <div className='Heading-label'>E-Signature Report</div>
                            <div className="subtext mt5">This information will help the agent better understand your needs and objectives.</div>
                        </Col>
                        <Col span={14}>
                            <Row gutter={16}>
                                <Col span={10}>
                                    <FormControl
                                        label="Begin Date"
                                        name="beginDate"
                                        type="text"
                                        disabled={!isEditable}
                                        defaultValue={initialValues.beginDate}
                                    />
                                </Col>
                                <Col span={10}>
                                    <FormControl
                                        label="End Date"
                                        name="endDate"
                                        type="text"
                                        disabled={!isEditable}
                                        defaultValue={initialValues.endDate}
                                    />
                                </Col>
                                <Col span={10}>
                                    <FormControl
                                        label="Include Renewal Policy"
                                        name="includerenewalpolicy"
                                        type="text"
                                        disabled={!isEditable}
                                        defaultValue={initialValues.includerenewalpolicy}
                                    />
                                </Col>
                                <Col span={10}>
                                    <FormControl
                                        label="Agency Name"
                                        name="agencyName"
                                        type="text"
                                        disabled={!isEditable}
                                        defaultValue={initialValues.agencyName}
                                    />
                                </Col>
                                <Col span={10}>
                                    <FormControl
                                        label="Agency #"
                                        name="agency"
                                        type="text"
                                        disabled={!isEditable}
                                        defaultValue={initialValues.agency}
                                    />
                                </Col>
                                <Col span={10}>
                                    <FormControl
                                        label="Total Records"
                                        name="totalrecords"
                                        type="text"
                                        disabled={!isEditable}
                                        defaultValue={initialValues.totalRecords}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <TableContainer theme={theme}>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={tableParams.pagination}
                            onChange={handleTableChange}
                        />
                    </TableContainer>
                </div>
            </FormSection>
        </Container>
    )
}

export default Expiringreport
