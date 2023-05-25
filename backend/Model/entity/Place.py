from pydantic import BaseModel

class Place(BaseModel):
    idPlace: int
    status: bool

    def isDetectingVehicle(self, status):
        self.status = not status

    