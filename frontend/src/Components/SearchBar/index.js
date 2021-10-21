import React, {useState} from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import api from "../../api"; 

function SearchBar({placeholder, data}){
    const [filteredData, setFilteredData] = useState([]); 
    const [wordEntered, setWordEntered] = useState(""); 

    const handleFilter = async(event) => {
        const searchWord = event.target.value 
        setWordEntered(searchWord);
        
        const dict = await api.get("/jobs/search/"+searchWord);
        const myData = dict['data']['jobs']; 

        const newFilter = myData.filter((value) => {
            return value.jobName.toLowerCase().includes(searchWord.toLowerCase()) || value.companyName.toLowerCase().includes(searchWord.toLowerCase()); 
        });

        if (searchWord === "") {
            setFilteredData([]); 
        }
        else {
            setFilteredData(newFilter); 
        }

        // for (var i = 0; i<data.length; i++) {
        //     return data[i].title.toLowerCase().includes(searchWord.toLowerCase()); 
        // }; 

        console.log(dict);
        
        console.log(filteredData); 
    }; 

    const clearInput = () => {
        setFilteredData([]); 
        setWordEntered(""); 
    }

    return (
        <div className="app-container">
            <div className="search">
                <div className="searchInputs">
                    <input type="text" placeholder={placeholder}  value={wordEntered} onChange={handleFilter} />
                    <div className="searchIcon">
                        {filteredData.length === 0 ? (
                        <SearchIcon /> 
                        ) : (
                        <ClearIcon id="clearBtn" onClick={clearInput}/>) }
                    </div>
                </div>
                
                {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return <a className="dataItem"> 
                        <p> {value.jobName} at {value.companyName} </p>
                        </a>
                    })}
                    </div> 
                )}

                </div>
                
                <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Position Name</th>
                        <th>Job Description</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((info) => (
                        <tr>
                        <td>{info.companyName}</td>
                        <td>{info.jobName}</td>
                        <td>{info.introduction}</td>
                        <td>{info.location}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>



        </div>
    )

}

export default SearchBar