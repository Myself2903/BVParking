import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import PQR_Card from "../common/PQR_Card"
import PlusSVG from "../assets/plus.svg"
import {useNavigate} from "react-router-dom"
import '../styles/PQR.css'

const PQR = ()=>{
    const navigate = useNavigate();
    return (
        <>
            <Navbar/>
            <h1 className="title">PQR</h1>
            <button className="addButton" onClick={()=>navigate("/pqr/nueva-pqr")}>
                <img className="plus-svg" src={PlusSVG} alt="imagen cruz" />
                <p>Agregar nueva PQR</p>
            </button>
            <section className="pqr">
                <PQR_Card/>
                <PQR_Card/>
                <PQR_Card/> 
            </section>
            <Footer/>
        </>
    )
}

export default PQR