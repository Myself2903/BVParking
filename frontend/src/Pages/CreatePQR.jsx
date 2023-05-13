import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import {useNavigate} from "react-router-dom"
import "../styles/CreatePQR.css"

const CreatePQR= ()=>{
    const navigate = useNavigate();
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
                <form action="">
                    <div className="form-div">
                        <label htmlFor="title" className="titles">Título:</label>
                        <input type="text" name="pqr_title" id="title" />
                    </div>
                    <div className="form-div">
                        <label htmlFor="name" className="titles">Nombre de la persona:</label>
                        <input type="text" name="pqr_name" id="name" />
                    </div>
                    <div className="form-div">
                        <p className="titles">Tipo de PQR:</p>
                        <div>
                            <input type="radio" name="radio-type" id="question" value={1} />
                            <label htmlFor="question">Pregunta</label>
                        </div>
                        <div>
                            <input type="radio" name="radio-type" id="suggestion" value={2} />
                            <label htmlFor="suggestion">Sugerencia</label>
                        </div>
                        <div>
                            <input type="radio" name="radio-type" id="complaint" value={3} />
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