import Logo from "../assets/parking2.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header>
        <nav className='navBar'>
            <div className="brand">
                <img src={Logo} alt="logo img" className='logo'/>
                <label>BVParking</label>
            </div>
                    
            <ul className='navOptions'>
                <li><a onClick={()=>navigate("/")}>Página Principal</a></li>
                <li><a onClick={()=>navigate("/mapa-de-parqueo")}>Mapa de Parqueo</a></li>
                <li><a onClick={()=>navigate("/pqr")}>PQR</a></li>
            </ul>
        </nav>
    </header>
  );
};

export default Navbar