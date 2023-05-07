import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import PUC from "../assets/puc.jpg"

const ParkingMap = ()=>{
    return (
        <>
            <Navbar/>
            <section className="parkingMap">
                <img src={PUC} alt="page under construction" className='puc'/>
            </section>
            <Footer/>
        </>
    )
}

export default ParkingMap