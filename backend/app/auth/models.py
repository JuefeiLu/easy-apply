# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db


# Define a base model for other database tables to inherit
class Base(db.Model):

    __abstract__  = True

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())

# Define a User model
class User(Base):

    __tablename__ = 'User'

    firstName = db.Column(db.String(128),  nullable=False)
    lastName  = db.Column(db.String(128),  nullable=False)

    # Identification Data: email & password
    email    = db.Column(db.String(128),  nullable=False,
                                            unique=True)
    password = db.Column(db.String(192),  nullable=False)
    address = db.Column(db.String(128),  nullable=False)
    city= db.Column(db.String(128), nullable=False)
    country= db.Column(db.String(128), nullable=False)
    # Authorisation Data: role & status
    role     = db.Column(db.String(128), nullable=False)
    status   = db.Column(db.SmallInteger, nullable=False)
    profilePath = db.Column(db.String(400), nullable=True)
    videoPath = db.Column(db.String(400), nullable=True)
    # applicant = db.relationship('Applicant', backref=db.backref("User"))



    # New instance instantiation procedure
    def __init__(self, firstName, lastName, email, password, address, city, country, role, status, profilePath, videoPath):

        self.firstName     = firstName
        self.lastName     = lastName
        self.email    = email
        self.password = password
        self.address = address
        self.city = city
        self.country = country
        self.role = role
        self.status = status
        self.profilePath = profilePath
        self.videoPath = videoPath

    def __repr__(self):
        return '<User %r>' % (self.name)     

class Employer(Base):

    __tablename__ = 'auth_employer'

    # company name
    company_name    = db.Column(db.String(128), nullable=False)

    #company login details
    company_email   = db.Column(db.String(128), nullable=False,
                                                     unique=True)
    password    = db.Column(db.String(192), nullable=False)

    #company authorization
    role    = db.Column(db.SmallInteger, nullable=False)
    status  = db.Column(db.SmallInteger, nullable=False)

    #instance instantiation
    def __init__(self, name, email, password):

        self.company_name = name
        self.company_email = email
        self.password = password
    
    def __repr__(self):
        return '<Company %r>' % (self.company_name)
        return '<User {} {} {} {} >'.format(self.firstName,self.lastName, self.email,self.address)