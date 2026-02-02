import React, { useState, useEffect } from 'react';
import { PaymentCard, PaymentContainer } from 'styles/pages/Payment';
import { Form, } from "antd";
import Dropdown from '../../components/FormControl/DropdownSelect';
import FormControl from '../../components/FormControl/FormInput';
import FormRadio from 'components/FormControl/FormRadio';
import SuccessMessageModal from 'components/PopupModal/SuccessMessageModal';
import GreenTick from "assets/svg/greentick.svg";
import exportfile from '../../assets/images/exportfile.svg';
import samplePdf from "assets/files/sample.pdf";
import { downloadPDf } from 'utils/helper';
import { Link } from 'react-router-dom';
import { PaymentOptionsVal } from 'components/FormControl/radioOption';
import paymentsDropDown from "assets/files/payment.csv";
import Papa from "papaparse";
import { setDropdownVals } from 'utils/helper';
import FormDatePicker from 'components/FormControl/FormDatePicker';
import dayjs from 'dayjs';

const filesData = {};

const PaymentOptions = ({ open, setOpen, viewPolicy, setViewPolicy }) => {

    const [dropDownOpts, setdropDownOpts] = useState([]);
    const commonConfig = { delimiter: "," };

    useEffect(() => {
        Papa.parse(paymentsDropDown, {
            ...commonConfig,
            header: true,
            download: true,
            complete: (results) => {
                setDropdownVals(results, filesData);
                setdropDownOpts(filesData);
            },
        });
    }, []);

    const viewIssuedPolicyHtml = (
        <>
            Policy <Link to={{ pathname: "/policy-details" }}>INS-12345678-XYZ</Link> is created successfully.
            <button
                type="submit"
                className="logo-button"
                onClick={() => downloadPDf("policy.pdf", samplePdf)}
            >
                <img
                    src={exportfile}
                    alt="Exavalu"
                    title="Exavalu"
                    className="logobox"
                />
            </button>
        </>
    );
const initialValues={"partyResponsibleToPayingBill": 'Lender',
                "payTo": 'EXAVALU Company',
                "transactionAmount": '$390.00',
                "transactionDate": dayjs('03/12/2023', 'MM/DD/YYYY'),
                "transactionDescription": "Auto Insurance",
                "paymentMethod": "EFT"}
    return (
        <div>
            <PaymentCard>
                <PaymentContainer>
                    <div>
                        <h5 className='card-title'>Payment Options:</h5>
                        <br />
                        <Form  initialValues={initialValues}>
                            <div className='grid2'>
                                <div >
                                    <Dropdown name="partyResponsibleToPayingBill" label='Party responsible for paying the renewal bill' options={dropDownOpts?.Payment} />
                                </div>
                            </div>
                            <div className='grid3'>
                                <div >
                                    <FormControl label='Pay to:' layout="vertical" name="payTo" type="text" />
                                </div>
                                <div></div>
                                <div >
                                    <FormControl layout="vertical" label='Transaction amount:' name="transactionAmount" type="text" />
                                </div>
                            </div>
                            <div className='grid3'>
                                <div>
                                    <FormDatePicker label='Transaction Date:' name="transactionDate"></FormDatePicker>
                                </div>
                                <div></div>
                                <div >
                                    <FormControl layout="vertical" label='Transaction Description:' name="transactionDescription" type="text" />
                                </div>

                            </div>
                            <br />
                            <br />
                            <br />
                            <div >
                                <FormRadio label='Please select a payment method' layout="horizontal" className='radio' name='paymentMethod' options={PaymentOptionsVal}  />
                            </div>
                        </Form>
                    </div>
                </PaymentContainer>
            </PaymentCard>

            <PaymentContainer>
                <p className='subtitle'>NOTICE:</p>

                <p className='content'>When selecting either credit card or EFT, you will be redirected to our partner, OneInc, to securely enter your payment details. Rest assured, all payment information is stored and managed securely.</p>

            </PaymentContainer>
            <SuccessMessageModal open={open} setOpen={setOpen} icon={GreenTick} message={'Application AP-12345 is saved successfully'} />
            <SuccessMessageModal open={viewPolicy} setOpen={setViewPolicy} icon={GreenTick} message={viewIssuedPolicyHtml} />
        </div>
    );
}

export default PaymentOptions;
