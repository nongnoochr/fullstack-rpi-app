import React, { Component } from 'react';
import classes from './DisplayPanel.module.css';

import Summary from '../../components/Summary/Summary';
import Status from '../../components/Status/Status';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { 
    INIT_TIMER_DATA, 
    delay,
    convertDurationDataToSeconds,
    updateDurationTime 
} from '../../utils/TimeUtils';

import Card from 'react-bootstrap/Card';

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
        const duration = this.props.duration;
        const status = this.props.status;

        return (
            <div className={classes.Container}>
                <div className={[classes.DisplayElement, classes.Summary].join(' ')}>
                    <Card>
                        <Card.Body>
                            <Summary data={ {
                                sensors: {
                                    ...this.props.sensors
                                },
                                duration: duration,
                                lastActualDuration: this.state.lastActualDuration 
                                }} />
                        </Card.Body>
                    </Card>
                </div>
                
                <div className={[classes.DisplayElement, classes.Status].join(' ')}>
                    <Card className="text-center"
                        style={{height: '100%'}}>
                        <Card.Header><strong>STATUS</strong></Card.Header>
                        <Card.Body>
                                <Status 
                                    state={status} 
                                    data={
                                        { 
                                            current: this.state.current,
                                            duration: duration
                                        }
                                    } 
                                />
                        </Card.Body>

                    </Card>

                </div>
                
                
            </div>
        );
    }

    // --- Private methods
    _initData = () => {

        let startDate = new Date();
        let endDate = null;
        
        if (this.props.duration) {
            endDate = new Date(startDate.getTime());
            endDate.setMilliseconds(this.props.duration);
        }

        this.setState({
            start:              startDate,
            computedEnd:        endDate,
            current:    {
                ...INIT_TIMER_DATA
            }
        });

        setTimeout(() => {
            this.props.onFetchSensorData();

        }, 1000);
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
                if (this.props.duration) {

                    const deltaTime = convertDurationDataToSeconds(this.state.current) * 1000;

                    if (deltaTime >= this.props.duration) {
                        this.props.onCl();
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
        status:     state.timer.status,
        isrunning:  state.timer.isrunning,
        sensors:    state.sensors,
        duration:   state.settings.duration
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchSensorData: () => dispatch(actions.fetchSensorData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPanel);
