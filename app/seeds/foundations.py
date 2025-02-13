from app.models import db, Foundation, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_foundations():
    fair_porcelain = Foundation(
        id=1, name='Fair Porcelain', hex_color_code="FMDFD1", shade_id=102, brand_id=1)
    fair_ivory = Foundation(
        id=2, name='Fair Ivory', hex_color_code="F0D0C1", shade_id=105, brand_id=1)
    porcelain = Foundation(
        id=3, name='Porcelain', hex_color_code="F0D9BA", shade_id=110, brand_id=1)
    natural_ivory = Foundation(
        id=4, name='Natural Ivory', hex_color_code="EFCFB6", shade_id=112, brand_id=1)
    ivory = Foundation(
        id=5, name='Ivory', hex_color_code="F3CAAE", shade_id=115, brand_id=1)
    light_beige = Foundation(
        id=6, name='Light Beige', hex_color_code="EDD0A8", shade_id=118, brand_id=1)
    classic_ivory = Foundation(
        id=7, name='Classic Ivory', hex_color_code="E5BB93", shade_id=120, brand_id=1)
    creamy_beige = Foundation(
        id=8, name='Creamy Beige', hex_color_code="#F0BF9E", shade_id=122, brand_id=1)
    soft_sand = Foundation(
        id=9, name='Soft Sand', hex_color_code="F4BF93", shade_id=124, brand_id=1)
    nude_beige = Foundation(
        id=10, name='Nude Beige', hex_color_code="EBB47E", shade_id=125, brand_id=1)
    warm_nude = Foundation(
        id=11, name='Warm Nude', hex_color_code="E6BD91", shade_id=128, brand_id=1)
    buff_beige = Foundation(
        id=12, name='Buff Beige', hex_color_code="ECAD84", shade_id=130, brand_id=1)
    natural_beige = Foundation(
        id=13, name='Natural Beige', hex_color_code="DBAD78", shade_id=220, brand_id=1)
    true_beige = Foundation(
        id=14, name='True Beige', hex_color_code="E5A774", shade_id=222, brand_id=1)
    soft_tan = Foundation(
        id=15, name='Soft Tan', hex_color_code="D5985F", shade_id=228, brand_id=1)
    natural_buff = Foundation(
        id=16, name='Natural Buff', hex_color_code="#DBA372", shade_id=230, brand_id=1)
    pure_beige = Foundation(
        id=17, name='Pure Beige', hex_color_code="DB9F7A", shade_id=235, brand_id=1)
    rich_tan = Foundation(
        id=18, name='Rich Tan', hex_color_code="D9AB93", shade_id=238, brand_id=1)
    light_honey = Foundation(
        id=19, name='Light Honey', hex_color_code="EDA783", shade_id=242, brand_id=1)
    classic_beige = Foundation(
        id=20, name='Classic Beige', hex_color_code="D2976F", shade_id=245, brand_id=1)
    sun_beige = Foundation(
        id=21, name='Sun Beige', hex_color_code="D08E5C", shade_id=310, brand_id=1)
    golden = Foundation(
        id=22, name='Golden', hex_color_code="DE985C", shade_id=312, brand_id=1)
    natural_tan = Foundation(
        id=23, name='Natural Tan', hex_color_code="D7966E", shade_id=320, brand_id=1)
    warm_honey = Foundation(
        id=24, name='Warm Honey', hex_color_code="#D8925F", shade_id=322, brand_id=1)
    toffee = Foundation(
        id=25, name='Toffee', hex_color_code="D2864C", shade_id=330, brand_id=1)
    golden_caramel = Foundation(
        id=26, name='Golden Caramel', hex_color_code="DF9856", shade_id=332, brand_id=1)
    warm_sun = Foundation(
        id=27, name='Warm Sun', hex_color_code="D28444", shade_id=334, brand_id=1)
    classic_tan = Foundation(
        id=28, name='Classic Tan', hex_color_code="CD7D4C", shade_id=335, brand_id=1)
    spicy_brown = Foundation(
        id=29, name='Spicy Brown', hex_color_code="BB6C34", shade_id=338, brand_id=1)
    cappuccino = Foundation(
        id=30, name='Cappuccino', hex_color_code="CE8246", shade_id=340, brand_id=1)
    coconut = Foundation(
        id=31, name='Coconut', hex_color_code="BC6C47", shade_id=355, brand_id=1)
    warm_coconut = Foundation(
        id=32, name='Warm Coconut', hex_color_code="#B1612C", shade_id=356, brand_id=1)
    latte = Foundation(
        id=33, name='Latte', hex_color_code="9F5F3B", shade_id=358, brand_id=1)
    mocha = Foundation(
        id=34, name='Mocha', hex_color_code="A56037", shade_id=360, brand_id=1)
    truffle = Foundation(
        id=35, name='Truffle', hex_color_code="A66932", shade_id=362, brand_id=1)
    nutmeg = Foundation(
        id=36, name='Nutmeg', hex_color_code="AA6B48", shade_id=365, brand_id=1)
    deep_golden = Foundation(
        id=37, name='Deep Golden', hex_color_code="965E3B", shade_id=368, brand_id=1)
    deep_bronze = Foundation(
        id=38, name='Deep Bronze', hex_color_code="7C422A", shade_id=370, brand_id=1)
    java = Foundation(
        id=39, name='Java', hex_color_code="6A3405", shade_id=375, brand_id=1)
    espresso = Foundation(
        id=40, name='Espresso', hex_color_code="#5E3225", shade_id=380, brand_id=1)

# Now you can add the data into your session:
    db.session.add(fair_porcelain)
    db.session.add(fair_ivory)
    db.session.add(porcelain)
    db.session.add(natural_ivory)
    db.session.add(ivory)
    db.session.add(light_beige)
    db.session.add(classic_ivory)
    db.session.add(creamy_beige)
    db.session.add(soft_sand)
    db.session.add(nude_beige)
    db.session.add(warm_nude)
    db.session.add(buff_beige)
    db.session.add(natural_beige)
    db.session.add(true_beige)
    db.session.add(soft_tan)
    db.session.add(natural_buff)
    db.session.add(pure_beige)
    db.session.add(rich_tan)
    db.session.add(light_honey)
    db.session.add(classic_beige)
    db.session.add(sun_beige)
    db.session.add(golden)
    db.session.add(natural_tan)
    db.session.add(warm_honey)
    db.session.add(toffee)
    db.session.add(golden_caramel)
    db.session.add(warm_sun)
    db.session.add(classic_tan)
    db.session.add(spicy_brown)
    db.session.add(cappuccino)
    db.session.add(coconut)
    db.session.add(warm_coconut)
    db.session.add(latte)
    db.session.add(mocha)
    db.session.add(truffle)
    db.session.add(nutmeg)
    db.session.add(deep_golden)
    db.session.add(deep_bronze)
    db.session.add(java)
    db.session.add(espresso)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_foundations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.foundations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM foundations"))

    db.session.commit()
