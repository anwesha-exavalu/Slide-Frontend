import React from "react";
import { Form, Radio } from "antd";
import { RadioBtnBox } from "styles/components/FormControl";

const FormRadio = ({
  name,
  label,
  rules = [],
  required,
  options = [],
  layout,
  ...rest
}) => {
  return (
    <RadioBtnBox>
      <Form.Item
        name={name}
        label={label}
        layout={layout}
        rules={[
          ...(required
            ? [{ required: true, message: `Please select ${name}!` }]
            : []),
          ...rules,
        ]}
      >
        <Radio.Group {...rest}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              <span>{option.label}</span>
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </RadioBtnBox>
  );
};

export default FormRadio;
