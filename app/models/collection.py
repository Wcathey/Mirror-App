from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Collection(db.Model):
    __tablename__ = "collections"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('brands.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    foundations = relationship("Foundation", back_populates="collection", cascade="all, delete-orphan")
    lipsticks = relationship("Lipstick", back_populates="collection", cascade="all, delete-orphan")
    eyeshadows = relationship("Eyeshadow", back_populates="collection", cascade="all, delete-orphan")
    brand = relationship("Brand", back_populates="collections")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'brand_id': self.brand_id
        }
