import logo from '../assets/parking2.svg'
import background from '../assets/background.png'
import '../styles/MainPage.css'

const MainPage = ()=>{
    return (
        <>
            <header>
                <nav className='navBar'>
                    <div className="brand">
                        <img src={logo} alt="logo img" className='logo'/>
                        <label>BVParking</label>
                    </div>
                    
                    <ul className='navOptions'>
                        <li><a>Página Principal</a></li>
                        <li><a>Mapa de Parqueo</a></li>
                        <li><a>PQR</a></li>
                    </ul>
                </nav>
            </header>
            <section className='mainContent'>
                <img src={background} alt="background image" className='backgroundImage'/>
                <div className="infoDialog">
                    <h1>PARQUEADERO CENTRO COMERCIAL<br/>BELLAVISTA</h1>
                    <button className='parkingButton'>Ver mapa del parqueadero</button>
                    <p>Conoce la disponibilidad del parqueadero del Centro Comercial BellaVista</p>
                </div>
            </section>
            <footer>
                <p>&copy; 2023 BVParking. All rights reserved</p>
            </footer>
        </>
    )
}

export default MainPage