import * as actionTypes from './actionTypes';

export const updateSettings = (settings) => {
    return {
        type: actionTypes.UPDATE_SETTINGS,
        settings: settings
    }
}

export const resetSettings = () => {
    return {
        type: actionTypes.RESET_SETTINGS
    }
}