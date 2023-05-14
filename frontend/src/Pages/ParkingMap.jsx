import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import PUC from "../assets/puc.jpg"
import '../styles/ParkingMap.css'
import { useState, useEffect } from "react"
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const ParkingMap = ()=>{
    const [parkingState, setParkingState] = useState([])
    // const URL = '127.0.0.1:8000'
    const client = new W3CWebSocket('ws://localhost:8000/ws');

    useEffect(() =>{
        client.onopen = () => console.log('WebSocket connection established')
        client.onmessage = message => {
            const data = JSON.parse(message.data);
            console.log(data)
            setParkingState(data);
        }
        client.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        client.onclose = () => {
            console.log("WebSocket connection closed");
            // Realizar cualquier otra acción necesaria después de cerrar la conexión
        }
        
        return () => client.close()
    }, [])

    return (
        <>
            <Navbar/>
            <h1 className="title">Mapa del parqueadero</h1>
            <section className="parkingMap">
                <img src={PUC} alt="page under construction" className='puc'/>
            </section>
            <div className="parking">
                <p>data:</p>
                {Object.keys(parkingState).map((blockId) => (
                        <div key={blockId}>
                            Block ID: {blockId}<br />
                            Type: {parkingState[blockId].type}<br />
                            Capacity: {parkingState[blockId].parking_zone[0] ? "mondongo" : "eche"}<br />
                            <br />
                        </div>
                    ))}
            </div>
            <Footer/>

        </>
    )
}

export default ParkingMap