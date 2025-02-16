from flask import Blueprint, jsonify, request
from app.models import Foundation
from flask_login import login_required

foundation_routes = Blueprint('foundations', __name__)

@foundation_routes.route('/')
def get_foundations():
    foundations = Foundation.query.all()

    return {'foundations': [foundation.to_dict() for foundation in foundations]}

@foundation_routes.route('/<name>')
def get_brand_name(name):

    foundation = Foundation.query.filter(Foundation.name == name).first()
    return foundation.to_dict()
