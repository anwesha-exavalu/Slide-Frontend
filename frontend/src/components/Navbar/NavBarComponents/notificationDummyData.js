
export const dataSource = [
    {
      key: "1",
      from: "PDAdjuster1",
      description:`Reminder for task: Flood Coverage Change - 
      Follow up on Rejection of UM / UIM form for Endorsement effective on 04/10/2023`,
    },
    {
      key: "2",
      from: "PDAdjuster1",
      description: `Reminder for task: UM Coverage Change - Producers - 
      Follow up on Rejection of UM / UIM form for Endorsement effective on 09/26/2023`,
    },
    {
      key: "3",
      from: "PDAdjuster1",
      description: `Reminder for task: UM Coverage Change - 
      Follow up on Rejection of UM / UIM form for Endorsement effective on 09/26/2023`,
    },
    {
      key: "4",
      from: "PDAdjuster1",
      description: `Claim Review After Policy Transaction Behind Loss Date for Test FR Bond OH 1818`,
    },
    {
      key: "5",
      from: "PDAdjuster1",
      description: `Delay letter for CLM-00000008 due to open features`,
    },
    {
      key: "6",
      from: "PDAdjuster1",
      description: `Late Payment Received on Cancelled Policy FL0000211 For IETest TestOH`,
    },
    {
      key: "7",
      from: "PDAdjuster1",
      description: `Late Payment Received on Cancelled Policy FL0000212 For IETest TestOH`,
    },
    {
      key: "8",
      from: "PDAdjuster1",
      description: `Not enough time to cancel policy for non-payment on Policy FL0000234 for mk Test OH-Flood`,
    },
    {
      key: "9",
      from: "PDAdjuster1",
      description: `Not enough time to cancel policy for non-payment on Policy FL0000236 for mk Test OH-Flood`,
    },
    {
      key: "10",
      from: "PDAdjuster1",
      description: `Attachment Review on FL0000208-01`,
    },
    {
      key: "11",
      from: "PDAdjuster1",
      description: `Driver Exclusion Review on FL0000091-01`,
    },
    {
      key: "12",
      from: "PDAdjuster1",
      description: `Information Request Follow Up on FL0000189`,
    },
    {
      key: "13",
      from: "PDAdjuster1",
      description: `Delay OK letter for CLM-00000003 due to open features`,
    },
    {
      key: "14",
      from: "PDAdjuster1",
      description: `Delay OK letter for CLM-00000003 due to open features`,
    },
    {
      key: "15",
      from: "PDAdjuster1",
      description: `Renewal Buy In Discount Review on FL0000258-01`,
    },
  ];
export const columns = [
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      sorter:(a, b) => a.from.localeCompare(b.from),
      width: '30%',
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter:(a, b) => a.description.localeCompare(b.description),
      width: '70%',
    },
    
  ];

