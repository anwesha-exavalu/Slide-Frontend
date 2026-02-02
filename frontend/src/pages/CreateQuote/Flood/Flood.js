import React, { useState } from 'react';
import DefaultStepper from 'components/Stepper/DefaultStepper';
import { useLocation } from 'react-router-dom';
import { CreateQuote } from 'styles/pages/CreateQuote/index';
import PropertyInformation from './PropertyInformation';
import Floodzone from './FloodZone';
import Dwelingtype from './DwelingType';
import Premium from './Premium';
import BindAdditionalInfo from 'pages/Bind/BindAdditionalInfo';
import BindForms from 'pages/Bind/BindQuoteForms';
import PaymentOptions from 'pages/PaymentOptions';
import useMetaData from "context/metaData";

const Flood = () => {
    const {theme} = useMetaData();
    const { state } = useLocation();
    const steps = ['Property', 'Flood zone', 'Dwelling type', 'Premium','Additional Info','Forms','Payment'];
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [nextVal, setNextVal] = useState(false);
    const [viewPolicy, setViewPolicy] = useState(false)

    const handleNextStep = () => {
        setActiveStep(prevStep => prevStep + 1);
    };
    const handlePrevStep = () => {
        setActiveStep((prevStep) => prevStep - 1);
        setNextVal(prev => !prev);
    };

    const handleDataAddition = (values) => {
        setData(prevData => {
            var newData = [...prevData,values.additionalInfo ]
            return newData
        })
    }

    const handleNextVal = () => {
        setNextVal(prev => !prev);
    }

    // Conditionally render forms based on activeStep
    const renderFormContent = () => {
        switch (steps[activeStep]) {
            case 'Property':
                return <PropertyInformation theme={theme} state={state} TabName="Comproperty" />;
            case 'Flood zone':
                return <Floodzone theme={theme} state={state} TabName="Comproperty" />;
            case 'Dwelling type':
                return <Dwelingtype theme={theme} state={state} TabName="Comproperty" />;
            case 'Premium':
                return <Premium theme={theme} state={state} open={open} setOpen={setOpen} TabName="Comproperty" />;
            case 'Additional Info':
                return <BindAdditionalInfo theme={theme} data={data} state={state} TabName="Comproperty"/>
            case 'Forms':
                return <BindForms theme={theme} state={state} TabName="Comproperty"/>
            case 'Payment':
                return <PaymentOptions theme={theme} state={state} open={open} setOpen={setOpen} viewPolicy={viewPolicy} setViewPolicy={setViewPolicy} TabName="Comproperty"/>
            default:
                return null;
        }
    };

    return (
        <CreateQuote theme={theme}>
            <DefaultStepper
                theme={theme}
                state={state}
                steps={activeStep < 4 ? steps.slice(0,4): steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                handleDataAddition={handleDataAddition}
                handleNextVal={handleNextVal}
                nextVal={nextVal}
                TabName="Comproperty"
                setOpen={setOpen}
                setViewPolicy={setViewPolicy}
            >
                {/* Pass the form content as children */}
                {renderFormContent()}
            </DefaultStepper>
        </CreateQuote>
    );
};

export default Flood;
