import React from 'react';
import { DetailsBox, DetailsButton, SendCertButton } from 'styles/pages/CustomerDetails';

export const columns = (DeatilsModalOpen) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter:  (a, b) => a.name.localeCompare(b.name),

  },
  {
    title: "DBA",
    dataIndex: "dba",
    key: "dba",
    sorter:  (a, b) => a.dba.localeCompare(b.dba),
  },
  {
    title: "InsuredID",
    dataIndex: "insuredID",
    key: "insuredID",
    sorter:  (a, b) => a.insuredID.localeCompare(b.insuredID),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    sorter:  (a, b) => a.location.localeCompare(b.location),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    sorter:  (a, b) => a.phone.localeCompare(b.phone),
  },
  {
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <DetailsBox>
        <DetailsButton onClick={() => DeatilsModalOpen(record)}>Details</DetailsButton>
        <SendCertButton>Send Certificates</SendCertButton>
      </DetailsBox>
    ),
  },
];

export const dataSource = [
  {
    key: "1",
    name: "ABC Transportation",
    dba: "ABC Logistics",
    insuredID: "11111180",
    location: "New York",
    phone: "5129087658",
  },
  {
    key: "2",
    name: "ABC Transportation",
    dba: "ABC Logistics",
    insuredID: "11111190",
    location: "New York",
    phone: "5129087658",
  },
  {
    key: "3",
    name: "ABC Transportation",
    dba: "ABC Logistics",
    insuredID: "11111170",
    location: "New Jersey",
    phone: "5129087658",
  },
];
