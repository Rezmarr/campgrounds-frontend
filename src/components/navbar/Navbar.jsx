import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CancelIcon from '@mui/icons-material/Cancel';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import Register from "../register/Register";
import Login from "../login/Login";
import { HubConnectionBuilder } from "@microsoft/signalr"

function Navbar() {

  const { currentUser } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [userOptionsOpen, setUserOptionsOpen] = useState(false);
  const [userMoreOpen, setUserMoreOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [connection, setConnection] = useState(null);

  const [newNoti, setNewNoti] = useState(false);
  const [notificationsData, setNotificationsData] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://4l17td47-5000.brs.devtunnels.ms/notifications') // reemplaza con tu URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Conectado!');

          // Aquí te suscribes a los mensajes
          connection.on('notification', (message) => {
            const notification = JSON.parse(message);

            // Asegúrate de que el ID del usuario en la notificación coincide con el ID del usuario en el cliente
            if (notification.UserId == currentUser.id) {
              console.log(notification);
              setNewNoti(true);
              // Aquí puedes manejar la notificación
            }
          });
        })
        .catch(e => console.log('Falló la conexión: ', e));
    }
  }, [connection, currentUser.id]);

  const navigate = useNavigate();

  const path = window.location.pathname;

  const optionsRef = useRef(null);
  const optionsMoreRef = useRef(null);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setUserOptionsOpen(!userOptionsOpen);
  };

  const handleMoreOptionsClick = (e) => {
    e.stopPropagation();
    setUserMoreOpen(!userMoreOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (optionsRef.current) {
        setUserOptionsOpen(false);
      }
      if (optionsMoreRef.current) {
        setUserMoreOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    makeRequest.post("/auth/signout").then(res => {
      return res.data;
    })
  }

  // const notificationsData = [
  //   { id: 1, profilePic: "", message: "Renzo" },
  //   { id: 2, profilePic: "", message: "Jhamil" },
  //   { id: 3, profilePic: "", message: "Leonardo" },
  //   { id: 4, profilePic: "", message: "Gianmarco" },
  // ]

  const handleNotifications = () => {
    makeRequest.get("/notification").then(res => {
      setNotificationsData(res.data);
    })
    setNotificationsOpen(!notificationsOpen);
    setNewNoti(false);
  }

  const handleClear = () => {
    makeRequest.delete(`/notification/`).then(res => {
      return res.data;
    })
  }

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
        {currentUser && <div className="icon" onClick={handleNotifications}>
          <NotificationsOutlinedIcon />
          {newNoti && <span> </span>}
        </div>}
        {notificationsOpen && notificationsData && notificationsData.length > 0 ?
          <div className="notifications">
            <span className="clear" onClick={handleClear}>Clear all</span>
            <hr />
            {notificationsData && notificationsData.map((noti) => (
              <div key={noti.id} className="notification">
                <div className="notiContainer">
                  <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="usuario" />
                  <span>{noti.message}</span>
                </div>
                {/* <CancelIcon className="close" /> */}
              </div>
            ))}
          </div>
          :
          <></>
        }
        {!currentUser ?
          <div className="icon" onClick={handleButtonClick}>
            <PersonOutlinedIcon />
          </div> :
          <div className="user" onClick={handleMoreOptionsClick}>
            <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
            <span>{currentUser.firstName + " " + currentUser.lastName}</span>
          </div>
        }
        {userOptionsOpen &&
          <div className="userOptions" ref={optionsRef}>
            <span onClick={() => setLoginIsOpen(true)}>Iniciar sesión</span>
            <span onClick={() => setRegisterIsOpen(true)}>Registrarse</span>
          </div>
        }
        {userMoreOpen &&
          <div className="userOptions" ref={optionsMoreRef}>
            <span>Perfil</span>
            <span>Métricas</span>
            <span>Mis reservas</span>
            <span onClick={handleLogout}>Cerrar sesión</span>
          </div>
        }
      </div>
      {registerIsOpen && <Register setRegisterIsOpen={setRegisterIsOpen} />}
      {loginIsOpen && <Login setLoginIsOpen={setLoginIsOpen} />}
    </div>
  )
}

export default Navbar
