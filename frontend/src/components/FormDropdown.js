import React from 'react';
import { Form, Select } from 'antd';
import {FormSelect} from "../styles/index";

const { Option } = Select;

const DropdownSelect = ({ name, label, layout,rules = [],required, placeholder = '', options = [], ...rest }) => {
  return (
    <FormSelect>
    <Form.Item name={name} label={label} layout={layout} rules={[
      ...(required ? [{ required: true, message: `Please enter ${name}!` }] : []),
      ...rules,
    ]}>
      <Select placeholder={placeholder} {...rest}>
        {options.map(option => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
    </FormSelect>
  );
};

export default DropdownSelect;
