import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row } from "antd";
import { Container } from "styles/pages/Login";
import {
    SearchQuoteTitle,
    SearchQuoteSection,
    FormSection,
} from "styles/pages/SearchQuote";
import TableComponent from "components/Table";
import FormControl from "components/FormControl/FormInput";
import FormDatePicker from "components/FormControl/FormDatePicker";
import SearchQuoteConfig from './dummyData'
import useMetaData from "context/metaData";

const SearchQuote = () => {
    const navigate = useNavigate();
    const {theme} = useMetaData();
    const editQuote = (route, data) => {
        navigate(route, {
            state: data
        })
    }
    
    const {columns,dataSource} = SearchQuoteConfig(editQuote)
    return (
        <SearchQuoteSection theme={theme}>
            <Container>
                <div className="topsection">
                    <div>
                        <SearchQuoteTitle theme={theme}>
                            Find your quotes <br />
                            within minutes.
                        </SearchQuoteTitle>
                        <p className="subtext">
                        Get your clients the coverage they need with quick, accurate quotes!
                        </p>
                    </div>
                </div>
                <FormSection theme={theme}>
                    <Card>
                        <Form layout="vertical">
                            
                            <Row gutter={16}>
                                <Col span={6}>
                                    <FormControl label="Customer ID:" name="customerId" placeholder="" />
                                </Col>
                                <Col span={6}>
                                    <FormControl label="Quote Number:" name="quoteNo" placeholder="" />
                                </Col>
                                <Col span={6}>
                                    <FormControl label="First Name:" name="firstName" placeholder="" />
                                </Col>
                                <Col span={6}>
                                    <FormControl label="Last Name:" name="lastName" placeholder="" />
                                </Col>
                                <Col span={6}>
                                    <FormDatePicker className="form-controls" label="Expired Date:" id='expiredDate' type="text" required={true} />
                                </Col>
                                <Col span={6} className="form-container">
                                    <FormControl label="Insured Name:" name="insuredName" placeholder="" />
                                </Col>
                                <Col span={12}>
                                    <div className="search-btn-box">
                                        <Button
                                            color="default"
                                            variant="solid"
                                            className="search-btn"
                                        >
                                            <SearchOutlined /> Search
                                        </Button>
                                        <Button color="default" variant="solid" className="resetbtn">
                                            <svg
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2.94379 4.47549C3.55693 4.47549 4.1169 4.47549 4.67628 4.47549C5.01593 4.47549 5.35617 4.46543 5.69522 4.47941C6.41232 4.50847 6.81458 5.10765 6.54877 5.74148C6.40464 6.08523 6.11638 6.26017 5.74011 6.26241C4.12281 6.27135 2.50491 6.27135 0.887601 6.26297C0.411506 6.26073 0.0883987 5.96785 0.0181067 5.52182C0.00629288 5.44636 0.000976673 5.36867 0.000385984 5.29266C-0.000795395 3.8534 -0.V22138608 2.41358 0.000385984 0.974327C0.V22156736 0.485818 0.208899 0.181758 0.614112 0.0565562C1.29518 -0.153603 1.88764 0.241564 1.89295 0.916757C1.89827 1.57965 1.89414 2.24255 1.89414 2.93563C1.95025 2.89874 1.9851 2.87974 2.01523 2.85514C6.20203 -0.572804 12.4332 0.545065 15.0334 5.17416C16.9071 8.50933 16.1652 13.2837 11.8449 15.8353C8.33915 17.9061 4.05842 17.0599 1.43694 14.5313C1.06126 14.1691 0.729887 13.7622 0.40619 13.3558C0.147468 13.0317 0.163416 12.6113 0.393194 12.3173C0.634196 12.0088 1.09552 11.8618 1.47888 11.9691C1.71988 12.0362 1.8776 12.1938 2.01523 12.3827C2.99991 13.732 4.32187 14.6218 6.01951 14.9907C9.8454 15.8219 12.9601 13.594 13.9011 10.5662C14.7706 7.76874 13.4681 4.87122 10.7143 3.41464C8.10878 2.03686 5.1317 2.54102 3.05602 4.35979C3.03003 4.38271 3.00818 4.40954 2.94438 4.47605L2.94379 4.47549Z"
                                                    fill="black"
                                                />
                                            </svg>
                                            Reset
                                        </Button>

                                    </div>

                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </FormSection>

                <div>
                    <TableComponent title='Search Result' columns={columns} data={dataSource} />
                </div>
                <div>
                    <TableComponent title='Pending issuance list' columns={columns} data={dataSource} />
                </div>
            </Container>
        </SearchQuoteSection>
    );
};

export default SearchQuote;
