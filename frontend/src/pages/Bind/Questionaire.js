import React,{useState,useEffect} from 'react'
import { FormSection } from "styles/pages/SearchQuote";
import { Container } from "styles/pages/CreateQuote";
import { Col, Row } from "antd";
import FormDatePicker from "components/FormControl/FormDatePicker";
import DropdownSelect from "components/FormControl/DropdownSelect";
import FormControl from "../../components/FormControl/FormInput";
import { setDropdownVals } from "utils/helper";
import bind from "assets/files/bind.csv";
import Papa from "papaparse";
import useMetaData from "context/metaData"
const Questionaire = ({driverData= []}) => {
  const {theme} = useMetaData();
    const filesData = {};
    const [dropDownOpts, setdropDownOpts] = useState([]);
    const commonConfig = { delimiter: "," };
    const firstname = driverData && driverData.length > 0 ? driverData[0]?.firstname : '';
    const driverOptions = driverData.map((driver, index) => ({
      label: driver.firstname,
      value: `driver${index + 1}`
    })).concat({
      label: 'Driver 1',
      value: 'driver 1'
    });
      
    useEffect(() => {
        Papa.parse(bind, {
          ...commonConfig,
          header: true,
          download: true,
          complete: (results) => {
            console.log("results",filesData)
            setDropdownVals(results, filesData);
            setdropDownOpts(filesData);
          },
        });
      }, []);
    return (
        <Container>
            <FormSection theme={theme}>
            <div className="container-box">
                <Row gutter={16}>
                <Col span={10}>
                <div className="Heading-label">Questionnaire</div>
                  <div className="subheading-label">
                  Have any accidents or moving violations for any drivers, including those involving a parked car or hit and run, in the past 3 years NOT been listed on the application?
                  </div>
                  </Col>
                  <Col span={14}>
                  <Row gutter={16}>
                  <Col span={12}>
                      <FormDatePicker
                        label="Accident Date"
                        name={"accidentdate"}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                        label="Description"
                        name="description"
                        type="text"
                        required={true}
                      />
                    </Col>
                    {/*<Col span={12}>
                      <FormControl
                        label="Accident voilation code"
                        name="accidentvoilationcode"
                        type="text"
                        required={true}
                      />
                    </Col>*/}
                    <Col span={12}>
                      <DropdownSelect
                        label="Associated driver"
                        name={"associateddriver"}
                        options={driverOptions}
                        required={true}
                        defaultValue={firstname}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <DropdownSelect
                        label="Purchased/Leased"
                        name={"purchasedleased"}
                        options={dropDownOpts?.PurchasedLeased || []}
                        required={true}
                        layout="vertical"
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                        label="Estimated Annual Mileage"
                        name="estimatedannualmileage"
                        type="text"
                        required={true}
                      />
                    </Col>
                    <Col span={12}>
                      <FormControl
                        label="Odometer Reading"
                        name="odometerreading"
                        type="text"
                        required={true}
                      />
                    </Col>
                    </Row>
                    </Col>
                </Row>
            </div>
            </FormSection>

        </Container>
    )
}

export default Questionaire
