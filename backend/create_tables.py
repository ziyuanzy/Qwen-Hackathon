from database.db import Base, engine

import models.ai_analysis
import models.contractor
import models.maintenance_request
import models.maintenance_reference
import models.status

print("Dropping existing tables...")
Base.metadata.drop_all(bind=engine)

print("Creating tables...")
Base.metadata.create_all(bind=engine)

print("Database recreated successfully.")