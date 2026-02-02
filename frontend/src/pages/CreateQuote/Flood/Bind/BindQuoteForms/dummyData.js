import React from "react";
import viewSampleImage from "assets/images/ViewSampleImage.png";
import samplePdf from "assets/files/sample.pdf";

const viewPdf=()=>{
    window.open(samplePdf, '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
  }
  
export const dataSource = [
    {
      key: "1",
      status: "Attached",
      type: "Policy",
      number: "FFL 99310",
      date: "2021",
      description: "Policy Declaration",
      viewsample: viewSampleImage,
    },
    {
      key: "2",
      status: "Attached",
      type: "Coverage",
      number: "FL 0987",
      date: "2022",
      description: "FL Flood Coverage",
      viewsample: viewSampleImage,
    },
    {
      key: "3",
      status: "Attached",
      type: "Policy",
      number: "FL 0987",
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
      title: "View Sample",
      dataIndex: "viewsample",
      key: "viewsample",
      render: (viewSampleImage) => (
        <img style={{cursor:"pointer"}} alt={viewSampleImage} src={viewSampleImage}  onClick={()=> viewPdf()} />
      ),
    },
  ];

