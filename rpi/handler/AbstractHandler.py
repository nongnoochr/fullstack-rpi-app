class AbstractHandler:

    def cleanup(self):
        pass
    
    def setLED1(self, numState):
        raise NotImplementedError('This methos must be implemented')

    def setLED2(self, numState):
        raise NotImplementedError('This methos must be implemented')

    def setEXTCTRL(self, numState):
        raise NotImplementedError('This methos must be implemented')

    def getDistanceData(self):
        raise NotImplementedError('This methos must be implemented')

    def getTemperatureData(self):
        raise NotImplementedError('This methos must be implemented')