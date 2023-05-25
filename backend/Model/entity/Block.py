from pydantic import BaseModel
from .Place import Place

class Block(BaseModel):
    idBlock: int
    type: str
    parking_zone: list[Place]

    def getZones(self, isAvaileable):
        availeable_zone = []
        for i in range(len(self.parking_zone)):
            if isAvaileable == self.parking_zone[i].status:
                availeable_zone.append(i)

        return availeable_zone

    def getZonesType(self, type:str, isAvaileable):
        if(self.type == type):
            return self.getZones(isAvaileable)
        return []    

    def parkInZone(self, place: int):
        for zone in self.parking_zone:
            if zone.idPlace == place:
                zone.isDetectingVehicle(True)
                print(f"el vehiculo se estacionó en el bloque {self.idBlock} en la plaza {place}" )
                break

        
    def leaveZone(self, place: int):
        for zone in self.parking_zone:
            if zone.idPlace == place:
                zone.isDetectingVehicle(False)
                print(f"se liberó la plaza {place} en el bloque {self.idBlock}")
                break
