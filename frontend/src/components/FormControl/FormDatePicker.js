import React from 'react';
import { Form, DatePicker } from 'antd';
import { FormDatePickerBox } from 'styles/components/FormControl';

const FormDatePicker = ({ name, label,layout, rules = [],required, ...rest }) => {
  return (
    <FormDatePickerBox>
    <Form.Item name={name} label={label} layout={layout} rules={[
      ...(required ? [{ required: true, message: `Please enter ${name}!` }] : []),
      ...rules,
    ]}
    >
      <DatePicker {...rest} />
    </Form.Item>
    </FormDatePickerBox>
  );
};

export default FormDatePicker;
