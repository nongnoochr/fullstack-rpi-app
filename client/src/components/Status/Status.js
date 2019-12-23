import React, {Component, Fragment} from 'react';

import classes from './Status.module.css';
import Loader from '../UI/Loader/Loader';
import Timer from '../Timer/Timer';

import ProgressBar from 'react-bootstrap/ProgressBar';
import { FiPower } from "react-icons/fi";

import { convertDurationDataToSeconds } from '../../utils/TimeUtils';
import { APPSTATE } from '../../services/CONSTANT'

class Status extends Component {


    render () {

        let statusData = {
            className: '',
            content: null,
        };
        
        switch (this.props.state) {
            case APPSTATE.STANDBY:
                statusData = {
                    className: classes.Standby,
                    content: (<Fragment>
                        <div className={classes.StatusText}>Standby</div>
                        <div><FiPower /></div>
                    </Fragment>) 
                }
                break;

            case APPSTATE.INITIALIZING:
                statusData = {
                    className: classes.Initializing,
                    content: (<Fragment>
                        <div className={classes.StatusText}>Initializing</div>
                        <Loader />                    
                    </Fragment>) 
                }
                break;

            case APPSTATE.RUNNING:
                const timerData = {
                    isrunning:  this.props.isrunning,
                    current:    {
                        ...this.props.data.current
                    }
                };

                let curProgress, curLabel;
                if (this.props.data.duration) {
                    const msCurrent = convertDurationDataToSeconds(this.props.data.current) * 1000;
                    curProgress = Math.ceil((msCurrent / this.props.data.duration) * 100);
                    curLabel = `${curProgress}%`;

                } else {
                    curProgress = 100;
                    curLabel = 'In progress...';
                }
                

                statusData = {
                    className: classes.Running,
                    content: (<Fragment>
                        <div className={classes.StatusText}>Running</div>
                        <Timer data={timerData} />
                        <div className={classes.ProgressBarContainer}>
                            <ProgressBar animated 
                                now={curProgress} 
                                label={curLabel}
                                />
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
}




export default Status;