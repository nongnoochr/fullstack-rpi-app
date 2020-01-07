from random import random
import time

class Controller:
    
    def get_sensors_data(self):
        temperature = 25 + (2*random() - 1)
        humidity    = 40 + (5*random() - 3)
        data = {
            'temperature':    temperature,
            'humidity':       humidity
        }

        return data

    def process_init(self):
        print('Init process...')

        print('*Wait for 1 second...')
        time.sleep(1)
        data = {
            'success':    True
        }

        return data

    def process_start(self):
        print('START process...')

        print('*Wait for 1 second...')
        time.sleep(1)
        data = {
            'success':    True
        }
        return data

    def process_stop(self):
        print('STOP process...')

        print('*Wait for 1 second...')
        time.sleep(1)
        data = {
            'success':    True
        }

        return data