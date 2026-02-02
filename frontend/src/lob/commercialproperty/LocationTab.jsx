import React, { useState } from 'react';
import { Button } from 'antd';

import styles from "./LocationComponent.module.css";
import '../../layout/Tab.css';
import LocationTable from './LocationTable';
import LocationBuildingTab from "./LocationBuildingTab";
import OverallInsights from "./OverallInsights";
import PublicData from './PublicData';

const LocationTab = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  // Function to open the selected tab
  const openMainTab = (tabName) => {
    setActiveTab(tabName);
  };

  // Function to go to the next tab
  const nextTab = () => {
    if (activeTab === "Tab1") {
      setActiveTab("Tab2");
    } else if (activeTab === "Tab2") {
      setActiveTab("Tab3");
    } else if (activeTab === "Tab3") {
      setActiveTab("Tab4");
    }
  };

  return (
    <div className={styles.container}>
      {/* Tab Buttons */}
      <div className="tab">
        <Button
          className={`tablinks ${activeTab === "Tab1" ? "active" : ""}`}
          onClick={() => openMainTab("Tab1")}
        >
          Location
        </Button>
        <Button
          className={`tablinks ${activeTab === "Tab2" ? "active" : ""}`}
          onClick={() => openMainTab("Tab2")}
        >
          Buildings
        </Button>
        <Button
          className={`tablinks ${activeTab === "Tab3" ? "active" : ""}`}
          onClick={() => openMainTab("Tab3")}
        >
          AI Insights(Beta)
        </Button>
        <Button
          className={`tablinks ${activeTab === "Tab4" ? "active" : ""}`}
          onClick={() => openMainTab("Tab4")}
        >
          Public Data
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "Tab1" && (
        <div id="Tab1" className="tabcontent">
          <LocationTable nextTab={nextTab} />
        </div>
      )}

      {activeTab === "Tab2" && (
        <div id="Tab2" className="tabcontent">
          <LocationBuildingTab nextTab={nextTab} />
        </div>
      )}

      {activeTab === "Tab3" && (
        <div id="Tab3" className="tabcontent">
          <OverallInsights />
        </div>
      )}

      {activeTab === "Tab4" && (
        <div id="Tab4" className="tabcontent">
          <PublicData />
        </div>
      )}
    </div>
  );
};

export default LocationTab;
