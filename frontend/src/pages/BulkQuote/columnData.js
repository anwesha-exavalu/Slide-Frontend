import React from 'react'
import { Checkbox} from "antd";

const ColumnData = (selectedRowKey, setSelectedRowKey) => {
    
    const onCheckboxChange = (key) => {
        setSelectedRowKey((prev) =>
            prev.includes(key)
                ? prev.filter((rowKey) => rowKey !== key) // Remove if already selected
                : [...prev, key] 
        );
    };
    const columns = [
        {
           
            dataIndex: "filter",
            key: "filter",
            render: (text, record) => (
                <Checkbox
                    checked={selectedRowKey.includes(record.key)}
                    onChange={() => onCheckboxChange(record.key)}
                />
            ),
        },
        {
            title: "Business Name",
            dataIndex: "Business Name",
            key: "Business Name",
            sorter: (a, b) => a["Business Name"].localeCompare(b["Business Name"]),
        },
        // {
        //     title: "Mailing Address",
        //     dataIndex: "Mailing Address",
        //     key: "Mailing Address",
        //     width:'20%',
        //     sorter: (a, b) => a["Mailing Address"].localeCompare(b["Mailing Address"]),
        // },
        {
            title: "Industry Classification",
            dataIndex: "Industry",
            key: "Industry",
            sorter: (a, b) => a.Industry.localeCompare(b.Industry),
        },
        // {
        //     title: "Number of Employees",
        //     dataIndex: "Number of Employees",
        //     key: "Number of Employees",
        //     sorter: (a, b) => a[ "Number of Employees"].localeCompare(b["Number of Employees"]),
        // },
        {
            title: "Total Annual Revenue",
            dataIndex: "Annual Revenue",
            key: "Annual Revenue",
            width:'5%',
            sorter: (a, b) => a["Annual Revenue"].localeCompare(b["Annual Revenue"]),
        },
        {
            title: "Entity Type",
            dataIndex: "Entity Type",
            key: "Entity Type",
            width:'5%',
            sorter: (a, b) => a["Entity Type"].localeCompare(b["Entity Type"]),
        },
        {
            title: "Company Website",
            dataIndex: "Company Website",
            key: "Company Website",
            sorter: (a, b) => a["Company Website"].localeCompare(b["Company Website"]),
        },
        {
            title: "Cyber Effective Date",
            dataIndex: "Effective Date",
            key: "Effective Date",
            sorter: (a, b) => a["Effective Date"].localeCompare(b["Effective Date"]),
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status",
            sorter: (a, b) => a.Status.localeCompare(b.Status),
        },
        {
            title: "Action",
            dataIndex: "Action",
            key: "Action",
            
        },

    ];

    return { columns };
}

export default ColumnData;