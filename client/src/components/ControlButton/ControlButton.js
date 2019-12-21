import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { MdPlayCircleOutline, MdStop } from "react-icons/md";
import classes from './ControlButton.module.css';


class ControlButton extends Component {
    render () {

        let defaultClassName = "btn btn-lg btn-block ";
        let btnConfig = null;

        // If the Timer is currently running
        if (this.props.isrunning) {
            // Show a START button

            btnConfig = {
                className:  defaultClassName + 'btn-danger',
                label:      'Press to STOP',
                icon:       (<MdStop />)
            };

        } else {
            // otherwise, show a STOP button
            
            btnConfig = {
                className:  defaultClassName + 'btn-primary',
                label:      'Press to START',
                icon:       (<MdPlayCircleOutline />)
            };
        }

        return (
            <div className={classes.ControlButton}>
                <button 
                    type="button" 
                    className={btnConfig.className}
                    style={{height: '100%'}}
                    onClick={() => this.props.onToggleStatus()}
                    >
                        <div>
                            <div className={classes.ButtonIcon}>
                            {btnConfig.icon}
                            </div>
                            <div>{btnConfig.label}</div>
                        </div>
                        
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isrunning: state.timer.isrunning
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleStatus: () => dispatch(actions.toggleStatus())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ControlButton);