from Vehicle import Vehicle
from Block import Block
import os
import random
import string
import time
import signal
import sys

blocks = []
types = ["car", "motorcycle"]
id = 0

def genColor():
    r = random.randint(0, 255)  # Componente rojo
    g = random.randint(0, 255)  # Componente verde
    b = random.randint(0, 255)  # Componente azul
    a = round(random.uniform(0.0, 1.0), 2)
    return (r, g, b, a)

def genLicensePlate(type):
    letters = list(string.ascii_uppercase)
    initLet = "".join([random.choice(letters) for i in range(3)])
    if type == "car":
        return f'{initLet}-{"".join([str(random.randint(0,9)) for i in range(3)])}'
    
    initLet
    return f'{initLet}-{"".join([str(random.randint(0,9)) for i in range(2)])}{random.choice(letters)}'

def enterFlow():
    global id
    type = random.choice(types)
    # type = types[1]
    vehicle = Vehicle(id,genLicensePlate(type), genColor(), type)
    vehicle.enterParking(blocks)            
    id += 1

def exitFlow(tickets: list):
    ticket = random.choice(tickets)
    vehicle = Vehicle(None, None, None, None)
    vehicle.leaveParkingZone(ticket, blocks)

def flowEmulation():
    for i in range(4):
        blocks.append(Block(i, types[0] ,2))
    blocks.append(Block(i+1, types[1] ,2))

    while(True):
        print("\n-----------------------------------------------------------------")
        current_tickets = os.listdir("./QR")
        if(len(current_tickets) == 0):
            enterFlow()
        elif random.randint(0,100) < 70:
            enterFlow()
        else:
            exitFlow(current_tickets)

        for block in blocks:
            print(f"plazas disponibles del bloque {block.idBlock}: {block.getZones(True)}")
        time.sleep(5)

def handleSignal(sig, frame):
    signal.signal(signal.SIGINT, signal.SIG_DFL)
    current_tickets = os.listdir("./QR")
    for ticket in current_tickets:
        os.remove(f'./QR/{ticket}')
    sys.exit(0)

signal.signal(signal.SIGINT, handleSignal)
flowEmulation() 