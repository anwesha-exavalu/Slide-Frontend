import React, { useState, useEffect } from "react";
import styles from "./CreateSubmission.module.css";
import {
  Col,
  Row,
  Tooltip,
  Button,
  Radio,
  Form,
  Select,
  AutoComplete,
} from "antd";
import FormInput from "../components/FormInput";
import DropdownSelect from "../components/FormControl/DropdownSelect";
import Documents from "../layout/RightSidebar";
import {
  EditOutlined,
  SaveOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Modal, message, Upload } from "antd";
import pdfData from "../assets/documents/DocumentForExtraction02.pdf";
import axios from "axios";
import useMetaData from "../context/metaData";

const PROD_URL = process.env.REACT_APP_PREFILL_URL;
function CreateSubmission({ onNext }) {
  const { theme } = useMetaData();
  // Separate state for each widget section's form data and editing state
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // Separate state for each widget section's form data and editing state
  const [basicInfo, setBasicInfo] = useState({
    orgName: "",
    orgType: "",
    dba: "",
    fein: "",
    tin: "",
    businessActivity: "",
    sicCode: "",
    sicDescription: "",
    naics: "",
    naicsDescription: "",
    yearsInBusiness: "",
    status: "active",
    isEditing: false,
  });

  const [locationInfo, setLocationInfo] = useState({
    pinCode: "",
    addressLine1: "",
    addressLine2: "",
    county: "",
    city: "",
    state: "",
    country: "",
    isEditing: false,
  });

  const [insuredInfo, setInsuredInfo] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    countryCode: "",
    phoneNumber: "",
    website: " ",
    isEditing: false,
  });

  // Toggle editing mode for Basic Information
  const handleEditInsured = () => {
    if (isEditMode) {
      // Save functionality - you can add API calls or other save logic here
      setBasicInfo((prev) => ({ ...prev, isEditing: false }));
      setLocationInfo((prev) => ({ ...prev, isEditing: false }));
      setInsuredInfo((prev) => ({ ...prev, isEditing: false }));
    } else {
      // Edit functionality - existing logic
      setBasicInfo((prev) => ({ ...prev, isEditing: true }));
      setLocationInfo((prev) => ({ ...prev, isEditing: true }));
      setInsuredInfo((prev) => ({ ...prev, isEditing: true }));
    }
    // Toggle edit mode
    setIsEditMode(!isEditMode);
  };
  useEffect(() => {
    console.log("Edit Mode State:", {
      basicInfo: basicInfo.isEditing,
      locationInfo: locationInfo.isEditing,
      insuredInfo: insuredInfo.isEditing,
    });
  }, [basicInfo.isEditing, locationInfo.isEditing, insuredInfo.isEditing]);

  // const handleEditBasicInfo = () => {
  //     console.log("Edit icon clicked!"); // Log for debugging
  //     setBasicInfo((prevState) => ({
  //         ...prevState,
  //         isEditing: !prevState.isEditing, // Toggle edit mode
  //     }));
  //     console.log("After Edit Toggle: ", !basicInfo.isEditing); // Log toggled state
  // };

  const handleCreateNewBasicInfo = () => {
    console.log("Edit icon clicked!"); // Log for debugging
    setBasicInfo({
      insuredName: "",
      insuredType: "",
      firstName: "",
      isEditing: true, // Enable editing for new entries
    });
  };

  // const handleEditLocationInfo = () => {
  //     setLocationInfo((prevState) => ({
  //         ...prevState,
  //         isEditing: !prevState.isEditing, // Toggle edit mode
  //     }));
  // };

  const handleCreateNewLocationInfo = () => {
    setLocationInfo({
      baseState: "",
      zipCode: "",
      isEditing: true, // Enable editing for new entries
    });
  };

  // const handleEditInsuredInfo = () => {
  //     setInsuredInfo((prevState) => ({
  //         ...prevState,
  //         isEditing: !prevState.isEditing, // Toggle edit mode
  //     }));
  // };

  const handleCreateNewInsuredInfo = () => {
    setInsuredInfo({
      primaryNameInsured: "",
      isEditing: true, // Enable editing for new entries
    });
  };
  const handleInputChange = (e, section, field) => {
    const value = e.target ? e.target.value : e;
    if (section === "basicInfo") {
      setBasicInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "locationInfo") {
      setLocationInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "insuredInfo") {
      setInsuredInfo((prev) => ({ ...prev, [field]: value }));
    }
  };
  const handleClick = () => {
    navigate("/accountinfo"); // Navigate to accountinfo with row data
  };
  const accountInfo = {
    accountHolder: "Wilson Properties", // Full name as "Account Holder" from AccountInfo
  };

  // Extract first name and last name from accountHolder for comparison
  const [accountFirstName, accountLastName] =
    accountInfo.accountHolder.split(" ");

  // Function to check if names match and navigate or show a pop-up
  const handleSearchClick = () => {
    const { firstName, lastName } = basicInfo;

    if (firstName === accountFirstName && lastName === accountLastName) {
      navigate("/accountInfo"); // Navigate if names match
    } else {
      // Show a pop-up if names don't match
      Modal.error({
        title: "No such account",
        content: "The person is not insured.",
      });
    }
  };

  // Function to open modal
  const onUpload = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const pdfData = "Aspyre Metro Application_print.pdf"; // Your PDF file path

  const handlePrefill = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const pdfResponse = await fetch(pdfData);
      if (!pdfResponse.ok) {
        throw new Error("Failed to load PDF file");
      }

      const pdfBlob = await pdfResponse.blob();
      const file = new File([pdfBlob], "DocumentForExtraction02.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("file", file);

      const apiResponse = await fetch(`${PROD_URL}/api/process_doc`, {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(errorData.message || "Failed to process PDF");
      }

      const responseData = await apiResponse.json();
      console.log("API Response:", responseData);

      if (!responseData.application_details) {
        throw new Error("Invalid response data received");
      }

      // Update form states with response data
      updateFormStates(responseData.application_details);

      setSuccess(true);
      message.success("Form prefilled successfully");
    } catch (error) {
      console.error("Prefill Error:", error);
      setError(error.message);
      message.error(`Failed to prefill form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleUpload = async ({ file }) => {
    console.log("Starting upload for file:", file.name);
    try {
      setLoading(true);
      setError(null);

      // Basic file validation
      if (!file || file.type !== "application/pdf") {
        throw new Error("Please upload a valid PDF file");
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log("Sending request to:", `${PROD_URL}/api/process_doc`);

      const response = await fetch(`${PROD_URL}/api/process_doc`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Upload failed with status: ${response.status}`
        );
      }

      const responseData = await response.json();
      console.log("Upload API Response:", responseData);

      if (!responseData.application_details) {
        throw new Error("Invalid response format from API");
      }

      // Update form states with response data
      updateFormStates(responseData.application_details);

      setFileList([file]);
      message.success(`${file.name} processed successfully`);
      setSuccess(true);
    } catch (error) {
      console.error("Upload Error:", error);
      message.error(`Upload failed: ${error.message}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Function to handle file upload
  const handleUploadFile = ({ file, fileList }) => {
    setFileList(fileList);
    message.success(`${file.name} uploaded successfully`);
  };

  const updateFormStates = (data) => {
    if (!data) return;

    const { insuredInfo, insuredMailingAddress, insuredContactPerson } = data;

    // Update basicInfo state - handle all fields from insuredInfo
    if (insuredInfo) {
      setBasicInfo((prevState) => ({
        ...prevState,
        orgName: insuredInfo.orgName || "",
        orgType: insuredInfo.orgType || "",
        dba: insuredInfo.dba || "",
        fein: insuredInfo.fein || "",
        tin: insuredInfo.tin || "",
        businessActivity: insuredInfo.businessActivity || "",
        sicCode: insuredInfo.sicCode || "",
        sicDescription: insuredInfo.sicDescription || "",
        naics: insuredInfo.naics || "",
        naicsDescription: insuredInfo.naicsDescription || "",
        yearsInBusiness: insuredInfo.yearsInBusiness || "",
        status: insuredInfo.partyStatus || "active",
      }));
    }

    // Update locationInfo state - handle first address from insuredMailingAddress array
    if (insuredMailingAddress && insuredMailingAddress[0]) {
      const address = insuredMailingAddress[0];
      setLocationInfo((prevState) => ({
        ...prevState,
        pinCode: address.pinCode || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        county: address.county || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
      }));
    }

    // Update insuredInfo state - handle all fields from insuredContactPerson
    if (insuredContactPerson) {
      setInsuredInfo((prevState) => ({
        ...prevState,
        firstName: insuredContactPerson.firstName || "",
        middleName: insuredContactPerson.middleName || "",
        lastName: insuredContactPerson.lastName || "",
        emailId: insuredContactPerson.emailId || "",
        countryCode: insuredContactPerson.countryCode || "",
        phoneNumber: insuredContactPerson.phoneNumber || "",
        website: insuredContactPerson.website || "",
      }));
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className={styles.maincontainer}>
            <Row gutter={16}>
              <Col span={22}></Col>
              <Col span={2}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={onUpload}
                    style={{ width: "5rem", backgroundColor: "blue" }}
                  >
                    Upload
                  </Button>
                  <Button
                    type="primary"
                    onClick={handlePrefill}
                    loading={loading}
                    style={{ width: "5rem", backgroundColor: "blue" }}
                  >
                    Prefill
                  </Button>
                  <Tooltip title={isEditMode ? "Save" : "Edit"}>
                    <Button
                      shape="circle"
                      onClick={handleEditInsured}
                      icon={
                        isEditMode ? (
                          <SaveOutlined style={{ fontSize: "20px" }} />
                        ) : (
                          <EditOutlined style={{ fontSize: "20px" }} />
                        )
                      }
                      style={{ fontSize: "20px" }}
                    />
                  </Tooltip>
                  <Tooltip title="Search">
                    <Button
                      shape="circle"
                      onClick={handleSearchClick}
                      icon={<SearchOutlined style={{ fontSize: "20px" }} />}
                      style={{ fontSize: "20px" }}
                    />
                  </Tooltip>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* First Widget Section: Basic Information */}
              <Col span={24}>
                <div className={styles.widgetBox}>
                  <div
                    className={styles.widgetHeader}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 className={styles.widgetTitle}>Primary Insured</h3>
                  </div>

                  <Row gutter={24}>
                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Party ID</span>}
                                            value={basicInfo.partyId}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "partyId")}
                                            disabled// Allow editing based on state
                                        />
                                    </Col> */}
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>Insured Name</span>
                        }
                        value={basicInfo.orgName}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "orgName")
                        }
                        readOnly={!basicInfo.isEditing}
                      />
                    </Col>
                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured Type</span>}
                                            value={basicInfo.insuredType}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "insuredType")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured First Name</span>}
                                            value={basicInfo.firstName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "firstName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured Middle Name</span>}
                                            value={basicInfo.middleName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "middleName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px" }}>Insured Last Name</span>}
                                            value={basicInfo.lastName}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "lastName")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col>*/}
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                      <DropdownSelect
                        theme={theme}
                        label="Organisation Type"
                        name="organizationType"
                        options={[
                          { label: "Proprietary", value: "proprietary" },
                          { label: "Partnership", value: "partnership" },
                          { label: "llb", value: "LLB" },
                          {
                            label: "Private Limited Company",
                            value: "privateLimitedCompany",
                          },
                          {
                            label: "Public Limited Company",
                            value: "publicLimitedCompany",
                          },
                        ]}
                        required={true}
                        onChange={(value) =>
                          handleInputChange(
                            { target: { value } },
                            "basicInfo",
                            "orgType"
                          )
                        }
                        layout="vertical"
                      />
                    </Col>

                    <Col span={6}>
                      <FormInput
                        label={
                          <span
                            style={{ fontSize: "15px", marginRight: "40px" }}
                          >
                            DBA
                          </span>
                        }
                        value={basicInfo.dba}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "dba")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>

                    <Col span={6}>
                      <FormInput
                        label={
                          <span
                            style={{ fontSize: "15px", marginRight: "40px" }}
                          >
                            FEIN
                          </span>
                        }
                        value={basicInfo.fein}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "fein")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            Tax Identification Number
                          </span>
                        }
                        value={basicInfo.tin}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "basicInfo",
                            "taxIdentificationNumber"
                          )
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            Business Activity
                          </span>
                        }
                        value={basicInfo.businessActivity}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "businessActivity")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>SIC Code</span>
                        }
                        value={basicInfo.sicCode}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "sicCode")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            SIC Description
                          </span>
                        }
                        value={basicInfo.sicDescription}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "sicDescription")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span
                            style={{ fontSize: "15px", marginRight: "40px" }}
                          >
                            NAICS
                          </span>
                        }
                        value={basicInfo.naics}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "naics")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            NAICS Description
                          </span>
                        }
                        value={basicInfo.naicsDescription}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "naicsDescription")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            Year in Business
                          </span>
                        }
                        value={basicInfo.yearsInBusiness}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "basicInfo", "yearsInBusiness")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>Status</span>}
                                            value={basicInfo.status}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "basicInfo", "status")}
                                            readOnly={!basicInfo.isEditing} // Allow editing based on state
                                        />
                                    </Col> */}
                  </Row>
                </div>
              </Col>

              {/* Second Widget Section: Location Information */}

              <Col span={24}>
                <div className={styles.widgetBox}>
                  <div
                    className={styles.widgetHeader}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 className={styles.widgetTitle}>Mailing Address</h3>
                    {/*<div  style={{ display: "flex", alignItems: "center" }}>
                                    <Tooltip title="Edit">
                                        <Button  shape="circle" onClick={handleEditBasicInfo} icon={<EditOutlined />} />
                                       </Tooltip>
                                       
                                        <Tooltip title="Create">
                                        <Button  shape="circle"  onClick={handleCreateNewBasicInfo} icon={<PlusCircleOutlined />} />
                                       </Tooltip>
                                       
                                    </div>*/}
                  </div>

                  <Row gutter={22}>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>Postal Code</span>
                        }
                        value={locationInfo.pinCode}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "pinCode")
                        }
                        readOnly={!locationInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            Addess Line 1
                          </span>
                        }
                        value={locationInfo.addressLine1}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "addressLine1")
                        }
                        readOnly={!locationInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            Addess Line 2
                          </span>
                        }
                        value={locationInfo.addressLine2}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "addressLine2")
                        }
                        readOnly={!locationInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span
                            style={{ fontSize: "15px", marginRight: "40px" }}
                          >
                            County
                          </span>
                        }
                        value={locationInfo.county}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "county")
                        }
                        readOnly={!locationInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span
                            style={{ fontSize: "15px", marginRight: "40px" }}
                          >
                            City
                          </span>
                        }
                        value={locationInfo.city}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "city")
                        }
                        readOnly={!locationInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span
                            style={{ fontSize: "15px", marginRight: "40px" }}
                          >
                            State
                          </span>
                        }
                        value={locationInfo.state}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "state")
                        }
                        readOnly={!locationInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span
                            style={{ fontSize: "15px", marginRight: "40px" }}
                          >
                            Country
                          </span>
                        }
                        value={locationInfo.country}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "locationInfo", "country")
                        }
                        readOnly={!locationInfo.isEditing} // Allow editing based on state
                      />
                    </Col>

                    {/* <Col span={6}>
                                        <label style={{ fontSize: "15px", marginRight: "40px" }}>Risk Location Same as Mailing Address</label>
                                        <Radio.Group
                                            value={locationInfo.riskLocation}
                                            onChange={(e) => handleInputChange(e, "locationInfo", "riskLocation")}
                                            readOnly={!locationInfo.isEditing} 

                                        >
                                            <Radio value={true} >Yes</Radio>
                                            <Radio value={false}>No</Radio>

                                            
                                        </Radio.Group>
                                    </Col> */}
                  </Row>
                </div>

                {/* Third Widget Section: Insured Information */}

                <div className={styles.widgetBox}>
                  <div
                    className={styles.widgetHeader}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 className={styles.widgetTitle}>Contact Information</h3>
                    {/*<div  style={{ display: "flex", alignItems: "center" }}>
                                    <Tooltip title="Edit">
                                        <Button  shape="circle" onClick={handleEditBasicInfo} icon={<EditOutlined />} />
                                       </Tooltip>
                                       
                                        <Tooltip title="Create">
                                        <Button  shape="circle"  onClick={handleCreateNewBasicInfo} icon={<PlusCircleOutlined />} />
                                       </Tooltip>
                                       
                                    </div>*/}
                  </div>

                  <Row gutter={22}>
                    {/* <Col span={6}>
                                        <FormInput
                                            label={<span style={{ fontSize: "15px", marginRight: "40px" }}>PartyId</span>}
                                            value={insuredInfo.partyId}
                                            required={true}
                                            onChange={(e) => handleInputChange(e, "insuredInfo", "partyId")}
                                            disabled // Allow editing based on state
                                        />
                                    </Col> */}
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>First Name</span>
                        }
                        value={insuredInfo.firstName}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "insuredInfo", "firstName")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>Middle Name</span>
                        }
                        value={insuredInfo.middleName}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "insuredInfo", "middleName")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>Last Name</span>
                        }
                        value={insuredInfo.lastName}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "insuredInfo", "lastName")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>
                            Business Email ID
                          </span>
                        }
                        value={insuredInfo.emailId}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "insuredInfo", "businessEmailId")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>Country Code</span>
                        }
                        value={insuredInfo.countryCode}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "insuredInfo", "countryCode")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>Phone Number</span>
                        }
                        value={insuredInfo.phoneNumber}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "insuredInfo", "phoneNumber")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                    <Col span={6}>
                      <FormInput
                        label={
                          <span style={{ fontSize: "15px" }}>Website</span>
                        }
                        value={insuredInfo.website}
                        required={true}
                        onChange={(e) =>
                          handleInputChange(e, "insuredInfo", "website")
                        }
                        readOnly={!basicInfo.isEditing} // Allow editing based on state
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={20}></Col>
              <Col span={4}>
                <div>
                  <Button
                    type="primary"
                    onClick={onNext}
                    style={{
                      width: "10rem",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                      marginRight: "3px",
                      backgroundColor: "blue",
                    }}
                  >
                    Next
                  </Button>
                </div>
              </Col>
              {/*} <Col span={4}>
            <div >
            <button type="account" style={{width: "10rem"}} onClick={() => handleClick()}><b>Go To Account</b></button>
          </div></Col>*/}
            </Row>
          </div>
        </Col>
        {/* <Col span={4}>
                <Documents />
            </Col> */}
      </Row>
      {/* Upload Modal */}
      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            OK
          </Button>,
        ]}
        centered
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Upload.Dragger
            beforeUpload={() => false} // Prevents auto-upload
            fileList={fileList}
            onChange={handleUploadFile}
            multiple={false} // Allow only one file
            maxCount={1} // Restrict to one file
            showUploadList={true}
            style={{
              padding: "20px",
              border: "2px dashed #1890ff",
              borderRadius: "8px",
            }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
            </p>
            <p className="ant-upload-text">Click or Drag File to Upload</p>
            <p className="ant-upload-hint">
              Only one file is allowed. Ensure it is in the correct format.
            </p>
          </Upload.Dragger>
        </div>
      </Modal>
    </>
  );
}

export default CreateSubmission;
