from pydantic import BaseModel
from typing import Optional

class PQR(BaseModel):
    id: Optional[int]
    titulo: str
    nombre: str
    respuesta: Optional[str]
    idTipo: int
