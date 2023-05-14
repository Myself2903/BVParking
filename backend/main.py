from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Controller.parkingStatus import router as parkingStatus


app = FastAPI()

#url allowed to query
origins = [
    "http://localhost",
    "http://localhost:5173"
]


#add origins to router
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(parkingStatus)


@app.get("/")
def read_root():
    return{"Hello": "World"}
