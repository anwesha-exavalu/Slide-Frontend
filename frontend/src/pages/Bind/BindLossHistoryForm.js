import { Col,Form,Input } from "antd";
import DropdownSelect from "components/FormControl/DropdownSelect";
import FormInput from "components/FormControl/FormInput";
import FormDatePicker from 'components/FormControl/FormDatePicker';
import React, { useState , useEffect } from "react";
import {
  LabelPadding,
  StyledRowBind,
  StyledRowBindTop,
} from "styles/pages/Bind";
import bindDropDown from "assets/files/bind.csv";
import Papa from "papaparse";
import { setDropdownVals } from 'utils/helper';

const filesData = {};
const BindLossHistoryForm = ({driverData=[]}) => {
  const [valueSelectLendType, setValueSelectLendType] = useState();
  const [dropDownOpts, setdropDownOpts] = useState([]);

  const commonConfig = { delimiter: "," };
  console.log("driverData",driverData)
  useEffect(() => {
    Papa.parse(bindDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
        console.log("results",results)
      },
    });
  }, []);

  const onChangeSelectLendType = (e) => {
    setValueSelectLendType(e);
  };
  // const safeDriverData = Array.isArray(driverData) ? driverData : [];
  // const firstname = safeDriverData.length > 0 ? safeDriverData[0]?.firstname : '';
  // const driverOptions = safeDriverData.map((driver, index) => ({
  //   label: driver.firstname,
  //   value: `driver${index + 1}`,
  // }));
  const statelist={
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  }
  const stateOptions = Object.entries(statelist).map(([value, label]) => ({
    value,
    label,
  }));
  return (
    <>
      <StyledRowBindTop gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={12}>
          <FormInput
            label="Number"
            className="form-controls"
            name={["losshistoryInfo", "Number"]}
            type="text"
            required={true}
          />
        </Col>
        <Col span={12}>
          <LabelPadding>
            <DropdownSelect
              label="CauseofLoss"
              value={valueSelectLendType}
              onChange={onChangeSelectLendType}
              layout="vertical"
              name={["losshistoryInfo", "losecause"]}
              options={
                dropDownOpts?.CauseofLoss|| []
              }
              required={true}
            />
          </LabelPadding>
        </Col>
      </StyledRowBindTop>
      <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        
      <Col span={12}>
        <FormDatePicker  label="Loss Date"  name={["losshistoryInfo", "lossdate"]} type="text"  layout="vertical" required={true} />
        </Col>
        <Col span={12}>
        <DropdownSelect
         label="Drivername"
          name={["losshistoryInfo", "drivername"]}
          layout="vertical"
          options={dropDownOpts?.DriverName|| []}
         //onChange={onChangeCheckBox}
        required
        />
        </Col>
      </StyledRowBind>
        <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          
        <Col span={12}>
        <DropdownSelect label="Driver License State"name={["losshistoryInfo", "Driverlicensestate"]} options={stateOptions} layout="vertical" required={true}/>
        </Col>
          <Col span={12}>
            <FormInput
              label="Loss Amount"
              className="form-controls"
              name={["losshistoryInfo", "Lossamount"]}
              type="text"
              layout="vertical"
              required={true}
            />
          </Col>
          
        </StyledRowBind>
        <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <FormInput
              label="Driver License Number"
              className="form-controls"
              name={["losshistoryInfo", "Driverlicensenumber"]}
              type="text"
              required={true}
            />
            </Col>
          <Col span={12}>
          <FormInput
              label="Policy Number"
              className="form-controls"
              name={["losshistoryInfo", "policynumber"]}
              type="text"
              required={true}
            />
            </Col>
        </StyledRowBind>
        <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          
        <Col span={12}>
            <FormInput
              label="Vin"
              className="form-controls"
              name={["losshistoryInfo", "vin"]}
              type="text"
              required={true}
            />
          </Col>
        <Col span={24}>
        <Form.Item
        label={<label style={{ color: '#adacb0' }}>Loss Description</label>}
            
            name={["losshistoryInfo", "Lossdescription"]} layout="vertical"
        >
            <Input.TextArea className="formtextlabel" />
        </Form.Item>
       </Col>
        </StyledRowBind>
    </>
  );
};

export default BindLossHistoryForm;
