import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./Submission.css";

const Submissions = () => {
  const navigate = useNavigate(); // Initialize navigate for routing

  const [submissions, setSubmissions] = useState([
    {
      id: "00123",
      account: "Example account 1",
      underwriter: "John Doe",
      createdBy: "Mary Adams",
      lob: "Commercial Property",
      submittedOn: "09/06/2023",
      priority: "High",
      status: "Submitted",
      clearance: "Cleared",
      documents: "Documents 1",
    },
    {
      id: "00124",
      account: "Example account 2",
      underwriter: "Jane Smith",
      createdBy: "Paul Johnson",
      lob: "Commercial Auto",
      submittedOn: "09/04/2023",
      priority: "Medium",
      status: "Draft",
      clearance: "In progress",
      documents: "Documents 2",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newSubmission, setNewSubmission] = useState({
    id: "",
    account: "",
    underwriter: "",
    createdBy: "",
    lob: "",
    submittedOn: "",
    priority: "High",
    status: "Submitted",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Handle click on "Clearance" to navigate to Clearance component
  const handleClearanceClick = () => {
    navigate("/clearancescreen");
  };

  const handleDocumentClick = () => {
    navigate("/documentscreen");
  };



  const filteredSubmissions = submissions.filter((submission) =>
    filter === "all" ? true : submission.status === filter
  );

  return (
    <div className="content">
      <h2 style={{textAlign:'center',backgroundColor:'#1d4ed8', color:'white',marginBottom:'30px',borderRadius: '5px'}}>Submissions</h2>

      <div className="container" style={{width:'100%'}}>
        <div className="submission-card-container" style={{justifyContent:'space-between', width: '100%'}}>
          <div className="submissioncard" onClick={() => setFilter("all")}>
            <h4>All Submission</h4>
            <p>({submissions.length})</p>
          </div>
          <div className="submissioncard" onClick={() => setFilter("Submitted")}>
            <h4>Pending Clearance</h4>
            <p>({submissions.filter((s) => s.status === "Submitted").length})</p>
          </div>
          <div className="submissioncard" onClick={() => setFilter("Draft")}>
            <h4>Rejected</h4>
            <p>({submissions.filter((s) => s.status === "Draft").length})</p>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <table id="dataTable" style={{marginTop:'80px'}}>
        <thead>
          <tr>
            <th>Submission ID</th>
            <th>Account</th>
            <th>Underwriter</th>
            <th>Created By</th>
            <th>LOB</th>
            <th>Submitted On</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Clearance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.id}</td>
              <td>{submission.account}</td>
              <td>{submission.underwriter}</td>
              <td>{submission.createdBy}</td>
              <td>{submission.lob}</td>
              <td>{submission.submittedOn}</td>
              <td><div className={`priority-box ${submission.priority.toLowerCase()}`}>{submission.priority}</div></td>
              <td>{submission.status}</td>
              {/* Make clearance clickable with blue link style */}
              <td>
                <span 
                  className="clearance-link" 
                  onClick={handleClearanceClick} 
                  style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                >
                  {submission.clearance}
                </span>
              </td>
              <td>
              <span 
                  className="document-link" 
                  onClick={handleDocumentClick} 
                  style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                >
                  {submission.documents}
                </span>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* The Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>New Submission</h2>

            {/* <input
              type="text"
              placeholder="Submission ID"
              value={newSubmission.id}
              onChange={(e) => setNewSubmission({ ...newSubmission, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Account"
              value={newSubmission.account}
              onChange={(e) => setNewSubmission({ ...newSubmission, account: e.target.value })}
            />
            <input
              type="text"
              placeholder="Underwriter"
              value={newSubmission.underwriter}
              onChange={(e) => setNewSubmission({ ...newSubmission, underwriter: e.target.value })}
            />
            <input
              type="text"
              placeholder="Created By"
              value={newSubmission.createdBy}
              onChange={(e) => setNewSubmission({ ...newSubmission, createdBy: e.target.value })}
            />
            <input
              type="text"
              placeholder="LOB"
              value={newSubmission.lob}
              onChange={(e) => setNewSubmission({ ...newSubmission, lob: e.target.value })}
            />
            <input
              type="date"
              value={newSubmission.submittedOn}
              onChange={(e) => setNewSubmission({ ...newSubmission, submittedOn: e.target.value })}
            /> */}
            <select
              value={newSubmission.priority}
              onChange={(e) => setNewSubmission({ ...newSubmission, priority: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={newSubmission.status}
              onChange={(e) => setNewSubmission({ ...newSubmission, status: e.target.value })}
            >
              <option value="Submitted">Submitted</option>
              <option value="Draft">Draft</option>
            </select>

           
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;
