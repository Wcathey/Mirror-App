from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Foundation(db.Model):
    __tablename__ = "foundations"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    hex_color_code = db.Column(db.String(6), nullable=False)
    shade_id = db.Column(db.Integer, nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('collections.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    collection = relationship("Collection", back_populates="foundations")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'hex_color_code': self.hex_color_code,
            'shade_id': self.shade_id,
            'collection_id':self.collection_id
        }
