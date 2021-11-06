import React, {useState, useEffect} from 'react';
import axios from "axios"; 
import {Table, Popconfirm, Button, Space, Form, Input} from "antd"; 


import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import api from "../../api"; 
import PopUp from "../PopUp"; 

const DataTable = () => {
    const [gridData, setGridData] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [searchText, setSearchText] = useState(""); 
    const [form] = Form.useForm(); 
    let[filteredData] = useState(); 

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async() => {
        setLoading(true); 
        const response = await api.get("/jobs/get");
        const myData2 = response['data']['jobs'];
        setGridData(myData2); 
        setLoading(false); 

    }; 

    const handleApply = () => {

    }; 
 
   // console.log("gridData", gridData); 

    const columns = [{ 
        title: "ID",
        dataIndex: "employerID",
    }, 
    {
        title: "Job Name", 
        dataIndex: "jobName", 
        align: "center",
        editable: true,
    }, 

    {
        title: "Company Name", 
        dataIndex: "companyName", 
        align: "center",
        editable: true,

    }, 
    {
        title: "Location", 
        dataIndex: "location", 
        align: "center",
    },
    {
        title: "Apply", 
        //dataIndex: "location", 
        align: "center",
        render: (_, record) =>
        gridData.length >= 1 ? (
            <Popconfirm
            title="Apply"
            onConfirm={() => handleApply(record)}
            >
            <Button type="primary">Apply</Button>
            </Popconfirm>
        ): null, 
    },
]; 

const handleSearch = (e) => { 
    setSearchText(e.target.value); 
    if (e.target.value === ""){
        loadData(); 
    }
};
const globalSearch = () => {
    filteredData = gridData.filter((value) => {
        return (
            value.jobName.toLowerCase().includes(searchText.toLowerCase()) || 
            value.companyName.toLowerCase().includes(searchText.toLowerCase()) || 
            value.location.toLowerCase().includes(searchText.toLowerCase()) || 
            value.introduction.toLowerCase().includes(searchText.toLowerCase()) 
        );
    });
    setGridData(filteredData); 
}; 

const clearAll = () =>{
    setSearchText("");
}
 
    return (
        <div>
            <Space style={{marginBottom: 16}}>
            <Input 
                placeholder="Search for Jobs"
                onChange={handleSearch}
                type="text"
                allowClear
                value= {searchText}
            />
                <Button type="primary" onClick={globalSearch}>Search</Button>
                <Button onClick={clearAll}>Clear All</Button>            
            </Space>
            <Form form={form}>
                <Table 
                columns={columns}
                expandable = {{
                    expandedRowRender: (record) => (
                        <p style={{margin: 0}}>{record.introduction}</p>
                    ),
                    rowExpandable: (record) => record.info !== "Not Expandable",

                }}
                dataSource={filteredData && filteredData.length ? filteredData : gridData}
                bordered
                loading={loading}
                pagination
                />
            </Form>
        </div>
    ); 
}; 
 
export default DataTable; 

// function SearchBar({placeholder, data}){
//     const [filteredData, setFilteredData] = useState([]);
    
//     const [buttonPopup, setButtonPopup] = useState(false); 

//     const [unfilteredData, setUnfilteredData] = useState([]); // CREATING A CONSTANT UNFILTERED DATA
//     const [wordEntered, setWordEntered] = useState(""); 
    
//     const beforeAll = async () => {
//         const dict2 = await api.get("/jobs/get"); //GET CALL TO GET ALL JOBS
//         const myData2 = dict2['data']['jobs']; //SETTING VARIABLE TO MYDATA2
//         setUnfilteredData(myData2); 

//         //console.log(dict2);
//        // console.log(myData2);
//     };

//     useEffect(() => {  
//         {beforeAll()}

//        },[]);


//     const [open, setOpen] = useState(false);

//     const handleFilter = async(event) => {

//         const searchWord = event.target.value 
//         setWordEntered(searchWord);
        
//         const dict = await api.get("/jobs/search/"+searchWord);
//         const myData = dict['data']['jobs']; 
//         setFilteredData(myData); 

//         const newFilter = myData.filter((value) => {
//             return value.jobName.toLowerCase().includes(searchWord.toLowerCase()) || value.companyName.toLowerCase().includes(searchWord.toLowerCase()); 
//         });

//         if (searchWord === "") {
//             setFilteredData([]); 
//         }
//         else {
//             setFilteredData(newFilter); 
//         }
//     }; 

//     const clearInput = () => {
//         setFilteredData([]); 
//         setWordEntered(""); 
//     }

//      return (

//         <div className="app-container">
//             <div className="search" onBeforeInput={beforeAll}>
//                 <div className="searchInputs">
//                     <input type="text" placeholder="Search for Jobs"  value={wordEntered} onChange={handleFilter} />
//                     <div className="searchIcon">
//                         {filteredData.length === 0 ? (
//                         <SearchIcon /> 
//                         ) : (
//                         <ClearIcon id="clearBtn" onClick={clearInput}/>) }
//                     </div>
//                 </div>
                
//                 {filteredData.length != 0 && (
//                 <div className="dataResult">
//                     {filteredData.slice(0, 15).map((value, key) => {
//                         return <a className="dataItem"> 
//                         <p> {value.jobName} at {value.companyName} </p>
//                         </a>
//                     })}
//                     </div> 
//                 )}

//                 </div>
                
//                 <table>
//                 <thead>
//                     <tr>
//                         <th>Company</th>
//                         <th>Position Name</th>
//                         <th>Job Description</th>
//                         <th>Location</th>
//                     </tr>
//                 </thead>

//                 {filteredData.length === 0 ? ( //IF STATEMENT
//                     <tbody>
//                     {unfilteredData.map((info) => (
//                         <tr>
//                         <td>{info.companyName}</td>

//                         <td>
//                         <div className="btn">
//                             <button onClick={() => setButtonPopup(true)}> Open Popup </button>
//                             <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
//                                 <h3>My Popup</h3>
//                             </PopUp>
//                          </div>
//                             {/* {open && (
//                                 <div
//                                 class="popup"
//                                 // className="modal fade"
//                                 // tabIndex="-1"
//                                 // role="dialog"
//                                 // aria-labelledby="exampleModalLabel"
//                                 // aria-hidden="true"
//                                 >
//                                 <spam class="popuptext"> {info.introduction} </spam>
//                                 </div>
//                             )} */}
                        
//                         </td>
//                         <td>{info.introduction}</td>
//                         <td>{info.location}</td>
//                     </tr>
//                     ))}

//                 </tbody>
//                  ) : (

//                 <tbody>
//                     {filteredData.map((info) => (
//                         <tr>
//                         <td>{info.companyName}</td>
//                         <td>    
//                     <div>
//                         <div className="btn">
//                             <button>{info.jobName}</button>
//                          </div>
//                     </div>
                    
//                     </td>
//                         <td>{info.introduction}</td>
//                         <td>{info.location}</td>
//                     </tr>
//                     ))}
                    
//                 </tbody>
//                 )}
//             </table>
//         </div>
//     )

// }


//export default SearchBar