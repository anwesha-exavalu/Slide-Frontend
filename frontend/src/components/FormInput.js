import React from "react";
import { Form, Input } from "antd";
import { FormInputFeild } from "../styles/index";

const FormInput = ({
  theme,
  name,
  label,
  rules = [],
  value,
  required,
  layout,
  onChange,
  defaultValue,
  placeholder = "",
  ...rest
}) => {
  return (
    <FormInputFeild  theme={theme}>
      <Form.Item
        name={name}
        label={label}
        layout={layout}
        rules={[
          ...(required
            ? [{ required: true, message: `Please enter ${name}!` }]
            : []),
          ...rules,
        ]}
      >
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          {...rest}
        />
      </Form.Item>
    </FormInputFeild>
  );
};

export default FormInput;
