import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './AccountInfo.css';
import { Layout } from 'antd';
import PolicyCards from '../layout/PolicyCards';
import AccountInfoSublobs from './AccountInfoSublobs';
import AccountDashboard from './AccountDashboard';
import { FloatButton } from 'antd';


ChartJS.register(ArcElement, Tooltip, Legend);

const AccountInfo = () => {
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
  const [showAccountInfo, setShowAccountInfo] = useState(true); // Add state to control visibility of AccountInfo
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      {/* Account Information Section */}
      <div className="" style={{
        // padding: "5px 4px",
        marginBottom: "4px",
        // border: "1px solid #ccc",
        maxWidth: "1000px",
        marginLeft: "0"
      }}>
        <div
          className="account-info-content"
          style={{
            display: "flex",
            
            gap: "10px",
            // alignItems: "center",
            // fontSize: "0.9em"
          }}
        >
          <p style={{ display: "inline",  fontSize: "1.15rem" }}>
            <strong>Account Name:</strong> Skyline Property Inc.
          </p>
          <p style={{ display: "inline",  fontSize: "1.15rem" }}>
            <strong>Account No:</strong> 123456789
          </p>
          <p style={{ display: "inline",  fontSize: "1.15rem" }}>
            <strong>Organization Type:</strong> Property Management
          </p>
        </div>
      </div>

      <PolicyCards />

      <AccountInfoSublobs showAccount={setShowAccountInfo} />
      <FloatButton.BackTop />
    </Layout>
  );
};

export default AccountInfo;
