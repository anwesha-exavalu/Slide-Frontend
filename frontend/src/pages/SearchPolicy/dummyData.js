import React from "react";
import printIcon from 'assets/svg/printer.svg';
import editIcon from 'assets/svg/edit.svg';
import viewIcon from 'assets/svg/view_blue.svg';
import samplePdf from "assets/files/sample.pdf";

const SearchPolicyConfig = (viewPolicyDetails,startTransaction) =>{
  const viewPdf=()=>{
    window.open(samplePdf, '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
  }
  const dataSource = [
    {
      key: "1",
      policyNumber: "880705",
      expiredDate: "03/08/24",
      insuranceName: "Sam Wilson",
      amountDue: "86075",
      product: "Personal Auto",
      premium: "186075",
      paymentFrequency: "Yearly",
      agentName: "Steve Vaccaro",
    },
    {
      key: "2",
      policyNumber: "880706",
      expiredDate: "04/08/24",
      insuranceName: "John Doe",
      amountDue: "45000",
      product: "Personal Auto",
      premium: "95000",
      paymentFrequency: "Yearly",
      agentName: "Jane Smith",
    },
    {
      key: "3",
      policyNumber: "880707",
      expiredDate: "05/08/24",
      insuranceName: "Emily Davis",
      amountDue: "120000",
      product: "Personal Auto",
      premium: "190000",
      paymentFrequency: "Monthly",
      agentName: "Michael Brown",
    },
  ];
  const columns = [
    {
      title: "Policy Number",
      dataIndex: "policyNumber",
      key: "policyNumber",
      sorter:(a, b) => a.policyNumber.localeCompare(b.policyNumber),
  
    },
    {
      title: "Expired Date",
      dataIndex: "expiredDate",
      key: "expiredDate",
      sorter:(a, b) => a.expiredDate.localeCompare(b.expiredDate),
    },
    {
      title: "Insured Name",
      dataIndex: "insuranceName",
      key: "insuranceName",
      sorter:(a, b) => a.insuranceName.localeCompare(b.insuranceName),
    },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
      sorter:(a, b) => a.amountDue.localeCompare(b.amountDue),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      sorter:(a, b) => a.product.localeCompare(b.product),
    },
    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
      sorter:(a, b) => a.premium.localeCompare(b.premium),
    },
    {
      title: "Payment Frequency",
      dataIndex: "paymentFrequency",
      key: "paymentFrequency",
      sorter:(a, b) => a.agentNumber.localeCompare(b.agentNumber),
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
        <div style={{display :'flex',gap: '10px'}}>
          <img src={printIcon} alt="Print" onClick={()=> viewPdf()}  />
          <img src={editIcon} alt="Edit"  onClick={()=> startTransaction()} />
          <img src={viewIcon} alt="View" onClick={()=> {viewPolicyDetails()}} />
        </div>
      ),
    },
  ];

  return {dataSource,columns}
}
export default SearchPolicyConfig