import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import ParkingPlace from "../assets/parking-map-place-horizontal.png";
import ParkingPlaceVertical from "../assets/parking-map-place-vertical.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/ParkingBlock.css';


const ParkingBlock = () =>{
    const navigate = useNavigate()
    const location = useLocation();
    const URL = 'http://127.0.0.1:8000/parkingStatus' 
    const [blockState, setBlockState] = useState([])
    const blocks = {"A": 0, "B": 1, "C": 2, "D":3, "E":4, "F":5, "Moto": 6}
    const params = new URLSearchParams(location.search) ;
    const block = params.get('block')

    useEffect(()=>{    

        if (!block || !(Object.keys(blocks).includes(block))){
            navigate("/mapa-de-parqueo")
        }

        const eventSource = new EventSource(`${URL}?searchedBlock=${blocks[block]}`);
        console.log(eventSource.readyState)

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            setBlockState(data);
          };

        return () => {
            eventSource.close(); // Cerrar la conexión SSE al desmontar el componente
        };
        
    }, [])
    
    const getDivPlace = () =>{
        let n=16
            
        let divs = []
        for(let i = 1;i<=n;i++){
            if(i<=n/2){
                divs.push((
                    <div id={"place"+i} className={`places up ${blockState[i-1] ? '': 'unavaileable'}`}></div>
                ))
            }else{
                divs.push((
                    <div id={"place"+i} className={`places down ${blockState[i-1] ? '': 'unavaileable'}`}></div>
                ))
            }
            
        }
        return divs
    }
    

    return (
        <>
            <Navbar/>
            <button className="goBackButton" onClick={()=>navigate("/mapa-de-parqueo")}>
                <svg className="arrow-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                <p>Regresar</p>
            </button>
            <h1 className="title">Bloque {block}</h1>
            <section className="parkingB">
                <img src={ParkingPlace} alt="imagen de las plazas en el bloque" className='parkingPlace'/>
                <img src={ParkingPlaceVertical} alt="imagen de las plazas en el bloque en vertical" className='parkingPlaceVertical'/>
                {getDivPlace()}
            </section>
            <div>
                
            </div>
            <Footer/>
        </>
    )
}

export default ParkingBlock