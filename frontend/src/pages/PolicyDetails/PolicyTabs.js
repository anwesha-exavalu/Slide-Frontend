import React, { useState } from 'react';
import { Tabs } from "antd";
import PolicyTabsConfig from './policyTabsDummyData';
import { tabTogglesValues,tabTogglesUpdatedValues} from './dummyData';

const PolicyTabs = ({ isEditable }) => {

  const [tabToggles, setTabToggles] = useState(tabTogglesValues);
  const {  tabItems } = PolicyTabsConfig(tabToggles, isEditable)


  const handleTabClick = (key) => {
    setTabToggles(tabTogglesUpdatedValues);
    setTabToggles((prevToggles) => ({
      ...prevToggles,
      [key]: !prevToggles[key],
    }));
  };


  return (<Tabs
    className="policy-dashboard-tabs"
    defaultActiveKey="1"
    type="card"
    tabPosition="top"
    items={tabItems.map(({ key, label, content }) => ({
      key,
      label,
      children: content,
    }))}
    onChange={handleTabClick}
  />);
};

export default PolicyTabs;