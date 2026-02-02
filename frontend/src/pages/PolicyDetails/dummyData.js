import dayjs from 'dayjs';
export const initialValues = {
    buildingDeductible: '5000',
    contentDeductible: '5000',
    totalCoveragebuilding: '5000',
    totalCoverageContents: "5000"
}

export const paymentInitialValues = {
    partyResponsibleToPayingBill: 'Lender',
    payTo: 'EXAVALU Company',
    transactionAmount: '$390.00',
    transactionDate: dayjs('03/12/2023', 'MM/DD/YYYY'),
    transactionDescription: "Personal Auto Insurance",
    paymentMethod: "CHQ",
}

export const policySummaryInitialValues = {
    policyHolderName: 'AUTO3139000460/1/PAUL SMITH',
    paymentPlan: 'Full Pay',
    termsStartDate: dayjs('08/15/2024', 'MM/DD/YYYY'),
    termsEndDate: dayjs('08/15/2025', 'MM/DD/YYYY'),
    transactionEffectiveDate: dayjs('08/15/2024', 'MM/DD/YYYY'),
    transactionExpiryDate: dayjs('08/15/2025', 'MM/DD/YYYY'),
    transactionType: 'New Business - Agent Business',
    billTo: 'POLHOLDER',
    totalPremiumChange: "$6,312.00",
    productName: "Personal Auto Program",
    totalPremium: "$6,312.00",
    uwriter: "",
    totalClaim: "",
    transactionNote: "",
    servRep: '0 Policyholder/Member Copy Agent Copy',
    memberId: "",
    ratingMethod: '2.0'
}

export const insuredInitialValues = {
    isInsuredBusiness: 'yes',
    firstnane: 'PAUL',
    lastName: 'SMITH',
    addInsuredFirstName: "JOHN",
    addInsuredLastName: "SMITH",
    telephoneNumber: "01-2222-2212",
    address1: "PO Box",
    address2: "",
    city: "Saint Petersburg",
    state: "Florida",
    zipcode: "33733",
    isSameInsuredAddress: 'yes',
}

export const uwQuestionInitialValues = {
    isInsuredHasNonProfitEntity: 'yes',
    isInsuredhasSmallBusiness: 'yes',
    condoOwernship: 'yes',
}

export const tabTogglesValues = {
    "1": true,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
};

export const tabTogglesUpdatedValues = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
}