import React from "react";
import PrintIcon from 'assets/svg/printer.svg';
import EditIcon from 'assets/svg/edit.svg';
import LinkIcon from 'assets/svg/link.svg';
import samplePdf from "assets/files/sample.pdf";

const SearchQuoteConfig=(editQuote)=>{
    
    const viewPdf = () => {
        window.open(samplePdf, '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600');
    }
    const columns = [
        {
            "title": "Effective date",
            "dataIndex": "effDate",
            "key": "effDate",
            sorter: (a, b) => a.effDate.localeCompare(b.effDate),
        },
        {
            "title": "Quote No.",
            "dataIndex": "quoteNo",
            "key": "quoteNo",
            sorter: (a, b) => a.quoteNo.localeCompare(b.quoteNo),
        },
        {
            "title": "Insured name",
            "dataIndex": "insuredName",
            "key": "insuredName",
            sorter: (a, b) => a.insuredName.localeCompare(b.insuredName),
        },
        {
            "title": "Collision Deductible",
            "dataIndex": "collisiondeductible",
            "key": "collisiondeductible",
            sorter: (a, b) => a.collisiondeductible.localeCompare(b.collisiondeductible),
        },
        {
            "title": "Comprehensive Deductible",
            "dataIndex": "comprehensivedeductible",
            "key": "comprehensivedeductible",
            sorter: (a, b) => a.comprehensivedeductible.localeCompare(b.comprehensivedeductible),
        },
        
        {
            "title": "Driver Id",
            "dataIndex": "driverId",
            "key": "driverId",
            sorter: (a, b) => a.driverId.localeCompare(b.driverId),
        },
        {
            "title": "Vehicle Id",
            "dataIndex": "vehicleId",
            "key": "vehicleId",
            sorter: (a, b) => a.vehicleId.localeCompare(b.vehicleId),
        },
        {
            "title": "",
            "dataIndex": "actions",
            "key": "actions",
            "render": (_,data) => {
                return (<div style={{ display: "flex", gap: "15px" }}>
                <a onClick={() => viewPdf()}><img src={PrintIcon} /></a>
                <a><img src={LinkIcon} /></a>
                <a onClick={() => editQuote(`/edit-quote/${data?.key}`, data)}><img src={EditIcon} /></a>
            </div>)}
        }
    ]
    
    const dataSource = [
        {
            "key": "99199",
            "effDate": "26/07/24",
            "driverId": "D1234567",
            "quoteNo": "QT07895733",
            "insuredName": "John Denver",
            "collisiondeductible": "500",
            "comprehensivedeductible": "600",
            "vehicleId": "001"
        },
        {
            "key": "99299",
            "effDate": "06/07/24",  
            "driverId": "D1234560",
            "quoteNo": "QT07895734",  
            "insuredName": "John Doe",  
            "collisiondeductible": "500",
            "comprehensivedeductible": "500",
            "vehicleId": "002"
        },
        {
            "key": "99399",
            "effDate": "07/07/24",  
            "driverId": "D1234500",
            "quoteNo": "QT07895735", 
            "insuredName": "Emily Davis",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "99499",
            "effDate": "08/07/24",  
            "driverId": "D1234590",
            "quoteNo": "QT07895736",
            "insuredName": "Anna Smith",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "99599",
            "effDate": "10/07/24",
            "driverId": "D1234590",  
            "quoteNo": "QT07895737",
            "insuredName": "Christopher Nolan",
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "99699",
            "effDate": "09/07/24", 
            "driverId": "D1234590", 
            "quoteNo": "QT07895722",  
            "insuredName": "Michael Jordan",
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "99799",
            "effDate": "11/07/24", 
            "driverId": "D1234500", 
            "quoteNo": "QT07895738",  
            "insuredName": "Sarah Connor",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "99899",
            "effDate": "12/07/24",  
            "driverId": "D1234511", 
            "quoteNo": "QT07895739", 
            "insuredName": "Peter Parker", 
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "99999",
            "effDate": "13/07/24", 
            "driverId": "D1234123", 
            "quoteNo": "QT07895740",  
            "insuredName": "Bruce Wayne",
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "991990",
            "effDate": "14/07/24",  
            "driverId": "D12345899", 
            "quoteNo": "QT07895741", 
            "insuredName": "Clark Kent",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "991991",
            "effDate": "15/07/24", 
            "driverId": "D1234561", 
            "quoteNo": "QT07895742", 
            "insuredName": "Diana Prince",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "991992",
            "effDate": "16/07/24", 
            "driverId": "D1234569", 
            "quoteNo": "QT07895743", 
            "insuredName": "Emily Jones",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "991993",
            "effDate": "17/07/24",  
            "driverId": "D1234568", 
            "quoteNo": "QT07895744",
            "insuredName": "Micheal David",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        },
        {
            "key": "991994",
            "effDate": "18/07/24", 
            "driverId": "D1234533",  
            "quoteNo": "QT07895745",  
            "insuredName": "Steve Buckner",  
            "collisiondeductible": "1000",
            "comprehensivedeductible": "1500",
            "vehicleId": "003"
        }
    ];

    return {columns,dataSource}
}

export default SearchQuoteConfig