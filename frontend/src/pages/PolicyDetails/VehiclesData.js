import React from 'react'
import { Card, Form, Row, Col } from 'antd';
import FormControl from 'components/FormControl/FormInput';
import { PolicyDashboardDescription } from 'styles/pages/PolicyDetails';
import useMetaData from "context/metaData";

const Vehicles = ({ isEditable }) => {
    const {theme}=useMetaData();

    const vehicleData = [
        {
            "vin": "WAUKEAFM8DA033285",
            "model_year": "2019",
            "make": "CHEVEROLET",
            "model": "IMPALAIS"
        },
        {
            "vin": "JH4DB1660LS017594",
            "model_year": "2017",
            "make": "FORD",
            "model": "ESCAPE SE"
        }
    ]
  
    return (
        <PolicyDashboardDescription theme={theme}>
            <Card className="ant-card-description">
                <h3>Vehicles</h3>
                <Form
                    name="vehicleSummary"
                    layout="horizontal"
                    className='form-width policyform form-container'
                >
                    <Row gutter={24}>
                        {vehicleData.map((veh, index) => (
                            <Col key={index} span={24}>
                                <Row gutter={24} >
                                    <Col >
                                       <FormControl disabled={!isEditable} defaultValue={index+1} label="Vehicle Number" />
                                    </Col>
                                    <Col>
                                       <FormControl disabled={!isEditable} defaultValue={veh?.vin} label="VIN" />
                                    </Col>
                                    <Col>
                                       <FormControl disabled={!isEditable} defaultValue={veh?.model_year} label="Model Year" />
                                    </Col>
                                    <Col>
                                       <FormControl disabled={!isEditable} defaultValue={veh?.make} label="Make" />
                                    </Col>
                                    <Col>
                                       <FormControl disabled={!isEditable} defaultValue={veh?.model} label="Model" />
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
export default Vehicles