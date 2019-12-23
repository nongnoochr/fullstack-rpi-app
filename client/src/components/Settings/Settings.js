import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Settings.module.css';
import {
    SETTINGS_LABEL, 
    SETTINGS_VALUES
} from '../../utils/SettingsUtils';

import {
    Col,
    Form, 
    Row,
    ButtonToolbar,
    Button,
    ToggleButtonGroup,
    ToggleButton
} from 'react-bootstrap';

import TimerSelector from '../TimerSelector/TimerSelector';

import { MdSettings } from "react-icons/md";


class Settings extends Component {

    state = {
        showTimer: false
    }

    render () {
        return (
            <div className={classes.Settings}>
                <div>

                <Form>

                    <Form.Group as={Row} controlId="externalCtrlForm">
                        <Form.Label 
                            className={classes.Label}
                            column sm={6}>
                            Turn on {SETTINGS_LABEL.externalCtrl}
                        </Form.Label>
                        <Col sm={6}>
                                
                                <Form.Check 
                                        type="switch"
                                        id="switch-ext-ctrl"
                                        label="" 
                                        checked={this.props.settings.externalCtrl}
                                        disabled={this.props.isrunning}
                                        onChange={ (ev) => {

                                            const newVal = ev.target.checked;
                                            this.props.onUpdateSettings({
                                                externalCtrl: newVal
                                            });
                                        } }
                                    />
                        </Col>
                    </Form.Group>

                    </Form>

                </div>
                <div>
                    <Form>
                        <fieldset>
                        <legend>
                            <MdSettings />
                            Configurations
                        </legend>

                            <Form.Group as={Row} controlId="settingsForm">
                                <Form.Label 
                                    className={classes.Label}
                                    column sm={6}>
                                    {SETTINGS_LABEL.settings}
                                </Form.Label>
                                <Col sm={6}>
                                <ButtonToolbar>
                                    <ToggleButtonGroup 
                                        type="checkbox" 
                                        value={this.props.settings.settings}
                                        onChange={(settings) => {
                                            this.props.onUpdateSettings({
                                                settings: settings
                                            });
                                        }}
                                        >
                                            <ToggleButton 
                                                value={SETTINGS_VALUES.setting1}
                                                variant="outline-primary" 
                                                disabled={this.props.isrunning}>
                                                    {SETTINGS_VALUES.setting1}
                                            </ToggleButton>
                                            <ToggleButton 
                                                value={SETTINGS_VALUES.setting2}
                                                variant="outline-primary" 
                                                disabled={this.props.isrunning}>
                                                    {SETTINGS_VALUES.setting2}
                                            </ToggleButton>
                                    </ToggleButtonGroup>
                                </ButtonToolbar>
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} controlId="durationForm">
                                <Form.Label 
                                    className={classes.Label}
                                    column sm={6}>
                                    {SETTINGS_LABEL.duration}
                                </Form.Label>
                                <Col sm={6}>
                                        
                                        <Form.Check 
                                                type="switch"
                                                id="switch-duration"
                                                label=""
                                                checked={this.state.showTimer}
                                                disabled={this.props.isrunning}
                                                onChange={(ev) => {
                                                    this.setState({showTimer: ev.target.checked})
                                                }}
                                            />
                                </Col>
                                <div 
                                    style={{ display: this.state.showTimer ? null : "none" }}
                                    className={classes.TimeSelectorContainer}
                                    >
                                    <TimerSelector disabled={this.props.isrunning} />
                                </div>
                            </Form.Group>

                            <Button 
                                variant="outline-info"
                                onClick={() => {
                                    this.props.onResetSettings();
                                    this.setState({
                                        showTimer: false
                                    })
                                }}
                                >RESET</Button>

                        </fieldset>
                    </Form>
                </div>
            </div>
            
        );
    }
}


const mapStateToProps = state => {
    return {
        isrunning: state.timer.isrunning,
        settings: state.settings
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onUpdateSettings: (settings) => dispatch(actions.updateSettings(settings)),
        onResetSettings: () => dispatch(actions.resetSettings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);