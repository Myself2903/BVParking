import cv2
from os import remove
from pyzbar import pyzbar
import json

class ExitGate():
    open: bool
    detectVehicle: bool

    def __init__(self):
        self.open = False
        self.detectVehicle = False

    def isDetectingVehicle(self, license_plate: str):
        if(license_plate != ""):
            print(f'el vehiculo de matricula {license_plate} llegó a la salida')
            self.detectVehicle = True
            
        else:
            self.detectVehicle = False
            self.closeGate()

    def readTicket(self, ticket:str, current_vehicle: dict):
        try:
            qrImg = cv2.imread(f'./QR/{ticket}')
            gray = cv2.cvtColor(qrImg, cv2.COLOR_BGR2GRAY)
            qr_codes = pyzbar.decode(gray)

            for codigo_qr in qr_codes:
                ticketData = codigo_qr.data.decode("utf-8")
                ticketData = json.loads(ticketData)          
            
            self.isDetectingVehicle(current_vehicle["license_plate"])
            if (
                self.detectVehicle and
                current_vehicle["license_plate"] == ticketData["license_plate"] and
                current_vehicle["color"] == ticketData["color"] and
                current_vehicle["type"] == ticketData["type"]
            ):                
                self.openGate()
                remove(f'./QR/{ticket}')
                
        except Exception as e:
            self.closeGate()
            print(e)
            print("ticket inexistente")

    def openGate(self):
        self.open = True
        print("Salida abierta")

    def closeGate(self):
        self.open = False
        print("Salida cerrada")