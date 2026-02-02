import React from 'react'
import { Card, Form, Row, Col } from 'antd';
import FormControl from 'components/FormControl/FormInput';
import { PolicyDashboardDescription } from 'styles/pages/PolicyDetails';
import { initialValues } from './dummyData';
import useMetaData from "context/metaData";

const Coverage = ({ isEditable }) => {
    const {theme}=useMetaData();

    return (
        <PolicyDashboardDescription theme={theme}>
            <Card className="ant-card-description">
                <h3>Coverage</h3>
                <Form
                    name="coverage"
                    initialValues={initialValues}
                    layout="horizontal"
                    className='form-container form-width policyform'
                >
                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls " label="Building Deductible" name="buildingDeductible" type="text" disabled={!isEditable} required={false} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls " label="Contents Deductible" name="contentDeductible" type="text" disabled={!isEditable} required={false} />
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={12}>
                            <FormControl className="form-controls " label="Total Coverage Building" name="totalCoveragebuilding" type="text" disabled={!isEditable} required={false} />
                        </Col>
                        <Col span={12}>
                            <FormControl className="form-controls " label="Total Coverage Contents" name="totalCoverageContents" type="text" disabled={!isEditable} required={false} />
                        </Col>
                    </Row>
                </Form>
            </Card>
        </PolicyDashboardDescription>
    )
}
export default Coverage