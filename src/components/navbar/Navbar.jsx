import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CancelIcon from '@mui/icons-material/Cancel';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import Register from "../register/Register";
import Login from "../login/Login";

function Navbar() {

  const { currentUser } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);

  const navigate = useNavigate();

  const path = window.location.pathname;

  const userIsNotLogged = true;

  const optionsRef = useRef(null);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setUserOptionsOpen(!userOptionsOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (optionsRef.current) {
        setUserOptionsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span><img src="/camping-tent.svg" alt="" />FisiCamp</span>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="icon">
            <HomeOutlinedIcon />
          </div>
        </Link>
        <div className="icon" onClick={toggle}>
          {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </div>
      </div>

      <div className="center">
        <span style={{ fontWeight: path === '/' ? 700 : 400 }} onClick={() => navigate("/")}>Estadías</span>
        {!currentUser ? <></> : <span style={{ fontWeight: path === '/create' ? 700 : 400 }} onClick={() => navigate("/create")}>Crear nueva estadía</span>}
      </div>

      <div className="right">
        {!currentUser ?
          <div className="icon" onClick={handleButtonClick}>
            <PersonOutlinedIcon />
          </div> :
          <div className="user">
            <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
            <span>{currentUser.firstName+" "+currentUser.lastName}</span>
          </div>
        }
        {userOptionsOpen &&
          <div className="userOptions" ref={optionsRef}>
            <span onClick={() => setLoginIsOpen(true)}>Iniciar sesión</span>
            <span onClick={() => setRegisterIsOpen(true)}>Registrarse</span>
          </div>
        }
      </div>
      {registerIsOpen && <Register setRegisterIsOpen={setRegisterIsOpen}/>}
      {loginIsOpen && <Login setLoginIsOpen={setLoginIsOpen}/>}
    </div>
  )
}

export default Navbar
