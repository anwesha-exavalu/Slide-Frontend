export const dataSourceTransactionHistory = [
  {
    key: "1",
    term: "1-2",
    transaction: "Cancellation",
    description: "Flat Cancellation",
    effective: "09/28/24",
    writtenpremium: 2389.58,
    inforcepremium: 0,
  },
  {
    key: "2",
    term: "1-1",
    transaction: "New Business",
    description: "New Business",
    effective: "09/28/24",
    writtenpremium: 2381.58,
    inforcepremium: 2381.58,
  }
];

export const columns = [
  {
    title: "Term",
    dataIndex: "term",
    key: "term",
    align: "center",
    sorter: (a, b) => a.term.localeCompare(b.term),
  },
  {
    title: "Transaction",
    dataIndex: "transaction",
    key: "transaction",
    align: "center",
    sorter: (a, b) => a.transaction.localeCompare(b.transaction),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
    sorter: (a, b) => a.description.localeCompare(b.description),
  },
  {
    title: "Effective",
    dataIndex: "effective",
    key: "effective",
    align: "center",
    sorter: (a, b) => a.effective.localeCompare(b.effective),
  },
  {
    title: "Written Premium",
    dataIndex: "writtenpremium",
    key: "writtenpremium",
    align: "center",
    sorter: (a, b) => a.writtenpremium - b.writtenpremium,
  },
  {
    title: "In Force Premium",
    dataIndex: "inforcepremium",
    key: "inforcepremium",
    align: "center",
    render: (value) => value.toFixed(2),
    sorter: (a, b) => a.inforcepremium - b.inforcepremium,
  },
];