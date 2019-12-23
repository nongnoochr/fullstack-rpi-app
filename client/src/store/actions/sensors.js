import * as actionTypes from './actionTypes';

import { delay } from '../../utils/TimeUtils';

import LocalService from '../../services/LocalService'

// Switch between Local & FullStack mode
const Service = LocalService;

export const fetchSensorData = () => {

    return dispatch => {

        const repeatFetchData = async () => {

            while (true) {

                await Service.fetchSensorData()
                    .then(data => {
                        dispatch({
                            type: actionTypes.FETCH_SENSORDATA,
                            data: data
                        });
                    })
                    .catch(err => console.log(err));

                await delay(1000);


            }
            
        };

        repeatFetchData()

        


    };
}
