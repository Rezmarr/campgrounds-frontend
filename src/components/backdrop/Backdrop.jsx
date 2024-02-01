import { useEffect, useRef, useState } from "react";
import "./backdrop.scss";
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";

function Backdrop({ bookId }) {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const timer = useRef();

    const navigate = useNavigate();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);

            timer.current = window.setTimeout(() => {
                //Reemplazar por id generada en la vista anterior, prop
                navigate(`/trips/${bookId}`)
            }, 2000)

        }, 3000);
        return () => {
            clearTimeout(timer.current);
        };
    }, [bookId, navigate]);

    return (
        <div className='backdrop'>
            <div className="container">
                <h2>Procesando pago</h2>
                <hr />
                <h3>No cierre esta ventana...</h3>
                {loading ? (
                    <CircularProgress
                        size={68}
                        sx={{
                            color: green[500],
                        }}
                    />
                ) : <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                >
                    {success && <CheckIcon />}
                </Fab>}
                {success &&
                    <>
                        <h4>Pago confirmado!</h4>
                        <p>Está siendo redirigido</p>
                    </>}
            </div>
        </div>
    )
}

export default Backdrop