from fastapi import APIRouter, Request
from sse_starlette.sse import EventSourceResponse, ServerSentEvent
from Model.Emulation.Emulation import Emulation
from Model.entity.Block import Block
from Model.entity.Place import Place
import errno
import asyncio
import threading
import os
import shutil
import sys
import time
import json

emulation = None
thread = None
blocks = {}
shutdown_event = asyncio.Event()  # Evento para controlar la finalización y cierre de la conexión WebSocket

def emulate():
    global blocks
    qrdirectory = "./Model/Emulation/QR" 
    try:
        os.mkdir(qrdirectory)
    except OSError as err:
        if err.errno == errno.EEXIST:
            shutil.rmtree(qrdirectory)
            os.mkdir(qrdirectory)

    print("\033[32mINFO\033[0m:     Emulation started")
    time.sleep(2)
    types = ["car", "motorcycle"]
    nParkingZones = 16
    nBlocks = 6
    blocks = {i: Block(idBlock = i, type = types[0], parking_zone = [Place(idPlace=j, status=True) for j in range(nParkingZones)]) for i in range(nBlocks)}
    blocks[len(blocks)] = Block(idBlock = len(blocks), type = types[1], parking_zone = [Place(idPlace=j, status=True) for j in range(nParkingZones)])
    emulation = Emulation(blocks, types)
    
    while not shutdown_event.is_set():
        blocks = emulation.flowEmulation()
        time.sleep(5)

    print("\033[32mINFO\033[0m:     Emulation stopped")
    shutil.rmtree(qrdirectory)
    
    sys.exit(0)


router = APIRouter()

clients = []

@router.on_event("startup")
async def startupEmulation():
    global thread
    thread = threading.Thread(target=emulate)
    thread.start()

@router.on_event("shutdown")
async def stopEmulation():
    shutdown_event.set()  # Establecer el evento de finalización
    if thread is not None:  
        thread.join()

@router.get("/blockStatus")
async def sse_blocksStatus(request: Request):
    async def event_generator():
        client = request.scope["client"]  # Obtener información del cliente actual
        clients.append(client) 
        while not shutdown_event.is_set():
            global blocks
            if blocks:
                availeableBlocks = {}
                for idblock in blocks:
                    availeableBlocks[idblock] = True if blocks[idblock].getZones(True) else False
                
                event = ServerSentEvent(data=json.dumps(availeableBlocks))
                yield event
                await asyncio.sleep(1)

    return EventSourceResponse(event_generator())

@router.get("/parkingStatus")
async def sse_parkingPlacesStatus(searchedBlock: int,request: Request):
    async def event_generator():
        client = request.scope["client"]  # Obtener información del cliente actual
        clients.append(client) 
        while not shutdown_event.is_set():
            global blocks
            
            if blocks:
                availeableZones = {}
                for i in range(len(blocks[searchedBlock].parking_zone)):
                    availeableZones[i] = blocks[searchedBlock].parking_zone[i].status

                event = ServerSentEvent(data=json.dumps(availeableZones))
                yield event
                await asyncio.sleep(1)

    return EventSourceResponse(event_generator())