import React from 'react';
import FormCheckBox from 'components/FormControl/FormCheckBox';

const BillingTableConfig = (isEditable) =>{
   const dataSource = [
    {
      key: "1",
      transactions: "Payment",
      transEffectiveDate: "02/16/2022",
      transAmount: "15084.00",
      postingDate: "02/17/2022",
      accountingDate: "03/03/2022",
    },
    {
      key: "2",
      transactions: "Suspense Reason",
      transEffectiveDate: "02/16/2022",
      transAmount: "0.00",
      postingDate: "02/21/2022",
      accountingDate: "02/21/2022",
    },
    {
      key: "3",
      transactions: "Suspense Reason",
      transEffectiveDate: "02/16/2022",
      transAmount: "0.00",
      postingDate: "02/24/2022",
      accountingDate: "02/24/2022",
    },
    {
      key: "4",
      transactions: "New Business",
      transEffectiveDate: "02/16/2022",
      transAmount: "12529.00",
      postingDate: "03/03/2022",
      accountingDate: "03/03/2022",
    },
    {
      key: "5",
      transactions: "Rsrv Fnd Asmnt",
      transEffectiveDate: "02/16/2022",
      transAmount: "2256.00",
      postingDate: "03/03/2022",
      accountingDate: "03/03/2022",
    },
    {
      key: "6",
      transactions: "HFIAA Surcharge",
      transEffectiveDate: "02/16/2022",
      transAmount: "250.00",
      postingDate: "03/03/2022",
      accountingDate: "03/03/2022",
    },
    {
      key: "7",
      transactions: "Service Fee",
      transEffectiveDate: "02/16/2022",
      transAmount: "47.00",
      postingDate: "03/03/2022",
      accountingDate: "03/03/2022",
    },
    {
      key: "8",
      transactions: "Waived Amount",
      transEffectiveDate: "03/03/2022",
      transAmount: "2.00",
      postingDate: "03/03/2022",
      accountingDate: "03/03/2022",
    },
    {
      key: "9",
      transactions: "Correspondence Sent",
      transEffectiveDate: "02/16/2022",
      transAmount: "0.00",
      postingDate: "12/10/2022",
      accountingDate: "12/10/2022",
    },
    {
      key: "10",
      transactions: "Non Renewal",
      transEffectiveDate: "02/16/2022",
      transAmount: "12590.00",
      postingDate: "12/22/2022",
      accountingDate: "00/00/0000",
    },
  ];
  
   const cdataSource = [
    {
      key: "1",
      commisionArea: "Personal Auto",
      transEff: "10.00",
      override: false,
      keepAtRenl: true,
      overridePerc: "10.00",
      contrib: "0.00",
      final: "10.00",
      ratedPrem: "1500.00",
      finalPrem: "1500.00",
      retedFees: "0.00",
      finalFees: "0.00",
      transactionCommission: "139.73",
    },
  ];
  
   const initialValues = {
    totalPremium: "1500.00",
    totalFees: "434.63",
    premiumBilled: "1500.00",
    feesBilled: "434.63",
    premiumAdjustments: "0.00",
    feesAdjustments: "0.00",
    premiumPaid: "-1500.00",
    feesPaid: "-434.63",
    invoiceDate: "10/15/2024",
    dueDate: "11/14/2024",
    amountDue: "1934.63",
    payOffAmount: "1934.63",
  };
  
   const columns = [
    {
        title: "Transactions",
        dataIndex: "transactions",
        key: "transactions",
        sorter: (a, b) => a.transactions.localeCompare(b.transactions),
    },
    {
        title: "Trans. Eff. Date",
        dataIndex: "transEffectiveDate",
        key: "transEffectiveDate",
        sorter: (a, b) => a.transEffectiveDate.localeCompare(b.transEffectiveDate),
    },
    {
        title: "Trans. Amount",
        dataIndex: "transAmount",
        key: "transAmount",
        sorter: (a, b) => a.transAmount - b.transAmount,
    },
    {
        title: "Posting Date",
        dataIndex: "postingDate",
        key: "postingDate",
        sorter: (a, b) => a.postingDate.localeCompare(b.postingDate),
    },
    {
        title: "Accounting Date",
        dataIndex: "accountingDate",
        key: "accountingDate",
        sorter: (a, b) => a.accountingDate.localeCompare(b.accountingDate),
    },
  ];
   const ccolumns = [
    {
        title: "Commission Area",
        dataIndex: "commisionArea",
        key: "commisionArea",
        sorter: (a, b) => a.commisionArea.localeCompare(b.commisionArea),
    },
    {
        title: "Trans. Eff",
        dataIndex: "transEff",
        key: "transEff",
        sorter: (a, b) => a.transEff.localeCompare(b.transEff),
    },
    {
        title: "Override",
        dataIndex: "override",
        key: "override",
        sorter: false,
        render: (_, record) => {
            console.log(record.override);
            return (
              <div>
                <FormCheckBox
                  name="override"
                  colon={false}
                  options={[
                    {
                      label: "",
                      value: "override",
                      disabled:!isEditable
                    }
                  ]}
                />
              </div>
            );
        },
    },
    {
        title: "Keep at Renl.",
        dataIndex: "keepAtRenl",
        key: "keepAtRenl",
        sorter: false,
        render: (_, record) => {
          console.log(record, _);
          return (
            <div>
              <FormCheckBox
                name="keepAtRenl"
                options={[
                    {
                      label: "",
                      value: "keepAtRenl",
                      disabled:!isEditable
                    },
                  ]}
                defaultValue= {['keepAtRenl']}
                colon={false}
              />
            </div>
          );
        },
      },
    {
        title: "Override %",
        dataIndex: "overridePerc",
        key: "overridePerc",
        sorter: (a, b) => a.overridePerc.localeCompare(b.overridePerc),
    },
    {
        title: "Contrib",
        dataIndex: "contrib",
        key: "contrib",
        sorter: (a, b) => a.contrib.localeCompare(b.contrib),
    },
    {
        title: "Final",
        dataIndex: "final",
        key: "final",
        sorter: (a, b) => a.final.localeCompare(b.final),
    },
    {
        title: "Rated Prem.",
        dataIndex: "ratedPrem",
        key: "ratedPrem",
        sorter: (a, b) => a.ratedPrem.localeCompare(b.ratedPrem),
  
    },
    {
        title: "Final Prem.",
        dataIndex: "finalPrem",
        key: "finalPrem",
        sorter: (a, b) => a.finalPrem.localeCompare(b.finalPrem),
    },
    {
        title: "Rated Fees",
        dataIndex: "retedFees",
        key: "retedFees",
        sorter: (a, b) => a.retedFees.localeCompare(b.retedFees),
    },
    {
        title: "Final Fees",
        dataIndex: "finalFees",
        key: "finalFees",
        sorter: (a, b) => a.finalFees.localeCompare(b.finalFees),
    },
    {
        title: "Transaction Commission",
        dataIndex: "transactionCommission",
        key: "transactionCommission",
        sorter: (a, b) => a.transactionCommission.localeCompare(b.transactionCommission),
    },
  ];

  return {dataSource,cdataSource,initialValues,columns,ccolumns}
}
export default BillingTableConfig