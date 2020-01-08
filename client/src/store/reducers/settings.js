import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

import {
    SETTINGS_VALUES
} from '../../utils/SettingsUtils';

const initSettings = {
    externalCtrl:   false,
    settings:       [SETTINGS_VALUES.setting1, SETTINGS_VALUES.setting2],
    duration:       0
};

const updateSettings = (state, action) => {
    const updatedSettings = {
        ...action.settings
    }
    return updateObject(state, {
        ...updatedSettings
    });
};

const setExternalController = (state, action) => {

    if (action.success) {
        return updateObject(state, {
            ...action.settings
        });
    } else {
        console.log('Cannot update the external controller in the server');
        return state;

    }
};


const resetSettings = (state, action) => {
    return updateObject(state, {
        ...initSettings
    });
}

// --------------------
const reducer = ( state = initSettings, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_SETTINGS: 
            return updateSettings( state, action );

        case actionTypes.RESET_SETTINGS: 
            return resetSettings( state, action );

        case actionTypes.SET_EXTCTRL: 
            return setExternalController( state, action );

        default: return state;
    }
};

export default reducer;