import { Button, Card, Col, Row, Upload } from "antd";
import React, { useState , useEffect} from "react";
import { Section } from "styles/pages/Login";
import { Container } from "styles/components/Layout";
import FormInput from "components/FormControl/FormInput";
import { AttachButton, DropDownContainer } from "styles/pages/Documents";
import Dropdown from "components/FormControl/DropdownSelect";
import { ClaimsCard } from "styles/pages/ViewClaims";
import document from "assets/svg/document.svg";
import { useLocation } from "react-router-dom";
import PolicyInfo from "components/PolicyInfo";
import documentsDropDown from "assets/files/documents.csv";
import Papa from "papaparse";
import { setDropdownVals } from 'utils/helper';
import useMetaData from "context/metaData";

const filesData = {};

const UploadDocuments = () => {
  const {theme} = useMetaData();
  const location = useLocation();
  const [fileExists, setFileExists] = useState("Click to Upload");
  const policyNumber = location.state;
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const commonConfig = { delimiter: "," };

  useEffect(() => {
    Papa.parse(documentsDropDown, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (results) => {
        setDropdownVals(results, filesData);
        setdropDownOpts(filesData);
      },
    });
  }, []);

  return (
    <div>
      <Section theme={theme}>
        <Container>
          {policyNumber && <PolicyInfo theme={theme} />}
          <ClaimsCard theme={theme}>
            {policyNumber ? null : <h5 className="card-title">Documents</h5>}
            <DropDownContainer>
              <Card className="card-content">
                <img src={document}></img>
                <Row>
                  <Col span={12}>
                    <h5 className="card-headings">
                      {policyNumber ? "Policy File Upload" : "Upload Documents"}
                    </h5>
                    <div className="card-content">
                      <p>
                      Documents Made Easy! Quick upload of all essential documents right here to
                      keep clients informed and covered.{" "}
                      </p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="card-content">
                      <Row className="row">
                        <Col span={24}>
                          <Upload name="file">
                            <FormInput
                              theme={theme}
                              className="formFields-upload"
                              layout="vertical"
                              placeholder={fileExists}
                              onClick={() => {
                                setFileExists("");
                              }}
                              label="Upload Document"
                              readOnly={true}
                            ></FormInput>
                          </Upload>
                        </Col>
                      </Row>
                      <Row className="row">
                        <Col span={24}>
                          <FormInput
                          theme={theme}
                            className="formFields-border"
                            layout="vertical"
                            label={
                              policyNumber
                                ? "Policy Number"
                                : "Quote/Policy/Claim Number"
                            }
                            defaultValue={policyNumber ? "HO00000098-01" : ""}
                          ></FormInput>
                        </Col>
                      </Row>
                      <Row className="row" gutter={16}>
                        <Col span={12}>
                          <Dropdown
                          theme={theme}
                            layout="vertical"
                            label="File Type"
                            fieldName="fileType"
                            options={dropDownOpts?.SelectPolicyType || []}
                          />
                        </Col>
                        <Col span={12}>
                          <Dropdown
                          theme={theme}
                            layout="vertical"
                            label="Status"
                            fieldName="status"
                            options={dropDownOpts?.SelectPolicyType || []}
                            required={true}
                          />
                        </Col>
                      </Row>
                      <Row className="row" gutter={24}>
                        <Col span={12}>
                          <Dropdown
                          theme={theme}
                            layout="vertical"
                            label="Document Type"
                            fieldName="documentType"
                            options={dropDownOpts?.SelectPolicyType || []}
                            required={true}
                          />
                        </Col>
                        <Col span={12}>
                          <Dropdown
                          theme={theme}
                            layout="vertical"
                            label="Transaction Indicator"
                            fieldName="transactionIndicator"
                            options={dropDownOpts?.SelectPolicyType || []}
                            required={true}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card>
            </DropDownContainer>
            <Row className="row-button" >
              <AttachButton>
                <Button className="attachButton" type="primary">
                  Attach Document
                </Button>
              </AttachButton>
            </Row>
          </ClaimsCard>
        </Container>
      </Section>
    </div>
  );
};

export default UploadDocuments;
