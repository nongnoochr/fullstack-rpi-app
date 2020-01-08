# To be removed
from random import random
import time
from rpi import Controller

# See https://www.pranaysite.com/flask-and-react/
from flask import Flask, request,  render_template,jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")

# To prevent an error from CORS
# See https://stackoverflow.com/questions/45373124/axios-post-request-to-flask
CORS(app, resources={r"/*": {"origins": "*"}})

# ----------
# Initialize RPi components

ctrl = Controller()

# ----------


try:
        
    @app.route("/")
    def home():
        return render_template('index.html')

    @app.route('/sensors/data', methods=['GET'])
    def get_sensors_data():

        data = ctrl.get_sensors_data()
        return jsonify(data)

    @app.route('/api/set_extctrl', methods=['GET', 'POST'])
    def set_extctrl():

        content = request.values.to_dict()
        if (content):
            try:
                status = content['status']
                ctrl.setExternalController(status)
                success = True
            except Exception as e:
                print('The following error occurs: ', e)
                success = False
        else:
            print('status data is not provided')
            success = False
        
        return jsonify({"success":success})

    @app.route('/process/init', methods=['GET', 'POST'])
    def process_init():
        
        content = request.values.to_dict()

        print('content: ', content)
        if (content):    
            data = ctrl.process_init(config=content)

        else:
            # Temporary. To be deleted
            data = ctrl.process_init(config={'LED1': 1, 'LED2': 1})

            print('status data is not provided')
            # data = {"success": False}
            data = {"success": True}
        
        return jsonify(data)

    @app.route('/process/start', methods=['GET', 'POST'])
    def process_start():
        
        data = ctrl.process_start()
        data = {"success": True}


        return jsonify(data)

    @app.route('/process/stop', methods=['GET', 'POST'])
    def process_stop():

        data = ctrl.process_stop()
        data = {"success": True}

        return jsonify(data)

    print('Starting Flask!')
    app.debug=True
    app.run(host='0.0.0.0', port=5000)

finally:
    print('* Cleanup GPIO before terminating')
    ctrl.cleanup()
    print('* Cleanup completed')
