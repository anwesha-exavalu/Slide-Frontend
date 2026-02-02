import React, { useState } from "react";
import "./UWQuestions.css";
import { Col, Row, Button, Popover } from "antd";
// import Documents from "../../layout/RightSidebar";
import ModalDesign from "../../layout/Modal";
import FormInput from "../../components/FormInput";
import DropdownSelect from "../../components/FormDropdown";
import PriorityPopup from "../../SidebarComponents/PriorityPopup";

const uwquestionsData = [
  {
    question: "Is the applicant a subsidiary of another entity?",
    response: "no",
    comment:
      "The applicant operates independently and is not owned by another entity.",
  },
  {
    question: "Does the applicant have any subsidiaries?",
    response: "yes",
    comment:
      "The applicant has subsidiaries, which may affect risk assessment.",
  },
  {
    question: "Is a formal safety program in operation?",
    response: "no",
    comment: "There is no formal safety program in place to mitigate risks.",
  },
  {
    question: "Any exposure to flammables, explosives, and chemicals?",
    response: "na",
    comment:
      "Not applicable; the applicant does not engage in activities involving flammables or explosives.",
  },
  {
    question: "Any other insurance with this company?",
    response: "no",
    comment:
      "The applicant does not hold any additional policies with our company.",
  },
  {
    question:
      "Any policy or coverage declined, canceled, or non-renewed during the prior 3 years?",
    response: "na",
    comment:
      "Not applicable; no relevant history of declined or canceled policies.",
  },
  {
    question: "Any uncorrected fire code violations?",
    response: "yes",
    comment:
      "There are existing fire code violations that need to be addressed.",
  },
  {
    question:
      "Has the applicant had a foreclosure, repossession, or bankruptcy during the last five years?",
    response: "no",
    comment:
      "The applicant has not faced any financial setbacks in the past five years.",
  },
];

const UWQuestions = ({ onNext }) => {
  const [questions, setQuestions] = useState(uwquestionsData);
  const [notes, setNotes] = useState(" ");
  // const [uwnotes, setUWNotes] = useState("");

  // const handleResponseChange = (index, newResponse) => {
  //   const updatedQuestions = [...questions];
  //   updatedQuestions[index].response = newResponse;
  //   setQuestions(updatedQuestions);
  // };

  const handleCommentChange = (index, newComment) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].comment = newComment;
    setQuestions(updatedQuestions);
  };
  const record = {
    client: "Kew Gardens Property",
    lob: "Commercial Property"
  };

  return (
    <Row>
      <Col span={24}>
        <div className="mainContainer" id="uw">
          {/* <div className="side-by-side-container"> */}
          <div className="uw-questions-section">
            <h2>UW Questions</h2>
            <table id="underwriting-Table">
              <thead>
                <tr>
                  <th className="table-header" style={{ width: "40%" }}>
                    Questions
                  </th>
                  <th className="table-header" style={{ width: "15%" }}>
                    Response
                  </th>
                  <th className="table-header" style={{ width: "45%" }}>
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <b>{item.question}</b>
                    </td>
                    <td>
                      <DropdownSelect
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                          { value: "na", label: "Not Applicable" },
                        ]}
                        required={true}
                        value={item.response}
                      />
                    </td>
                    <td>
                      <FormInput
                        value={item.comment}
                        onChange={(e) =>
                          handleCommentChange(index, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </div> */}
          </div>

          {/* System Recommended Decision */}



          {/* Override Decision Section */}
          <div
            className="override-decision-container"
            style={{ marginBottom: 20 }}
          >
            <h5>Notes</h5>
            <textarea
              className="notes"
              placeholder=""
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: "100%",
                minHeight: "100px",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #d9d9d9",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                resize: "vertical",
              }}
            />
            <h5 style={{ marginTop: "20px" }}>Claim Propensity</h5>
            <div
              style={{
                padding: '16px',
                border: '1px solid #e1e1e1',
                borderRadius: '12px',
                display: 'block',
                width: '100%',
                backgroundColor: 'white',
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                transition: 'box-shadow 0.2s ease-in-out',
                marginBottom: '20px'
              }}
            >
              <Popover
                content={<PriorityPopup predictionData="Medium" record={record} />}
                trigger="click"
                placement="topLeft"
                overlayStyle={{ width: 500 }}
              >
                <Button
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: "16px",
                    width:"150px",
                    height:"40px",
                    padding: "5px 20px", // Balanced padding for better spacing
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    fontWeight: "600",
                    borderRadius: "4px", // Rounded corners for a modern look
                    color: "white",
                    backgroundColor:"#FAAF25",
                    border: "none",
                    cursor: "pointer",
                    lineHeight: "1.5", // Ensures text is vertically centered
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  Risk - Medium
                </Button>
              </Popover>
            </div>
            <div className="decision-container">
              <ModalDesign />
            </div>
          </div>
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
          </Row>
        </div>
      </Col>
      {/* Uncomment and use if Documents component is needed in future */}
      {/* <Col span={4}>
        <Documents />
      </Col> */}
    </Row>
  );
};

export default UWQuestions;