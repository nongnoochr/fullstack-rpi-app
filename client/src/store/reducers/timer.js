import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const TIMER_SETTINGS = {
    start:          null,
    computedEnd:    null,
    actualEnd:      null,
    isrunning:  false,

    // duration in milli-seconds
    duration:   null
};

const initTimerData = {
    ...TIMER_SETTINGS
};

const toggleStatus = (state, action) => {
    const newStatus = !state.isrunning;

    return updateObject(state, {
        isrunning:  newStatus
    });
};

const updateTimer = ( state, action ) => {

    const updatedSettings = {
        ...state
    };

    return updateObject( state, {
        settings: updatedSettings
    });

}

// --------------------
const reducer = ( state = initTimerData, action ) => {
    switch ( action.type ) {
        case actionTypes.TOGGLE_STATUS: 
            return toggleStatus( state, action );
        case actionTypes.UPDATE_TIMER: 
            return updateTimer( state, action );

        default: return state;
    }
};

export default reducer;