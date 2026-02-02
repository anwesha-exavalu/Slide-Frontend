import styled from "styled-components";
import themes from "constants/theme.json";
export const CreateQuote = styled.div`
  .stepper-container {
    margin: 50px;
}


.Quotelabel {
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => themes[theme].createQuoteLabel};
}

.stepper {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
    gap:10px;
}

.step {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.step.active {
    color:${({ theme }) => themes[theme].activeStep} ;
}

.step-content {
    display: flex;
    align-items: center;
    padding-top:10px;
}

.step-label {
    color:${({ theme }) => themes[theme].stepLabel}; 
    font-size: 12px;
    padding-left: 5px;


}


.step.active .step-label {
    color:${({ theme }) => themes[theme].activeStep};
    font-weight: 700;
}

.circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #ccc;
    background-color: white;
    position:relative;
}

.circle.filled {
    /* Blue color for active step circle */
    border-color: #36AFFA;
}
.step-bar {
    width: 100%;
    height: 6px;
    border-radius: 9px;
    background-color: #ccc;
}

.step.active .step-bar {
    background-color: #36AFFA;

}

.stepper-controls {
    display: flex;
    justify-content: space-between;
}

.stepperbutton {
    width: 140px;
    height: 41px;
    background-color: #E4F0FF;
    border-radius: 10px;
    color: #1169A0;
    font-weight: bold;
    border-top: 1px solid #1169A0
}

.form-element-btn-next {
    // position: absolute;
    padding-top:-10px;
    //padding-right:50px;
    right:0;
}

.container-box {
    border: 1px solid #f1f1f1;
    padding: 20px;
    border-radius: 10px;
    //box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 6px 18px -2px #18181C1A;
    background-color: ${({ theme }) => themes[theme].formStepperBg};

}
.container-box-floodzone {
    border: 1px solid #f1f1f1;
    margin-top:30px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 6px 18px -2px #18181C1A;
    background-color: ${({ theme }) => themes[theme].formStepperBg};
}
    .container-box-stepper {
    margin-top:20px;
    //padding: 30px;
}
.container-box-half {
    border:  ${({ theme }) => theme === "dark" ? "0.5px solid #373636" : "0.5px solid #f1f1f1"};
    padding: 20px;
    width: 110%;
    border-radius: 10px;
   box-shadow: 0px 6px 18px -2px #18181C1A;
   background-color:${({ theme }) => themes[theme].formStepperBg};
}
.container-box-rightmain{
    width: 100%;
}
.container-box-right-map {
    padding: 0px;
    width: 100%;
    border-radius: 10px;
    background:#36AFFA;
    box-shadow: 0px 6px 18px -2px #18181C1A;
}
    .container-box-right {
    border: 0.5px solid #f1f1f1;
    padding: 20px;
    width: 100%;
    margin-top:20px;
    border-radius: 10px;
    background-color:${({ theme }) => themes[theme].formStepperBg};
    //box-shadow: 0px 6px 18px -2px #18181C1A;
}
.container-wrapper{
    display: flex;
    gap:50px;
    justify-content: space-between;
}

//property information
.logobox {
    width: 34px;
    height: 34px;
    padding: 8px 10px 8px 9px;
    gap: 10px;
    border-radius: 5px;
    background-color: #EEF6FF;


}

.stepperbutton-edit {
    width: 67px;
    height: 40px;
    gap: 8px;
    border-radius: 5px;
    border: 1px solid #F1F1F1;
    color:${({ theme }) => themes[theme].stepperEditBtn};
}

.step-content-box {
    display: flex;
    gap:30px;
    justify-content: space-between;
    color: ${({ theme }) => themes[theme].stepperContentBoxColor};
}
    .step-content-box-map {
    display: flex;
    gap:10px;
    justify-content: space-between;
    padding-top:10px;
}

.Heading-label {
    color: ${({ theme }) => themes[theme].stepperContentBoxColor};
    font-size: 16px;
    font-weight: 600;
    text-align: left;

}
.subheading-label {
font-size:13px;
font-weight:400;
color:${({ theme }) => themes[theme].stepperContentBoxColor} ;

}

.form-heading {
    color: #ADACB0;
    font-weight: 400;
    margin-bottom: 5px;
    font-size:13px;

}
    .form-heading1 {
    color: #ADACB0;
    font-weight: 400;
    margin-bottom: 5px;
    font-size:13px;
    padding:0px;

}

.form-controls {
    width: 100%;
    //box-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
}
    .form-controls1 {
    width: 100%;
    box-shadow: 0px 1.5px 4px -1px #9c9c9f;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
}
.dropdown-controls{
    width: 100%;
    box-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.2);
    height:46px;
    border-radius: 5px;
    margin-bottom: 5px;
}

.form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    padding-top:25px;
}
.mapbox {
    width: 100%;
    height: 100%;
    padding:none !important;
    border-radius: 0px 0px 10px 10px;


}
.ant-card-body .ant-card{
padding:0;
border-radius:0;
}
.flood-label {
    color: #FFFFFF;
    width: 626px;
    height: 30px;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    //background-color: #36AFFA;


}
.maplogobox {
    width: 45px;
    height: 45px;
    border-radius: 5px;


}
.map-logo {
    width: 34px;
    height: 34px;
    padding: 8px 10px 8px 9px;
    gap: 10px;
    border-radius: 5px;


}
.label-text {
  color: #ADACB0;
  display: block;
  margin-bottom: 10px;
}
  .suffix{
  margin-left:10px;
  cursor:pointer;
  }
.required-star {
  color: red; 
  padding-right: 5px;
}

     hr {
     border: 0.5px solid #e0e0e0;
     margin: 24px 0;
}    
`;
export const Container = styled.div`
  max-width: 1220px;
  //padding: 10px 20px;
  margin: 0 auto;
`;
export const CardStyle = styled.div`
.ant-card .ant-card-body{
padding:0px;
}
.ant-card-head{
    background:#36AFFA;
    color:white;
    }
`

export const CardStyleCars = styled.div`
margin-bottom: 20px
`

export const DriverAddButton = styled.div`
margin-top:35px
`