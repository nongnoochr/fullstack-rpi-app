import * as actionTypes from './actionTypes';

export const updateTimer = ( data ) => {
    return {
        type: actionTypes.UPDATE_TIMER,
        settings: data
    };
};

export const resetTimerCounter = () => {
    return {
        type: actionTypes.RESET_TIMERCOUNTER
    };
};

export const toggleStatus = () => {
    return {
        type: actionTypes.TOGGLE_STATUS
    }
}