import React from 'react'
import Leak from './Leak'
import '../App.css'
import { useEffect, useState } from 'react'

const Leaks = ({data}) => {

    const [hashMap, setHashMap] = useState({});

    useEffect(() => {
        fetch('/threatlevels.csv')
          .then((response) => response.blob())
          .then((file) => {
            csvFileToHashMap(file, (hashMapResult) => {
              setHashMap(hashMapResult);
            });
          })
          .catch((error) => {
            console.error('Error fetching the CSV file:', error);
          });
      }, []);

    function csvFileToHashMap(file, callback) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          const csv = event.target.result;
          const lines = csv.split('\n');
          const headers = lines[0].split(',');
      
          const hashMap = {};
      
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
      
            const values = line.split(',');
      
            const key = values[0];
            const value = values[1];
      
            hashMap[key] = value;
          }
      
          callback(hashMap);
        };
      
        reader.onerror = () => {
          console.error('Error reading the CSV file');
        };
      
        reader.readAsText(file);
    }
      

  return (
    <div className='leaksContainer'>
        {/* <h3>leaks</h3> */}
        {data.map((leak, i) => 
            <Leak key={i} content={leak} threatsMap={hashMap} />
        )}
    </div>
  )
}

export default Leaks