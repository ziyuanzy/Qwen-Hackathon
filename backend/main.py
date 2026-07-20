from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.ticket_routes import router as ticket_router
from routes.email_routes import router as email_router

app = FastAPI(
    title="mAIntAIn Backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded images
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# Routes
app.include_router(ticket_router)
app.include_router(
    email_router,
    prefix="/emails",
    tags=["Emails"],
)

@app.get("/")
def root():

    return {
        "status": "running",
        "service": "mAIntAIn Backend",
        "version": "1.0.0",
    }