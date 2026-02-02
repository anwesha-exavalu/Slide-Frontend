import React from "react";
import { Checkbox, Form } from "antd";
import { FormCheckBoxStyled } from "styles/components/FormControl";

const FormCheckBox = ({
  colon,
  labelAlign,
  labelCol,
  name,
  label,
  rules = [],
  required,
  options = [],
  layout,
  valuePropName="checked",
  ...rest
}) => {
  return (
    <FormCheckBoxStyled>
      <Form.Item
        colon={colon}
        labelAlign={labelAlign}
        labelCol={labelCol}
        label={label}
        name={name}
        layout={layout}
        rules={[
          ...(required
            ? [{ required: true, message: `Please select ${name}!` }]
            : []),
          ...rules,
        ]}
        valuePropName={valuePropName}
      >
        <Checkbox.Group options={options} {...rest} />
      </Form.Item>
    </FormCheckBoxStyled>
  );
};

export default FormCheckBox;
