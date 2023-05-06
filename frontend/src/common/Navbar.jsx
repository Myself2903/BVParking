import Logo from "../assets/parking2.svg";

const Navbar = () => {
  return (
    <header>
        <nav className='navBar'>
            <div className="brand">
                <img src={Logo} alt="logo img" className='logo'/>
                <label>BVParking</label>
            </div>
                    
            <ul className='navOptions'>
                <li><a>Página Principal</a></li>
                <li><a>Mapa de Parqueo</a></li>
                <li><a>PQR</a></li>
            </ul>
        </nav>
    </header>
  );
};

export default Navbar