import * as actionTypes from './actionTypes';
import Service from './service';

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

export const setExternalController = (extCtrlState) => {

    return dispatch => {

        const run = async () => {
            const res = await Service.setExternalController(extCtrlState);

            dispatch({
                type:   actionTypes.SET_EXTCTRL,
                settings:    {'externalCtrl': extCtrlState},
                success:    res['success']
            });
        };

        run();

    };
}