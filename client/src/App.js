import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  delay,
  convertDurationDataToSeconds,
  updateDurationTime
} from './utils/TimeUtils';

class App extends Component {


  state = {

    localtimerstatus: false

  }

  componentDidMount() {

    // Set a title of the app
    document.title = "RPi Machine";

    // Start fenching sensor data
    this.props.onFetchSensorData();
  }

  componentDidUpdate() {

    // If the START button is clicked but the timer has not been started
    if (this.props.isrunning && !this.state.localtimerstatus) {

      this.setState({ localtimerstatus: true })
      // Start the timer
      this._startTimer();
    }

    if (!this.props.isrunning && this.state.localtimerstatus) {
      this.setState({ localtimerstatus: false })
    }
  }


  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }

  // --- Private methods
  _initData = () => {


    setTimeout(() => {
      this.props.onFetchSensorData();

    }, 1000);
  }

  _addMilliSecond = (ms) => {

    const updatedTime = updateDurationTime(this.props.current, ms);

    // Update time
    this.props.onUpdateTimerCounter(updatedTime);
  }

  _startTimer = () => {

    // https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line/28173606

    const addMilliSecond = async () => {

      // Reset the counter first before start
      this._initData();

      while (this.props.isrunning) {

        // Check whether the current time exceeds the duration
        if (this.props.duration) {

          const deltaTime = convertDurationDataToSeconds(this.props.current) * 1000;

          if (deltaTime >= this.props.duration) {
            this.props.onStopProcess();
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
    isrunning: state.timer.isrunning,
    duration: state.settings.duration,
    current: state.timer.current,

    timerstatus: state.timer.timerstatus,
    start: state.timer.start,
    computedEnd: state.timer.computedEnd,
    actualEnd: state.timer.actualEnd,
    lastActualDuration: state.timer.lastActualDuration,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onFetchSensorData: () => dispatch(actions.fetchSensorData()),
    onUpdateTimerCounter: (data) => dispatch(actions.updateTimerCounter(data)),
    onStopProcess: () => dispatch(actions.stopProcess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
