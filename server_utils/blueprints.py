# https://flask.palletsprojects.com/en/1.1.x/blueprints/#blueprints

from flask import Blueprint, render_template, abort

rest_apis = Blueprint('rest_apis', __name__,
                        template_folder="client/build")

