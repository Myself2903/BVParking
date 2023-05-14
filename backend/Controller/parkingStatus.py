from fastapi import APIRouter, WebSocket
import asyncio
from Model.Emulation.Emulation import Emulation
from Model.entity.Block import Block
import threading
import os
import sys
import time
import json

emulation = None
thread = None
blocks = {}
shutdown_event = asyncio.Event()  # Evento para controlar la finalización y cierre de la conexión WebSocket

def emulate():
    global blocks
    print("\033[32mINFO\033[0m:     Emulation started")
    time.sleep(2)
    types = ["car", "motorcycle"]
    n = 5
    blocks = {i: Block(idBlock = i, type = types[0], parking_zone = [True for _ in range(n)]) for i in range(5)}
    blocks[n] = Block(idBlock = n, type = types[1], parking_zone = [True for _ in range(n)])
    # print(blocks)
    emulation = Emulation(blocks, types)
    
    while not shutdown_event.is_set():
        blocks = emulation.flowEmulation()
        # print(blocks)
        time.sleep(5)

    print("\033[32mINFO\033[0m:     Emulation stopped")
    current_tickets = os.listdir("./Model/Emulation/QR")
    for ticket in current_tickets:
        os.remove(f'./Model/Emulation/QR/{ticket}')
    
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

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)

    try:
        while not shutdown_event.is_set():
            global blocks
            serialized_blocks = {str(block_id): block.dict() for block_id, block in blocks.items()}
            await websocket.send_json(serialized_blocks)
            await asyncio.sleep(1)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        clients.remove(websocket)
        await websocket.close()
