from random import random

from AbstractHandler import AbstractHandler

class MockHandler(AbstractHandler):

    def cleanup(self):
        print('[Mock] cleanup is called')
    
    def setLED1(self, numState):
        print('[Mock] set state of LED1 to "{}"'.format(numState))

    def setLED2(self, numState):
        print('[Mock] set state of LED2 to "{}"'.format(numState))

    def setEXTCTRL(self, numState):
        print('[Mock] set state of EXTCTRL to "{}"'.format(numState))

    def getDistanceData(self):
        dist = 10*random()
        print('[Mock] get random distance: {} centimeters'.format(dist))
        return dist

    def getTemperatureData(self):
        temp = 25 + (2*random() - 1)
        print('[Mock] get random temperature: {} celcius'.format(temp))