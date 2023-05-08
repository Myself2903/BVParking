import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import PUC from "../assets/puc.jpg"
import '../styles/PQR.css'

const PQR = ()=>{
    return (
        <>
            <Navbar/>
            <h1 className="title">PQR</h1>
            <section className="pqr">
                <img src={PUC} alt="page under construction" className='puc'/>
            </section>
            <Footer/>
        </>
    )
}

export default PQR