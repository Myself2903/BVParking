import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import {useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import "../styles/CreatePQR.css"

const CreatePQR= ()=>{
    const [formData, setFormData] = useState({titulo:'',nombre:'',idTipo:0})
    const URL = 'http://127.0.0.1:8000/newPQR'
    const navigate = useNavigate();

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            await axios.post(URL,formData);
            console.log('POST hecho con EXITO')
            navigate("/pqr")
        }catch (error){
            console.error(error)
        }
        console.log(formData)
    }
    const handleChange = e =>{
        const {name,value} = e.target
        setFormData({...formData,[name]:name=='idTipo' ? parseInt(value) : value})
        console.log(value)
    }
    return (
        <>
            <Navbar/>
            <button className="goBackButton" onClick={()=>navigate("/pqr")}>
                <svg className="arrow-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                <p>Regresar</p>
            </button>
            <h1 className="title">Nueva PQR</h1>
            <section className="newPQR">
                <form onSubmit={handleSubmit}>
                    <div className="form-div">
                        <label htmlFor="title" className="titles">Título:</label>
                        <input type="text" name="titulo" id="title" onChange={handleChange}/>
                    </div>
                    <div className="form-div">
                        <label htmlFor="name" className="titles">Nombre de la persona:</label>
                        <input type="text" name="nombre" id="name" onChange={handleChange}/>
                    </div>
                    <div className="form-div">
                        <p className="titles">Tipo de PQR:</p>
                        <div>
                            <input type="radio" name="idTipo" id="question" value={1} onChange={handleChange}/>
                            <label htmlFor="question">Pregunta</label>
                        </div>
                        <div>
                            <input type="radio" name="idTipo" id="suggestion" value={3} onChange={handleChange}/>
                            <label htmlFor="suggestion">Reclamo</label>
                        </div>
                        <div>
                            <input type="radio" name="idTipo" id="complaint" value={2} onChange={handleChange}/>
                            <label htmlFor="complaint">Queja</label>
                        </div>
                    </div>
                    <div className="buttoms">
                        <button className="submitButton" type="submit">Enviar PQR</button>
                        <button className="cancelButton" onClick={()=>navigate("/pqr")}>Cancelar</button>
                    </div>
                </form>
            </section>
            <Footer/>
        </>
    )
}

export default CreatePQR