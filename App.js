import logo from '/pdfs/wd/atlan/Main/src/logo.png';
import './App.css';
import React, { useState } from 'react'
import Papa from "papaparse";


function App() {
  const [data,setData]=useState(null)
  const [print,setPrint]=useState(false)
   // State to store parsed data
   const [parsedData, setParsedData] = useState([]);

   //State to store table Column name
   const [tableRows, setTableRows] = useState([]);
 
   //State to store the values
   const [values, setValues] = useState([]);
   
   const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);
  
         // Filtered Values
         setValues(valuesArray);
       
      },
    });
  };

  function getdata(val){
    setData(val.target.value);
    setPrint(false);
    
   }
   
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <br>
       </br>
        <label>Enter your SQL Command...</label>
        <textarea classname="InputText" rows="10" cols="50"  border-width="10px" onChange={getdata}>
          </textarea>
       {/* File Uploader */}
       <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />  

       <button onClick={()=>{setPrint(true)} }>Search</button>
       </header>
       
      {
         print?
         <div>
           <p>Query results....</p>
           
         <table>
        <thead>
        
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>:null
         }
         
    <footer><center>Atlan FrontEnd Challenge 2022</center></footer>
    <br />
  </div>
  );
   
}


export default App;
