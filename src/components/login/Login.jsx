import { useContext, useState } from "react";
import "./login.scss";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../context/authContext";

function Login({ setLoginIsOpen }) {

    const [inputs, setInputs] = useState({ username: "", password: "" });

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs(currInputs => ({ ...currInputs, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ username: inputs.username, password: inputs.password });
        } catch (error) {
            console.log(error.response);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse)
    });

    return (
        <div className="login">
            <div className="container">
                <div className="header">
                    <CloseIcon className="close" onClick={() => setLoginIsOpen(false)} />
                    <h1>Iniciar sesión</h1>
                </div>
                <p>Te damos la bienvenida a FisiCamp</p>
                <form>
                    <input type="text" placeholder="Nombre de usuario" name="username" value={inputs.username} onChange={handleChange} />
                    <input type="password" placeholder="Contraseña" name="password" value={inputs.password} onChange={handleChange} />
                    <button onClick={handleLogin}>Iniciar sesión</button>
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

export default Login