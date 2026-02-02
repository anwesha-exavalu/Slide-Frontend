import React from "react";
import { Input,Button } from "antd";
import sortingIcon from 'assets/svg/sorting-icon.svg';

const CommissionTableConfig =(searchInput, setSearchInput,sortedInfo, setSortedInfo)=>{

const handleInputChange = (e, dataIndex) => {
    setSearchInput({
      ...searchInput,
      [dataIndex]: e.target.value,
    });
  };

const onFilter = (value, record, dataIndex) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());

const handleSort = (dataIndex, order) => {
    setSortedInfo({ order, columnKey: dataIndex });
  };
 
const csDataSource = [
    {
        statementDate: "4/18/20024",
        statementNumber: "AGST1",
        totalAmount: "$(2448.00)",
        pdf: "Statement"
    },
    {
        statementDate: "5/18/20024",
        statementNumber: "AGST2",
        totalAmount: "$(2448.00)",
        pdf: "Statement"
    },
    {
        statementDate: "6/19/20024",
        statementNumber: "AGST3",
        totalAmount: "$(2448.00)",
        pdf: "Statement"
    },
    {
        statementDate: "7/24/20024",
        statementNumber: "AGST4",
        totalAmount: "$(2448.00)",
        pdf: "Statement"
    },
    {
        statementDate: "8/20/20024",
        statementNumber: "AGST5",
        totalAmount: "$(2448.00)",
        pdf: "Statement"
    },
]


const csdDataSource = [
    {
        agencyFloodCode: "4567",
        agencyName: "A.B.C Agency",
        statementNumber: "789540982",
        policyNumber:"789540982",
        transactionType: "xxxx",
        comission: "0.02",
        commissionAmount: "$(2448.00)",
        writtenPremium: "Statement"
    },
    {
        agencyFloodCode: "5678",
        agencyName: "A.B.C Agency",
        statementNumber: "9876543210",
        policyNumber:"9876543210",
        transactionType: "xxxx",
        comission: "0.02",
        commissionAmount: "$(2448.00)",
        writtenPremium: "Statement"
    },
    {
        agencyFloodCode: "6789",
        agencyName: "A.B.C Agency",
        statementNumber: "987544309",
        policyNumber:"987544309",
        transactionType: "xxxx",
        comission: "0.02",
        commissionAmount: "$(2448.00)",
        writtenPremium: "Statement"
    },
    {
        agencyFloodCode: "7890",
        agencyName: "A.B.C Agency",
        statementNumber: "789065432",
        policyNumber:"789065432",
        transactionType: "xxxx",
        comission: "0.02",
        commissionAmount: "$(2448.00)",
        writtenPremium: "Statement"
    },
    {
        agencyFloodCode: "8901",
        agencyName: "A.B.C Agency",
        statementNumber: "1234567890",
        policyNumber:"1234567890",
        transactionType: "xxxx",
        comission: "0.02",
        commissionAmount: "$(2448.00)",
        writtenPremium: "Statement"
    },
]

