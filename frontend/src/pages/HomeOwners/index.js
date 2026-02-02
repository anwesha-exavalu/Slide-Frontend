import React, { useState } from "react";
import DefaultStepper from "../../components/Stepper/DefaultStepper";
import { useLocation } from "react-router-dom";
import { CreateQuote } from "styles/pages/CreateQuote/index";
import InsuredInformation from "./InsuredInformation";
import BuildingInformation from "./BuildingInformation";
import AdditionalBuildingInformation from "./AdditionalBuildingDetails";
import Premium from "pages/CreateQuote/Premium";
import Coverages from "./Coverages";
import useMetaData from "context/metaData";

const HomeOwners = () => {
  const { theme } = useMetaData();
  const { state } = useLocation();
  const steps = [
    "Insured Information",
    "Building Information",
    "Additional building details",
    "Coverages",
    "Premium",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [nextVal, setNextVal] = useState(false);
  const [viewPolicy, setViewPolicy] = useState(false);

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setNextVal((prev) => !prev);
  };

  const handleNextVal = () => {
    setNextVal((prev) => !prev);
  };

  // Conditionally render forms based on activeStep
  const renderFormContent = () => {
    switch (steps[activeStep]) {
      case "Insured Information":
        return <InsuredInformation state={state} TabName="HomeOwners" />;
      case "Building Information":
        return <BuildingInformation state={state} TabName="HomeOwners" />;
      case "Additional building details":
        return (
          <AdditionalBuildingInformation state={state} TabName="HomeOwners" />
        );
      case "Coverages":
        return (
          <Coverages
            state={state}
            open={open}
            setOpen={setOpen}
            viewPolicy={viewPolicy}
            setViewPolicy={setViewPolicy}
            TabName="HomeOwners"
          />
        );
      case "Premium":
        return (
          <Premium
            state={state}
            open={open}
            setOpen={setOpen}
            TabName="HomeOwners"
          />
        );
      default:
        return null;
    }
  };

  return (
    <CreateQuote theme={theme}>
      <DefaultStepper theme={theme}
        state={state}
        //steps={steps}
        steps={activeStep < 5 ? steps.slice(0, 5) : steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        handleNextVal={handleNextVal}
        nextVal={nextVal}
        TabName="HomeOwners"
        setOpen={setOpen}
        setViewPolicy={setViewPolicy}
      >
        {/* Pass the form content as children */}
        {renderFormContent()}
      </DefaultStepper>
    </CreateQuote>
  );
};

export default HomeOwners;
