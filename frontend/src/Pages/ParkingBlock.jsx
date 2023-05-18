import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import ParkingPlace from "../assets/parking-map-place.png";
import { useNavigate } from "react-router-dom";
import '../styles/ParkingBlock.css'

const ParkingBlock = () =>{
    const navigate = useNavigate()
    return (
        <>
            <Navbar/>
            <button className="goBackButton" onClick={()=>navigate("/mapa-de-parqueo")}>
                <svg className="arrow-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                <p>Regresar</p>
            </button>
            <h1 className="title">Bloque E</h1>
            <section className="parkingB">
                <img src={ParkingPlace} alt="page under construction" className='parkingPlace'/>
            </section>
            <div>
                
            </div>
            <Footer/>
        </>
    )
}

export default ParkingBlock