import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './ControlPanel.module.css';

import Settings from '../../components/Settings/Settings';
import ControlButton from '../../components/ControlButton/ControlButton';
import Card from 'react-bootstrap/Card';
import { APPSTATE } from '../../services/CONSTANT';

class ControlPanel extends Component {

    render () {
        return (
            <Card>
                <Card.Body>
                    <div className={classes.Container}>
                        <div 
                            style={{
                                opacity: this.props.isrunning ? 0.4 : null
                            }} 
                            className={[classes.Settings, classes.DisplayElement].join(' ')}>
                                <Card>
                                    <Card.Body>
                                    <Settings />
                                    </Card.Body>
                                </Card>
                            
                        </div>
                        <div className={[classes.ControlButton, classes.DisplayElement].join(' ')}>
                            <ControlButton 
                                // clicked={this.props.onToggleStatus} 
                                state={!this.props.isrunning ? 'start' : 'stop'} 
                                clicked={!this.props.isrunning ? this.props.onClickStart : this.props.onClickStop}
                                disabled={this.props.appstatus===APPSTATE.INITIALIZING}
                                />
                        </div>
                </div>

                </Card.Body>
            </Card>
            
        );
    }
}


const mapStateToProps = state => {
    return {
        isrunning: state.timer.isrunning,
        appstatus: state.timer.status
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickStart:   () => dispatch(actions.runEntireProcess()),
        onClickStop:   () => dispatch(actions.stopProcess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
