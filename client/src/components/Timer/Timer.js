import React, { Component } from 'react';

class Timer extends Component {

    state = {
        current: {
            hour:   0,
            minute: 0,
            second: 0
        },
        isrunning:  true,

        // duration in milli-seconds
        duration:   3000
        
    }

    componentDidMount () {
        this._startTimer();
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
            ...this.state.current
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
        this.setState( {current: updatedTime} );
    }

    _getTimerString = () => {
        const hr = convertNumTimeToString(this.state.current.hour);
        const min = convertNumTimeToString(this.state.current.minute);
        const sec = convertNumTimeToString(this.state.current.second);
        
        return hr + ':' + min + ':' + sec;
    }

    _startTimer = () => {
        
        // https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line/28173606

        const addSecond = async () => {
            
            // If the duration is specified
            if (this.state.duration) {
                // Stop the timer once the duration is reached
                setTimeout(() => this.setState({isrunning: false}), 
                    this.state.duration);
            }
            

            while (this.state.isrunning) {
                await delay(1000);
                this._addSecond();
            }
        };

        addSecond();

    }
}

export default Timer;

// --- Heler functions
const delay = ms => new Promise(res => setTimeout(res, ms));

const convertNumTimeToString = (num) => {
    let numStr = num.toFixed();
    if (numStr.length === 1) {
        numStr = '0' + numStr;
    }
    return numStr;
};