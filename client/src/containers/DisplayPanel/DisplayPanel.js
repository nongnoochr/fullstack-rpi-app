import React, { Component } from 'react';
import classes from './DisplayPanel.module.css';

import Summary from '../../components/Summary/Summary';
import Status from '../../components/Status/Status';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { INIT_TIMER_DATA, updateDurationTime } from '../../utils/TimeUtils';

class DisplayPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start:  null,
            computedEnd:    null,
            actualEnd:      null,
            current: {
                ...INIT_TIMER_DATA
            },

            timerstatus: false,
    
            // duration in milli-seconds
            duration:   5000,
            lastActualDuration: null
            
        }
        
    }

    componentDidMount () {
        this._initData();
    }

    componentDidUpdate () {

        // If the START button is clicked but the timer has not been started
        if (this.props.isrunning && !this.state.timerstatus) {
            // Start the timer
            this._startTimer();

            // and set the state of the timer to true
            this.setState({
                timerstatus: true
            })
        }

        // If the STOP button is clicked while the timer is running
        if (!this.props.isrunning && this.state.timerstatus) {

            // reset the state of the timer

            const actualEnd = new Date();
            const diff = (actualEnd - this.state.start);

            this.setState({
                actualEnd:          actualEnd,
                lastActualDuration: diff,
                timerstatus:        false
            });

            
        }
    }

    render () {
        const duration = this.state.duration;

        const status = this.props.isrunning ?
            'running' : 'standby';

        return (
            <div className={classes.Container}>
                <div className={[classes.Summary, classes.DisplayElement].join(' ')}>
                    <Summary data={ {
                        duration: duration,
                        lastActualDuration: this.state.lastActualDuration 
                        }} />
                </div>
                <div className={[classes.Status, classes.DisplayElement].join(' ')}>
                    <Status state={status} data={
                        { 
                            current: this.state.current,
                            duration: duration
                        }
                    } />
                </div>
            </div>
        );
    }

    // --- Private methods
    _initData = () => {

        let startDate = new Date();
        let endDate = null;

        if (this.state.duration) {
            endDate = new Date(startDate.getTime());
            endDate.setMilliseconds(this.state.duration);
        }

        this.setState({
            start:              startDate,
            computedEnd:        endDate,
            current:    {
                ...INIT_TIMER_DATA
            }
        });
    }

    _addMilliSecond = (ms) => {

        const updatedTime = updateDurationTime(this.state.current, ms);

        // Update time
        this.setState({current: updatedTime});
    }

    _startTimer = () => {
        
        // https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line/28173606

        const addMilliSecond = async () => {

            // Reset the counter first before start
            this._initData();
            
            while (this.props.isrunning) {

                // Check whether the current time exceeds the duration
                if (this.state.duration) {
                    const deltaTime = new Date() - this.state.start;

                    if (deltaTime >= this.state.duration) {
                        this.props.onToggleStatus();
                        break;
                    }
                }
                
                

                await delay(250);
                this._addMilliSecond(250);
            }
        };

        addMilliSecond();

    }
}

const mapStateToProps = state => {
    return {
        isrunning: state.timer.isrunning
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onToggleStatus: () => dispatch(actions.toggleStatus())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPanel);


// --- Heler functions
const delay = ms => new Promise(res => setTimeout(res, ms));
