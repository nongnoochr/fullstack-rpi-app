import React, { Component } from 'react';
import classes from './DisplayPanel.module.css';

import Summary from '../../components/Summary/Summary';
import Status from '../../components/Status/Status';

import { connect } from 'react-redux';

import Card from 'react-bootstrap/Card';

class DisplayPanel extends Component {

    render () {

        return (
            <div className={classes.Container}>
                <div className={[classes.DisplayElement, classes.Summary].join(' ')}>
                    <Card>
                        <Card.Body>
                            <Summary data={ {
                                sensors: {
                                    ...this.props.sensors
                                },
                                duration: this.props.duration,
                                lastActualDuration: this.props.lastActualDuration 
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
                                    state={this.props.status} 
                                    data={
                                        { 
                                            current: this.props.current,
                                            duration: this.props.duration
                                        }
                                    } 
                                />
                        </Card.Body>

                    </Card>

                </div>
                
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        current:    state.timer.current,
        status:     state.timer.status,
        sensors:    state.sensors,
        duration:   state.settings.duration,
        lastActualDuration: state.timer.lastActualDuration,

    };
};

export default connect(mapStateToProps)(DisplayPanel);
