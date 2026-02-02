import React from 'react'
import { Card, Form, Row, Col } from 'antd';
import { PolicyDashboardDescription } from 'styles/pages/PolicyDetails';
import FormControl from "components/FormControl/FormInput";
import useMetaData from "context/metaData";

const Drivers = ({ isEditable }) => {
	const {theme}=useMetaData();

    const drivers = [
        {
            firstName: "Driver 1",
            lastName: "",
            relationToUse: "Son",
            dob: "21/03/1991",
            licenseStatus: "Valid",
            licenseNumber: "98332XVEH909",
            licenseState: "Alkasa",
            sr22: "Yes"
        }
    ]

    return (
        <PolicyDashboardDescription theme={theme}>
            <Card className="ant-card-description">
                <h3>Drivers</h3>
                <Form
                    name="vehicleSummary"
                    layout="horizontal"
                    className='form-width policyform form-container'
                >
                    <Row gutter={24}>
                        {drivers.map((veh, index) => (
                            <Col key={index} span={24}>
                                <Row gutter={24} >
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.firstName} label="First Name" />
                                    </Col>
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.lastName} label="Last Name" />
                                    </Col>
                                </Row>
                                <Row gutter={24} >
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.relationToUse} label="Relationship To Insured Use" />
                                    </Col>
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.dob} label="Birth Date" />
                                    </Col>
                                </Row>
                                <Row gutter={24} >
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.licenseStatus} label="License Status" />
                                    </Col>
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.licenseNumber} label="License Number" />
                                    </Col>
                                </Row>
                                <Row gutter={24} >
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.licenseState} label="License State" />
                                    </Col>
                                    <Col>
                                        <FormControl className="form-controls" disabled={!isEditable} defaultValue={veh?.sr22} label="SR22" />
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </Form>
            </Card>
        </PolicyDashboardDescription>
    )
}
export default Drivers