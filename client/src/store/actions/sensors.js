import * as actionTypes from './actionTypes';

import { delay } from '../../utils/TimeUtils';

import Service from './service'

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
