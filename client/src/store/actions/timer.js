import * as actionTypes from './actionTypes';

import Service from './service';
import { APPSTATE } from '../../services/CONSTANT';
import { SETTINGS_VALUES } from '../../utils/SettingsUtils';


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
    return dispatch => {

        const run = async () => {
            const dataStop = await Service.stopProcess();

            dispatch({
                type:   actionTypes.STOP_PROCESS,
                success:    dataStop
            });
        };

        run();

    };
    // return {
    //     type: actionTypes.STOP_PROCESS,
    //     success:    true
    // }
}

export const runEntireProcess = (settings) => {
    return dispatch => {

        const run = async () => {

            // --- Start Init Process
            dispatch(updateStatus(APPSTATE.INITIALIZING));

            const dataInit = {
                [SETTINGS_VALUES.setting1] :     0,
                [SETTINGS_VALUES.setting2] :     0,
            }

            settings.settings.forEach(curSetting => dataInit[curSetting] = 1);

            const resInit = await Service.initProcess(dataInit);

            dispatch({
                type:       actionTypes.INIT_PROCESS,
                success:    resInit.success
            });

            // --- Start START Process
            if (resInit.success) {

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