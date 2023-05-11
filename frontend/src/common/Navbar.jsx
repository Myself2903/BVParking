import { useState } from "react";
import Logo from "../assets/parking2.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const toggleMenu = () =>{
    setMenu(!menu)
  }
  return (
    <header>
        <div className="brand">
            <img src={Logo} alt="logo img" className='logo'/>
            <label>BVParking</label>
        </div>
            <button onClick={toggleMenu} className="menuButton">
              <svg className="svgMenu" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
        <nav className={`navBar ${menu ? 'isActive' : ''}`}>
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