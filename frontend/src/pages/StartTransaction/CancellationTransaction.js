import { Row, Col } from "antd";
import React , {useState, useEffect}from "react";
import DropdownSelect from "components/FormControl/DropdownSelect";
import FormInput from "components/FormControl/FormInput";
import cancellationDropDown from "assets/files/cancellationTransaction.csv";
import Papa from "papaparse";
import { setDropdownVals } from 'utils/helper';

const filesData = {};

const Cancellation = () => {
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };

  useEffect(() => {
    Papa.parse(cancellationDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);

  return (
    <>
      <Row>
        <Col offset={2} span={10}>
          <DropdownSelect
            label="Cancellation Type"
            name="CancellationType"
            layout="vertical"
            options={dropDownOpts?.CancellationType || []}
            required={true}
            defaultValue="Select"
          />
        </Col>

        <Col offset={2} span={10}>
          <FormInput
            label="Reason"
            name="Reason"
            layout="vertical"
            options={dropDownOpts?.CancellationReason || []}
            required={true}
          />
        </Col>
      </Row>
      <Row>
          
        <Col offset={2} span={10}>
          <DropdownSelect
            label="Type"
            name="Type"
            layout="vertical"
            options={dropDownOpts?.CancellationReason || []}
            required={true}
            defaultValue="Select"
          />
        </Col>
      </Row>
    </>
  );
};

export default Cancellation;
