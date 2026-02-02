import { Button, Card, Col, Row, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { Section } from "styles/pages/Login";
import { Container } from "styles/components/Layout";
import { AttachButton, DropDownContainer } from "styles/pages/Documents";
import { ClaimsCard } from "styles/pages/ViewClaims";
import document from "assets/svg/document.svg";
import { useLocation } from "react-router-dom";
import PolicyInfo from "components/PolicyInfo";
import documentsDropDown from "assets/files/documents.csv";
import Papa from "papaparse";
import { setDropdownVals } from "utils/helper";
import { uploadAccordForm } from "constants/api";
import usePost from "hooks/usePost";
import FormInput from "components/FormControl/FormInput";
import { useNavigate } from "react-router-dom";
import useMetaData from "context/metaData";

const filesData = {};

const AutomaticQuote = () => {
  const {theme}=useMetaData();
  const navigate = useNavigate();
  const { mutateAsync: fetchTextract } = usePost();
  const location = useLocation();
  const [fileExists, setFileExists] = useState("Click to Upload");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [dropDownOpts, setdropDownOpts] = useState([]);
  const policyNumber = location.state;
  const commonConfig = { delimiter: "," };
  dropDownOpts;

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

  const handleTextextract = async () => {
    if (!fileToUpload || fileToUpload.length === 0) {
      console.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    fileToUpload.forEach((file) => {
      formData.append("file", file.originFileObj || file);
    });

    try {
      const res = await fetchTextract({
        url: uploadAccordForm,
        payload: formData,
        token: true,
        // customHeaders: {
        //   "Content-Type": "multipart/form-data",
        // },
      });

      if (res) {
        navigate("/commauto-quote", { state: { data: res } });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (info) => {
    const file = info.fileList ? info.fileList : null;
    if (file) {
      setFileToUpload(file);
      setFileExists(file.name);
    } else {
      setFileExists("Click to Upload");
    }
  };

  return (
    <div>
      <Section theme={theme}>
        <Container theme={theme}>
          {policyNumber && <PolicyInfo theme={theme} />}
          <ClaimsCard theme={theme}>
            {policyNumber ? null : <h5 className="card-title">Accord Form</h5>}
            <DropDownContainer>
              <Card className="card-content">
                <img src={document} alt="document-icon" />
                <Row>
                  <Col span={12}>
                    <h5 className="card-headings">
                      {policyNumber
                        ? "Policy File Upload"
                        : "Upload Accord Forms"}
                    </h5>
                    <div className="card-content">
                      <p>
                        Documents Made Easy! Quick upload of all essential
                        documents right here to keep clients informed and
                        covered.
                      </p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="card-content">
                      <Upload
                        name="file"
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                      >
                        {/* <button>upload</button> */}
                        <FormInput
                          className="formFields-upload"
                          layout="vertical"
                          placeholder={fileExists}
                          label="Upload Accord Forms"
                          readOnly={true}
                        ></FormInput>
                      </Upload>
                    </div>
                  </Col>
                </Row>
              </Card>
            </DropDownContainer>
            <Row className="row-button">
              <AttachButton>
                <Button
                  className="attachButton"
                  type="primary"
                  onClick={handleTextextract}
                >
                  Upload
                </Button>
              </AttachButton>
            </Row>
          </ClaimsCard>
        </Container>
      </Section>
    </div>
  );
};

export default AutomaticQuote;
