from flask import Blueprint, jsonify, request
from app.models import Collection
from flask_login import login_required

collection_routes = Blueprint('collections', __name__)

@collection_routes.route('/')
def get_collections():
    collections = Collection.query.all()

    return {'collections': [collection.to_dict() for collection in collections]}

@collection_routes.route('/<name>')
def get_collection_name(name):

    collection = Collection.query.filter(Collection.name == name).first()
    return collection.to_dict()
