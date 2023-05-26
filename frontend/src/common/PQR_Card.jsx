import Pregunta from "../assets/pregunta.svg"
import Reclamo from "../assets/exclamacion.svg"
import Queja from "../assets/mano-abajo.svg"

import "../styles/PQR_Card.css"

const PQR_Card=(props)=>{
    const titulo=props.title
    const nombre=props.name
    const respuesta=props.respuesta
    const tipo=props.tipo
    let tipoName
    let url
    if(tipo==1){
        url=Pregunta
        tipoName="Pregunta"
    }else if(tipo==2){
        url=Queja
        tipoName="Queja"
    }else{
        url=Reclamo
        tipoName="Reclamo"
    }
    return (
        <div className="PQRcard">
            <img className="image" src={url} alt="Imagen de PQR"/>
            <div className="infoPQR">
                <h2>{titulo}</h2>
                <p>{tipoName} realizada por: {nombre}</p>
                <h2>Respuesta:</h2>
                <p>{respuesta}</p>
            </div>
        </div>
    )
}

export default PQR_Card