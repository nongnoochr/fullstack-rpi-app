import React, { Component } from 'react';
import classes from './DisplayPanel.module.css';

import Summary from '../../components/Summary/Summary';
import Status from '../../components/Status/Status';

import { connect } from 'react-redux';

class DisplayPanel extends Component {

    constructor(props) {
        super(props);

        let startDate = new Date();

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
        const status = this.props.isrunning ?
            'running' : 'standby';

        return (
            <div className={classes.Container}>
                <div className={[classes.Summary, classes.DisplayElement].join(' ')}>
                    <Summary />
                </div>
                <div className={[classes.Status, classes.DisplayElement].join(' ')}>
                    <Status state={status} data={this.state.current} />
                </div>
            </div>
        );
    }

    // --- Private methods

    _addMilliSecond = (ms) => {
        const updatedTime = {
            ...this.state.current
        };

        // See
        // https://jsfiddle.net/Daniel_Hug/pvk6p/
        updatedTime.second = updatedTime.second + ms/1000;
        if (updatedTime.second >= 60) {
            updatedTime.second = 0;
            updatedTime.minute = updatedTime.minute + 1;
            if (updatedTime.minute >= 60) {
                updatedTime.minute = 0;
                updatedTime.hour = updatedTime.hour + 1;
            }
        }

        // Update time
        this.setState({current: updatedTime});
    }

    _startTimer = () => {
        
        // https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line/28173606

        const addMilliSecond = async () => {

            // Reset the counter first before start
            this.setState({current: {
                hour:   0,
                minute: 0,
                second: 0
            }})
            
            while (this.props.isrunning) {
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



export default connect(mapStateToProps)(DisplayPanel);


// --- Heler functions
const delay = ms => new Promise(res => setTimeout(res, ms));
