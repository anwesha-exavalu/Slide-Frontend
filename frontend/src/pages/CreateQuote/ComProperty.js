import React, { useState } from 'react';
import DefaultStepper from '../../components/Stepper/DefaultStepper';
import { useLocation } from 'react-router-dom';
import { CreateQuote } from 'styles/pages/CreateQuote/index';
import InsuredInformation from './InsuredInformation';
import Vehicle from 'pages/CreateQuote/Vehicle';
import Premium from './Premium';
import Driver from 'pages/CreateQuote/Driver';
import Coverages from './Coverages';
import Questionaire from 'pages/Bind/Questionaire';
import BindAdditionalInfo from 'pages/Bind/BindAdditionalInfo';
import BindForms from 'pages/Bind/BindQuoteForms';
import PaymentOptions from 'pages/PaymentOptions';
import Losshistory from 'pages/Bind/Losshistory';
import moment from 'moment';
import useMetaData from "context/metaData";
const Comproperty = () => {
    const {theme} = useMetaData();
    const { state } = useLocation();
    const steps = ['Insured Information', 'Vehicles', 'Drivers', 'Coverages', 'Premium', 'Questionnaire', 'Additional Interests','Loss History', 'Forms', 'Payment'];
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [vehicleData, setVehicleData] = useState([{
        "vin": "2FMDK4KC4CBA27842",
        "modelyear": "2018",
        "make": "Ford",
        "model": "Edge",
        "antitheftdevice": "No",
        "antilockbrakingsystem": "No",
        "passiverestraint": "Yes",
        "vehicleage": "3",
        "vehicleuse": "Pleasure",
        "inacceptablevehicle": "Yes",
        "salvagehistory": "Yes",
        "garageaddressdiff": "No"
    }]);
    const [driverData, setDriverData] = useState([{
        "firstname": "Vivek",
        "lastname": "Tamrakar",
        "reltoinsured": "Self",
        "gender": "Male",
        "driverstatus": "Principal",
        "maritalstatus": "Single",
        "birthdate": "1992-11-10T18:30:00.000Z",
        "driverslicensestatus": "valid",
        "licensenumber": "12345",
        "licensestate": "sc",
        "sr22": "Yes"
    }]);
    const [nextVal, setNextVal] = useState(false);
    const [viewPolicy, setViewPolicy] = useState(false)
    const [vehicleCheckBox, setVehicleCheckBox] = useState(false)
    const [driverCheckBox, setDriverCheckBox] = useState(false)
    const [data, setData] = useState([{
        "lendertype": "leinholderlosspayee",
        "nameone": "Tanmay",
        "nametwo": "sardar",
        "loanno": "78827727",
        "billtolender": "Yes",
        "additionalinfo": "Losspayee",
        "address1": "123 william st",
        "country": "USA",
        "citystatezip": "Newyork 61606",
        "phone": "67726627",
        "fax": "682768772"
}]);
    const [lossData,setLossData]=useState([ {
        "Number": "7876362",
        "losecause": "Collision Backing Loss",
        "lossdate": moment("2024-11-12T18:30:00.000Z"),
        "drivername": "Permissive Use",
        "Driverlicensestate": "AZ",
        "Lossamount": "120000",
        "Driverlicensenumber": "D6727672",
        "policynumber": "P1237837",
        "vin": "UHDGAYGGAYYA",
        "Lossdescription": "Damaged "
    }]);

    const handleNextStep = () => {
        setActiveStep(prevStep => prevStep + 1);
    };
    const handlePrevStep = () => {
        setActiveStep((prevStep) => prevStep - 1);
        setNextVal(prev => !prev);
    };


    const handleVehicleAddition = (values) => {
        setVehicleData(prevData => {
            var newData = [...prevData, values.additionalvehicle]
            return newData
        })

    }

    const handleVehicleRemoval = (values) => {
        setVehicleData(prevData => {
            var newData = prevData.filter((item) => {
                return item.vin != values.vin
            })
            return newData
        })
    }

    const handleVehicleCheckBoxChange = () => {
        setVehicleCheckBox(prev => !prev)
    }

    const handleDriverAddition = (values) => {
        setDriverData(prevData => {
            var newData = [...prevData, values.drivers]
            return newData
        })

    }

    const handleDriverRemoval = (values) => {
        setDriverData(prevData => {
            var newData = prevData.filter((driver) => {
                return driver.firstname != values.firstname
            })
            return newData
        })
    }

    const handleDriverCheckBoxChange = () => {
        setDriverCheckBox(prev => !prev)
    }

    const handleNextVal = () => {
        setNextVal(prev => !prev);
    }
    const handleDataloss =(values) =>{
        setLossData(prevData => {
            var newData = [...prevData, values.losshistoryInfo]
            return newData
        })
    }
    const handleDataAddition = (values) => {
        setData(prevData => {
            var newData = [...prevData, values.additionalInfo ]
            return newData
        })
    }
    

    // Conditionally render forms based on activeStep
    const renderFormContent = () => {
        switch (steps[activeStep]) {
            case 'Insured Information':
                return <InsuredInformation state={state} theme={theme} TabName="Comproperty" />;
            case 'Vehicles':
                return <Vehicle handleVehicleRemoval={handleVehicleRemoval} theme={theme} handleVehicleAddition={handleVehicleAddition} vehicleCheckBox={vehicleCheckBox} handleVehicleCheckBoxChange={handleVehicleCheckBoxChange} vehicleData={vehicleData} state={state} TabName="Comproperty" />;
            case 'Drivers':
                return <Driver handleDriverRemoval={handleDriverRemoval} theme={theme} handleDriverAddition={handleDriverAddition} driverCheckBox={driverCheckBox} handleDriverCheckBoxChange={handleDriverCheckBoxChange} driverData={driverData} state={state} TabName="Comproperty" />;
            case 'Coverages':
                return <Coverages state={state} open={open} setOpen={setOpen} theme={theme} viewPolicy={viewPolicy} setViewPolicy={setViewPolicy} TabName="Comproperty" />
            case 'Premium':
                return <Premium state={state} open={open} setOpen={setOpen} theme={theme} TabName="Comproperty" />;
            case 'Questionnaire':
                return <Questionaire state={state} open={open} setOpen={setOpen} theme={theme} driverData={driverData} TabName="Comproperty" />;
            case 'Loss History':
                return <Losshistory state={state} data={lossData} driverData={driverData} theme={theme} TabName="Comproperty" />

            case 'Additional Interests':
                return <BindAdditionalInfo data={data} state={state} vehicleData={vehicleData} theme={theme} TabName="Comproperty" />
            case 'Forms':
                return <BindForms theme={theme} state={state} TabName="Comproperty" />
            case 'Payment':
                return <PaymentOptions state={state} open={open} setOpen={setOpen} theme={theme} viewPolicy={viewPolicy} setViewPolicy={setViewPolicy} TabName="Comproperty" />

            default:
                return null;
        }
    };

    return (
        <CreateQuote theme={theme} >
            <DefaultStepper
            theme={theme}
                state={state}
                //steps={steps}
                steps={activeStep < 5 ? steps.slice(0, 5) : steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                handleNextVal={handleNextVal}
                handleDataloss={handleDataloss}
                handleDataAddition={handleDataAddition}
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

export default Comproperty;
