class BaseService {

   static fetchSensorData = async () => {
       
        console.error('fetchSensorData - This method must be implemented');

        return {
           temperature:    null,
           distance:       null
        }
   }

   static initProcess = async(data) => {

        console.error('initProcess - This method must be implemented');

       
       return {
           success: false
       }
   }

   static startProcess = async() => {
       
       console.error('startProcess - This method must be implemented');
       
       return {
           success: false
       }
   }

   static stopProcess = async() => {

        console.error('This method must be implemented');


       return {
           success: false
       }
   }

   static setExternalController = async(extCtrlState) => {

    console.error('This method must be implemented');

    return {
        success: false
    }
   }

}

export default BaseService;