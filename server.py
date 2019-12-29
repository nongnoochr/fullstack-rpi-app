# To be removed
from random import random
import time



# See https://www.pranaysite.com/flask-and-react/
from flask import Flask, request,  render_template,jsonify



app = Flask(__name__, static_folder="client/build/static", template_folder="client/build")
@app.route("/")
def hello():
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
    temperature = 25 + (2*random() - 1)
    humidity    = 40 + (5*random() - 3)
    data = {
        'temperature':    temperature,
        'humidity':       humidity
    }
    return jsonify(data)

@app.route('/process/init', methods=['POST'])
def process_init():
    print('Init process...')

    print('*Wait for 1 second...')
    time.sleep(1)
    data = {
        'success':    True
    }
    return jsonify(data)

@app.route('/process/start', methods=['POST'])
def process_start():
    print('START process...')

    print('*Wait for 1 second...')
    time.sleep(1)
    data = {
        'success':    True
    }
    return jsonify(data)

@app.route('/process/stop', methods=['POST'])
def process_stop():
    print('STOP process...')

    print('*Wait for 1 second...')
    time.sleep(1)
    data = {
        'success':    True
    }
    return jsonify(data)

print('Starting Flask!')
app.debug=True
app.run(host='0.0.0.0', port=5000)