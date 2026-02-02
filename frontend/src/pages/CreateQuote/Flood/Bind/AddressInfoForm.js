import { Col } from "antd";
import FormInput from "components/FormControl/FormInput";
import React from "react";
import {
  FormLabelStyle,
  StyledRowBind,
  StyledRowBindTop,
} from "styles/pages/Bind";
const AddressInfoForm = () => {
  return (
    <FormLabelStyle>
      <StyledRowBindTop
        justify="space-between"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col span={12}>
          <FormInput
            label="Address 1"
            className="form-controls"
            name={["additionalInfo", "address1"]}
            type="text"
            required={false}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label="Country"
            className="form-controls"
            name={["additionalInfo", "country"]}
            type="text"
            required={false}
          />
        </Col>
      </StyledRowBindTop>
      <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <FormInput
            label="City/State/Zip:"
            className="form-controls"
            name={["additionalInfo", "citystatezip"]}
            type="text"
            required={false}
          />
        </Col>
      </StyledRowBind>
      <StyledRowBind gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <FormInput
            label="Phone No."
            className="form-controls"
            name={["additionalInfo", "phone"]}
            type="number"
            required={false}
          />
        </Col>
        <Col span={12}>
          <FormInput
            label="Fax No."
            className="form-controls"
            name={["additionalInfo", "fax"]}
            type="number"
            required={false}
          />
        </Col>
      </StyledRowBind>
    </FormLabelStyle>
  );
};
export default AddressInfoForm;
