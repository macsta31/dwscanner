import React from 'react'
import '../App.css';
import { useState, useEffect } from 'react';
import DataSetLeak from './DataSetLeak';
import {BsCircleFill} from 'react-icons/bs'

const Leak = ({content, threatsMap}) => {
    const [modal, setModal] = useState(false);
    console.log(content)
    // const [threatLevel, setThreatLevel] = useState(0)
    // var threatLevel = 0;

    // console.log(threatsMap['Genders'])
    // console.log(content)
    const [maxThreatLevel, setMaxThreatLevel] = useState(0);
    const [threatColor, setMaxThreatColor] = useState('green');

    useEffect(() => {
        let maxLevel = 0;
        content.DataClasses.forEach((dataClass) => {
            if (threatsMap.hasOwnProperty(dataClass) && threatsMap[dataClass] > maxLevel) {
            maxLevel = threatsMap[dataClass];
            }
        });
        setMaxThreatLevel(maxLevel);
    }, [content.DataClasses, threatsMap]);

    const colorMap = {
        0: 'green',
        1: 'orange',
        2: 'red',
        3: 'maroon',
    };



    
  return (
    <div className='leak' onClick={() => {setModal(!modal)}}>
        <div>
            {content.Name ? <div className='leakInfoContainer'>Name:  {content.Name}</div> : <></>}
            {content.BreachDate ? <div className='leakInfoContainer'>Breached On:  {content.BreachDate}</div> : <></>}
            {content.isMalware ? <div className='leakInfoContainer'>Malware</div> : <></>}
            {/* <div>{colorMap[maxThreatLevel]}</div> */}
        </div>
        <div>
            <BsCircleFill color={colorMap[maxThreatLevel]} />
        </div>
        {modal ? 
        <div className='modal'>
            <div className='modalContent'>
                <h3>Datasets Breached</h3>
                {content.DataClasses.map((classes, i) => (
                    
                    <DataSetLeak key={i} threat={threatsMap[classes]} dataclass={classes} />
                )

                )}
            </div>
        </div> : <></>}
    </div>
  )
}

export default Leak