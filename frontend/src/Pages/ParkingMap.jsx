import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import PUC from "../assets/puc.jpg"
import '../styles/ParkingMap.css'

const ParkingMap = ()=>{
    return (
        <>
            <Navbar/>
            <h1 className="title">Mapa del parqueadero</h1>
            <section className="parkingMap">
                <img src={PUC} alt="page under construction" className='puc'/>
            </section>
            <Footer/>
        </>
    )
}

export default ParkingMap