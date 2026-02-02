import React from "react";
import styles from "./PolicyForm.module.css";
import { useState } from "react";
import "./Tab.css";
import { Col, Row } from "antd";
import FormInput from "../components/FormInput";
import Documents from "./RightSidebar";

import ApexChart from "./Riskchart";
function PolicyForm() {
  const [activeTab, setActiveTab] = useState("Tab1"); // Set default tab

  // Function to open the selected tab
  const openMainTab = (event, tabName) => {
    setActiveTab(tabName);
  };
  return (
    <Row>
      <Col span={20}>
        <div className={styles.maincontainer}>
          <div>
            {/* Tab Buttons */}
            <div className="tab" style={{marginLeft:"0px"}}>
              <button
                className={`tablinks ${activeTab === "Tab1" ? "active" : ""}`}
                onClick={(event) => openMainTab(event, "Tab1")}
              >
                Policy Information
              </button>
              <button
                className={`tablinks ${activeTab === "Tab2" ? "active" : ""}`}
                onClick={(event) => openMainTab(event, "Tab2")}
              >
                Additional Insured
              </button>
            </div>

            {activeTab === "Tab1" && (
              <div id="Tab1" className="tabcontent">
                <h2 className={styles.sectionName}>Policy Details</h2>
                <Row gutter={16}>
                  <Col span={10}>
                    <Row gutter={16}>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Term Type</span>}
                          value="Annual"
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Term Number</span>}
                          value="77890"
                          reqired={true}
                        />
                      </Col>

                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Effective Date</span>}
                          value="09/03/2024"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Expiration Date</span>}
                          value="09/03/2025"
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Relase as of date</span>}
                          value="09/03/2024"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Base State</span>}
                          value="California"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <h7>Affinity Group:</h7>
                      </Col>
                      <Col span={10}>
                        <h10 className="customlable">
                          This information will help the agent better understand
                          your needs and objectives.
                        </h10>
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Name</span>}
                          value="Daniel Smith"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <label className="customlable"></label>
                      </Col>
                      <Col span={10}>
                        <label className="customlable">
                          Producer of Records
                        </label>
                      </Col>
                      <Col span={10}>
                        <label className="customlable"></label>
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Organization</span>}
                          value="All Risk Insurance"
                          reqired={true}
                          readOnly
                        />
                      </Col>

                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Producer Code</span>}
                          value="77777"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={10}>
                    <Row gutter={16}>
                      <Col span={10}>
                      <FormInput
                          label={<span style={{ fontSize: "15px" }}>Primary Name Insured:</span>}
                          value=""
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                      <FormInput
                          label={<span style={{ fontSize: "15px" }}>Name</span>}
                          value="Workers Comp Test"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      {/* <Col span={10}></Col>
                      <Col span={10}>
                        <FormInput label="" value="" readOnly reqired={true} />
                      </Col> */}
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Zip Code</span>}
                          value="713335"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Phone</span>}
                          value="23145677"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Policy Address</span>}
                          value="2134 Parkway"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>County</span>}
                          value=""
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>City</span>}
                          value=""
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          l label={<span style={{ fontSize: "15px" }}>Country</span>}
                          value="United States"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address Type</span>}
                          value=""
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <label className="customlable"></label>
                      </Col>
                      <Col span={10}>
                        <label className="customlable">
                          Business and Operation
                        </label>
                      </Col>
                      <Col span={10}>
                        <label className="customlable"></label>
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label="FEIN"
                          value="22-51269"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                    </Row>
                  </Col>
                  
                    <Row gutter={16}>
                      <Col span={10}>
                      
                      <div><ApexChart/></div>
                      {/* <div>
                        <h6>Suggestions</h6>
                      <textarea style={{height: "200px",}} placeholder=""></textarea></div> */}
                      </Col>
                     
                    </Row>
                
                </Row>
               
              </div>
            )}

            {activeTab === "Tab2" && (
              <div id="Tab2" className="tabcontent">
                <h5 className={styles.sectionName}>Company Contact Details</h5>
                <Row gutter={16}>
                  <Col span={12}>
                    <Row gutter={26}>
                      <Col span={10}>
                        <FormInput
                         label={<span style={{ fontSize: "15px" }}>Relationship to primary name insured</span>}
                          value="Relation"
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Industry code</span>}
                          value="ax77890"
                          reqired={true}
                        />
                      </Col>
                      {/* <Col span={10}>
                        <label className="customlable">Contact Details</label>
                      </Col>
                      <Col span={10}>
                        <label className="customlable">Company</label>
                      </Col> */}

                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Office Phone</span>}
                          value="23177890"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput label={<span style={{ fontSize: "15px" }}>Fax</span>} value="" reqired={true} />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Primary Email</span>}
                          value="xyz@email.com"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Secondary Email</span>}
                          value="xyz@email.com"
                          reqired={true}
                          readOnly
                        />
                      </Col>

                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address</span>}
                          value=""
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Country</span>}
                          value="United States"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address 1 </span>}
                          value="Addressline 1"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address 2 </span>}
                          value="Addressline 2"
                          reqired={true}
                          readOnly
                        />
                      </Col>

                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>City</span>}
                          value=""
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                          label={<span style={{ fontSize: "15px" }}>Country</span>}
                          value="Anchorage"
                          reqired={true}
                          readOnly
                        />
                      </Col>

                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>State</span>}
                          value="California"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Zip Code</span>}
                          value="9001-####"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address Type </span>}
                          value="Home"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address Description</span>}
                          value=""
                          reqired={true}
                          readOnly
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={12}>
                    <Row gutter={20}>
                      {/* <Col span={10}>
                        <label className="customlable" >Official IDs</label>
                      </Col>
                      <Col span={10}>
                        <label className="customlable"></label>
                      </Col> */}
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>FEIN</span>}
                          value="22-52693"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Code</span>}
                          value="22-52693"
                          reqired={true}
                          readOnly
                        />
                      </Col>
                      {/* <Col span={10}>
                        <label className="customlable"></label>
                      </Col> */}
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address</span>}
                          value="Same Addresss as:"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Country</span>}
                          value="United States"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address 1 </span>}
                          value="Addressline 1"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Address 2 </span>}
                          value="Addressline 2"
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>City</span>}
                          value=""
                          readOnly
                          reqired={true}
                        />
                      </Col>
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>Country </span>}
                          value="United States"
                          readOnly
                          reqired={true}
                        />
                      </Col>

                      {/* <Col span={10}>
                        <label className="customlable">License</label>
                      </Col>
                      <Col span={10}>
                        <label className="customlable"></label>
                      </Col> */}
                      <Col span={10}>
                        <FormInput
                           label={<span style={{ fontSize: "15px" }}>License status</span>}
                          value=""
                          readOnly
                          reqired={true}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </Col>
      <Col span={4}>
        <Documents />
      </Col>

      
    </Row>
  );
}

export default PolicyForm;
