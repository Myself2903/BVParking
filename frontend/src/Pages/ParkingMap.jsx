import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import ParkingBlock from "../assets/parking-map-block.png"
import '../styles/ParkingMap.css'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ParkingMap = ()=>{
    const [parkingState, setParkingState] = useState([])
    const URL = 'http://127.0.0.1:8000/parkingStatus'
    const navigate = useNavigate()
    // const client = new W3CWebSocket('ws://localhost:8000/ws');

    // useEffect(() =>{
    //     client.onopen = () => console.log('WebSocket connection established')
    //     client.onmessage = message => {
    //         const data = JSON.parse(message.data);
    //         console.log(data)
    //         setParkingState(data);
    //     }
    //     client.onerror = (error) => {
    //         console.error("WebSocket error:", error);
    //     };
    //     client.onclose = () => {
    //         console.log("WebSocket connection closed");
    //         // Realizar cualquier otra acción necesaria después de cerrar la conexión
    //     }
        
    //     return () => client.close()
    // }, [])

    useEffect(() =>{
        const eventSource = new EventSource(URL)
        console.log(eventSource.readyState)

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            setParkingState(data);
          };

        return () => {
            eventSource.close(); // Cerrar la conexión SSE al desmontar el componente
        };
    }, []);

    return (
        <>
            <Navbar/>
            <h1 className="title">Mapa del parqueadero</h1>
            <section className="parkingMap">
                <img src={ParkingBlock} alt="page under construction" className='parkingBlock'/>
                <div onClick={()=>navigate("/mapa-de-parqueo/bloque")} className="blocks blockF">
                    <p>F</p>
                </div>
                <div onClick={()=>navigate("/mapa-de-parqueo/bloque")} className="blocks blockE">
                    <p>E</p>
                </div>
                <div onClick={()=>navigate("/mapa-de-parqueo/bloque")} className="blocks blockD">
                    <p>D</p>
                </div>
                <div onClick={()=>navigate("/mapa-de-parqueo/bloque")} className="blocks blockC">
                    <p>C</p>
                </div>
                <div onClick={()=>navigate("/mapa-de-parqueo/bloque")} className="blocks blockB">
                    <p>B</p>
                </div>
                <div onClick={()=>navigate("/mapa-de-parqueo/bloque")} className="blocks blockA">
                    <p>A</p>
                </div>
                <div onClick={()=>navigate("/mapa-de-parqueo/bloque")} className="blocks blockMoto">
                    <p>Moto</p>
                </div>
            </section>
            <div className="parking">
                <p>data:</p>
                {Object.keys(parkingState).map((blockId) => (
                        <div key={blockId}>
                            Block ID: {blockId}<br />
                            Type: {parkingState[blockId].type}<br />
                            Capacity: {parkingState[blockId].parking_zone ? "mondongo" : "eche"}<br />
                            <br />
                        </div>
                    ))}
            </div>
            <Footer/>

        </>
    )
}

export default ParkingMap