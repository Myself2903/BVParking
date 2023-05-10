
class Block:
    idBlock: int
    type: str
    parking_zone: list[bool]

    def __init__(self, idBlock, type, nZone):
        self.idBlock = idBlock
        self.type = type
        self.parking_zone = [True for i in range(nZone) ]

    def getZones(self, isAvaileable):
        availeable_zone = []
        for i in range(len(self.parking_zone)):
            if isAvaileable == self.parking_zone[i]:
                availeable_zone.append(i)

        return availeable_zone

    def getZonesType(self, type:str, isAvaileable):
        if(self.type == type):
            return self.getZones(isAvaileable)
        return []    

    def parkInZone(self, parking_zone: int):
        self.parking_zone[parking_zone] = False
        print(f"el vehiculo se estacionó en el bloque {self.idBlock} en la plaza {parking_zone}" )
    
    def leaveZone(self, parking_zone: int):
        self.parking_zone[parking_zone] = True
        print(f"se liberó la plaza {parking_zone} en el bloque {self.idBlock}")
