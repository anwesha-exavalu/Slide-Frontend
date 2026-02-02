import moment from 'moment';

export const 
columns = [
    {
      title: "AdditionalInfo",
      dataIndex: "additionalinfo",
      key: "additionalinfo",
      align: "center",
    },
    {
      title: "BillToLender",
      dataIndex: "billtolender",
      key: "billtolender",
      align: "center",
    },
    {
      title: "FinancialInterest",
      dataIndex: "financialinterest",
      key: "financialinterest",
      align: "center",
    },
    // {
    //   title: "LenderClause",
    //   dataIndex: "lenderclause",
    //   key: "lenderclause",
    //   align: "center",
    // },
    {
      title: "LenderType",
      dataIndex: "lendertype",
      key: "lendertype",
      align: "center",
    },
    {
      title: "LoanNo",
      dataIndex: "loanno",
      key: "loanno",
      align: "center",
    },
    {
      title: "NameOne",
      dataIndex: "nameone",
      key: "nameone",
      align: "center",
    },
    {
      title: "NameTwo",
      dataIndex: "nametwo",
      key: "nametwo",
      align: "center",
    },
    {
      title: "Address 1:",
      dataIndex: "address1",
      key: "address1",
      align: "center",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      align: "center",
    },
    {
      title: "City/State/Zip",
      dataIndex: "citystatezip",
      key: "citystatezip",
      align: "center",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Fax No.",
      dataIndex: "fax",
      key: "fax",
      align: "center",
    },
  ];

  export const losscolumns=[
  {
    title: "Number",
    dataIndex: "Number",
    key: "Number",
    align: "center",
  },
  {
    title: "Loss Date",
    dataIndex: "lossdate",
    key: "lossdate",
    align: "center",
    render: (lossdate) => {
      return lossdate ? moment(lossdate).format('YYYY-MM-DD') : '';
  }
  },
  {
    title: "Lose Cause",
    dataIndex: "losecause",
    key: "losecause",
    align: "center",
  },
  {
    title: "Driver License Number",
    dataIndex: "Driverlicensenumber",
    key: "Driverlicensenumber",
    align: "center",
  },
  {
    title: "Driver License State",
    dataIndex: "Driverlicensestate",
    key: "Driverlicensestate",
    align: "center",
  },
  {
    title: "Driver Name",
    dataIndex: "drivername",
    key: "drivername",
    align: "center",
  },
  {
    title: "Loss Amount",
    dataIndex: "Lossamount",
    key: "Lossamount",
    align: "center",
  },
  {
    title: "Policy Number",
    dataIndex: "policynumber",
    key: "policynumber",
    align: "center",
  },
  {
    title: "VIN",
    dataIndex: "vin",
    key: "vin",
    align: "center",
  },
  {
    title: "Loss Description",
    dataIndex: "Lossdescription",
    key: "Lossdescription",
    align: "center",
  },
]