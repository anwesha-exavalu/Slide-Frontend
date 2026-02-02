import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultStepper from '../../components/Stepper/DefaultStepper';
import { CreateQuote } from 'styles/pages/CreateQuote/index';
import useMetaData from "context/metaData";
import DynamicForm from './HeraldTab';
import QuotePage from './QuotePage';

const HeraldForm = () => {
    const { theme } = useMetaData();
    const { state } = useLocation();
    const steps = ['Application Details', 'Review and Submit', 'View Quote Details'];
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [nextVal, setNextVal] = useState(false);
    const [applicationData, setApplicationData] = useState(null);
    const [formData, setFormData] = useState({
        riskValues: {},
        coverageValues: {},
    });

    const handleNextStep = () => {
        setActiveStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setActiveStep(prevStep => prevStep - 1);
        setNextVal(prev => !prev);
    };

    const handleNextVal = () => {
        setNextVal(prev => !prev);
    };

    const handleFormDataUpdate = (type, data) => {
        setFormData(prev => ({
            ...prev,
            [type]: data
        }));
    };

    const handleApplicationDataUpdate = (data) => {
        setApplicationData(data);
    };

    const renderFormContent = () => {
        switch (steps[activeStep]) {
            case 'Application Details':
                return (
                    <DynamicForm 
                        state={state}
                        open={open}
                        setOpen={setOpen}
                        theme={theme}
                        onUpdateFormData={handleFormDataUpdate}
                        onUpdateApplicationData={handleApplicationDataUpdate}
                        isReviewStep={false}
                        activeStep={activeStep}
                        onNext={handleNextStep}
                    />
                );
            case 'Review and Submit':
                return (
                    <DynamicForm 
                        state={state}
                        open={open}
                        setOpen={setOpen}
                        theme={theme}
                        formData={formData}
                        applicationData={applicationData}
                        isReviewStep={true}
                        activeStep={activeStep}
                        onNext={handleNextStep}
                    />
                );
            case 'View Quote Details':
                return (
                    <QuotePage 
                        state={{
                            formData,
                            applicationData,
                            selectedProducts: state?.selectedProducts
                        }}
                        theme={theme}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <CreateQuote theme={theme}>
            <DefaultStepper
                theme={theme}
                state={state}
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                handleNextVal={handleNextVal}
                nextVal={nextVal}
                setOpen={setOpen}
            >
                {renderFormContent()}
            </DefaultStepper>
        </CreateQuote>
    );
};

export default HeraldForm;