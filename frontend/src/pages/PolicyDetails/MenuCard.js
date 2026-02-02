import React from 'react'
import startTransectionIcon from "assets/svg/start-transection-icon.svg";
import billingIcon from "assets/svg/billing-history-icon.svg";
import claimIcon from "assets/svg/claim-icon.svg";
import fileUploadIcon from "assets/svg/file-upload-icon.svg";
import { PolicyDashboardCard } from "styles/pages/PolicyDetails";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useMetaData from 'context/metaData';

const MenuCard = ({ policyNumber }) => {
  const {theme}=useMetaData();
  const navigate = useNavigate();
  const handleClaim = () =>{
    navigate('/claim', {state:policyNumber})
  }
  const handleFileUpload = () =>{
    navigate('/uploadDocuments', {state:policyNumber})
  }
    
  return (
    <PolicyDashboardCard theme={theme}>
      <div className="card-block">
        <div className="card-icon">
          <img src={startTransectionIcon} alt="Start Transaction" />
        </div>
        <div className="card-text"><Link to='/start-transaction'>Start Transaction</Link></div>
      </div>
      <div className="card-block">
        <div className="card-icon">
          <img src={billingIcon} alt="Billing" />
        </div>
        <div className="card-text">
          <Link to={{ pathname: '/billing', state: { policyNumber} }}>Billing</Link>
        </div>
      </div>

      <div className="card-block">
        <div className="card-icon">
          <img src={fileUploadIcon} alt="File Upload" />
        </div>
        <div className="card-text">
          <a onClick={()=>handleFileUpload(policyNumber)}>File Upload</a>
        </div>
      </div>
      <div className="card-block">
        <div className="card-icon">
          <img src={claimIcon} alt="Claim" />
        </div>
        <div className="card-text"> <a onClick={()=>handleClaim(policyNumber)}>File Claim</a></div>
      </div>
    </PolicyDashboardCard>
  );
};

export default MenuCard;
