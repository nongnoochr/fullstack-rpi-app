import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

import { APPSTATE } from '../../services/CONSTANT';
import { INIT_TIMER_DATA } from '../../utils/TimeUtils';


const TIMER_SETTINGS = {

    status:     APPSTATE.STANDBY,

    isinitializing:     false,
    isrunning:          false,

    current: {
        ...INIT_TIMER_DATA
    },
    
    // duration in milli-seconds
    duration:   0,

    timerstatus:    false,
    start:          null,
    computedEnd:    null,
    actualEnd:      null,
    lastActualDuration: null,
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

const updateTimerCounter = (state, action) => {
    const newData = {
        ...action.data
    }

    return updateObject(state, { current: newData });
}

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

    // Get status data
    const duration = action.duration;
    const isSuccess = action.success;
    let status = APPSTATE.STANDBY;

    if (isSuccess) {
        status = APPSTATE.RUNNING
    }

    // Get time data

    let startDate = new Date();
    let endDate = null;

    if (duration) {
      endDate = new Date(startDate.getTime());
      endDate.setMilliseconds(duration);
    }

    // Update state

    return updateObject(state, {
        duration:       duration,
        status:         status,
        isinitializing: false,
        isrunning:      isSuccess,
        start:          startDate,
        computedEnd:    endDate,
        timerstatus:    true
    });
};


const stopProcess = (state, action) => {

    const isSuccess = action.success;

    if (isSuccess) {

        const actualEnd = new Date();
        const diff = (actualEnd - state.start);

        return updateObject(state, {
            status:         APPSTATE.STANDBY,
            isinitializing: false,
            isrunning:      false,
            current:        {...INIT_TIMER_DATA},
            actualEnd:      actualEnd,
            lastActualDuration:     diff,
            timerstatus:    false
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

        case actionTypes.UPDATE_TIMERCOUNTER:
            return updateTimerCounter( state, action );

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