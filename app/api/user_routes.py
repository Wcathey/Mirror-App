from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Subscription, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """


    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/update/<userId>/<subscriptionId>', methods=['PUT'])
@login_required
def update_subscription(userId, subscriptionId):

    user = User.query.get(int(userId))
    user.subscription_id = subscriptionId
    db.session.commit()

    return user.to_dict()

@user_routes.route('/cancel/<userId>/<subscriptionId>', methods=["PUT"])
@login_required
def cancel_subscription(userId, subscriptionId):
    user = User.query.get(userId)
    user.subscription_id = subscriptionId
    db.session.commit()

    return user.to_dict()


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/delete', methods=["DELETE"])
@login_required
def delete_user_account():
    data = request.get_json()
    if data:
        verified = data.get("verified")
        user_id = data.get("id")

        if not verified:
            return {'errors': {'message': 'Verification Failed'}}, 401

    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "user account successfully deleted"})
