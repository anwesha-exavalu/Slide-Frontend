import React from 'react';
import './AuditTrail.css';
import { Col, Row } from 'antd';
const AuditTrail = () => {
  return (
    <Row>
      <Col span={24}>
    <div className="content" id="AuditTrail">
    <h1 style={{textAlign:'center',backgroundColor:'#1d4ed8', color:'white',marginBottom:'30px',borderRadius: '5px'}}>Audit Trail</h1>

      <div className="section">
        <form id="AuditTrailForm">
          <table id="AuditTrailTable">
            <thead>
              <tr>
                <th> </th>
                <th>Date/time</th>
                <th>User ID</th>
                <th>Activity</th>
                <th>Case Status</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Case Log1</b></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td><b>Case Log2</b></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td><b>Case Log3</b></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td><b>Case Log4</b></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button type="submit"><b>Save</b></button>
          </div>
        </form>
      </div>
    </div>
    </Col>
    </Row>
  );
 
};

export default AuditTrail;
