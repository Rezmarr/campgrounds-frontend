import { useContext, useState } from "react";
import "./login.scss";
import CloseIcon from '@mui/icons-material/Close';
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../context/authContext";
import { makeRequestPublic } from "../../axios";
// import { OAuth2Client } from "google-auth-library";

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

    // const oAuth2Client = new OAuth2Client(
    //     '359716433018-skuf9ju9t9u434vsg5285o8piuifb90k.apps.googleusercontent.com',
    //     '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',
    //     'postmessage',
    // );

    const googleLogin = useGoogleLogin({
        onSuccess: async (credentials) => {
            // const tokens = await axios.post('http://localhost:3001/auth/google', {  // http://localhost:3001/auth/google backend that will exchange the code
            //     code,
            // });

            // const { tokens } = await oAuth2Client.getToken(code); // exchange code for tokens
            // console.log(tokens);

            makeRequestPublic.post(`/auth/google?accessToken=credentials.access_token`).then(res => {
                console.log(res.data);
            })

            // console.log("Ok");
        }
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