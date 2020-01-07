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

@app.route("/")
def home():
    return render_template('index.html')

#https://stackoverflow.com/questions/20001229/how-to-get-posted-json-in-flask
@app.route('/api/add_message/<uuid>', methods=['GET', 'POST'])
def add_message(uuid):
    # content = request.json
    # content = request.get_json(silent=True)
    # print('content: ', content)
    # print content['mytext']
    print('I am here!!')
    return jsonify({"uuid":uuid})

@app.route('/sensors/data', methods=['GET'])
def get_sensors_data():

    data = ctrl.get_sensors_data()
    return jsonify(data)

@app.route('/process/init', methods=['POST'])
def process_init():
    
    data = ctrl.process_init()

    return jsonify(data)

@app.route('/process/start', methods=['POST'])
def process_start():
    
    data = ctrl.process_start()

    return jsonify(data)

@app.route('/process/stop', methods=['POST'])
def process_stop():

    data = ctrl.process_stop()

    return jsonify(data)

print('Starting Flask!')
app.debug=True
app.run(host='0.0.0.0', port=5000)