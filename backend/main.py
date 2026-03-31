from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)

@app.get("/")
def root():
    return {"message": "Backend running"}