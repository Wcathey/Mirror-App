from app.models import db, Collection, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_collections():
    fit_me = Collection(
        id=1, name='Fit Me', brand_id=1)
    super_stay_matte = Collection(
        id=2, name="Super Stay Matte", brand_id=1)
    novina = Collection(
        id=3, name="Novina", brand_id=2)

    db.session.add(fit_me)
    db.session.add(super_stay_matte)
    db.session.add(novina)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM collections"))

    db.session.commit()
