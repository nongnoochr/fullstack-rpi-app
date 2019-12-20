import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Timer extends Component {

    constructor(props) {
        super(props);

        let startDate = new Date();

        // Don't call this.setState() here!
        this.state = {
            start:  startDate,
            computedEnd:    null,
            actualEnd:      null,
            current: {
                hour:   0,
                minute: 0,
                second: 0
            },

            timerstatus: false,
    
            // duration in milli-seconds
            duration:   null
            
        }
    }

    componentDidMount () {

        let endDate = null;

        if (this.state.duration) {
            endDate = new Date(this.state.start.getTime());
            endDate.setMilliseconds(this.state.duration);
        }

        this.setState({
            computedEnd:        endDate
        });
        
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
            this.setState({
                timerstatus: false
            })
        }


    }

    

    render () {
        return (
            <div>
                {this._getTimerString()}
            </div>
        );
    }

    // --- Private methods

    _addSecond = () => {
        const updatedTime = {
            ...this.props.current
        };

        // See
        // https://jsfiddle.net/Daniel_Hug/pvk6p/
        updatedTime.second = updatedTime.second + 1;
        if (updatedTime.second >= 60) {
            updatedTime.second = 0;
            updatedTime.minute = updatedTime.minute + 1;
            if (updatedTime.minute >= 60) {
                updatedTime.minute = 0;
                updatedTime.hour = updatedTime.hour + 1;
            }
        }

        // Update time
        this.props.onUpdateCounter(updatedTime);
    }

    _getTimerString = () => {
        
        const hr = convertNumTimeToString(this.props.current.hour);
        const min = convertNumTimeToString(this.props.current.minute);
        const sec = convertNumTimeToString(this.props.current.second);
        
        return hr + ':' + min + ':' + sec;
    }

    _startTimer = () => {
        
        // https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line/28173606

        const addSecond = async () => {

            // Reset the counter first before start
            this.props.onResetCounter();
            
            while (this.props.isrunning) {
                await delay(1000);
                this._addSecond();
            }
        };

        addSecond();

    }
}

const mapStateToProps = state => {
    return {
        settings: state.timer,
        current:    state.timer.current,
        isrunning: state.timer.isrunning
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateSettings: (settings) => dispatch(actions.updateTimer(settings)),
        onUpdateCounter: (data) => dispatch(actions.updateTimerCounter(data)),
        onResetCounter: () => dispatch(actions.resetTimerCounter())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Timer);

// --- Heler functions
const delay = ms => new Promise(res => setTimeout(res, ms));

const convertNumTimeToString = (num) => {
    let numStr = num.toFixed();
    if (numStr.length === 1) {
        numStr = '0' + numStr;
    }
    return numStr;
};