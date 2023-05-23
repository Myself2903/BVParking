import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import ParkingBlock from "../assets/parking-map-block.png"
import '../styles/ParkingMap.css'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ParkingMap = ()=>{
    const [parkingState, setParkingState] = useState([])
    const URL = 'http://127.0.0.1:8000/blockStatus'
    const navigate = useNavigate()

    useEffect(() =>{
        const eventSource = new EventSource(URL);
        console.log(eventSource.readyState)

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            // console.log(data)
            setParkingState(data);
          };

        return () => {
            eventSource.close(); // Cerrar la conexión SSE al desmontar el componente
        };
    }, []);

    const blocks = {"A": 0, "B": 1, "C": 2, "D":3, "E":4, "F":5, "Moto": 6}

    const genBlocks = () =>{
        const generatedBlocks = []
        const keys = Object.keys(blocks)
        for(let i=0; i<keys.length ; i++){
            generatedBlocks.push(
                <div onClick={()=>navigate(`/mapa-de-parqueo/bloque?block=${keys[i]}`)} className= {`blocks block${keys[i]} ${ parkingState[blocks[keys[i]]] ? '' : 'unavaileableBlock'}`}>
                    <p>{keys[i]}</p>
                </div>
            )
        }
        return generatedBlocks
    }

    return (
        <>
            <Navbar/>
            <h1 className="title">Mapa del parqueadero</h1>
            <section className="parkingMap">
                <img src={ParkingBlock} alt="page under construction" className='parkingBlock'/>
                {genBlocks()}
            </section>
            <Footer/>

        </>
    )
}

export default ParkingMap