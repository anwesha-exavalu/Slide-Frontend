import { Row, Col } from "antd";
import DropdownSelect from "components/FormControl/DropdownSelect";
import FormCheckBox from "components/FormControl/FormCheckBox";
import FormInput from "components/FormControl/FormInput";
import FormRadio from "components/FormControl/FormRadio";
import React, { useState , useEffect } from "react";
import {
  FormLabelStyle,
  LabelPadding,
  RadioLabelSpan,
  StyledFormLabel,
  StyledRadioBind,
  StyledRowBind,
  StyledRowBindTop,
  StyledRowCheckbox,
} from "styles/pages/Bind";
import {BillToLenderOpts} from 'components/FormControl/radioOption'
import bindDropDown from "assets/files/bind.csv";
import Papa from "papaparse";
import { setDropdownVals } from 'utils/helper';

const filesData = {};

const BindAdditionalInfoForm = ({vehicleData=[]}) => {
  const [valueRadio, setValueRadio] = useState("");
  const [valueArrCheckBox, setValueArrCheckBox] = useState([]);
 // const [valueSelectFinInt, setValueSelectFinInt] = useState();
  const [valueSelectLendType, setValueSelectLendType] = useState();
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };
console.log("vehicleData",vehicleData)
  useEffect(() => {
    Papa.parse(bindDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };
  const onChangeCheckBox = (e) => {
    setValueArrCheckBox(e);
  };

  // const onChangeSelectFinInt = (e) => {
  //   setValueSelectFinInt(e);
  // };

  const onChangeSelectLendType = (e) => {
    setValueSelectLendType(e);
  };
  const financialInterestOptions = vehicleData.map(vehicle => ({
    label: `${vehicle.vin} - ${vehicle.make} ${vehicle.model}`,
    value: vehicle.vin // Using VIN as the value for the checkbox
  }));
  return (
    <>
      <StyledRowBindTop gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <LabelPadding>
            <DropdownSelect
              label="Lender Type"
              value={valueSelectLendType}
              onChange={onChangeSelectLendType}
              layout="vertical"
              name={["additionalInfo", "lendertype"]}
              options={
                dropDownOpts?.LenderType || []
              }
            />
          </LabelPadding>
        </Col>
        <Col span={12}>
          <FormInput
            label="Name One"
            className="form-controls"
            name={["additionalInfo", "nameone"]}
            type="text"
            required={false}
          />
        </Col>
      </StyledRowBindTop>
      <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <FormInput
            label="Name Two"
            className="form-controls"
            name={["additionalInfo", "nametwo"]}
            type="text"
            required={false}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label="Loan No"
            className="form-controls"
            name={["additionalInfo", "loanno"]}
            type="number"
            required={false}
          />
        </Col>
      </StyledRowBind>
      {/* <StyledRowCheckbox>
        <FormCheckBox
          name={["additionalInfo", "lenderclause"]}
          colon={false}
          labelAlign="left"
          labelCol={{ span: 12 }}
          label={<StyledFormLabel>Lender Clause:</StyledFormLabel>}
          options={BindOptions}
          defaultValue={valueArrCheckBox}
          onChange={onChangeCheckBox}
        />
      </StyledRowCheckbox> */}
      <Row>
        <StyledRadioBind>
          <FormRadio
            onChange={onChangeRadio}
            value={valueRadio}
            label={<RadioLabelSpan>Bill to lender:</RadioLabelSpan>}
            name={["additionalInfo", "billtolender"]}
            options={BillToLenderOpts}
            layout="horizontal"
          />
        </StyledRadioBind>
      </Row>
      <FormLabelStyle>
        <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <FormInput
              label="Additional Info"
              className="form-controls"
              name={["additionalInfo", "additionalinfo"]}
              type="text"
              required={false}
            />
          </Col>
        </StyledRowBind>
        <StyledRowBind>
          <Col span={24}>
            {/* <DropdownSelect
              label="Lender has a financial interest in"
              value={valueSelectFinInt}
              onChange={onChangeSelectFinInt}
              name={["additionalInfo", "financialinterest"]}
              layout="vertical"
              options={dropDownOpts?.FinancialInterest || []}
            /> */}
            <StyledRowCheckbox>
        <FormCheckBox
          name={["additionalInfo", "financialinterest"]}
          colon={false}
          labelAlign="left"
          labelCol={{ span: 12 }}
          label={<StyledFormLabel>Lender has a financial interest in</StyledFormLabel>}
          options={financialInterestOptions}
          defaultValue={valueArrCheckBox}
         onChange={onChangeCheckBox}
        />
      </StyledRowCheckbox>
          </Col>
        </StyledRowBind>
      </FormLabelStyle>
    </>
  );
};

export default BindAdditionalInfoForm;
