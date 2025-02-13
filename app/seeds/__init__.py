from flask.cli import AppGroup
from .users import seed_users, undo_users
from .subscriptions import seed_subscriptions, undo_subscriptions
from .brands import seed_brands, undo_brands
from .foundations import seed_foundations, undo_foundations
from app.models.db import environment

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_subscriptions()
        undo_brands()
        undo_users()
        undo_foundations

    seed_subscriptions()
    seed_brands()
    seed_users()
    seed_foundations()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_foundations()
    undo_users()
    undo_brands()
    undo_subscriptions()
    # Add other undo functions here
