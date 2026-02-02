import React from 'react';
import './ClearanceScreen.css'; // assuming you want to separate CSS

const ClearanceScreen = () => {
  return (
    <div className="container">
      <h1 style={{ textShadow: '4px 4px 5px rgba(0, 0, 0, 0.4)'}} >Clearance Screen</h1>

      {/* Clearance Table */}
      <table>
        <thead>
          <tr>
            <th style={{ fontSize: '20px', width: '100px' }}>Criteria</th>
            <th style={{ fontSize: '20px', width: '8px' }}>Check</th>
            <th style={{ fontSize: '20px', width: '20px' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="criteria">Complete Submission Package</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Missing property inspection report.</td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Incomplete application.</td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">Basic Eligibility Check</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Property located in a flood zone.</td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">High-risk manufacturing involvement.</td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">Broker/Agent Authorization</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Agent not accredited with the insurance company.</td>
            <td><span className="status-fail">X</span></td>
            <td>Agent validated</td>
          </tr>
          <tr>
            <td className="criteria">Loss Run or Claims History</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Multiple claims for water damage over the past few years.</td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Previous property damage claims under $5,000.</td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">Premium Thresholds</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">
              Submission meets the company’s $10,000 minimum premium requirement.
            </td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">Preliminary Property Valuation</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Submitted property value significantly higher than market value.</td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Property valued at industry standards.</td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">Reinsurance Consideration</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Reinsurance required for properties over $20 million in value.</td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">Basic Risk Mitigation Measures</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">
              No fire extinguishers or fire alarms in a large warehouse.
            </td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">
              Warehouse equipped with emergency exits and fire suppression systems.
            </td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">High-Level Financial Stability of Insured</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Business owner has a poor credit rating.</td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Ongoing financial issues with previous bankruptcies.</td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="criteria">Preliminary Zoning and Compliance Check</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Building violates local fire codes.</td>
            <td><span className="status-fail">X</span></td>
            <td></td>
          </tr>
          <tr>
            <td className="check">Building is properly zoned for commercial use.</td>
            <td><span className="status-pass">&#x2714;</span></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Actions */}
      <div className="actions">
        <div >
          <label htmlFor="actionDropdown" style={{ fontSize: '20px' }}>
            <h5>Action:</h5>
          </label>
          <select
            style={{
              height: '50px',
              width: '200px',
              borderRadius: '5px',
              border: '2px solid black',
            }}
          >
            <option value="cleared" style={{ fontSize: '16px' }}>
              Cleared
            </option>
            <option value="rejected" style={{ fontSize: '16px' }}>
              Rejected
            </option>
            <option value="referred" style={{ fontSize: '16px' }}>
              Referred
            </option>
          </select>
        </div>

        <div style={{ marginLeft: '350px' }}>
          <label htmlFor="underwriterDropdown">
           <h5>Assign to Underwriter:</h5> 
          </label>
          <select
            style={{
              height: '50px',
              width: '200px',
              borderRadius: '5px',
              border: '2px solid black',
            }}
          >
            <option value="uw1" style={{ fontSize: '16px' }}>
              Underwriter 1
            </option>
            <option value="uw2" style={{ fontSize: '16px' }}>
              Underwriter 2
            </option>
            <option value="uw3" style={{ fontSize: '16px' }}>
              Underwriter 3
            </option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <h4 style={{ textAlign: 'left' }}>Notes:</h4>
        <textarea
          placeholder="Notes"
          style={{ height: '100px', width: '1030px' }}
        ></textarea>
      </div>
    </div>
  );
};

export default ClearanceScreen;
