import BaseService from './BaseService';
import axios from '../http/axios-server';

class ServerService extends BaseService {
    static fetchSensorData = async () => {
        const response = await axios.get('/sensors/data');
        return response.data;
    }

    static initProcess = async(data) => {
        console.log('Initializing process...');

        // https://stackoverflow.com/questions/33625248/formdata-sends-boolean-as-string-to-server
        var bodyFormData = new FormData();

        // FormData always sends data as string.
        // Hence, we need to cast boolean to a number to avoid
        // issues in server

        // since all of our data are boolean, we will convert
        // all data to 0/1

        for(const prop in data){
            bodyFormData.set(prop, data[prop] ? 1 : 0);
        }

        const options = {
            method: 'post',
            url: '/process/init',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
          };

        const response = await axios(options);


        // const response = await axios.post('/process/init');

        return {
            ...response.data
        }
    }

    static startProcess = async() => {
        
        console.log('START process...');
        
        const response = await axios.post('/process/start');

        return {
            ...response.data
        }
    }

    static stopProcess = async() => {
        
        console.log('STOP process...');
        const response = await axios.post('/process/stop');

        return {
            ...response.data
        }
    }

    static setExternalController = async(extCtrlState) => {
        console.log('SETExternalController process...');

        // https://stackoverflow.com/questions/33625248/formdata-sends-boolean-as-string-to-server
        var bodyFormData = new FormData();

        // FormData always sends data as string.
        // Hence, we need to cast boolean to a number to avoid
        // issues in server
        bodyFormData.set('status', extCtrlState ? 1 : 0);

        const options = {
            method: 'post',
            url: '/api/set_extctrl',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
          };

        const response = await axios(options);

        return {
            ...response.data
        }
    }
}

export default ServerService;