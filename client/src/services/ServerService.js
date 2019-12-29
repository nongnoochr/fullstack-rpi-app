import BaseService from './BaseService';
import axios from '../http/axios-server';

class ServerService extends BaseService {
    static fetchSensorData = async () => {
        const response = await axios.get('/sensors/data');
        return response.data;
    }

    static initProcess = async() => {

        console.log('Initializing process...');
        const response = await axios.post('/process/init');

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
}

export default ServerService;