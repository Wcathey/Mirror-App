from flask import Blueprint, jsonify, request
from app.models import Brand
from flask_login import login_required

brand_routes = Blueprint('brands', __name__)

@brand_routes.route('/')
def get_brands():
    brands = Brand.query.all()

    return {'brands': [brand.to_dict() for brand in brands]}

@brand_routes.route('/<name>')
def get_brand_name(name):

    brand = Brand.query.filter(Brand.name == name).first()
    return brand.to_dict()
