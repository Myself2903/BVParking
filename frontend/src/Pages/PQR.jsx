import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import PQR_Card from "../common/PQR_Card"
import PlusSVG from "../assets/plus.svg"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import '../styles/PQR.css'

const PQR = ()=>{
    const [data, setData] = useState([])
    const URL = 'http://127.0.0.1:8000/PQR'
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(URL)
            .then(response => {
                setData(response.data)
            })
            .catch(error =>{
                console.error(error)
            })
    }, []);
    const genPQRCards=()=>{
        let pqrCards=[]
        for(let i=0;i<data.length;i++){
            pqrCards.push((
                <PQR_Card title={data[i][1]} name={data[i][2]} respuesta={data[i][3]==null ? "Aún no hay respuesta": data[i][3]} tipo={data[i][4]}/>
            ))
            console.log(data[i])
            
        }
        return pqrCards
    }
    return (
        <>
            <Navbar/>
            <h1 className="title">PQR</h1>
            <button className="addButton" onClick={()=>navigate("/pqr/nueva-pqr")}>
                <img className="plus-svg" src={PlusSVG} alt="imagen cruz" />
                <p>Agregar nueva PQR</p>
            </button>
            <section className="pqr">
                {genPQRCards()}
            </section>
            <Footer/>
        </>
    )
}

export default PQR