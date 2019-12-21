import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ControlPanel.module.css';

import Settings from '../../components/Settings/Settings';
import ControlButton from '../../components/ControlButton/ControlButton';
import Card from 'react-bootstrap/Card';

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
                            <ControlButton/>
                        </div>
                </div>

                </Card.Body>
            </Card>
            
        );
    }
}


const mapStateToProps = state => {
    return {
        isrunning: state.timer.isrunning
    };
};

export default connect(mapStateToProps)(ControlPanel);
