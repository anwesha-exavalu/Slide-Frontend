import styled from "styled-components";

export const FormDatePickerBox = styled.div`
  label::after {
    visibility: hidden;
  }
  label {
    height: auto !important;
    padding: 0px 6px;
    white-space: normal;
    text-align: left;
  }

  .ant-picker-outlined {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    padding: 12px 6px;
    font-size: 14px;
    width: 100%;
    border: none;
    background: ${({ theme }) =>
      theme === "dark" ? "#5A5A5A !important" : "white"};
    color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "black")};
  }
  label {
    height: auto !important;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
`;

export const RadioBtnBox = styled.div`
  label::after {
    visibility: hidden;
  }
  .ant-radio-group {
    label {
      padding: 0px !important;
    }
  }
  .ant-radio-group {
    display: flex;
  }
  label {
    height: auto !important;
    width: 225px;
    padding: 0px 6px;
    display: flex;
    align-items: center;
    white-space: normal;
    text-align: left;
    height: auto !important;
  }
  .ant-form-item-control-input {
    padding: 12px 6px;
  }

  label {
    height: auto !important;
    font-size: 13px !important;
    font-weight: 400;
    line-height: 19.5px;
    color: #adacb0;
    font-family: "Inter", sans-serif;
  }
`;

export const FormInputFeild = styled.div`
  label::after {
    visibility: hidden;
  }
  label {
    height: auto !important;
    white-space: normal;
    text-align: left;
    padding: 0px 6px;
  }

  input {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    padding: 12px 6px;
    font-size: 14px;
    border: none;
    background: ${({ theme }) =>
      theme === "dark" ? "#5A5A5A !important" : "white"};
    color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "black")};
  }
  .ant-input-disabled {
    box-shadow: none;
    background: no-repeat;
    color: #000;
  }
  label {
    height: auto !important;
    min-width: 80px;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
  .suffix {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const FormSelect = styled.div`
  label::after {
    visibility: hidden;
  }

  .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
  }
  .ant-select-selector:after,
  .ant-select-selection-search,
  .ant-select-selection-item,
  .ant-select-selection-placeholder,
  .ant-select-selection-item {
    line-height: normal !important;
  }
  .ant-form-item-control-input {
    min-height: auto !important;
  }

  .ant-select {
    font-family: "Inter", sans-serif;
    border: none;
    font-size: 14px;
    border-radius: 8px;
    background: ${({ theme }) =>
      theme === "dark" ? "#5A5A5A !important" : "white"};
    color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "black")};
  }
  .ant-select-selector {
    height: 43px !important; /* Adjust height */

    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
  }

  label {
    height: auto !important;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
    white-space: normal;
  }
`;
export const FormphonenumberFeild = styled.div`
  label::after {
    visibility: hidden;
  }
  label {
    height: auto !important;
    white-space: normal;
    text-align: left;
    padding: 0px 6px;
  }

  input {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    font-family: "Inter", sans-serif;
    padding: 12px 6px;
    font-size: 14px;
    border: none;
    background: ${({ theme }) =>
      theme === "dark" ? "#5A5A5A !important" : "white"};
    color: ${({ theme }) => (theme === "dark" ? "#FFFFFF" : "black")};
  }
  .ant-input-disabled {
    box-shadow: none;
    background: no-repeat;
    color: #000;
  }
  label {
    height: auto !important;
    min-width: 80px;
    font-size: 13px !important;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0 !important;
    font-family: "Inter", sans-serif;
  }
`;
export const FormCheckBoxStyled = styled.div`
  width: 100%;
  .ant-form-item {
    width: 100%;
  }
  .ant-checkbox-group {
    width: 100%;
    label {
      width: 40%;
    }
  }
  .ant-checkbox-disabled .ant-checkbox-inner:after {
    border-color: white;
  }
  .ant-checkbox-checked.ant-checkbox-disabled > .ant-checkbox-inner {
    background: #1677ff;
    border-color: #1677ff;
  }
`;
