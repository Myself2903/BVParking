import background from '../assets/background.png'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import '../styles/MainPage.css'
import {useNavigate} from "react-router-dom"

const MainPage = ()=>{
    const navigate = useNavigate();
    return (
        <>
            <Navbar/>
            <section className='mainContent'>
                <img src={background} alt="background image" className='backgroundImage'/>
                <div className="infoDialog">
                    <h1>PARQUEADERO CENTRO COMERCIAL<br/>BELLAVISTA</h1>
                    <button onClick={()=>navigate("/mapa-de-parqueo")} className='parkingButton'>Ver mapa del parqueadero</button>
                    <p>Conoce la disponibilidad del parqueadero del Centro Comercial BellaVista</p>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default MainPage