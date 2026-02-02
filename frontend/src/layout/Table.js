import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// React Grid Logic
import "@ag-grid-community/styles/ag-grid.css";
// Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css";
import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new initialData component
const initialData = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    {
      location: "2134 Parkway, Pigeon Forge, CA",
      building: "Building #1",
      coverage: "Building Coverage",
      limit: "100000.00",
      deductible: "2500",
      coinsurance: "80%",
      blanket: "None",
    },
    {
        location: "2134 Parkway, Pigeon Forge, CA",
        building: "Building #2",
        coverage: "Business Personal Property Coverage",
        limit: "12000.00",
        deductible: "2500",
        coinsurance: "None",
        blanket: "None",
      },
      {
        location: "2135 Parkway, Pigeon Forge, CA",
        building: "Building #3",
        coverage: "Building Coverage",
        limit: "123000.00",
        deductible: "3000",
        coinsurance: "75%",
        blanket: "Included",
      },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "location" },
    { field: "building" },
    { field: "coverage" },
    { field: "limit" },
    { field: "deductible" },
    { field: "coinsurance" },
    { field: "blanket" },

  ]);

  const defaultColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

// Render initialData
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <initialData />
  </StrictMode>
);
