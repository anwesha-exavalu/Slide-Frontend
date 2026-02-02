import React from 'react';
import './RightSidebar.css'; // CSS file for styling

import AIModal from './AIModal';
const Documents = () => {
  return (
    <div>
    <div className="sidebar">
      <h5 className="sidebar-header"> Documents</h5>
      <div className="sidebar-links">
        <a href="document1.pdf" target="_blank" rel="noopener noreferrer">
          Application Form
        </a>
        <a href="document2.pdf" target="_blank" rel="noopener noreferrer">
          Loss Run
        </a>
        <a href="document3.pdf" target="_blank" rel="noopener noreferrer">
          Corelogic Riskmeter
        </a>
      </div>
    </div>
    <div className="sidebar">
    {/* <h8 className="sidebar-headerai" >AI</h8> */}
      <h8 className="sidebar-header" >Suggestions</h8>
      <div className="sidebar-links" style={{marginTop:'20px'}}>
       
          <AIModal/>
       
      
      </div>
    </div>
    </div>
  );
};

export default Documents;
