import RPi.GPIO as GPIO
import time

from AbstractHandler import AbstractHandler

class RPiHandler(AbstractHandler):

    def __init__(self):

        self.__LED1PORT = 4
        self.__LED2PORT = 17
        self.__EXTCTRLPORT = 22

        self.__DISTANCE_TRIGGER = 18
        self.__DISTANCE_ECHO = 24

        self.__initGPIO()

    def cleanup(self):
        # Restore port values
        self.setLED1(0)
        self.setLED2(0)
        self.setEXTCTRL(0)
        GPIO.output(self.__DISTANCE_TRIGGER, 0)

        # cleanup port
        GPIO.cleanup()

    def setLED1(self, numState):
        self.__setOUTPUTPort(self.__LED1PORT, numState)

    def setLED2(self, numState):
        self.__setOUTPUTPort(self.__LED2PORT, numState)

    def setEXTCTRL(self, numState):
        self.__setOUTPUTPort(self.__EXTCTRLPORT, numState)

    def getDistanceData(self):
        dist = self.__computeDistance()
        return dist

    def getTemperatureData(self):
        # This sensor has not been connected

        return None

    

    # Private methods
    def __initGPIO(self):
        GPIO.setmode(GPIO.BCM)  

        ## LEDs
        GPIO.setup(self.__LED1PORT, GPIO.OUT)
        GPIO.setup(self.__LED2PORT, GPIO.OUT)
        GPIO.setup(self.__EXTCTRLPORT, GPIO.OUT)

        #set GPIO direction (IN / OUT)
        GPIO.setup(self.__DISTANCE_TRIGGER, GPIO.OUT)
        GPIO.setup(self.__DISTANCE_ECHO, GPIO.IN)


    def __setOUTPUTPort(self, portIndex, numState):
        GPIO.output(portIndex, numState)

    def __computeDistance(self):
        # set Trigger to HIGH
        GPIO.output(self.__DISTANCE_TRIGGER, True)
    
        # set Trigger after 0.01ms to LOW
        time.sleep(0.00001)
        GPIO.output(self.__DISTANCE_TRIGGER, False)
    
        StartTime = time.time()
        StopTime = time.time()
    
        # save StartTime
        while GPIO.input(self.__DISTANCE_ECHO) == 0:
            StartTime = time.time()
    
        # save time of arrival
        while GPIO.input(self.__DISTANCE_ECHO) == 1:
            StopTime = time.time()
    
        # time difference between start and arrival
        TimeElapsed = StopTime - StartTime
        # multiply with the sonic speed (34300 cm/s)
        # and divide by 2, because there and back
        distance = (TimeElapsed * 34300) / 2
    
        return distance

        
