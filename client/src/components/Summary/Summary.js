import React, {Fragment} from 'react';
import classes from './Summary.module.css';

import Alert from 'react-bootstrap/Alert'

import { WiRaindrop, WiThermometer } from "react-icons/wi";

import { 
    convertDurationDataToMilliSecs,
    getDurationData, 
    getDurationString,
    getTimerString 
} from '../../utils/TimeUtils';

const summary = (props) => {

    let durationStr;
    if (props.data.duration) {
        durationStr = getDurationString(props.data.duration);
    } else {
        durationStr = 'N/A';
    }


    let lastRunTimeStr;
    if (props.data.lastActualDuration) {
        lastRunTimeStr = getDurationString(props.data.lastActualDuration);
    } else {
        lastRunTimeStr = 'N/A';
    }

    const settingsData = {
        'External Controller':  'Enabled',
        'Settings':             'LED1 + LED2',
        'Duration':             durationStr,
        'Last RunTime Duration':    lastRunTimeStr 
    };

    const settings = Object.keys(settingsData).map((key) => (
        <Fragment key={key}>
            <div className="col-5">
                <label>{key}</label>
            </div>
            <div className="col-7">
                {settingsData[key]}
            </div>
        </Fragment>
        
    ));

    return (
        <div className={["box-border", classes.Summary].join(' ')}>
            <Alert 
                variant="primary"
                className={classes.AlertContents}
                >
                <div><WiThermometer /><label>Temperature:</label> 20 <span>&#8451;</span></div>
                <div><WiRaindrop /><label>Humidity:</label> 5%</div>
            </Alert>

            <div className="row">
                {settings}
            </div>
        </div>
    )
};

export default summary;