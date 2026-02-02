import React from "react";
import viewSampleImage from "assets/images/ViewSampleImage.png";
import samplePdf from "assets/files/sample.pdf";

const viewFile = () => {
    window.open(samplePdf, '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
  };
export const dataSource = [
    {
      key: "1",
      status: "Attached",
      type: "Policy",
      number: "AUTO 99310",
      date: "2021",
      description: "Policy Declaration",
      viewsample: viewSampleImage,
    },
    {
      key: "2",
      status: "Attached",
      type: "Coverage",
      number: "PA 0987",
      date: "2022",
      description: "Personal Auto Coverage",
      viewsample: viewSampleImage,
    },
    {
      key: "3",
      status: "Attached",
      type: "Policy",
      number: "PA 998",
      date: "2022",
      description: "Additional Interest",
      viewsample: viewSampleImage,
    },
  ];
export const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "View",
      dataIndex: "viewsample",
      key: "viewsample",
      render: (viewSampleImage) => (
        <img alt={viewSampleImage} src={viewSampleImage} onClick={viewFile} />
      ),
    }
  ];