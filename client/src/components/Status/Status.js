import React, {Fragment} from 'react';
import classes from './Status.module.css';
import { FiPower } from "react-icons/fi";


const status = (props) => {

    let curStatus = 'initialize';
    let statusData = {
        className: '',
        content: null
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
                className: classes.Initialize,
                content: (<Fragment>
                    <div className={classes.StatusText}>Initializing</div>
                    <div className={classes.Loading}></div>
                    <div className={classes['loading-animation-container']}>
                        <div className={classes.dot}></div>
                        <div className={classes.dot}></div>
                        <div className={classes.dot}></div>
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