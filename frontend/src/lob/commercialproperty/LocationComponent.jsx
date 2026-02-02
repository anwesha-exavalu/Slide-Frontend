import React from "react";
import styles from "./LocationComponent.module.css";
import { LocationHeader } from "./LocationHeader";


import Documents from "../../layout/RightSidebar";

import { Col, Row } from "antd";

import Tableantd
 from "../../layout/Tableantd";
import LocationTable from "./LocationTable";
import LocationTab from "./LocationTab";

export function LocationComponent() {
  return (
    <Row>
      <Col span={24}>
        <main className={styles.mainContainer}>
          <LocationTab/>
         
          {/* <LocationTable/> */}
          {/* <LocationHeader />
          <Tableantd/>
           <LocationForm/>  */}
        </main>
      </Col>
      {/* <Col span={4}>
        <Documents />
       
      </Col> */}
    </Row>
  );
}

export default LocationComponent;
