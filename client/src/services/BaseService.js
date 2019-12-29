class BaseService {

   static fetchSensorData = async () => {
       
        console.error('fetchSensorData - This method must be implemented');

        return {
           temperature:    null,
           humidity:       null
        }
   }

   static initProcess = async() => {

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

}

export default BaseService;