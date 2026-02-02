import React from "react";
import printIcon from "assets/svg/printer.svg";
import editIcon from "assets/svg/edit.svg";
import samplePdf from "assets/files/sample.pdf";

export const columns = (editQuote,pageType) => [
  {
    title: "Effective Data",
    dataIndex: "effectiveDate",
    key: "effectiveDate",
    sorter:(a, b) => a.effectiveDate.localeCompare(b.effectiveDate),
  },
  {
    title: "Application No.",
    dataIndex: "applicationNumber",
    key: "applicationNumber",
    sorter:(a, b) => a.applicationNumber.localeCompare(b.applicationNumber),
  },
  {
    title: "Insured Name",
    dataIndex: "insuranceName",
    key: "insuranceName",
    sorter:(a, b) => a.insuranceName.localeCompare(b.insuranceName),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter:(a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Current Owner",
    dataIndex: "currentOwner",
    key: "currentOwner",
    sorter:(a, b) => a.currentOwner.localeCompare(b.currentOwner),
  },
  {
    title: "Premium",
    dataIndex: "premium",
    key: "premium",
    sorter:(a, b) => a.premium.localeCompare(b.premium),
  },
  {
    title: "Paid Amount",
    dataIndex: "paidAmount",
    key: "paidAmount",
    sorter:(a, b) => a.paidAmount.localeCompare(b.paidAmount),
  },
  {
    dataIndex: "actions",
    key: "actions",
    render: (_, data) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <img
          src={printIcon}
          alt="Print"
          onClick={() =>
            window.open(
              samplePdf,
              "PrintWindow",
              "width=800,height=600,scrollbars=yes,resizable=yes"
            )
          }
          style={{ cursor: "pointer" }}
        />
        <img onClick={() => editQuote(`/edit-quote/${data?.key}`, data,pageType)} src={editIcon} alt="Edit" />
      </div>
    ),
  },
];

export const dataSource = [
  {
    key: "1",
    effectiveDate: "03/08/24",
    applicationNumber: "AP-444005",
    insuranceName: "Sam Wilson",
    status: "Yes",
    currentOwner: "Steve Vacaro",
    premium: "$1098.50",
    paidAmount: "$500.00",
  },
  {
    key: "2",

    effectiveDate: "04/08/24",
    applicationNumber: "AP-780706",
    insuranceName: "John Doe",
    status: "Yes",
    currentOwner: "Steve Vacaro",
    premium: "$1898.00",
    paidAmount: "$1100.00",
  },
  {
    key: "3",
    effectiveDate: "05/08/24",
    applicationNumber: "AP-880707",
    insuranceName: "Emily Davis",
    status: "No",
    currentOwner: "Steve Vacaro",
    premium: "$5529.00",
    paidAmount: "$3000.00",
  },
];
