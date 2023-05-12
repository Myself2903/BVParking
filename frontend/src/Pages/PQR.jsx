import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import PUC from "../assets/puc.jpg"
import PQR_Card from "../common/PQR_Card"
import '../styles/PQR.css'

const PQR = ()=>{
    return (
        <>
            <Navbar/>
            <h1 className="title">PQR</h1>
            <button className="addButton">
                <svg className="plus-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
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