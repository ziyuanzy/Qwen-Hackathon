from database.db import SessionLocal
from models.maintenance_reference import MaintenanceReference

db = SessionLocal()

REFERENCE_DATA = [

    {
        "category": "Plumbing",
        "contractor_type": "Licensed Plumber",
        "typical_duration": "2–4 hours",
        "min_cost": 150,
        "max_cost": 350,
        "description": (
            "Handles water leaks, burst pipes, "
            "drainage issues and plumbing fixtures."
        ),
    },

    {
        "category": "Electrical",
        "contractor_type": "Licensed Electrician",
        "typical_duration": "1–3 hours",
        "min_cost": 180,
        "max_cost": 450,
        "description": (
            "Handles wiring, sockets, circuit breakers, "
            "lighting fixtures and electrical safety."
        ),
    },

    {
        "category": "HVAC",
        "contractor_type": "HVAC Technician",
        "typical_duration": "2–5 hours",
        "min_cost": 120,
        "max_cost": 500,
        "description": (
            "Handles air-conditioning, ventilation "
            "and cooling system repairs."
        ),
    },

    {
        "category": "Structural",
        "contractor_type": "Building Contractor",
        "typical_duration": "1–3 days",
        "min_cost": 600,
        "max_cost": 3000,
        "description": (
            "Handles walls, ceilings, concrete cracks, "
            "structural defects and major repairs."
        ),
    },

    {
        "category": "Pest",
        "contractor_type": "Licensed Pest Control Specialist",
        "typical_duration": "2–4 hours",
        "min_cost": 100,
        "max_cost": 250,
        "description": (
            "Handles termites, cockroaches, ants, rodents "
            "and other pest infestations."
        ),
    },

    {
        "category": "Cleaning",
        "contractor_type": "Professional Cleaning Team",
        "typical_duration": "3–8 hours",
        "min_cost": 80,
        "max_cost": 250,
        "description": (
            "Handles deep cleaning, sanitation, "
            "spill cleanup and post-repair cleaning."
        ),
    },
]

for row in REFERENCE_DATA:
    exists = db.query(
        MaintenanceReference
    ).filter_by(
        category=row["category"]
    ).first()

    if not exists:

        db.add(
            MaintenanceReference(**row)
        )

db.commit()
db.close()

print("Reference data seeded successfully.")