from flask import Blueprint, jsonify, request
from app.models import Eyeshadow
from flask_login import login_required

eyeshadow_routes = Blueprint('eyeshadows', __name__)

@eyeshadow_routes.route('/')
def get_eyeshadows():
    eyeshadows = Eyeshadow.query.all()

    return {'eyeshadows': [eyeshadow.to_dict() for eyeshadow in eyeshadows]}

@eyeshadow_routes.route('/<name>')
def get_eyeshadow_name(name):

    eyeshadow = Eyeshadow.query.filter(Eyeshadow.name == name).first()
    return eyeshadow.to_dict()
