import styled from "styled-components";

export const PolicyDashboardSection = styled.div`
  .ant-tabs-nav-list {
    background: #eaeaea;
    border-radius: 12px;
    .ant-tabs-tab {
      border: none !important;
    }
  }
  padding: 24px 16px;
  .ant-tabs-nav-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card.ant-tabs-top
    > .ant-tabs-nav
    .ant-tabs-tab
    + .ant-tabs-tab,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card.ant-tabs-bottom
    > .ant-tabs-nav
    .ant-tabs-tab
    + .ant-tabs-tab,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card.ant-tabs-top
    > div
    > .ant-tabs-nav
    .ant-tabs-tab
    + .ant-tabs-tab,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card.ant-tabs-bottom
    > div
    > .ant-tabs-nav
    .ant-tabs-tab
    + .ant-tabs-tab {
    margin: 0px;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card
    > .ant-tabs-nav
    .ant-tabs-tab,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card
    > div
    > .ant-tabs-nav
    .ant-tabs-tab {
    flex: 1;
    background: #eaeaea;
    border: 1px solid #eaeaea;
    color: #0a090b;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card
    > .ant-tabs-nav
    .ant-tabs-tab-active,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-card
    > div
    > .ant-tabs-nav
    .ant-tabs-tab-active {
    color: #222222;
    background: #ffffff;
    border-bottom: none;
    border-radius: 12px 12px 0px 0px;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs
    .ant-tabs-tab.ant-tabs-tab-active
    .ant-tabs-tab-btn {
    color: #0a090b;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-card-bordered {
    border-top: none;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-top > .ant-tabs-nav,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-bottom > .ant-tabs-nav,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-top
    > div
    > .ant-tabs-nav,
  :where(.css-dev-only-do-not-override-qnu6hi).ant-tabs-bottom
    > div
    > .ant-tabs-nav {
    margin: 0 0 0px 0;
  }
`;

export const PolicyDashboardCard = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  transition: 0.4s;
  width: 100px;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0px 7px 5px -1px rgba(202, 201, 201, 0.5);
  text-align: center;
  background-color:#fff;

  .card-block {
    display: flex;
    margin: 5px 0 0 20px;
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
    color: #36affa;
    width: 0px;
    transition: 0.4s;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
  }
  &:hover {
    transition: 0.4s;
    width: 250px;
    .card-text {
      width: auto;
      opacity: 1;
      transition: 0.4s;
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
  }
`;

export const PolicyDashboardDescription = styled.div`
h3{
margin-bottom:30px;
font-weight:600;
}
.custom-row-box{
display:flex;
padding:5px 0px;
gap:15px;}
  .ant-card-body {
    min-height: 500px;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-divider-horizontal {
    margin: 10px 0;
  }
  :where(.css-dev-only-do-not-override-qnu6hi).ant-divider {
    border-block-start: 0px;
  }
  .label {
    display: inline-block;
    min-width: 200px;
  }
  .description {
    padding-left: 15px;
  }
`;
