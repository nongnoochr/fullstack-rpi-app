import React, {Fragment} from 'react';
import classes from './Status.module.css';
import Loader from '../UI/Loader/Loader';
import Timer from '../Timer/Timer';

import ProgressBar from 'react-bootstrap/ProgressBar';
import { FiPower } from "react-icons/fi";


const status = (props) => {

    // <#TODO> To be updated to use props
    let curStatus = 'running';
    let curProgress = 100;

    let statusData = {
        className: '',
        content: null,
    };
    
    switch (curStatus) {
        case 'standby':
            statusData = {
                className: classes.Standby,
                content: (<Fragment>
                    <div className={classes.StatusText}>Standby</div>
                    <div><FiPower /></div>
                </Fragment>) 
            }
            break;

        case 'initialize':
            statusData = {
                className: classes.Initializing,
                content: (<Fragment>
                    <div className={classes.StatusText}>Initializing</div>
                    <Loader />                    
                </Fragment>) 
            }
            break;

        case 'running':
            statusData = {
                className: classes.Running,
                content: (<Fragment>
                    <div className={classes.StatusText}>Running</div>
                    <Timer />
                    <div className={classes.ProgressBarContainer}>
                        <ProgressBar animated now={curProgress} />
                    </div>
                </Fragment>) 
            }
            break;

        default:
                // do nothing
    }
        

    return (
        <div className={['box-border', classes.Status, statusData.className].join(' ')}>
            {statusData.content}
        </div>
    );
}

export default status;