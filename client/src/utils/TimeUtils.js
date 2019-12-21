// Constants

export const INIT_TIMER_DATA = {
    hour:   0,
    minute: 0,
    second: 0
}

// ---------------
export const getDurationData = (ms) => {
    return updateDurationTime(INIT_TIMER_DATA, ms);
}

export const convertDurationDataToSeconds = (data) => {
    const ms = 3600*data.hour
        + 60*data.minute
        + data.second;

    return ms;
}

export const updateDurationTime = (origDurationData, ms) => {
    // Add a specified duration (in milliseconds) to a given duration data

    // See
    // https://jsfiddle.net/Daniel_Hug/pvk6p/

    const origDurationSecs = convertDurationDataToSeconds(origDurationData);

    const newRawSecs = origDurationSecs + ms/1000;
    const newTimeSecs = newRawSecs % 60;

    const newRawMins = Math.floor(newRawSecs / 60);
    const newTimeMins = newRawMins % 60;

    const newTimeHrs = Math.floor(newRawMins / 60);

    return {
        hour:   newTimeHrs,
        minute: newTimeMins,
        second: newTimeSecs
    };
}

export const getDurationString = (ms) => {

    const data = getDurationData(ms);
    let durationStr = '';
    if (data.hour > 0) {
        durationStr = durationStr + data.hour.toFixed() + ' hrs ';
    }

    if (data.minute > 0) {
        durationStr = durationStr + data.minute.toFixed() + ' mins ';
    }

    if (data.second > 0) {
        durationStr = durationStr + data.second.toFixed() + ' secs ';
    }

    return durationStr;
}


export const getTimerString = (data) => {
    // convert the input duration data to string
        
    const hr = convertNumTimeToString(data.hour);
    const min = convertNumTimeToString(data.minute);
    const sec = convertNumTimeToString(data.second);
    
    return hr + ':' + min + ':' + sec;
};
// --------------
// Local Helpers
// --------------
const convertNumTimeToString = (num) => {
    let numStr = num.toFixed();
    if (numStr.length === 1) {
        numStr = '0' + numStr;
    }
    return numStr;
};