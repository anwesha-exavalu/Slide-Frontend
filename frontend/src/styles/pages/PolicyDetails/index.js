import styled from "styled-components";
import themes from "constants/theme.json";

export const PolicyDashboardSection = styled.div`
  font-family: "Inter";
  padding: 24px 16px;
  .row-top {
    margin-top:60px;
  }
  .column-position {
    position: relative;
  }  
  .ant-tabs-nav-list {
    background:${({ theme }) => themes[theme].viewPolicyBg} ;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .ant-tabs-tab {
    border: none !important;
  }

  .policy-dashboard-tabs > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab,
  .policy-dashboard-tabs > div > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab {
    margin: 0px;
  }

  .policy-dashboard-tabs > .ant-tabs-nav .ant-tabs-tab,
  .policy-dashboard-tabs > div > .ant-tabs-nav .ant-tabs-tab {
    flex: 1;
    background:${({ theme }) => themes[theme].viewPolicyBg};
    border: 1px solid #eaeaea;
    color: #0a090b;
  }

  .policy-dashboard-tabs > .ant-tabs-nav .ant-tabs-tab-active,
  .policy-dashboard-tabs > div > .ant-tabs-nav .ant-tabs-tab-active {
    color: ${({ theme }) => themes[theme].viewPolicyTabsColor};
    background: ${({ theme }) => themes[theme].viewPolicyTabsBg};
    border-bottom: none !important;
    border-radius: 12px 12px 0px 0px;
  }

  .policy-dashboard-tabs > .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #0a090b;
  }

  .policy-dashboard-tabs > .ant-card-bordered {
    border-top: none;
  }

  .policy-dashboard-tabs > .ant-tabs-nav,
  .policy-dashboard-tabs > div > .ant-tabs-nav {
    margin: 0 0 0px 0;
  }
`;

export const PolicyDashboardCard = styled.div`
  position: absolute;
  right: 20px;
  top: 300px;
  transform: translate(0%, -50%);
  transition: 0.4s;
  width: 120px;
  border:${({ theme }) => themes[theme].viewPolicyDashboardBorder} ;
  border-radius: 15px;
  box-shadow: 0px 7px 5px -1px rgba(202, 201, 201, 0.5);
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${({ theme }) => themes[theme].viewPolicyDashboardBg};
  .card-block {
    display: flex;
    margin: 5px 0 0 30px;
  }

  .card-icon {
    border-radius: 30px;
    background: #36affa;
    width: 55px;
    height: 55px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-text {
    margin-top: 15px;
    margin-left: 10px;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: -0.18px;
    color:${({ theme }) => themes[theme].viewPolicyCardText} ;
    width: 0px;
    transition: 0.4s;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  a {
    color: ${({ theme }) => themes[theme].viewPolicyCardText};
  }

  &:hover {
    transition: 0.4s;
    width: 250px;

    .card-text {
      width: auto;
      opacity: 1;
      transition: 0.4s;
    }

    a {
      color: ${({ theme }) => themes[theme].viewPolicyCardText};
    }
  }
`;

export const PolicyDashboardFeatureCard = styled.div`
  .ant-card-body {
    display: flex;
    font-size: 14px;
    line-height: 40px;
  }
  .card-text {
    font-weight: 400;
    font-size: 15px;
    letter-spacing: -0.18px;
    padding-left: 5px;
    font-family: "Inter";
    color:${({ theme }) => themes[theme].viewDashboardFeatureCard} ;
  }
`;

export const PolicyDashboardDescription = styled.div`
  .ant-card-description {
    border-top: none;
    box-shadow: 0px 7px 5px -1px rgba(202, 201, 201, 0.5);
    margin-bottom: 60px;
    background:${({ theme }) => themes[theme].viewPolicyDashboardDesc} ;
    border:${({ theme }) => themes[theme].viewPolicyDashboardDescBorder} ;
  }
  .policyform .ant-radio-group label {
    min-width: auto;
  }
    .ant-input-disabled {
    box-shadow: none;
    background: no-repeat;
    color:  ${({ theme }) => themes[theme].viewDashboardFeatureCard};
  }
.vehicle-details-card {
.ant-form-item{
margin-bottom:0px;}
}
  .policyform label {
    width: 225px;
    padding: 12px 0px;
  }
  .form-width {
    width: 85%;
  }
  .form-container {
    height: 400px;
  }
  .ant-select-selector {
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
  }
  .ant-picker-outlined.ant-picker-disabled,
  .ant-picker-outlined.ant-picker-disabled:hover {
    box-shadow: none;
    background: no-repeat;
    color: ${({ theme }) => themes[theme].viewDashboardFeatureCard};
  }
  .ant-select.ant-select-disabled,
  .ant-select-outlined.ant-select-disabled > .ant-select-selector {
    box-shadow: none;
    background: no-repeat;
    border: 0px;
    color: ${({ theme }) => themes[theme].viewDashboardFeatureCard};
  }
  .ant-picker-outlined.ant-picker-disabled input[disabled] {
    color: #222222;
  }
  .ant-picker-disabled > .ant-picker-input > .ant-picker-suffix,
  .ant-select-disabled > .ant-select-arrow {
    display: none;
  }
  .ant-select-selection-item {
    align-self: start;
  }
  .ant-select-selection-item {
    color: ${({ theme }) => themes[theme].activeStep};
  }
  .ant-radio-group > .ant-radio-wrapper span.ant-radio + * {
    color:${({ theme }) => themes[theme].activeStep};
  }

  .form-label {
    font-size: 13px;
    font-weight: 500;
    line-height: 19.5px;
    color: #adacb0;
    font-family: "Inter", sans-serif;
  }

  .forms-tab {
    box-shadow: 0px 6px 18px -2px #18181c1a;
    padding-top: 20px;
    padding-left: 20px;
    padding-rigth: 20px;
    padding-bottom: 50px;
    border-radius: 5px;
  }
  .ant-form-item-label > label {
    font-size: 13px;
    font-weight: 500;
    color: #adacb0;
    font-family: "Inter", sans-serif;
  }
  img {
    cursor: pointer;
  }
  .ant-table-wrapper .ant-table,
  h3 {
    font-family: "Inter";
    color:${({ theme }) => themes[theme].viewPolicyDashboardHeading};
  }

  .ant-table-wrapper .ant-table-thead > tr > th {
    background-color:${({ theme }) => themes[theme].viewPolicyDashboardTableHead};
  }
  
  .pl30 {
    padding-left:30px !important;
  }

.row{
  margin-top:30px;
}
`;
