from random import random
import time

# Import Handler class based on whether RPi.GPIO is available
try:
    import RPi.GPIO
    import handler.RPiHandler as Handler
except (ImportError, RuntimeError):
    import handler.MockHandler as Handler


class Controller:

    def __init__(self):
        self.__resetProps()
        self.__ctrl = Handler()
        

    def cleanup(self):
        self.__ctrl.cleanup()

    def setExternalController(self, status):
        status = int(status)
        self.__ctrl.setEXTCTRL(status)
    
    def get_sensors_data(self):

        dist    = self.__ctrl.getDistanceData()
        data = {
            'temperature':    None,
            'humidity':       dist,
            'distance':       dist
        }

        return data

    def process_init(self, config=None):
        print('Init process...')

        bool = True
        
        if config:

            try:
                self.__settings['LED1'] = int(config['LED1'])
                self.__settings['LED2'] = int(config['LED2'])
            except Exception as e:
                print('The following error occurs: ', e)
                bool = False
        else:
            print('config is unexpected')
            bool = False

        print('*Wait for 1 second...')
        time.sleep(1)

        data = {
            'success':    bool
        }

        return data

    def process_start(self):
        print('START process...')

        bool = True

        try:

            self.__ctrl.setLED1(self.__settings['LED1'])
            self.__ctrl.setLED2(self.__settings['LED2'])

        except Exception as e:
            print('The following error occurs: ', e)
            bool = False

        data = {
            'success':    bool
        }
        return data

    def process_stop(self):
        print('STOP process...')

        bool = True

        try:
            
            print('*Turn off LEDs (Except EXTCTRL)...')
            self.__ctrl.setLED1(0)
            self.__ctrl.setLED2(0)
            self.__resetProps()

        except Exception as e:
            print('The following error occurs: ', e)
            bool = False
            

        data = {
            'success':    bool
        }

        return data

    # private methods
    def __resetProps(self):
        self.__settings = {
            'LED1': 0,
            'LED2': 0
        }