import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const TIMER_SETTINGS = {

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


// --------------------
const reducer = ( state = initTimerData, action ) => {
    switch ( action.type ) {
        case actionTypes.TOGGLE_STATUS: 
            return toggleStatus( state, action );

            default: return state;
    }
};

export default reducer;