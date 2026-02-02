import React from "react";
import { Form, Input } from "antd";
import InputMask from "react-input-mask";
import { FormphonenumberFeild } from "styles/components/FormControl";

const FormPhoneInput = ({
  name,
  label,
  rules = [],
  required = false,
  ...rest
}) => {
  return (
    <FormphonenumberFeild>
    <Form.Item
      name={name}
      label={label}
      rules={[
        ...(required ? [{ required: true, message: `Please enter ${label}!` }] : []),
        // { pattern: /^\(\d{3}\) \d{3}-\d{4}$/, message: "Enter a valid phone number" },
        ...rules,
      ]}
    >
      <InputMask mask="(999) 999-9999" {...rest}>
        {(inputProps) => <Input {...inputProps} />}
      </InputMask>
    </Form.Item>
    </FormphonenumberFeild>
  );
};

export default FormPhoneInput;
