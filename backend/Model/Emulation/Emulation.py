from Model.entity.Block import Block
from Model.entity.Vehicle import Vehicle
import os
import random
import string

class Emulation():
    blocks:dict
    types:list
    id: int
    running: bool

    def __init__(self, blocks: dict, types: dict):
        self.types = types
        self.blocks = blocks
        self.id = 0
        self.running = True

    def genColor(self):
        r = random.randint(0, 255)  # Componente rojo
        g = random.randint(0, 255)  # Componente verde
        b = random.randint(0, 255)  # Componente azul
        a = round(random.uniform(0.0, 1.0), 2)
        return (r, g, b, a)

    def genLicensePlate(self, type: str):
        letters = list(string.ascii_uppercase)
        initLet = "".join([random.choice(letters) for i in range(3)])
        if type == "car":
            return f'{initLet}-{"".join([str(random.randint(0,9)) for i in range(3)])}'
        
        return f'{initLet}-{"".join([str(random.randint(0,9)) for i in range(2)])}{random.choice(letters)}'

    def enterFlow(self):
        type = random.choice(self.types)
        # type = types[1]
        vehicle = Vehicle(self.id, self.genLicensePlate(type), self.genColor(), type)
        vehicle.enterParking(self.blocks)            
        self.id += 1

    def exitFlow(self, tickets: list):
        ticket = random.choice(tickets)
        vehicle = Vehicle(None, None, None, None)
        vehicle.leaveParkingZone(ticket, self.blocks)
    
    def flowEmulation(self):
        print("\n-----------------------------------------------------------------")
        current_tickets = os.listdir("./Model/Emulation/QR")
        if(len(current_tickets) == 0):
            self.enterFlow()
        elif random.randint(0,100) < 70:
            self.enterFlow()
        else:
            self.exitFlow(current_tickets)

        for block in self.blocks.values():
            print(f"plazas disponibles del bloque {block.idBlock}: {block.getZones(True)}")
        
        return self.blocks