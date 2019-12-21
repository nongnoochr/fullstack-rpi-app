import React from 'react';

const timer = (props) => {

    return (
        <div>
            {getTimerString(props.data.current)}
        </div>
    );
}

export default timer;

// ----------------
// Helpers
const getTimerString = (data) => {
        
    const hr = convertNumTimeToString(data.hour);
    const min = convertNumTimeToString(data.minute);
    const sec = convertNumTimeToString(data.second);
    
    return hr + ':' + min + ':' + sec;
};

// --------------
const convertNumTimeToString = (num) => {
    let numStr = num.toFixed();
    if (numStr.length === 1) {
        numStr = '0' + numStr;
    }
    return numStr;
};