# Fullstack Raspberry Pi App fullstack-rpi-app

## How-to start the app

1. Clone this repository

2. (Optional but recommendend) Create a virtual environment from the root project and install the required python requirements in the newly created virtual environment

```
$ cd fullstack-rpi-app
$ python3 -m venv my_venv 
$ source my_venv/bin/activate 
(my_venv) $ pip3 install -r requirements_rpi.txt

```

Note that
* If you install this project on a raspberry pi - use `requirements_rpi.txt`
* If you would like to try this app out on your computer (not a raspberry pi) - use `requirements.txt`

3. Spin up the server using the following command:

```
(my_venv) $ python server.py
```

4. Launch the app in a browser using the following url:

```
http://localhost:5000
```

Note that
* If you are running the app on your computer (not a raspberry pi), random data will be shown on the app


5. (Optional) you can deactivate the virtual environment using the following command:
```
(my_venv) $ deactivate
$ 
```

