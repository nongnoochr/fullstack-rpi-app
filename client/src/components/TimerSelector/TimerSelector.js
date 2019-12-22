import React, { Component } from 'react';
import classes from './TimerSelector.module.css';
import { 
    convertDurationDataToSeconds,
    getDurationData
} from '../../utils/TimeUtils'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class TimerSelector extends Component {


    updatePropValue = (ev, stateName) => {


        const updatedData = {
            hour:   this.props.hour,
            minute: this.props.minute,
            second: this.props.second
        };
        updatedData[stateName] = +ev.target.value;

        const durationSeconds = convertDurationDataToSeconds(updatedData);
        const duration = durationSeconds * 1000;
        this.props.onUpdateSettings({
            duration: duration
        })
    }

    render () {
        return (
            <div className={classes.TimerSelector}>
                <div>
                    <input 
                        type="number" 
                        name="hour" 
                        min="0" 
                        max="999"
                        step="1"
                        defaultValue={this.props.hour}
                        disabled={this.props.disabled}
                        onChange={(ev) => this.updatePropValue(ev, 'hour')} /> Hours 
                </div>
                <div>
                    <input 
                        type="number" 
                        name="minute" 
                        min="0" 
                        max="60" 
                        step="1"
                        defaultValue={this.props.minute}
                        disabled={this.props.disabled}
                        onChange={(ev) => this.updatePropValue(ev, 'minute')} /> Minutes 
                </div>
                <div>
                    <input 
                        type="number" 
                        name="second" 
                        min="0" 
                        max="60"
                        step="1" 
                        defaultValue={this.props.second}
                        disabled={this.props.disabled}
                        onChange={(ev) => this.updatePropValue(ev, 'second')} /> Seconds 
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const duration = state.settings.duration;
    const timerData = getDurationData(duration);
    return {
        duration: duration,
        ...timerData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateSettings: (settings) => dispatch(actions.updateSettings(settings))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimerSelector);
