import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

import { APPSTATE } from '../../services/CONSTANT';


const TIMER_SETTINGS = {

    status:     APPSTATE.STANDBY,

    isinitializing:     false,
    isrunning:          false,
    
    // duration in milli-seconds
    duration:   0
};

const initTimerData = {
    ...TIMER_SETTINGS
};

// --------
const updateStatus = (state, action) => {
    const newStatus = action.status;
    
    switch (newStatus) {
        case APPSTATE.INITIALIZING:
            return updateObject(state, {
                status:         newStatus,
                isinitializing: true,
                isrunning:      false
            });

        case APPSTATE.RUNNING:
            return updateObject(state, {
                status:         newStatus,
                isinitializing: false,
                isrunning:      true
            });

        default:
            return state
    }

    
};

const initProcess = (state, action) => {
    const isInitSuccess = action.success;
    let status = APPSTATE.STANDBY;

    if (isInitSuccess) {
        status = APPSTATE.INITIALIZING
    }

    return updateObject(state, {
        status:         status,
        isinitializing: isInitSuccess,
        isrunning:      false
    });
};

const startProcess = (state, action) => {
    const isSuccess = action.success;
    let status = APPSTATE.STANDBY;

    if (isSuccess) {
        status = APPSTATE.RUNNING
    }

    return updateObject(state, {
        status:         status,
        isinitializing: false,
        isrunning:      isSuccess
    });
};


const stopProcess = (state, action) => {

    const isSuccess = action.success;

    if (isSuccess) {
        return updateObject(state, {
            status:         APPSTATE.STANDBY,
            isinitializing: false,
            isrunning:      false
        });
    } else {
        return state;
    }

    
};


// --------------------
const reducer = ( state = initTimerData, action ) => {
    switch ( action.type ) {

        case actionTypes.UPDATE_STATUS: 
            return updateStatus( state, action );

        case actionTypes.INIT_PROCESS: 
            return initProcess( state, action );

        case actionTypes.START_PROCESS:
            return startProcess( state, action );


        case actionTypes.STOP_PROCESS:
            return stopProcess( state, action );

        default: return state;
    }
};

export default reducer;