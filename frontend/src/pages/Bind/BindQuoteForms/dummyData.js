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
      area: "None",
      name: "SF017-A Ed,05-23",
      date: "2021",
      description:"SF017-A Ed,05-23 Automobile application",
      attachedby:"Mandatory",
      inforequired: "No",
      viewsample: viewSampleImage,
    },
    {
      key: "2",
      status: "Attached",
      area: "Auto",
      name: "PA006-A Ed,05-23",
      date: "2022",
      description:"MO Personal Auto Policy",
      attachedby:"Mandatory",
      inforequired: "No",
      viewsample: viewSampleImage,
    },
    {
      key: "3",
      status: "Attached",
      area: "Auto",
      name: "FCMSMP09010116",
      date: "2022",
      description:"Multi State Privacy Notice",
      attachedby:"Mandatory",
      inforequired: "No",
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
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Attached By",
      dataIndex: "attachedby",
      key: "attachedby",
    },
    {
      title: "Info Required",
      dataIndex: "inforequired",
      key: "inforequired",
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