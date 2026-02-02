import React, { useState } from "react";
import { Form, Button, Card, Row } from "antd";
import FormCheckBox from "components/FormControl/FormCheckBox";
import { HeraldProductWrapper } from "styles/pages/Herald";
import useMetaData from "context/metaData";
import { Container } from "styles/pages/Login";
import { useNavigate } from "react-router-dom";

const HeraldProduct = ({ onProductSelection }) => {
  const { theme } = useMetaData();
  const cyberRiskOptions = [
    { label: <b>At-Bay Cyber</b>, value: "prd_la3v_atbay_cyber" },
    { label: <b>Cowbell Cyber</b>, value: "prd_jk0g_cowbell_cyber" },
    { label: <b>Herald Cyber</b>, value: "prd_0050_herald_cyber" },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (checkedValues) => {
    setSelectedProducts(checkedValues);
    if (onProductSelection) {
      onProductSelection(checkedValues); // Pass selected products to parent or sibling
    }
  };

  const handleCreateApplication = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    // Navigate to the form page with the selected products
    navigate("/herald-form", { state: { selectedProducts } });
  };

  return (
    <HeraldProductWrapper theme={theme}>
      <Container>
        {/* <h1 className="topsection">Create a New Application</h1> */}
        {/* <p className="subtext">
          An <a href="/applications">application</a> is a series of inputs for a product or set of products. You can
          create an application using <code>/applications API</code> and including the <code>products</code> you&apos;d
          like.
        </p> */}
        <Card>
          <h2>Cyber Risk</h2>
          <Form>
            <Row
              gutter={10}
              style={{
                display: "flex",
                flexDirection:"column",
                flexWrap: "nowrap", // Prevent wrapping
                gap: "16px", // Space between checkboxes
                alignItems: "center",
              }}
            >
              <FormCheckBox
                name="cyberRisk"
                label=""
                options={cyberRiskOptions}
                required={false}
                onChange={handleCheckboxChange} // Update selected products
              />
            </Row>
            <Button
              type="primary"
              className="create-application-btn"
              onClick={handleCreateApplication}
            >
              Create Application
            </Button>
          </Form>
        </Card>
      </Container>
    </HeraldProductWrapper>
  );
};

export default HeraldProduct;
