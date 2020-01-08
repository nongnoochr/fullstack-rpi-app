import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initData = {
    temperature:    null,
    distance:       null
};

const fetchSensorData = (state, action) => {

    const updatedData = {
        ...action.data
    }

    return updateObject(state, updatedData);
};


// --------------------
const reducer = ( state = initData, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SENSORDATA: 
            return fetchSensorData( state, action );

            default: return state;
    }
};

export default reducer;