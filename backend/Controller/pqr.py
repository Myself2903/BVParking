from fastapi import APIRouter, Body
from Model.entity.PQR import PQR
import Model.Operation.PQROperation as pqrOP


router  = APIRouter()

@router.get("/PQR")
async def getPQR():
    return pqrOP.getPQRS()

@router.post("/newPQR")
async def createPQR(pqr: PQR = Body(...)):
    return pqrOP.createPQR(pqr)

