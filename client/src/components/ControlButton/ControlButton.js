import React from 'react';
import { MdPlayCircleOutline, MdStop } from "react-icons/md";
import classes from './ControlButton.module.css';


const controlButton = (props) => {

    let defaultClassName = "btn btn-lg btn-block ";
    let btnConfig = null;

    if (props.state === 'start') {
        
        btnConfig = {
            className:  defaultClassName + 'btn-primary',
            label:      'Press to START',
            icon:       (<MdPlayCircleOutline />)
        };

    } else {

        btnConfig = {
            className:  defaultClassName + 'btn-danger',
            label:      'Press to STOP',
            icon:       (<MdStop />)
        };
        
    }

    return (
        <div className={classes.ControlButton}>
            <button 
                type="button" 
                className={btnConfig.className}
                style={{height: '100%'}}
                onClick={props.clicked}
                disabled={props.disabled}
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

export default controlButton;