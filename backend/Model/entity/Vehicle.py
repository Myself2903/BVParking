from Model.entity.Block import Block
from Model.entity.EntranceGate import EntranceGate
from Model.entity.ExitGate import ExitGate 
from pyzbar import pyzbar
from time import sleep
import cv2
import random 
import os
import json


class Vehicle:
    idVehicle: int
    license_plate: str
    color: tuple
    type: str #car or motorcycle
    parking_zone: tuple

    def __init__(self, idVehicle:int, license_plate: str, color: tuple, type:str):
        self.idVehicle = idVehicle
        self.license_plate = license_plate
        self.color = color
        self.type = type

    def getVehicle(self):
        return {"idVehicle": self.idVehicle,
                "license_plate": self.license_plate,
                "color": self.color,
                "type": self.type
            }

    def enterParking(self, blocks: list[Block]):        
        gate = EntranceGate()
        gate.genTicket(self.idVehicle, self.license_plate, self.color, self.type)
        sleep(2)
        gate.isDetectingVehicle("")
        return self.goToParkingZone(self.type, blocks)
    
    def chooseBlock(self, blocks: dict, vehicleType:str ,areAvaileable: bool):
        blocksMatching = []
        matchZoneCondition = False
        
        for block in blocks.values():
            zones = block.getZonesType(vehicleType, areAvaileable)
            # print(block.idBlock)
            if len(zones) != 0:
                blocksMatching.append((block.idBlock, zones))
                matchZoneCondition = True 

        if not matchZoneCondition:
                return (-1,-1) 

        parking_block = random.choice(blocksMatching)
        parking_zone = random.choice(parking_block[1])
        return (parking_block[0], parking_zone)
    

    def goToParkingZone(self, type: str, blocks: list[Block]):
        if os.path.exists(f"./Model/Emulation/QR/{self.idVehicle}.png"):
            choosed_space = self.chooseBlock(blocks, type, True)

            if choosed_space == (-1,-1):
                current_vehicle_data = {
                    "license_plate": self.license_plate,
                    "color": [color for color in self.color],
                    "type": self.type
                }
                print('no hay espacios disponibles en el parking')
                sleep(2)
                self.leaveParking(f"{self.idVehicle}.png", current_vehicle_data)
            else:
                 blocks[choosed_space[0]].parkInZone(choosed_space[1])

            return choosed_space
        
        print('el vehiculo no ha ingresado al parking')

    def leaveParkingZone(self, ticket: str, blocks):
        qrImg = cv2.imread(f'./Model/Emulation/QR/{ticket}')
        gray = cv2.cvtColor(qrImg, cv2.COLOR_BGR2GRAY)
        qr_codes = pyzbar.decode(gray)

        for codigo_qr in qr_codes:
            ticketData = codigo_qr.data.decode("utf-8")
            ticketData = json.loads(ticketData)          
                
        current_vehicle = {
            "license_plate": ticketData["license_plate"],
            "color": ticketData["color"],
            "type": ticketData["type"]
        }

        space_leaving = self.chooseBlock(blocks, current_vehicle["type"], False)

        if space_leaving == (-1,-1):
            print('no hay vehiculos en el parking')
        else:
            blocks[space_leaving[0]].leaveZone(space_leaving[1])
            self.leaveParking(ticket, current_vehicle)

        return space_leaving
    
    def leaveParking(self, ticket, current_vehicle):
        gate = ExitGate()
        gate.readTicket(ticket, current_vehicle)
        sleep(2)
        gate.isDetectingVehicle("")