const csColumns = [
    {
        title: <div className="text">
                    Statement Date 
                    <Button onClick={() => handleSort('statementDate', sortedInfo.order === 'ascend' ? 'descend' : 'ascend')}  className="sorting-button"  type="link" >
                        <img src={sortingIcon} />
                    </Button>
                    <Input className="search-textbox" placeholder="Statement Date" value={searchInput.statementDate || ""} onChange={(e) => handleInputChange(e, "statementDate")} />
                </div>,
        dataIndex: "statementDate",
        key: "statementDate",
        sorter: (a, b) => a.statementDate.localeCompare(b.statementDate), 
        onFilter: (value, record) => onFilter(value, record, "statementDate"),
        filteredValue: searchInput.statementDate ? [searchInput.statementDate] : null,
    },
    {
        title: <div className="text">
                    Statement Number
                    <Button  onClick={() => handleSort('statementNumber', sortedInfo.order === 'ascend' ? 'descend' : 'ascend')} className="sorting-button"  type="link" >
                        <img src={sortingIcon} />
                    </Button>
                    <Input placeholder="Statement Number" value={searchInput.statementNumber || ""} onChange={(e) => handleInputChange(e, "statementNumber")} className="search-textbox" />
                </div>,
        dataIndex: "statementNumber",
        key: "statementNumber",
        sorter: (a, b) => a.statementNumber.localeCompare(b.statementNumber), 
        onFilter: (value, record) => onFilter(value, record, "statementNumber"),
        filteredValue: searchInput.statementNumber ? [searchInput.statementNumber] : null,
    },
    {
        title: <div className="text">
                    Total Amount
                    <Button onClick={() => handleSort('totalAmount', sortedInfo.order === 'ascend' ? 'descend' : 'ascend')} className="sorting-button" type="link">
                        <img src={sortingIcon} />
                    </Button>
                    <Input
                    placeholder="Total Amount" value={searchInput.totalAmount || ""} onChange={(e) => handleInputChange(e, "totalAmount")} className="search-textbox" />
                </div>,
        dataIndex: "totalAmount",
        key: "totalAmount",
        sorter: (a, b) => a.totalAmount.localeCompare(b.totalAmount), 
        onFilter: (value, record) => onFilter(value, record, "totalAmount"),
        filteredValue: searchInput.totalAmount ? [searchInput.totalAmount] : null,
    },
    {
        "title": <div className="text">
                    PDF
                    <Button onClick={() => handleSort('pdf', sortedInfo.order === 'ascend' ? 'descend' : 'ascend')} className="sorting-button" type="link" >
                        <img src={sortingIcon} />
                    </Button>
                    <Input placeholder="PDF" value={searchInput.pdf || ""} onChange={(e) => handleInputChange(e, "pdf")} className="search-textbox" />
                </div>,
        "dataIndex": "pdf",
        "key": "pdf",
        sorter: (a, b) => a.pdf.localeCompare(b.pdf), 
        onFilter: (value, record) => onFilter(value, record, "pdf"),
        filteredValue: searchInput.pdf ? [searchInput.pdf] : null,
    },
];

const csdColumns = [
    {
        title: "Agency Code",
        dataIndex: "agencyFloodCode",
        key: "agencyFloodCode",
        sorter: (a, b) => a.agencyFloodCode.localeCompare(b.agencyFloodCode), 
    },
    {
        title: "Agency Name",
        dataIndex: "agencyName",
        key: "agencyName",
        sorter: (a, b) => a.agencyName.localeCompare(b.agencyName), 
    },
    {
        title: "Statement Number",
        dataIndex: "statementNumber",
        key: "statementNumber",
        sorter: (a, b) => a.statementNumber.localeCompare(b.statementNumber), 
    },
    {
        title: "Policy Number",
        dataIndex: "policyNumber",
        key: "policyNumber",
        sorter: (a, b) => a.policyNumber.localeCompare(b.policyNumber), 
    },
    {
        title: "Transaction Type",
        dataIndex: "transactionType",
        key: "transactionType",
        sorter: (a, b) => a.transactionType.localeCompare(b.transactionType), 
    },
    {
        title: "Commission %",
        dataIndex: "comission",
        key: "comission",
        sorter: (a, b) => a.comission.localeCompare(b.comission), 
    },
    {
        title: "Commission Amount",
        dataIndex: "commissionAmount",
        key: "commissionAmount",
        sorter: (a, b) => a.commissionAmount.localeCompare(b.commissionAmount), 
    },
    {
        title: "WrittenPremium",
        dataIndex: "writtenPremium",
        key: "writtenPremium",
        sorter: (a, b) => a.writtenPremium.localeCompare(b.writtenPremium), 
    },
]

return {csDataSource,csdDataSource,csColumns,csdColumns}
}

export default CommissionTableConfig