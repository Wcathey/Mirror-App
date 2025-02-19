from app.models import db, Eyeshadow, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_eyeshadows():
    celestial = Eyeshadow(
        id=1, name='Celestial', collection_id=3)
    dazzling = Eyeshadow(
        id=2, name='Dazzling',  collection_id=3)
    drama = Eyeshadow(
        id=3, name='Drama', collection_id=3)
    dreamer = Eyeshadow(
        id=4, name='Dreamer',  collection_id=3)
    rose_gold = Eyeshadow(
        id=5, name='Rose Gold', collection_id=3)
    summer = Eyeshadow(
        id=6, name='Summer', collection_id=3)
    wild_child = Eyeshadow(
        id=7, name= 'Wild Child', collection_id=3
    )
# Now you can add the data into your session:
    db.session.add(celestial)
    db.session.add(dazzling)
    db.session.add(dreamer)
    db.session.add(drama)
    db.session.add(rose_gold)
    db.session.add(summer)
    db.session.add(wild_child)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_eyeshadows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.eyeshadows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM eyeshadows"))

    db.session.commit()
