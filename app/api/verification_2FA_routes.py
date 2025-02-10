from flask import Blueprint, request, jsonify
from app.models import User, db
from flask_login import current_user, login_required

verification_2FA_routes = Blueprint('verification_2FA', __name__)


@verification_2FA_routes.route('/password', methods=['POST'])
@login_required
def verify_password():

    data = request.get_json()
    if data:
        id = data.get('id')
        password = data.get('password')
        user = User.query.get(id)

        if not user.check_password(password):
            return {'errors': {'message': 'Verification Failed'}}, 401
        return jsonify({"success": True})
