import React from 'react'
import { Card, Form, Row, Col } from 'antd';
import FormControl from 'components/FormControl/FormInput';
import { PolicyDashboardDescription } from 'styles/pages/PolicyDetails'
import useMetaData from 'context/metaData';


const Quetionaire = ({isEditable}) => {
    const {theme}=useMetaData();
  return (
    <PolicyDashboardDescription theme={theme}>
        <Card className="ant-card-description">
            <h3>Questionnaire</h3>
            <Form
                name="quetionaire"
                layout="horizontal"
                className='form-container form-width policyform'
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <FormControl defaultValue="Yes" className="form-controls" label="Have any accidents or moving violations for any drivers, including those involving a parked car or hit and run, in the past 3 years NOT been listed on the application?" name="ques1" type="text" disabled={!isEditable} required={true} />
                    </Col>
                    <Col span={12}>
                        <FormControl className="form-controls" defaultValue="13/09/2023" label="Accident Date" name="accidentDate" type="text" disabled={!isEditable} required={true} />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12}>
                        <FormControl className="form-controls"  defaultValue="Auto Doc" label="Description" name="description" type="text" disabled={!isEditable} required={true} />
                    </Col>

                    <Col span={12}>
                        <FormControl defaultValue="Driver 1" className="form-controls" label="Associated driver" name="associatedDriver" type="text" disabled={!isEditable} required={true} />
                    </Col>
                </Row>
            </Form>
        </Card>
    </PolicyDashboardDescription>
  )
}

export default Quetionaire