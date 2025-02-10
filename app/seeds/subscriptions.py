from app.models import db, Subscription, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_subscriptions():
    free = Subscription(
        id=1, tier='free', price=0, duration='annual')
    standard_monthly = Subscription(
       id=2, tier='standard', price=4.99, duration='monthly')
    standard_annual = Subscription(
       id=3, tier='standard', price=49.99, duration='annual')
    premium_monthly = Subscription(
       id=4, tier='premium', price=9.99, duration='monthly')
    premium_annual = Subscription(
       id=5, tier='premium', price=99.99, duration='annual')

    db.session.add(free)
    db.session.add(standard_monthly)
    db.session.add(standard_annual)
    db.session.add(premium_monthly)
    db.session.add(premium_annual)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_subscriptions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subscriptions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM subscriptions"))

    db.session.commit()
