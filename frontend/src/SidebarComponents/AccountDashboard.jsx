import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './AccountInfo.css';
import { Layout } from 'antd';


ChartJS.register(ArcElement, Tooltip, Legend);

const AccountDashboard = () => {
  const pieChartData = {
    labels: [
      'Unbilled: $35,999.38',
      'Paid: $5,000.00',
      'Written off: $7,000.00',
      'Billed: $11,077.18',
      'Past Due: $1,000.18'
    ],
    datasets: [
      {
        label: 'Billing',
        data: [35999.38, 5000, 7000, 11077.18, 1000.18],
        backgroundColor: [
          '#4e79a7',
          '#59a14f',
          '#f28e2c',
          '#e15759',
          '#76b7b2'
        ],
        borderWidth: 1,
      },
    ],
  };
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };
  const navigate = useNavigate();
  const handleRowClick = () => {
    navigate('/accountinfo');
  };
  return (

    <Layout>
      <div id="details-section" style={{ backgroundColor: "white" }}>
        <div className="details-container" style={{ backgroundColor: "white" }}>
          {/* Account Information Section */}
          <div className="account-info">
            <h2 style={{marginLeft:"20px", textDecorationLine: "blink"}}>Details</h2>
            <div className="account-info-content" style={{ marginLeft: "20px" }}>
              <div>
                <p><strong>Account No:</strong> 123456789</p>
                <p><strong>Account Name:</strong>Skyline Property Inc.</p>
                <p><strong>Billing Address:</strong> 657-08 84th Avenue, Citadel, NY 15615</p>
                <p><strong>FEIN:</strong> 1234567</p>
                <p><strong>Contact No:</strong> (327)678-556</p>
              </div>
              <div className="additional-info">
                <p><strong>Organization Type:</strong> Business</p>
                <p><strong>Industry Code:</strong> 243107</p>
                <p><strong>Status:</strong> Active</p>
                <p><strong>Email Address:</strong> skylineprop@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Billing Section with Pie Chart */}
          <div className="chart-section">
            <Pie data={pieChartData} />
            <div className="billing-info">
              <p>Next Invoice Due: <strong>$5,000.00 (11/02/2024)</strong></p>
              <p>Last Payment: <strong>$7,000.00 (08/24/2024)</strong></p>
            </div>
          </div>
        </div>

        {/* Policy Terms Section */}
        <div className="policy-terms" >
          <h3>Policy Terms</h3>
          <table>
            <thead>
              <tr>
                <th>Policy#</th>
                <th >Product</th>
                <th>Status</th>
                <th>Dates Effective</th>
                <th>Premium</th>
                <th>Loss Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={handleRowClick}>
                <td> 7234238834</td>
                <td> Commercial Property</td>
                <td>Active</td>
                <td>01/01/2024-01/01/2025</td>
                <td>$12,000.00</td>
                <td></td>
              </tr>
              <tr>
                <td>7234238834</td>
                <td>General Liability</td>
                <td>Active</td>
                <td>01/01/2024-01/01/2025</td>
                <td>$5,000.00</td>
                <td></td>
              </tr>
              <tr>
                <td>7234238834</td>
                <td>Professional Liability</td>
                <td>Active</td>
                <td>01/01/2024-01/01/2025</td>
                <td>$4,000.00</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Claims Section */}
        <div className="claims-section">
          <h3>Claims</h3>
          <table>
            <thead>
              <tr>
                <th>Claim#</th>
                <th>Status</th>
                <th>Loss Date</th>
                <th>Loss Cause</th>
                <th>Product</th>
                <th>Policy#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AccountDashboard;
