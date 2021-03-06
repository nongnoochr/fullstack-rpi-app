 import BaseService from './BaseService';
 import { delay } from '../utils/TimeUtils';
 
 class LocalService extends BaseService {

    static fetchSensorData = async () => {

        const temperature   = 25 + (2*Math.random() - 1);
        const distance      = 40 + (5*Math.random() - 3);

        return {
            temperature:    temperature,
            distance:       distance
        }
    }

    static initProcess = async() => {

        console.log('Initializing process...');
        await delay(1000);
        
        return {
            success: true
        }
    }

    static startProcess = async() => {
        
        console.log('START process...');
        await delay(1000);
        
        return {
            success: true
        }
    }

    static stopProcess = async() => {
        
        console.log('STOP process...');
        await delay(1000);
        
        return {
            success: true
        }
    }

    static setExternalController = async(extCtrlState) => {
        console.log('SETExternalController process...');

        return {
            success: true
        }

    }

 }

 export default LocalService;