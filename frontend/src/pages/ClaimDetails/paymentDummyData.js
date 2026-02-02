
export const columns = [
  {
    title: "Check Number Payee",
    dataIndex: "checkNumPayee",
    key: "checkNumPayee",
    sorter:(a, b) => a.checkNumPayee.localeCompare(b.checkNumPayee),
  },
  {
    title: "Check Date",
    dataIndex: "checkDate",
    key: "checkDate",
    sorter:(a, b) => a.checkDate.localeCompare(b.checkDate),
  },
  {
    title: "Check Amount",
    dataIndex: "checkAmount",
    key: "checkAmount",
    sorter:(a, b) => a.checkAmount.localeCompare(b.checkAmount),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter:(a, b) => a.status.localeCompare(b.status),
  }
];

export const dataSource = [
  {
    key: "1",
    checkNumPayee: "7278484 Red Carpet Inn",
    checkDate: "26/07/24",
    checkAmount:'40,000,000',
    status: "Cleared",
  },
  {
    key: "2",
    checkNumPayee: "7278484 Red Carpet Inn",
    checkDate: "26/07/24",
    checkAmount:'50,000,000',
    status: "Cleared",
  },
  {
    key: "3",
    checkNumPayee: "7278484 Red Carpet Inn",
    checkDate: "26/07/24",
    checkAmount:'40,000,000',
    status: "Cleared",
  },
  {
    key: "4",
    checkNumPayee: "7278483 Red Carpet Inn",
    checkDate: "26/04/24",
    checkAmount:'40,000,000',
    status: "Pending",
  },
];
