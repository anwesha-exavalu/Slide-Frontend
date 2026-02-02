import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker, Button, message, Spin, Tabs, Row, Col, Checkbox, Modal, Space } from "antd";
import axios from "axios";
import FileUploadForm from "./FormPrefill";
import moment from "moment";
import { FormInputFeild } from "styles/components/FormControl";
import { useLocation, useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const { Option } = Select;

// const FormData = require('form-data');


const DynamicForm = ({ state, theme, isReviewStep, onNext, onUpdateFormData }) => {
 
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [industryOptions, setIndustryOptions] = useState([]);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: null });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  // const [riskValuesData, ] = useState({});
  // const [coverageValuesData, ] = useState({});
  //   const [finalSubmissionData, setFinalSubmissionData] = useState(null);
  
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // const [prefillDataCache, ] = useState({});
  const [currentTab, setCurrentTab] = useState('risk_values'); // or whatever your tab value is

  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [];
  // const { mutateAsync: fetchTextract } = usePost();
  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axios.post(
          "https://sandbox.heraldapi.com/applications",
          {
            products: selectedProducts
          },
          {
            headers: {
              Authorization: `Bearer E4xGG8aD+6kcbID50Z7dfntunn8wsHvXKxb5gBB1pdw=`,
            },
          }
        );

        if (response.data && response.data.application) {
          setApplicationData(response.data.application);

          const hasIndustryField = response.data.application.risk_values.some(
            (field) => field.parameter_text.agent_facing_text === "Industry classification"
          );
          if (hasIndustryField) {
            fetchIndustryOptions();
          }
        } else {
          throw new Error("Invalid application data format received from API.");
        }
      } catch (error) {
        console.error("Error fetching application data:", error);
        message.error("Failed to fetch application data.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, []);


  const fetchIndustryOptions = async () => {
    try {
      const response = await axios.get("https://sandbox.heraldapi.com/classifications/naics_index_entries", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer E4xGG8aD+6kcbID50Z7dfntunn8wsHvXKxb5gBB1pdw=",
        },
      });
      if (response.data && response.data.classifications) {
        const classifications = response.data.classifications.map((item) => ({
          value: item.naics_2017_6_digit,
          label: `${item.naics_2017_6_digit_description} (${item.naics_2017_6_digit})`,
        }));
        setIndustryOptions(classifications);
      }
    } catch (error) {
      console.error("Error fetching industry classification data:", error);
      message.error("Failed to fetch industry classification data.");
    }
  };
    const handleNext = async () => {
      try {
          const values = await form.validateFields();
          onUpdateFormData(currentTab, values);

          if (currentTab === "risk_values") {
              setCurrentTab("coverage_values");
          } else if (currentTab === "coverage_values") {
              onNext(); // Move to next step in parent component
          }
      } catch (errorInfo) {
          console.log('Form validation failed:', errorInfo);
          message.error('Please fill in all required fields correctly.');
      }
  }; 
 
  const handleSubmit = async () => {
    try {
      // Validate and save Coverage Values data
      const coverageValues = await form.validateFields(
        applicationData.coverage_values.map(
          (field) => field.coverage_parameter_id
        )
      );

      // Validate Risk Values data
      const riskValues = await form.validateFields(
        applicationData.risk_values.map(
          (field) => field.risk_parameter_id
        )
      );

      // Prepare the update payload matching the JSON structure
      const updatePayload = {
        status: "complete",
        coverage_values: [
          { coverage_parameter_id: "cvg_o3mw_cyb_effective_date", value: coverageValues["cvg_o3mw_cyb_effective_date"] || "2025-01-22" },
          { coverage_parameter_id: "cvg_agj9_cyb_aggregate_limit", value: coverageValues["cvg_agj9_cyb_aggregate_limit"] || 2000000 },
          { coverage_parameter_id: "cvg_64oi_cyb_business_income_coverage_limit", value: coverageValues["cvg_64oi_cyb_business_income_coverage_limit"] || 250000 },
          { coverage_parameter_id: "cvg_mov6_cyb_social_engineering_limit", value: coverageValues["cvg_mov6_cyb_social_engineering_limit"] || 1000000 },
          { coverage_parameter_id: "cvg_7fsk_cyb_aggregate_retention", value: coverageValues["cvg_7fsk_cyb_aggregate_retention"] || 2500 },
          { coverage_parameter_id: "cvg_orn9_cyb_waiting_period", value: coverageValues["cvg_orn9_cyb_waiting_period"] || 8 },
          { coverage_parameter_id: "cvg_4sh1_cyb_social_engineering_deductible", value: coverageValues["cvg_4sh1_cyb_social_engineering_deductible"] || 65511 },
          { coverage_parameter_id: "cvg_ckn4_cyb_per_claim_retention", value: coverageValues["cvg_ckn4_cyb_per_claim_retention"] || 914708 },
          { coverage_parameter_id: "cvg_qd4i_cyb_retroactive_date", value: coverageValues["cvg_qd4i_cyb_retroactive_date"] || "1953-10-09" },
          { coverage_parameter_id: "cvg_lw22_cyb_computer_fraud_endorsement", value: coverageValues["cvg_lw22_cyb_computer_fraud_endorsement"] || "yes" }
        ],
        risk_values: [
          { risk_parameter_id: "rsk_m4p9_insured_name", value: riskValues["rsk_m4p9_insured_name"] || "Anwesha Bose" },
          { risk_parameter_id: "rsk_voe4_cyb_security_officer", value: riskValues["rsk_voe4_cyb_security_officer"] || "yes" },
          { risk_parameter_id: "rsk_t79b_insured_contact_name", value: riskValues["rsk_t79b_insured_contact_name"] || "nlopRJgaxtYOieHXpmUmrvXrjIzZLhnLhpmUfiKbQKsHKOcyddnNXlwdkxVc" },
          { risk_parameter_id: "rsk_5p6w_insured_contact_email", value: riskValues["rsk_5p6w_insured_contact_email"] || "Roberta.Hermiston@gmail.com" },
          { risk_parameter_id: "rsk_14kt_insured_contact_phone", value: riskValues["rsk_14kt_insured_contact_phone"] || "0554089110" },
          {
            risk_parameter_id: "rsk_tvm3_mailing_address", value: riskValues["rsk_tvm3_mailing_address"] || {
              line1: "6965 Grove Road",
              organization: "Metz - Borer",
              city: "San Francisco",
              state: "MI",
              postal_code: "97275",
              country_code: "USA"
            }
          },
          { risk_parameter_id: "rsk_b3jm_2017_naics_index", value: riskValues["rsk_b3jm_2017_naics_index"] || "uxwi4q" },
          { risk_parameter_id: "rsk_k39d_number_of_employees", value: riskValues["rsk_k39d_number_of_employees"] || 3597033 },
          { risk_parameter_id: "rsk_vrb1_total_annual_revenue", value: riskValues["rsk_vrb1_total_annual_revenue"] || 568883231 },
          { risk_parameter_id: "rsk_4b4x_years_of_operation", value: riskValues["rsk_4b4x_years_of_operation"] || 908 },
          { risk_parameter_id: "rsk_6onk_entity_type", value: riskValues["rsk_6onk_entity_type"] || "Independent" },
          { risk_parameter_id: "rsk_7ahp_has_domain", value: riskValues["rsk_7ahp_has_domain"] || "yes" },
          { risk_parameter_id: "rsk_dy7r_domain_names", value: riskValues["rsk_dy7r_domain_names"] || "www.extraneous-text.biz", instance: "domain_names_1" },
          { risk_parameter_id: "rsk_2i59_ownership_type", value: riskValues["rsk_2i59_ownership_type"] || "Non-Corporates" },
          {
            risk_parameter_id: "rsk_h8oi_high_risk_industry_type", value: riskValues["rsk_h8oi_high_risk_industry_type"] || [
              "Payment Processing (e.g., as a payment processor, merchant acquirer, or Point of Sale system vendor)",
              "Gambling",
              "Adult Content",
              "Managed IT service provider (MSP or MSSP)",
              "Cannabis",
              "Debt collection agency"
            ]
          },
          { risk_parameter_id: "rsk_a18w_stored_records_type", value: riskValues["rsk_a18w_stored_records_type"] || ["None of the above"] },
          { risk_parameter_id: "rsk_e73e_cyb_authenticating_fund_transfers", value: riskValues["rsk_e73e_cyb_authenticating_fund_transfers"] || "no" },
          { risk_parameter_id: "rsk_tw5r_dual_authentication", value: riskValues["rsk_tw5r_dual_authentication"] || "For all requests" },
          { risk_parameter_id: "rsk_zk4f_cyb_verifies_bank_accounts", value: riskValues["rsk_zk4f_cyb_verifies_bank_accounts"] || "yes" },
          { risk_parameter_id: "rsk_d6el_secure_backup", value: riskValues["rsk_d6el_secure_backup"] || "yes" },
          { risk_parameter_id: "rsk_y8ve_secure_backup_offline", value: riskValues["rsk_y8ve_secure_backup_offline"] || "no" },
          { risk_parameter_id: "rsk_64p7_data_encryption", value: riskValues["rsk_64p7_data_encryption"] || ["De-identify sensitive data at rest"] },
          { risk_parameter_id: "rsk_5m1o_cyb_cloud_storage", value: riskValues["rsk_5m1o_cyb_cloud_storage"] || "yes" },
          {
            risk_parameter_id: "rsk_un9n_network_authentication", value: riskValues["rsk_un9n_network_authentication"] || [
              "All web-based email accounts",
              "Local and remote access to privileged user/network administrator accounts"
            ]
          },
          { risk_parameter_id: "rsk_6ril_cyb_security_training", value: riskValues["rsk_6ril_cyb_security_training"] || "yes" },
          { risk_parameter_id: "rsk_s9i6_is_franchise", value: riskValues["rsk_s9i6_is_franchise"] || "yes" },
          { risk_parameter_id: "rsk_jb26_cyb_has_claims_history", value: riskValues["rsk_jb26_cyb_has_claims_history"] || "no" },
          { risk_parameter_id: "rsk_o23k_cyb_has_claims_history_within_five_years", value: riskValues["rsk_o23k_cyb_has_claims_history_within_five_years"] || "no" },
          {
            risk_parameter_id: "rsk_78cv_cyb_claim_event", value: riskValues["rsk_78cv_cyb_claim_event"] || {
              amount: 71680852,
              description: "extend visionary e-business claim",
              date: "2023-01-23"
            }, instance: "cyb_claim_event_1"
          },
          { risk_parameter_id: "rsk_ggy8_cyb_warranty", value: riskValues["rsk_ggy8_cyb_warranty"] || "no" },
          { risk_parameter_id: "rsk_w6ug_herald_attestation", value: riskValues["rsk_w6ug_herald_attestation"] || "agree" }
        ],
        products: state?.selectedProducts || []
      };

      console.log("Updating application with payload:", JSON.stringify(updatePayload, null, 2));

      // Call PUT method to update application
      const updateResponse = await axios.put(
        `https://sandbox.heraldapi.com/applications/d2dfeaf3-0808-4857-b3ff-300111a7bbc0`,
        updatePayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer E4xGG8aD+6kcbID50Z7dfntunn8wsHvXKxb5gBB1pdw='
          },
        }
      );

      if (updateResponse.data) {
        // Store the update response for submission
        // setFinalSubmissionData(updateResponse.data);

        // Open confirmation modal
        setIsConfirmationModalVisible(true);
      }

    } catch (error) {
      console.error("Full error object:", error);

      // Detailed error logging
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }

      // More comprehensive error handling
      const errorMessage = error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        'Failed to update the application. Please try again.';

      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      });

      setIsModalVisible(true);
    }
  };
 
  const handleFinalSubmission = async () => {
    try {
      const submissionPayload = {
        "producer_id": "61584f10-c8ba-42bc-9cf2-c40cda1fcfe8",
        "application": {
          "id": "d2dfeaf3-0808-4857-b3ff-300111a7bbc0"
        }
      };
  
      // Close confirmation modal
      setIsConfirmationModalVisible(false);
  
      // Call POST method for submission
      const submissionResponse = await axios.post(
        "https://sandbox.heraldapi.com/submissions",
        submissionPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer E4xGG8aD+6kcbID50Z7dfntunn8wsHvXKxb5gBB1pdw=',
            flexible_submissions: ''
          },
        }
      );
  
      if (submissionResponse.data) {
        const submissionId = submissionResponse.data.submission.id;
        
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully!',
        });
        
        setIsModalVisible(true);
        
        // Navigate to quote page with submissionId and selected products
        navigate('/quote-page', {
          state: {
            submissionId: submissionId,
            selectedProducts: selectedProducts // Assuming you have selectedProducts in your state
          }
        });
   
     
        console.log("Submission Success response:", submissionResponse.data);
      }
    } catch (error) {
      console.error("Full error object:", error);
      
      // Detailed error logging
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
  
      // More comprehensive error handling
      const errorMessage = error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        'Failed to submit the application. Please try again.';
  
      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      });
  
      setIsModalVisible(true);
    }
  };
 
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://sandbox.heraldapi.com/applications/d2dfeaf3-0808-4857-b3ff-300111a7bbc0",
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer E4xGG8aD+6kcbID50Z7dfntunn8wsHvXKxb5gBB1pdw=",
          },
        }
      );
   
      if (response.data && response.data.application) {
        const { risk_values = [] } = response.data.application;
       
        // Create an object to store the field values
        const updatedValues = {};
       
        risk_values.forEach(field => {
          const fieldId = field.risk_parameter_id;
          if (fieldId && field.value !== undefined) {
            updatedValues[fieldId] = field.value;
          }
        });
   
        // Update the form with new values
        form.setFieldsValue(updatedValues);
        message.success("Form updated successfully!");
      }
    } catch (error) {
      console.error("Error updating form:", error);
      message.error("Failed to update the form: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };
   
  const renderModalContent = () => {
    const isSuccess = submitStatus.type === 'success';

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: isSuccess ? '#52c41a' : '#ff4d4f'
        }}>
          {isSuccess ? '✓' : '✕'}
        </div>
        <p style={{
          fontSize: '16px',
          marginBottom: '24px',
          color: isSuccess ? '#52c41a' : '#ff4d4f'
        }}>
          {submitStatus.message}
        </p>
        <Space>
          <Button onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
          {isSuccess && (
            <Button type="primary" onClick={() => {
              setIsModalVisible(false);
              onNext();
            }}>
              Get Quote
            </Button>
          )}
        </Space>
      </div>
    );
  };
  const renderConfirmationModal = () => {
    return (
      <Modal
        title="Confirm Submission"
        open={isConfirmationModalVisible}
        onCancel={() => setIsConfirmationModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsConfirmationModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleFinalSubmission}>
            Confirm Submission
          </Button>
        ]}
      >
        <p>Are you sure you want to submit the application?</p>
        <p>Please review all details before confirming.</p>
      </Modal>
    );
  };
  const renderFormFields = (data) => {
    if (!data || data.length === 0) {
      return <p>No fields available.</p>;
    }

    const groupedSections = data.reduce((acc, field) => {
      const { section } = field;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(field);
      return acc;
    }, {});

    return (
      <div>
        {currentTab === "risk_values" && (
  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
    <FileUploadForm 
      form={form}
      applicationData={applicationData} // Pass the full application data
    />
    <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
  </div>
)}
        <Form
          form={form}
          layout="vertical"
          onFinishFailed={(errorInfo) => {
            console.log('Form validation failed:', errorInfo);
            setSubmitStatus({
              type: 'error',
              message: 'Please fill in all required fields correctly.',
            });
            setIsModalVisible(true);
          }}

        >
          <Row gutter={16}>
            {["Basic Information", "Risk Information"].map((sectionName) => (
              <Col span={12} key={sectionName}>
                <div style={{ marginBottom: 24 }}>
                  {/* Render the fields without the heading */}
                  {groupedSections[sectionName]?.map((field) => renderField(field))}
                  {/* Only show MapView in Risk Information section AND when currentTab is risk_values */}
                  {sectionName === "Risk Information" && currentTab === "risk_values" && (
                    <div style={{ marginTop: 16 }}>
                      {/* Add additional content here if needed */}
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
          {Object.entries(groupedSections)
            .filter(([sectionName]) => !["Basic Information", "Risk Information"].includes(sectionName))
            .map(([sectionName, fields]) => (
              <div key={sectionName} style={{ marginBottom: 24 }}>
                <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: 8 }}>{sectionName}</h3>
                {fields.map((field) => renderField(field))}
              </div>
            ))}

          {currentTab !== "risk_values" && (
            <Form.Item>
              {/* Optional Submit Button */}
            </Form.Item>
          )}
        </Form>
      </div>
    );

  };
  const renderField = (field) => {
    const { risk_parameter_id, coverage_parameter_id, parameter_text, input_type, schema, section } = field;
    const fieldKey = risk_parameter_id || coverage_parameter_id;

    // Special handling for "Terms and Conditions"
    if (section === "Terms and Conditions") {
      return (
        <div key={fieldKey} style={{ marginBottom: 16 }}>
          {/* Render applicant_agree_to_text if available */}
          {parameter_text?.applicant_agree_to_text && (
            <div
              style={{
                maxHeight: "200px", // Set a fixed height
                overflowY: "auto", // Enable vertical scrolling
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{parameter_text.applicant_agree_to_text}</p>
            </div>
          )}
          <Form.Item
            name={fieldKey}
            valuePropName="checked" // Handle checkbox state
            rules={[
              {
                required: false,
                message: "You must agree to the Terms and Conditions.",
              },
            ]}
          >
            <Checkbox>{schema?.title || "I Agree"}</Checkbox>
          </Form.Item>
        </div>
      );
    }

    switch (input_type) {
      case "short_text":
        // Check if the field is specifically for "Industry classification"
        if (parameter_text.agent_facing_text === "Industry classification") {
          return (
            <Form.Item
              key={fieldKey}
              name={fieldKey}
              label={parameter_text.agent_facing_text}
              rules={[{ required: false, message: `Please select ${parameter_text.agent_facing_text}` }]}
            >
              <Select placeholder={`Select ${parameter_text.agent_facing_text}`}>
                {industryOptions &&
                  industryOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          );
        }

        // Default `short_text` case for other fields
        return (
          <FormInputFeild theme={theme}>
            <Form.Item
              key={fieldKey}
              name={fieldKey}
              label={parameter_text.agent_facing_text}
              rules={[{ required: false, message: `Please enter ${parameter_text.agent_facing_text}` }]}
            >
              <Input placeholder={`Enter ${parameter_text.agent_facing_text}`} />
            </Form.Item>
          </FormInputFeild>
        );

      case "integer":
        return (
          <FormInputFeild theme={theme}>
            <Form.Item
              key={fieldKey}
              name={fieldKey}
              label={parameter_text.agent_facing_text}
              rules={[{ required: false, message: `Please enter ${parameter_text.agent_facing_text}` }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder={`Enter ${parameter_text.agent_facing_text}`} />
            </Form.Item>
          </FormInputFeild>
        );
      case "email":
        return (
          <Form.Item
            key={fieldKey}
            name={fieldKey}
            label={parameter_text.agent_facing_text}
            rules={[{ required: false, message: `Please enter ${parameter_text.agent_facing_text}` }]}
          >
            <Input style={{ width: "100%" }} placeholder={`Enter ${parameter_text.agent_facing_text}`} />
          </Form.Item>
        );
      case "phone":
        return (
          <Form.Item
            key={fieldKey}
            name={fieldKey}
            label={parameter_text.agent_facing_text}
            rules={[{ required: false, message: `Please enter ${parameter_text.agent_facing_text}` }]}
          >
            <Input style={{ width: "100%" }} placeholder={`Enter ${parameter_text.agent_facing_text}`} />
          </Form.Item>
        );
      case "select_one":
        return (
          <Form.Item
            key={fieldKey}
            name={fieldKey}
            label={parameter_text.agent_facing_text}
            rules={[{ required: false, message: `Please select ${parameter_text.agent_facing_text}` }]}
          >
            <Select placeholder={`Select ${parameter_text.agent_facing_text}`}>
              {schema.enum &&
                schema.enum.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        );
        case "select_many":
          return (
            <Form.Item
              key={fieldKey}
              name={fieldKey}
              label={parameter_text.agent_facing_text}
              rules={[{ required: false, message: `Please select ${parameter_text.agent_facing_text}` }]}
            >
              <Select
                mode="multiple"  // Enable multiple selection
                placeholder={`Select ${parameter_text.agent_facing_text}`}
                style={{ width: '100%' }}
                allowClear  // Allow clearing all selections
              >
                {schema.items?.enum?.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
      case "date":
        return (
          <Form.Item
            key={fieldKey}
            name={fieldKey}
            label={parameter_text.agent_facing_text}
            rules={[
              { required: false, message: `Please select ${parameter_text.agent_facing_text}` },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const selectedDate = moment(value);
                  const minDate = moment(schema.min_date);
                  const maxDate = moment(schema.max_date);

                  if (selectedDate.isBefore(minDate) || selectedDate.isAfter(maxDate)) {
                    return Promise.reject(
                      new Error(`Date must be between ${schema.min_date} and ${schema.max_date}`)
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            // Add getValueProps to format the date value before form submission
            getValueProps={(value) => ({
              value: value ? moment(value) : undefined
            })}
            // Add getValueFromEvent to format the date when it changes
            getValueFromEvent={(date) => {
              if (!date) return undefined;
              return moment(date).format('YYYY-MM-DD');
            }}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder={`Select ${parameter_text.agent_facing_text}`}
              format="YYYY-MM-DD"  // Explicitly set the display format
            />
          </Form.Item>
        );
      case "address":
        return (
          <div key={fieldKey}>
            <h4>{parameter_text.agent_facing_text}</h4>
            {Object.entries(schema.properties).map(([key, propertySchema]) => {
              const fullKey = `${fieldKey}.${key}`;
              //   const isRequired = schema.required.includes(key);
              return (
                <Form.Item
                  key={fullKey}
                  name={fullKey}
                  label={propertySchema.title}
                  rules={[
                    { required: false, message: `Please enter ${propertySchema.title}` },
                    propertySchema.min_length && {
                      min: propertySchema.min_length,
                      message: `Minimum length is ${propertySchema.min_length}`,
                    },
                    propertySchema.max_length && {
                      max: propertySchema.max_length,
                      message: `Maximum length is ${propertySchema.max_length}`,
                    },
                    propertySchema.pattern && {
                      pattern: new RegExp(propertySchema.pattern),
                      message: `Invalid ${propertySchema.title}`,
                    },
                  ]}
                >
                  {propertySchema.enum ? (
                    <Select placeholder={`Select ${propertySchema.title}`}>
                      {propertySchema.enum.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Input placeholder={`Enter ${propertySchema.title}`} />
                  )}
                </Form.Item>
              );
            })}
          </div>
        );
     
        case "currency": // New case for currency input type
        return (
          <Form.Item
            key={fieldKey}
            name={fieldKey}
            label={parameter_text.agent_facing_text}
            rules={[
              { required: false, message: `Please enter ${parameter_text.agent_facing_text}` },
              { type: "number", min: schema.minimum, max: schema.maximum, message: `Value must be between ${schema.minimum} and ${schema.maximum}` },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder={`Enter ${parameter_text.agent_facing_text}`}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // Format as currency
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")} // Parse currency back to number
            />
          </Form.Item>
        );
      //   case "select_one":
      //     const isIndustryField = parameter_text.agent_facing_text === "Industry classification";
      //     const options = isIndustryField ? industryOptions : schema.enum;

      //     return (
      //       <Form.Item
      //         key={fieldKey}
      //         name={fieldKey}
      //         label={parameter_text.agent_facing_text}
      //         rules={[{ required: false, message: `Please select ${parameter_text.agent_facing_text}` }]}
      //       >
      //         <Select placeholder={`Select ${parameter_text.agent_facing_text}`}>
      //           {options &&
      //             options.map((option) => (
      //               <Option key={option.code || option} value={option.code || option}>
      //                 {option.title || option}
      //               </Option>
      //             ))}
      //         </Select>
      //       </Form.Item>
      //     );

      default:
        return null;
    }
  };


  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "auto", marginTop: "20%" }} />;
  }

  if (!applicationData) {
    return <p style={{ textAlign: "center", marginTop: "20%" }}>No application data available.</p>;
  }


  return (
    <>
      <Tabs
        activeKey={currentTab}
        onChange={setCurrentTab}
      >
        <TabPane tab="Risk Values" key="risk_values">
          {renderFormFields(applicationData.risk_values)}
        </TabPane>
        <TabPane tab="Coverage Values" key="coverage_values">
          {renderFormFields(applicationData.coverage_values)}
        </TabPane>
      </Tabs>

      {!isReviewStep && (
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button type="primary" onClick={handleNext}>
            {currentTab === "risk_values" ? "Update: Coverage Values" : "Review"}
          </Button>
        </div>
      )}

      {isReviewStep && (
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button type="primary" onClick={handleSubmit}>
            Submit Application
          </Button>
        </div>
      )}

      <Modal
        title={submitStatus.type === 'success' ? "Success!" : "Error"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        {renderModalContent()}
      </Modal>

      {renderConfirmationModal()}
    </>
  );
};
export default DynamicForm;
