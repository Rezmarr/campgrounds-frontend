import { useContext, useState } from "react";
import "./register.scss";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../context/authContext";
import { makeRequestPublic } from "../../axios";

function Register({ setRegisterIsOpen }) {

    const [inputs, setInputs] = useState({ email: "", password: "", username: "", firstName: "", lastName: "" });

    const { login, setCurrentUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs(currInputs => ({ ...currInputs, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            await axios.post("http://kr6nmcwc-8080.brs.devtunnels.ms/api/auth/signin", inputs, {
                // withCredentials: true
            })
            //Manejar login
            await login({ username: inputs.username, password: inputs.password });
        } catch (err) {
            console.log(err);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (credentials) => {
            makeRequestPublic.post(`/auth/google?accessToken=${credentials.access_token}`).then(res => {
                console.log(res.data);
                setCurrentUser(res.data);
            });
        }
    });

    return (
        <div className="register">
            <div className="container">
                <div className="header">
                    <CloseIcon className="close" onClick={() => setRegisterIsOpen(false)} />
                    <h1>Registrarse</h1>
                </div>
                <p>Te damos la bienvenida a FisiCamp</p>
                <form>
                    <input type="email" placeholder="Correo electrónico" name="email" value={inputs.email} onChange={handleChange} />
                    <input type="text" placeholder="Nombre de usuario" name="username" value={inputs.username} onChange={handleChange} />
                    <input type="text" placeholder="Nombre" name="firstName" value={inputs.firstName} onChange={handleChange} />
                    <input type="text" placeholder="Apellido" name="lastName" value={inputs.lastName} onChange={handleChange} />
                    <input type="password" placeholder="Contraseña" name="password" value={inputs.password} onChange={handleChange} />
                    <button onClick={handleSubmit}>Registrarse</button>
                </form>
                <div className="division">
                    <hr />
                    <span>o</span>
                    <hr />
                </div>
                <button className="google" onClick={googleLogin}>
                    <img src="google.svg" alt="" />
                    Continúa con Google
                </button>
            </div>
        </div>
    )
}

export default Register
