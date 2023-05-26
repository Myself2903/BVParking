from fastapi import Depends, HTTPException, status
from Model.entity.PQR import PQR
from Model.dao.PQRDAO import PQRDAO

def getPQRS():
    conn = PQRDAO()
    return conn.getPQR()

def createPQR(pqr: PQR = Depends()):
    conn = PQRDAO()
    print(pqr)
    if conn.setPQR(pqr.titulo, pqr.nombre, pqr.respuesta, pqr.idTipo):
        raise HTTPException(status_code=status.HTTP_201_CREATED, detail="PQR creado")
    
