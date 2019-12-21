import React, {Fragment, Component} from 'react';
import classes from './Summary.module.css';

import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert'

import { WiRaindrop, WiThermometer } from "react-icons/wi";

import { 
    getDurationString
} from '../../utils/TimeUtils';

import { SETTINGS_LABEL } from '../../utils/SettingsUtils';

class Summary extends Component {
    render () {
        let durationStr;
        if (this.props.data.duration) {
            durationStr = getDurationString(this.props.data.duration);
        } else {
            durationStr = 'N/A';
        }

        let settingsStr;
        if (this.props.settings.settings.length > 0) {
            settingsStr = this.props.settings.settings.join('+');
        } else {
            settingsStr = 'None'
        }
        

        let lastRunTimeStr;
        if (this.props.data.lastActualDuration) {
            lastRunTimeStr = getDurationString(this.props.data.lastActualDuration);
        } else {
            lastRunTimeStr = 'N/A';
        }

        const settingsData = {
            [SETTINGS_LABEL.externalCtrl]:  this.props.settings.externalCtrl ? 'Enabled' : 'Disabled',
            [SETTINGS_LABEL.settings]:      settingsStr,
            [SETTINGS_LABEL.duration]:      durationStr,
            'Last RunTime Duration':        lastRunTimeStr 
        };

        const settings = Object.keys(settingsData).map((key) => (
            <Fragment key={key}>
                <div className="col-5">
                    <label>{key}</label>
                </div>
                <div className="col-7">
                    {settingsData[key]}
                </div>
            </Fragment>
            
        ));

        return (
            <div className={classes.Summary}>
                <Alert 
                    variant="primary"
                    className={classes.AlertContents}
                    >
                    <div><WiThermometer /><label>Temperature:</label> 20 <span>&#8451;</span></div>
                    <div><WiRaindrop /><label>Humidity:</label> 5%</div>
                </Alert>

                <div className="row">
                    {settings}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        settings: state.settings
    };
};

export default connect(mapStateToProps)(Summary);
