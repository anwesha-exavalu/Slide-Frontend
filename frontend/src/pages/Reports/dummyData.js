export const columns = [
    {
        "title": "Expiring Policy",
        "dataIndex": "effpolicy",
        "key": "effpolicy",
        sorter: (a, b) => a.effpolicy.localeCompare(b.effpolicy),
    },
    {
        "title": "Expiring Date",
        "dataIndex": "effDate",
        "key": "effDate",
        sorter: (a, b) => a.effDate.localeCompare(b.effDate),
    },
    {
        "title": "Product",
        "dataIndex": "product",
        "key": "product",
        sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
        "title": "Insured Last Name",
        "dataIndex": "insuredLastName",
        "key": "insuredLastName",
        sorter: (a, b) => a.insuredLastName.localeCompare(b.insuredLastName),
    },
    {
        "title": "Insured First Name",
        "dataIndex": "insuredFirstName",
        "key": "insuredFirstName",
        sorter: (a, b) => a.insuredFirstName.localeCompare(b.insuredFirstName),
    },
    {
        "title": "Paid Amount",
        "dataIndex": "paidAmount",
        "key": "paidAmount",
        sorter: (a, b) => a.paidAmount.localeCompare(b.paidAmount),
    },
    {
        "title": "Status",
        "dataIndex": "status",
        "key": "status",
        sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
        "title": "AgencyNo",
        "dataIndex": "agencyNo",
        "key": "agencyNo",
        sorter: (a, b) => a.agencyNo.localeCompare(b.agencyNo),
    },
    {
        "title": "Agency Name",
        "dataIndex": "agencyName",
        "key": "agencyName",
        sorter: (a, b) => a.agencyName.localeCompare(b.agencyName),
    },
    {
        "title": "Secondary Agency Name",
        "dataIndex": "secondaryAgencyName",
        "key": "secondaryAgencyName",
        sorter: (a, b) => a.secondaryAgencyName.localeCompare(b.secondaryAgencyName),
    },
    {
        "title": "Renewal Amount",
        "dataIndex": "renewalAmount",
        "key": "renewalAmount",
        sorter: (a, b) => a.renewalAmount.localeCompare(b.renewalAmount),
    },
    {
        "title": "NFIP Quote Amount",
        "dataIndex": "nFIPQuoteAmount",
        "key": "nFIPQuoteAmount",
        sorter: (a, b) => a.nFIPQuoteAmount.localeCompare(b.nFIPQuoteAmount),
    },
    {
        "title": "",
        "dataIndex": "actions",
        "key": "actions",
        sorter:false,
    }
]

export const dataSource = [
    {
        "key": "99199",
        "effpolicy": "95224151601",
        "effDate": "26/07/24",
        "product": "AUTO",
        "insuredLastName": "KNH",
        "insuredFirstName": "Holding",
        "paidAmount": "$4759",
        "status": "Active",
        "agencyNo": "733299",
        "agencyName": "Jas Insurance comp",
        "secondaryAgencyName": "",
        "renewalAmount": "$467",
        "nFIPQuoteAmount": "$0.00",
    },
    {
        "key": "99192",
        "effpolicy": "95224151600",
        "effDate": "26/07/24",
        "product": "AUTO",
        "insuredLastName": "Weller",
        "insuredFirstName": "Kariene",
        "paidAmount": "$8759",
        "status": "Expired",
        "agencyNo": "733799",
        "agencyName": "Jas Insurance comp",
        "secondaryAgencyName": "",
        "renewalAmount": "$867",
        "nFIPQuoteAmount": "$0.00",
    },

]

export const initialValues = {
    beginDate: '12/01/2023',
    endDate: '12/01/2024',
    includerenewalpolicy: 'N',
    agencyName: 'JAG Insurance LLP',
    agency: '733299',
    totalRecords: '29',
}