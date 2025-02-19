from app.models import db, Lipstick, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_lipsticks():
    artist = Lipstick(
        id=1, name='Artist', hex_color_code="8E1F43", collection_id=2)
    believer = Lipstick(
        id=2, name='Believer', hex_color_code="6E104B", collection_id=2)
    dreamer = Lipstick(
        id=3, name='Dreamer', hex_color_code="E08F98", collection_id=2)
    loyalist = Lipstick(
        id=4, name='Loyalist', hex_color_code="E2A99E", collection_id=2)
    pioneer = Lipstick(
        id=5, name='Pioneer', hex_color_code="90081C", collection_id=2)
    visionary = Lipstick(
        id=6, name='Visionary', hex_color_code="816470", collection_id=2)

# Now you can add the data into your session:
    db.session.add(artist)
    db.session.add(believer)
    db.session.add(dreamer)
    db.session.add(loyalist)
    db.session.add(pioneer)
    db.session.add(visionary)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lipsticks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lipsticks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lipsticks"))

    db.session.commit()
