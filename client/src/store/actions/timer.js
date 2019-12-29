import * as actionTypes from './actionTypes';

import LocalService from '../../services/LocalService';
import { APPSTATE } from '../../services/CONSTANT';


// Switch between Local & FullStack mode
const Service = LocalService;

export const updateStatus = (status) => {
    return {
        type:   actionTypes.UPDATE_STATUS,
        status:    status
    }
}

export const updateTimerCounter = (counterData) => {
    return {
        type:   actionTypes.UPDATE_TIMERCOUNTER,
        data:   counterData
    }
}

export const initProcess = () => {
    return {
        type: actionTypes.INIT_PROCESS,
        success:    true
    }
}

export const startProcess = (settings) => {
    return {
        type: actionTypes.START_PROCESS,
        duration:   settings.duration ? settings.duration : 0,
        success:    true
    }
}

export const stopProcess = () => {
    return {
        type: actionTypes.STOP_PROCESS,
        success:    true
    }
}

export const runEntireProcess = (settings) => {
    return dispatch => {

        const run = async () => {

            // --- Start Init Process
            dispatch(updateStatus(APPSTATE.INITIALIZING));

            const dataInit = await Service.initProcess();

            dispatch({
                type:       actionTypes.INIT_PROCESS,
                success:    dataInit.success
            });

            // --- Start START Process
            if (dataInit.success) {

                const dataStart = await Service.startProcess();

                dispatch({
                    type:       actionTypes.START_PROCESS,
                    duration:   settings.duration ? settings.duration : 0,
                    success:    dataStart.success
                });
            }
            
        };

        run();

    };
    
}