import React, { useState } from "react";
import "./DocumentScreen.css";

const DocumentScreen = () => {
  const [openDocs, setOpenDocs] = useState({
    doc1: false,
    doc2: false,
    doc3: false,
  });

  const toggleDocument = (docKey) => {
    setOpenDocs((prevState) => ({
      ...prevState,
      [docKey]: !prevState[docKey],
    }));
  };

  return (
    <div className="container">
      {/* Submission Information */}
      <div className="submission-info">
        <p>
          <span>Submission ID:</span> 00123
        </p>
        <p>
          <span>Account Name:</span> Example Account Name
        </p>
      </div>

      {/* Document 1 */}
      <div className="document-group">
        <div className="document-header" onClick={() => toggleDocument("doc1")}>
          <span className="title">e_loss_runs.pdf</span>
          <span className="toggle-btn">{openDocs.doc1 ? "-" : "+"}</span>
        </div>
        {openDocs.doc1 && (
          <div className="document-body">
            <div className="component">
              <div className="component-title">Loss Run (EASTERNALLIANCE)</div>
              <div className="component-info">
                <span className="type">Type: Loss Run</span>
                <span className="date">Updated: Jun 12, 2024</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document 2 */}
      <div className="document-group">
        <div className="document-header" onClick={() => toggleDocument("doc2")}>
          <span className="title">GREAT_WESTERN_LUMBER_ACORD_125.pdf</span>
          <span className="toggle-btn">{openDocs.doc2 ? "-" : "+"}</span>
        </div>
        {openDocs.doc2 && (
          <div className="document-body">
            <div className="component">
              <div className="component-title">ACORD 125 (2013/01)</div>
              <div className="component-info">
                <span className="type">Type: Acord</span>
                <span className="date">Updated: Jun 12, 2024</span>
              </div>
            </div>
            <div className="component">
              <div className="component-title">ACORD 140 (2007/09)</div>
              <div className="component-info">
                <span className="type">Type: Acord</span>
                <span className="date">Updated: Jun 12, 2024</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document 3 */}
      <div className="document-group">
        <div className="document-header" onClick={() => toggleDocument("doc3")}>
          <span className="title">SOV (Statement of Values)</span>
          <span className="toggle-btn">{openDocs.doc3 ? "-" : "+"}</span>
        </div>
        {openDocs.doc3 && (
          <div className="document-body">
            <div className="component">
              <div className="component-title">SOV Excel File</div>
              <div className="component-info">
                <span className="type">Type: Excel</span>
                <span className="date">Updated: Jun 12, 2024</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentScreen;
