
import React from 'react';
import viewIcon from 'assets/svg/view.svg';
import { Link } from 'react-router-dom';

export const columns = [
  {
    title: "Policy",
    dataIndex: "policy",
    key: "policy",
    sorter:(a, b) => a.policy - b.policy,
  },
  {
    title: "Claim",
    dataIndex: "claim",
    key: "claim",
    sorter:true,
  },
  {
    title: "Claim Date",
    dataIndex: "claimDate",
    key: "claimDate",
    sorter:(a, b) => a.claimDate.localeCompare(b.claimDate),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter:(a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Agent",
    dataIndex: "agent",
    key: "agent",
    sorter:(a, b) => a.agent.localeCompare(b.agent),
  },
  {
    title: "Agent Name",
    dataIndex: "agentName",
    key: "agentName",
    sorter:(a, b) => a.agentName.localeCompare(b.agentName),
  },
  {
    dataIndex: "actions",
    key: "actions",
    render: () => (
      <div style={{display :'flex',gap: '10px',width:'18px',height:'18px'}}>
        <Link to="/viewClaims"><img  src={viewIcon} alt="View" /></Link>          
      </div>
    ),
  },
];

export const dataSource = [
  {
    key: "1",
    policy: "PA7895720",
    claim: "CL0000210",
    claimDate: "26/07/23",
    status: "Confirmed",
    agent: "XXX",
    agentName: "Sam Wilson",
  },
  {
    key: "2",
    policy: "PA07895733",
    claim: "CL0000312",
    claimDate: "20/09/24",
    status: "Cancelled",
    agent: "YYY",
    agentName: "Sam Wilson",
  },
  {
    key: "3",
    policy: "PA07895730",
    claim: "CL0000551",
    claimDate: "26/07/24",
    status: "Confirmed",
    agent: "XXX",
    agentName: "Sam Wilson",
  },
];
