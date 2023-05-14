
from datetime import datetime
import json
import qrcode

class EntranceGate():
    open: bool
    detectVehicle: bool

    def __init__(self):
        self.open = False
        self.detectVehicle = False

    def isDetectingVehicle(self, license_plate: str):
        if(license_plate != ""):
            print(f'el vehiculo de matricula {license_plate} llegó a la entrada')
            self.detectVehicle = True
        else:
            self.detectVehicle = False
            self.closeGate()


    def genTicket(self, idVehicle: int , license_plate: str, color: tuple, type: str):
        try:
            ticket = {    
                "idVehicle": idVehicle,
                "license_plate": license_plate,
                "color": color,
                "type": type,
                "time": datetime.now().isoformat()
            }

            ticket = json.dumps(ticket)
            self.isDetectingVehicle(license_plate)
            
            if self.detectVehicle:
                qr = qrcode.make(ticket)
                qr.save(f"./Model/Emulation/QR/{idVehicle}.png", "wb")
                self.openGate()
            
        except Exception as e:
            print(e)
            self.closeGate()

        return self.open
    
    def passGate(self):
        self.detectVehicle = False

    def openGate(self):
        self.open = True
        print("Entrada abierta")

    def closeGate(self):
        self.open = False
        print("Entrada cerrada")