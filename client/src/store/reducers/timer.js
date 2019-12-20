import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const TIMER_SETTINGS = {
    start:          null,
    computedEnd:    null,
    actualEnd:      null,
    current: {
        hour:   0,
        minute: 0,
        second: 0
    },
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
        ...state,
        current: {
            ...state.current
        }
    };

    return updateObject( state, {
        settings: updatedSettings
    });

}

const updateTimerCounter = ( state, action ) => {
    const newData = {
        ...action.data
    };

    return updateObject( state, {
        current: newData
    });
};

const resetTimerCounter = ( state, action ) => {
    const newData = {
        ...TIMER_SETTINGS.current
    };

    return updateObject( state, {
        current: newData
    });

};

// --------------------
const reducer = ( state = initTimerData, action ) => {
    switch ( action.type ) {
        case actionTypes.TOGGLE_STATUS: 
            return toggleStatus( state, action );
        case actionTypes.UPDATE_TIMER: 
            return updateTimer( state, action );
        case actionTypes.UPDATE_TIMERCOUNTER: 
            return updateTimerCounter( state, action );
        case actionTypes.RESET_TIMERCOUNTER:
            return resetTimerCounter( state, action );

        default: return state;
    }
};

export default reducer;