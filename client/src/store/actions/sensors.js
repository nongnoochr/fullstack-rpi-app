import * as actionTypes from './actionTypes';

import { delay } from '../../utils/TimeUtils';

import LocalService from '../../services/LocalService'
import ServerService from '../../services/ServerService'

const devMode = true;

// Switch between Local & FullStack mode
const Service = devMode ? LocalService : ServerService;

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
