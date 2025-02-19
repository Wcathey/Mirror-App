from flask import Blueprint, jsonify, request
from app.models import Lipstick
from flask_login import login_required

lipstick_routes = Blueprint('lipsticks', __name__)

@lipstick_routes.route('/')
def get_lipsticks():
    lipsticks = Lipstick.query.all()

    return {'lipsticks': [lipstick.to_dict() for lipstick in lipsticks]}

@lipstick_routes.route('/<name>')
def get_lipstick_name(name):

    lipstick = Lipstick.query.filter(Lipstick.name == name).first()
    return lipstick.to_dict()
