import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Status.module.css';
import Loader from '../UI/Loader/Loader';
import Timer from '../Timer/Timer';

import ProgressBar from 'react-bootstrap/ProgressBar';
import { FiPower } from "react-icons/fi";

class Status extends Component {

    // componentDidUpdate () {
        
    //     if (this.props.isrunning && (this.state.status !== 'running')) {
    //         this.setState({
    //             status: 'running'
    //         });
    //     } 
        
    //     if (!this.props.isrunning && (this.state.status !== 'standby')) {
    //         this.setState({
    //             status: 'standby'
    //         });
    //     }

    // }

    render () {
        // <#TODO> To be updated to use props
        // const curStatus = this.state.status;
        let curProgress = 100;

        let statusData = {
            className: '',
            content: null,
        };
        
        switch (this.props.state) {
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
                const timerData = {
                    isrunning:  this.props.isrunning,
                    current:    {
                        ...this.props.data
                    }
                };

                statusData = {
                    className: classes.Running,
                    content: (<Fragment>
                        <div className={classes.StatusText}>Running</div>
                        <Timer data={timerData} />
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
}

const mapStateToProps = state => {
    return {
        isrunning: state.timer.isrunning
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleStatus: (settings) => dispatch(actions.toggleStatus())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Status);